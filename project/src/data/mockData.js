// Comprehensive mock dataset for OmniVideo AI / OmniStudy Platform

export const MOCK_USER = {
  name: "Alex Rivera",
  role: "Scholar / Computer Science",
  email: "alex@stanford.edu",
  university: "Stanford University",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  storageUsed: 14.2,
  storageLimit: 50.0,
  plan: "Pro Scholar Tier"
};

export const MOCK_MEDIA_ITEMS = [
  {
    id: "stan-9462",
    title: "Stanford AI: Multimodal Video Intelligence",
    speakers: ["Prof. Fei-Fei Li", "Andrej Karpathy"],
    speakerCount: 4,
    wordCount: 16420,
    chapterCount: 18,
    duration: "01:42:15",
    languages: ["EN", "ES", "JA"],
    status: "PDF Ready",
    statusType: "emerald",
    category: "Computer Science",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    ingestDate: "2026-10-07",
    views: 1240,
    summary: "The colloquium introduces an adaptive spatiotemporal tokenization paradigm that reduces multi-gigabyte video stream representations into compact dynamic graph embeddings."
  },
  {
    id: "q3-tech-882",
    title: "Q3 Global Tech Earnings Call & AI Infrastructure",
    speakers: ["C-Suite Diarized"],
    speakerCount: 6,
    wordCount: 8910,
    chapterCount: 6,
    duration: "00:54:20",
    languages: ["EN", "DE", "ZH"],
    status: "Bilingual Complete",
    statusType: "cyan",
    category: "Finance & Strategy",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    ingestDate: "2026-10-06",
    views: 890,
    summary: "Quarterly earnings report covering datacenter GPU expenditure scaling, LLM inference latency improvements, and enterprise cloud adoption rate."
  },
  {
    id: "auto-sys-104",
    title: "Autonomous Systems & Neural Robotics Architecture",
    speakers: ["Dr. Sarah Chen", "Marcus Vance", "Elena Rostova"],
    speakerCount: 3,
    wordCount: 22100,
    chapterCount: 24,
    duration: "02:18:40",
    languages: ["EN", "FR"],
    status: "Analysis Complete",
    statusType: "emerald",
    category: "Robotics & AI",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    ingestDate: "2026-10-05",
    views: 2150,
    summary: "Deep dive into real-time visual odometry, LiDAR point cloud sensor fusion, and reinforcement learning policy iteration in physical manipulators."
  },
  {
    id: "mit-quant-008",
    title: "MIT Quantum Mechanics: Lecture 08 Wave Packets",
    speakers: ["Prof. Alan Thorne"],
    speakerCount: 2,
    wordCount: 14200,
    chapterCount: 12,
    duration: "01:15:30",
    languages: ["EN", "DE"],
    status: "Processing",
    statusType: "purple",
    category: "Physics",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    ingestDate: "2026-10-08",
    views: 430,
    summary: "Derivation of Schrödinger wave equation for non-dispersive wave packets, Gaussian pulse propagation, and momentum space wavefunctions."
  }
];

export const MOCK_TRANSCRIPT = [
  {
    timestamp: "00:01:15",
    seconds: 75,
    speaker: "SPK_01 (Prof. Fei-Fei Li)",
    text: "Welcome everyone to today's colloquium on Multimodal Video Intelligence. Today we are exploring how spatial-temporal attention matrices reduce GPU memory saturation.",
    highlight: false
  },
  {
    timestamp: "00:04:30",
    seconds: 270,
    speaker: "SPK_02 (Andrej Karpathy)",
    text: "When scaling continuous video comprehension to multimillion-frame horizons, naive self-attention runs into O(T^2) quadratic memory complexity.",
    highlight: false
  },
  {
    timestamp: "00:12:34",
    seconds: 754,
    speaker: "SPK_01 (Dr. Thorne)",
    text: "Once spatial dimensions exceed 2160p (4K), standard matrix multiplication consumes roughly 78GB of high-bandwidth memory within six forward passes.",
    highlight: true,
    spanish: "La atención cuadrática satura la memoria GPU durante la codificación de video en 4K, requiriendo tokenización espacial discontinua."
  },
  {
    timestamp: "00:13:48",
    seconds: 828,
    speaker: "SPK_01 (Dr. Thorne)",
    text: "By replacing dense attention frames with flash-temporal sparse kernels, we observe sub-linear latency gains of 42% across long-form video sequences.",
    highlight: true,
    spanish: "Al reemplazar los marcos de atención densos con núcleos temporales dispersos, observamos ganancias de latencia sublineales del 42%."
  },
  {
    timestamp: "00:18:20",
    seconds: 1100,
    speaker: "SPK_03 (Q&A Student)",
    text: "Does this temporal pruning compromise zero-shot retrieval accuracy across multi-lingual acoustic alignment tasks?",
    highlight: false
  },
  {
    timestamp: "00:19:45",
    seconds: 1185,
    speaker: "SPK_02 (Andrej Karpathy)",
    text: "We benchmarked this across 12 target languages: zero-shot retrieval retains 99.1% accuracy while reducing frame computation overhead dramatically.",
    highlight: false
  }
];

export const MOCK_CHAPTERS = [
  {
    time: "00:00",
    title: "Introduction & Motivation",
    description: "Historical overview of video transformers from ViViT to VideoMAE, highlighting current memory ceilings in edge deployment.",
    tags: ["#ContextDrift", "#VideoMAE"]
  },
  {
    time: "12:15",
    title: "Latent Token Complexity & 4K Ingestion",
    description: "Mathematical formulation of sparse spatial-temporal attention kernels and GPU VRAM saturation analysis.",
    tags: ["#AttentionScaling", "#VRAMOptimization"]
  },
  {
    time: "34:50",
    title: "Multi-Language Acoustic Alignment",
    description: "Cross-modal alignment between Japanese, Spanish and English speech diarization and video frame tokens.",
    tags: ["#VerbatimDiarization", "#MultimodalASR"]
  },
  {
    time: "01:10:00",
    title: "Live Q&A and Concluding Benchmarks",
    description: "Audience questions regarding real-time streaming inference latency and zero-shot benchmark scores.",
    tags: ["#Q&A", "#LatencyBench"]
  }
];

export const MOCK_FLASHCARDS = [
  {
    id: 1,
    question: "What causes GPU memory saturation during raw 4K streaming ingest?",
    answer: "Quadratic attention scaling O(T^2) when spatial dimensions exceed 2160p, consuming ~78GB of HBM within six forward passes."
  },
  {
    id: 2,
    question: "How much VRAM savings does temporal pruning achieve in long-form video training?",
    answer: "Temporal pruning saves 42% VRAM while retaining 99.1% zero-shot retrieval accuracy."
  },
  {
    id: 3,
    question: "What is the primary advantage of Native Tri-Lingual Acoustic Alignment?",
    answer: "It achieves real-time Spanish and Japanese acoustic-to-frame tokenization parity with zero post-hoc re-encoding."
  }
];

export const MOCK_QUIZ = [
  {
    id: 1,
    question: "Which formula represents the attention scaling bottleneck resolved by sparse flash-temporal kernels?",
    options: ["O(N^3) cubic time", "O(T log T) sub-linear latency", "O(1) constant complexity", "O(2^N) exponential complexity"],
    correctIndex: 1
  },
  {
    id: 2,
    question: "What zero-shot retrieval accuracy is retained after temporal pruning?",
    options: ["85.4%", "92.0%", "99.1%", "100%"],
    correctIndex: 2
  }
];

export const MOCK_TELEMETRY = {
  latencyMs: 12,
  tokensPerSec: 128.4,
  diarizationConf: "99.8%",
  gpuLoad: "14.2k T/S",
  consensus: "3/3 VALID OCR+ASR",
  modelName: "OMNI::NODE v2.4_PRO",
  activeSystem: "SYS:ONLINE 99.8%"
};
