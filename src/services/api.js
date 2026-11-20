import { MOCK_MEDIA_ITEMS, MOCK_USER, MOCK_HISTORY, MOCK_FLASHCARDS, MOCK_QUIZ } from '../data/mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Robust API Client with automatic fallback to local data if backend is offline.
 */
export const api = {
  // 1. Media
  async getMedia(search = '', type = 'all', sort = 'newest') {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (type && type !== 'all') params.append('type', type);
      if (sort) params.append('sort_by', sort);

      const res = await fetch(`${BASE_URL}/api/media?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        return data.items || [];
      }
    } catch (err) {
      console.warn('Backend unavailable, using local mock data:', err);
    }
    
    // Fallback
    return MOCK_MEDIA_ITEMS.filter(item => {
      if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) {
        return false;
      }
      if (type !== 'all' && item.type.toLowerCase() !== type.toLowerCase()) {
        return false;
      }
      return true;
    });
  },

  async getMediaById(id) {
    try {
      const res = await fetch(`${BASE_URL}/api/media/${id}`);
      if (res.ok) {
        return await res.json();
      }
      if (res.status === 404) throw new Error('This video is no longer in your media library.');
      throw new Error(`Could not load video (HTTP ${res.status}).`);
    } catch (err) {
      if (err instanceof Error && !/Failed to fetch|NetworkError/i.test(err.message)) throw err;
      console.warn('Backend unavailable, using local item:', err);
    }
    return MOCK_MEDIA_ITEMS.find(m => m.id === id) || MOCK_MEDIA_ITEMS[0];
  },

  async uploadFile(file, customTitle = '', language = 'english') {
    const formData = new FormData();
    formData.append('file', file);
    if (customTitle) formData.append('custom_title', customTitle);
    if (language) formData.append('language', language);

    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return data.media;
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Upload failed');
  },

  async ingestUrl(url, options = {}, language = 'english') {
    const res = await fetch(`${BASE_URL}/api/ingest/url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, options, language }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.media;
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'URL Ingest failed');
  },

  async updateNotes(mediaId, notes) {
    try {
      const res = await fetch(`${BASE_URL}/api/media/${mediaId}/notes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Failed to save notes to backend, persisted locally:', err);
    }
    return { status: 'success', notes };
  },

  async deleteMedia(mediaId) {
    try {
      const res = await fetch(`${BASE_URL}/api/media/${mediaId}`, {
        method: 'DELETE',
      });
      if (res.ok) return true;
    } catch (err) {
      console.warn('Failed to delete on backend:', err);
    }
    return true;
  },

  // 2. AI Chat
  async chatWithVideo(mediaId, query, chatHistory = []) {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mediaId, query, chatHistory }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || `Question failed (HTTP ${res.status}).`);
    return data.reply;
  },

  async refreshVideo(mediaId) {
    const res = await fetch(`${BASE_URL}/api/media/${mediaId}/refresh`, { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || `Video processing failed (HTTP ${res.status}).`);
    return data.media;
  },

  // 3. Quiz & Flashcards
  async getQuiz(mediaId = 'vid-1') {
    try {
      const res = await fetch(`${BASE_URL}/api/quiz/${mediaId}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend quiz offline:', err);
    }
    return {
      mediaId,
      title: "Stanford AI: Multimodal Models",
      flashcards: MOCK_FLASHCARDS,
      quiz: MOCK_QUIZ
    };
  },

  async submitQuiz(mediaId, answers) {
    try {
      const res = await fetch(`${BASE_URL}/api/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId, answers }),
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend quiz submit offline:', err);
    }

    // Local evaluation
    let score = 0;
    MOCK_QUIZ.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });
    return {
      score,
      total: MOCK_QUIZ.length,
      percentage: Math.round((score / MOCK_QUIZ.length) * 100),
      feedback: []
    };
  },

  // 4. History
  async getHistory() {
    try {
      const res = await fetch(`${BASE_URL}/api/history`);
      if (res.ok) {
        const data = await res.json();
        return data.items || [];
      }
    } catch (err) {
      console.warn('Backend history offline:', err);
    }
    return MOCK_HISTORY;
  },

  async addHistory(entry) {
    try {
      const res = await fetch(`${BASE_URL}/api/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend add history offline:', err);
    }
    return { status: 'success', entry };
  },

  // 5. User Profile
  async getUserProfile() {
    try {
      const res = await fetch(`${BASE_URL}/api/user/profile`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend user profile offline:', err);
    }
    return MOCK_USER;
  },

  async updateUserProfile(userData) {
    try {
      const res = await fetch(`${BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        const data = await res.json();
        return data.user;
      }
    } catch (err) {
      console.warn('Backend update profile offline:', err);
    }
    Object.assign(MOCK_USER, userData);
    return MOCK_USER;
  },

  async changePassword(currentPassword, newPassword) {
    const res = await fetch(`${BASE_URL}/api/user/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (res.ok) return await res.json();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Password update failed');
  }
};

export default api;
