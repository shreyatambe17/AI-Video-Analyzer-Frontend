// Updated mock data matching the AI Video Summarizer reference design

export const MOCK_USER = {
  name: "Shreya Tambe",
  role: "Student",
  email: "shreya.tambe@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  storageUsed: 12.8,
  storageLimit: 50.0
};

export const MOCK_MEDIA_ITEMS = [
  {
    id: "vid-1",
    title: "Stanford AI: Multimodal Models",
    date: "24 Jun 2026",
    size: "320 MB",
    duration: "01:24:10",
    type: "Video",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    status: "Completed",
    tags: ["#AI", "#Multimodal", "#Research"],
    summary: "This video discusses multimodal AI models that can understand and generate multiple types of data such as text, images, audio and video. It covers key architectures, training methods and real-world applications.",
    keyTakeaways: [
      "Multimodal models combine multiple data types (text, image, audio, video).",
      "They improve performance on complex tasks.",
      "Real-world applications include healthcare, education and automation."
    ]
  },
  {
    id: "vid-2",
    title: "Global Tech Earnings Call",
    date: "20 Jun 2026",
    size: "210 MB",
    duration: "00:54:20",
    type: "Video",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    status: "Completed",
    tags: ["#Finance", "#Tech", "#Earnings"],
    summary: "Quarterly earnings report covering datacenter GPU expenditure scaling, LLM inference latency improvements, and enterprise cloud adoption rate.",
    keyTakeaways: [
      "Datacenter revenue rose 48% year-over-year with surging AI cloud demand.",
      "Hardware efficiency improvements led to 30% reduction in per-query compute cost.",
      "Enterprise recurring contracts expanded across Fortune 500 accounts."
    ]
  },
  {
    id: "vid-3",
    title: "Autonomous Systems & Robotics",
    date: "18 Jun 2026",
    size: "180 MB",
    duration: "00:28:40",
    type: "Video",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    status: "Completed",
    tags: ["#Robotics", "#AI", "#Engineering"],
    summary: "Deep dive into real-time visual odometry, LiDAR point cloud sensor fusion, and reinforcement learning policy iteration in physical manipulators.",
    keyTakeaways: [
      "Sim-to-real transfer minimizes physical training damage during reinforcement loops.",
      "Visual-inertial odometry guarantees sub-centimeter localization precision.",
      "Safety barrier certificates ensure collaborative operation alongside human operators."
    ]
  },
  {
    id: "vid-4",
    title: "Data Science for Beginners",
    date: "15 Jun 2026",
    size: "310 MB",
    duration: "00:46:15",
    type: "Video",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    status: "Completed",
    tags: ["#DataScience", "#Python", "#Beginners"],
    summary: "Essential guide to data cleaning, exploratory visual analysis, statistical testing, and initial model evaluation using pandas and scikit-learn.",
    keyTakeaways: [
      "High quality data preprocessing yields greater performance gains than hyperparameter tuning.",
      "Detecting collinearity early prevents model instability.",
      "Visualizing correlation heatmaps uncovers latent confounding factors."
    ]
  },
  {
    id: "vid-5",
    title: "Machine Learning Basics",
    date: "12 Jun 2026",
    size: "140 MB",
    duration: "00:32:18",
    type: "Audio",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    status: "Processing",
    tags: ["#Machine Learning", "#Basics", "#Education"],
    summary: "Conceptual foundations of gradient descent optimization, cost functions, loss surfaces, and generalization boundaries.",
    keyTakeaways: [
      "Supervised algorithms require carefully curated target labels.",
      "Adaptive learning rates prevent oscillatory divergence.",
      "Validation loss divergence signals onset of overfitting."
    ]
  },
  {
    id: "vid-6",
    title: "Productivity Tips",
    date: "10 Jun 2026",
    size: "90 MB",
    duration: "00:18:05",
    type: "Video",
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    status: "Completed",
    tags: ["#Productivity", "#Study", "#Tips"],
    summary: "Cognitive frameworks and evidence-based study techniques: active recall, spaced repetition scheduling, and deep work blocks.",
    keyTakeaways: [
      "Active recall generates twice the long-term retention of passive reading.",
      "Time-blocking prevents context-switching cognitive debt.",
      "Sleep consolidation is essential for neural synaptogenesis."
    ]
  }
];

export const MOCK_CHAPTERS = [
  {
    id: 1,
    time: "00:00 - 02:15",
    title: "Introduction",
    summary: "The speaker introduces the concept of multimodal AI and explains why it is important in today's world."
  },
  {
    id: 2,
    time: "02:16 - 08:40",
    title: "What is Multimodal AI?",
    summary: "Explains how unified architectures integrate text, imagery, and audio tokens into shared representational spaces."
  },
  {
    id: 3,
    time: "08:41 - 16:20",
    title: "Model Architectures",
    summary: "Deep dive into cross-attention matrices, projection bottleneck layers, and transformer backbones."
  },
  {
    id: 4,
    time: "16:21 - 24:10",
    title: "Training Methodology",
    summary: "Pre-training contrastive objectives, multi-task instruction fine-tuning, and alignment loss functions."
  },
  {
    id: 5,
    time: "24:11 - 34:00",
    title: "Real World Applications",
    summary: "Practical implementations in healthcare diagnostics, intelligent video retrieval, and autonomous robotics."
  },
  {
    id: 6,
    time: "34:01 - 41:10",
    title: "Challenges & Future",
    summary: "Discusses compute scaling limits, real-time edge constraints, and upcoming frontier research directions."
  }
];

export const MOCK_FLASHCARDS = [
  {
    id: 1,
    question: "What is a multimodal model?",
    answer: "A multimodal model is an artificial intelligence model that can understand, process, and generate multiple types of data synchronously, such as text, images, audio, and video."
  },
  {
    id: 2,
    question: "How do cross-attention layers function in multimodal transformers?",
    answer: "Cross-attention allows tokens from one modality (e.g. text query) to directly attend to representations from another modality (e.g. video frames) to establish semantic alignment."
  },
  {
    id: 3,
    question: "Why is multimodal learning more challenging than unimodal learning?",
    answer: "Different modalities possess different dimensionalities, sampling rates, noise characteristics, and temporal alignments, requiring complex synchronization."
  },
  {
    id: 4,
    question: "What is zero-shot multimodal retrieval?",
    answer: "The ability of a system to accurately identify or localize unseen conceptual queries in video streams without explicit supervised training on that target label."
  },
  {
    id: 5,
    question: "What are key real-world applications of multimodal video models?",
    answer: "Automated medical diagnostic reasoning, autonomous vehicle perception, intelligent assistive tutoring, and semantic content search."
  },
  {
    id: 6,
    question: "What is the role of contrastive learning in multimodal models?",
    answer: "It projects complementary modalities into a shared metric space where positive pairs (e.g., text caption and corresponding video clip) are maximized in cosine similarity."
  },
  {
    id: 7,
    question: "How does temporal pruning enhance video processing efficiency?",
    answer: "By removing redundant consecutive frames with low information delta, reducing computational memory overhead by over 40%."
  },
  {
    id: 8,
    question: "What hardware bottleneck is most acute during 4K video analysis?",
    answer: "High-bandwidth GPU VRAM saturation due to the quadratic scaling of standard multi-head self-attention with respect to total input frame tokens."
  }
];

export const MOCK_QUIZ = [
  {
    id: 1,
    question: "What enables multimodal models to process video and audio simultaneously?",
    options: [
      "Separate isolated database tables",
      "Unified vector embedding space & cross-attention",
      "Converting video into static ASCII text first",
      "Manual human transcription intervention"
    ],
    correctIndex: 1,
    explanation: "Cross-attention over unified projection spaces allows simultaneous processing of acoustic and visual frames."
  },
  {
    id: 2,
    question: "Which sector is actively deploying multimodal video reasoning for clinical triage?",
    options: [
      "Standard accounting ledgers",
      "Healthcare & diagnostic imaging",
      "Monochrome laser printing",
      "Static web page generation"
    ],
    correctIndex: 1,
    explanation: "Multimodal AI evaluates patient scans, video vitals, and physician notes simultaneously."
  },
  {
    id: 3,
    question: "What is the primary benefit of temporal pruning in video processing?",
    options: [
      "Higher speaker audio volume",
      "Drastic reduction in GPU memory footprint and latency",
      "Automatic video translation into French",
      "Changing the camera aspect ratio"
    ],
    correctIndex: 1,
    explanation: "Temporal pruning reduces redundant frames, delivering major compute and memory savings."
  }
];

export const MOCK_HISTORY = [
  {
    id: 1,
    type: "watch",
    title: "Watched Stanford AI: Multimodal Models",
    timestamp: "24 Jun 2026, 10:30 AM",
    color: "blue",
    mediaId: "vid-1"
  },
  {
    id: 2,
    type: "summary",
    title: "Generated summary - Global Tech Earnings Call",
    timestamp: "20 Jun 2026, 05:15 PM",
    color: "green",
    mediaId: "vid-2"
  },
  {
    id: 3,
    type: "notes",
    title: "Created notes - Machine Learning Basics",
    timestamp: "12 Jun 2026, 11:30 AM",
    color: "yellow",
    mediaId: "vid-5"
  },
  {
    id: 4,
    type: "quiz",
    title: "Took quiz - Autonomous Systems & Robotics",
    timestamp: "18 Jun 2026, 02:45 PM",
    color: "purple",
    mediaId: "vid-3"
  },
  {
    id: 5,
    type: "upload",
    title: "Uploaded video - Productivity Tips",
    timestamp: "10 Jun 2026, 09:15 AM",
    color: "cyan",
    mediaId: "vid-6"
  }
];
