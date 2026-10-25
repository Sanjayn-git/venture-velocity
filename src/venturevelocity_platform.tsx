import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, 
  BarChart3, 
  Rocket, 
  Trophy, 
  Compass, 
  Sliders, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Key, 
  ExternalLink, 
  ChevronRight, 
  ArrowUpRight, 
  TrendingUp, 
  Target, 
  Sparkles, 
  Check, 
  RefreshCw, 
  Lock, 
  Layers, 
  Users, 
  DollarSign, 
  Award,
  Filter,
  Search,
  BookOpen,
  Info,
  X
} from 'lucide-react';

// ==========================================
// PRE-LOADED DEMO DATASETS
// ==========================================
const INITIAL_STARTUPS = [
  {
    id: 'paypulse',
    name: 'PayPulse',
    tagline: 'Autonomous cross-border B2B settlement layer powered by AI routing.',
    category: 'Fintech',
    stage: 'Early Stage',
    isPublic: true,
    isVerified: false,
    potentialIndex: 88,
    progressIndex: 42,
    velocity: '+14% this month',
    metrics: {
      tam: '$45B global enterprise B2B payments',
      moat: 'Proprietary liquidity routing protocol',
      pricing: '0.15% transaction fee + SaaS tier',
      mrr: '$4,200',
      users: '18 pilot clients',
      retention: '94% pilot retention'
    },
    potentialBreakdown: { opportunity: 92, moat: 85, businessModel: 88, scalability: 87 },
    progressBreakdown: { customerValidation: 50, releaseVelocity: 65, tractionMetrics: 35, goalExecution: 40 },
    roadmap: [
      { id: 'r1', title: 'Execute 15 Compliance Interviews', category: 'Customer Validation', status: 'pending', impact: '+5 Progress Index', proofNeeded: 'Documented notes or transcript summaries' },
      { id: 'r2', title: 'Complete SOC2 Type 1 Readiness Audit', category: 'Security & Moat', status: 'in-progress', impact: '+8 Potential Index', proofNeeded: 'Audit readiness report' },
      { id: 'r3', title: 'Launch Self-Serve Sandbox for Developers', category: 'Release Velocity', status: 'completed', impact: '+6 Progress Index', proofNeeded: 'Public documentation URL' }
    ],
    milestones: [
      { date: 'Oct 2026', title: 'Crossed $4,000 MRR', verified: true, source: 'Stripe Connect' },
      { date: 'Sep 2026', title: 'Completed FinTech Accelerator Cohort', verified: true, source: 'Y Combinator' },
      { date: 'Aug 2026', title: 'Launched Closed Beta v0.8', verified: false, source: 'Self-reported' }
    ]
  },
  {
    id: 'medai',
    name: 'MedAI Assistant',
    tagline: 'HIPAA-compliant ambient clinical voice documentation & coding AI.',
    category: 'Healthtech',
    stage: 'MVP Launched',
    isPublic: true,
    isVerified: true,
    potentialIndex: 92,
    progressIndex: 85,
    velocity: '+22% this month',
    metrics: {
      tam: '$18B clinical documentation market',
      moat: 'Fine-tuned medical LLM + EHR native integrations',
      pricing: '$199/physician/month',
      mrr: '$28,500',
      users: '140 active doctors',
      retention: '98% monthly retention'
    },
    potentialBreakdown: { opportunity: 95, moat: 90, businessModel: 92, scalability: 91 },
    progressBreakdown: { customerValidation: 90, releaseVelocity: 88, tractionMetrics: 82, goalExecution: 80 },
    roadmap: [
      { id: 'm1', title: 'Integrate Epic Systems EHR App Market', category: 'Distribution', status: 'in-progress', impact: '+4 Potential Index', proofNeeded: 'App store listing confirmation' },
      { id: 'm2', title: 'Publish Clinical Time-Savings Study', category: 'Customer Validation', status: 'completed', impact: '+7 Progress Index', proofNeeded: 'Peer-reviewed whitepaper PDF' }
    ],
    milestones: [
      { date: 'Oct 2026', title: 'Passed HIPAA Third-Party Compliance Audit', verified: true, source: 'Vanta Security' },
      { date: 'Sep 2026', title: 'Signed 5-Hospital Regional Pilot', verified: true, source: 'LOI Document' },
      { date: 'Jul 2026', title: 'First $10k MRR Milestone', verified: true, source: 'Bank Statement Verification' }
    ]
  },
  {
    id: 'devsync',
    name: 'DevSync',
    tagline: 'Real-time collaborative micro-frontend state synchronization tool.',
    category: 'Dev Tools',
    stage: 'Pre-seed / Idea',
    isPublic: true,
    isVerified: false,
    potentialIndex: 76,
    progressIndex: 30,
    velocity: '+8% this month',
    metrics: {
      tam: '$6B frontend workflow tools',
      moat: 'Open-source core with enterprise cloud management',
      pricing: '$15/dev/month',
      mrr: '$800',
      users: '450 GitHub stars',
      retention: '60% weekly active repo use'
    },
    potentialBreakdown: { opportunity: 78, moat: 70, businessModel: 75, scalability: 81 },
    progressBreakdown: { customerValidation: 35, releaseVelocity: 40, tractionMetrics: 20, goalExecution: 25 },
    roadmap: [
      { id: 'd1', title: 'Publish 1.0 NPM Package Release', category: 'Product Milestone', status: 'in-progress', impact: '+8 Progress Index', proofNeeded: 'NPM registry URL' },
      { id: 'd2', title: 'Conduct 20 Frontend Lead Interviews', category: 'Customer Discovery', status: 'pending', impact: '+6 Potential Index', proofNeeded: 'Interview summary grid' }
    ],
    milestones: [
      { date: 'Oct 2026', title: 'Surpassed 400 GitHub Stars', verified: false, source: 'GitHub Repo' },
      { date: 'Aug 2026', title: 'Initial Prototype Demo Video on X', verified: false, source: 'Self-reported' }
    ]
  },
  {
    id: 'eduflow',
    name: 'EduFlow',
    tagline: 'Adaptive AI tutoring workflow for K-12 STEM educators and classrooms.',
    category: 'EdTech',
    stage: 'Seed / Traction',
    isPublic: false,
    isVerified: true,
    potentialIndex: 65,
    progressIndex: 60,
    velocity: '+5% this month',
    metrics: {
      tam: '$12B K-12 software spend',
      moat: 'State curriculum alignment database',
      pricing: '$1,200/school annual license',
      mrr: '$12,000',
      users: '14 school districts',
      retention: '88% renewal rate'
    },
    potentialBreakdown: { opportunity: 68, moat: 60, businessModel: 66, scalability: 66 },
    progressBreakdown: { customerValidation: 65, releaseVelocity: 55, tractionMetrics: 62, goalExecution: 58 },
    roadmap: [
      { id: 'e1', title: 'Secure State Dept of Education Certification', category: 'Regulatory Compliance', status: 'pending', impact: '+10 Potential Index', proofNeeded: 'State accreditation badge' }
    ],
    milestones: [
      { date: 'Sep 2026', title: 'Contracted 14th District License', verified: true, source: 'EdTech Verify' }
    ]
  }
];

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'leaderboard', 'roadmap', 'matrix', 'wizard'
  const [selectedStartupId, setSelectedStartupId] = useState('paypulse');
  const [startups, setStartups] = useState(() => {
    const saved = localStorage.getItem('vv_startups');
    return saved ? JSON.parse(saved) : INITIAL_STARTUPS;
  });

  // Settings & Global Controls
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('vv_gemini_key') || '');
  const [showApiModal, setShowApiModal] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiToastMessage, setAiToastMessage] = useState('');

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [sortBy, setSortBy] = useState('potentialIndex'); // 'potentialIndex', 'progressIndex', 'overall'
  const [viewMode, setViewMode] = useState('cards'); // 'cards', 'table'

  // Wizard Multi-step Form State
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    name: '',
    tagline: '',
    category: 'B2B SaaS',
    stage: 'MVP Launched',
    tam: '',
    moat: '',
    pricing: '',
    problemSeverity: 7,
    mrr: '',
    users: '',
    milestone1: '',
    milestone2: '',
    proofUrl: '',
    isPublic: true
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('vv_startups', JSON.stringify(startups));
  }, [startups]);

  useEffect(() => {
    localStorage.setItem('vv_gemini_key', apiKey);
  }, [apiKey]);

  // Current Active Startup Object
  const currentStartup = useMemo(() => {
    return startups.find(s => s.id === selectedStartupId) || startups[0];
  }, [startups, selectedStartupId]);

  // Toast auto-clear
  const showToast = (msg) => {
    setAiToastMessage(msg);
    setTimeout(() => setAiToastMessage(''), 4000);
  };

  // Toggle privacy mode for current startup
  const toggleCurrentPrivacy = () => {
    setStartups(prev => prev.map(s => {
      if (s.id === currentStartup.id) {
        const updated = !s.isPublic;
        showToast(`Profile set to ${updated ? 'Public' : 'Private'} Mode`);
        return { ...s, isPublic: updated };
      }
      return s;
    }));
  };

  // Handle Complete Roadmap Task
  const toggleRoadmapTask = (taskId) => {
    setStartups(prev => prev.map(s => {
      if (s.id === currentStartup.id) {
        const updatedRoadmap = s.roadmap.map(item => {
          if (item.id === taskId) {
            const nextStatus = item.status === 'completed' ? 'pending' : 'completed';
            return { ...item, status: nextStatus };
          }
          return item;
        });
        
        // Boost progress index slightly if completed
        const completedCount = updatedRoadmap.filter(r => r.status === 'completed').length;
        const newProgress = Math.min(99, Math.max(20, s.progressIndex + (completedCount > s.roadmap.filter(r=>r.status==='completed').length ? 4 : -4)));
        
        return { 
          ...s, 
          roadmap: updatedRoadmap,
          progressIndex: newProgress
        };
      }
      return s;
    }));
    showToast('Updated task status & recalculated progress index');
  };

  // Score Calculation Engine (Heuristic + Optional Gemini API)
  const calculateScores = async (formData) => {
    setIsGeneratingAi(true);

    let potentialScore = 65;
    let progressScore = 40;

    // Local smart scoring heuristics
    const severityBonus = (parseInt(formData.problemSeverity) || 5) * 3;
    const moatBonus = formData.moat.length > 30 ? 15 : 8;
    const tamBonus = formData.tam.toLowerCase().includes('b') || formData.tam.includes('billion') ? 15 : 7;
    potentialScore = Math.min(98, 35 + severityBonus + moatBonus + tamBonus);

    const hasMrr = formData.mrr && formData.mrr !== '$0';
    const hasUsers = formData.users && parseInt(formData.users) > 0;
    const milestoneBonus = (formData.milestone1 ? 12 : 0) + (formData.milestone2 ? 12 : 0);
    progressScore = Math.min(96, (hasMrr ? 25 : 5) + (hasUsers ? 20 : 5) + milestoneBonus);

    // Dynamic AI Integration if API Key Provided
    if (apiKey.trim()) {
      try {
        const prompt = `Act as an expert Silicon Valley VC analyst. Evaluate this startup idea:
Name: ${formData.name}
Tagline: ${formData.tagline}
Category: ${formData.category}
Stage: ${formData.stage}
Problem Severity (1-10): ${formData.problemSeverity}
Moat: ${formData.moat}
TAM: ${formData.tam}
MRR: ${formData.mrr}
Users: ${formData.users}

Return ONLY valid JSON matching this schema:
{
  "potentialIndex": number (1-100),
  "progressIndex": number (1-100),
  "potentialBreakdown": { "opportunity": number, "moat": number, "businessModel": number, "scalability": number },
  "progressBreakdown": { "customerValidation": number, "releaseVelocity": number, "tractionMetrics": number, "goalExecution": number },
  "recommendations": [
    { "title": string, "category": string, "impact": string, "proofNeeded": string }
  ]
}`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        const data = await res.json();
        const aiJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiJsonText) {
          const parsed = JSON.parse(aiJsonText);
          potentialScore = parsed.potentialIndex || potentialScore;
          progressScore = parsed.progressIndex || progressScore;
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local calculation engine.', err);
      }
    }

    setIsGeneratingAi(false);

    // Create New Startup Object
    const newId = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '-' + Date.now().toString().slice(-4);
    const newStartup = {
      id: newId,
      name: formData.name || 'Untitled Venture',
      tagline: formData.tagline || 'Innovative technological solution.',
      category: formData.category,
      stage: formData.stage,
      isPublic: formData.isPublic,
      isVerified: Boolean(formData.proofUrl),
      potentialIndex: potentialScore,
      progressIndex: progressScore,
      velocity: '+10% fresh evaluation',
      metrics: {
        tam: formData.tam || 'Market sized pending audit',
        moat: formData.moat || 'Proprietary IP focus',
        pricing: formData.pricing || 'Standard SaaS model',
        mrr: formData.mrr || '$0',
        users: formData.users || '0 users',
        retention: 'N/A early evaluation'
      },
      potentialBreakdown: {
        opportunity: Math.round(potentialScore * 1.02 > 98 ? 98 : potentialScore * 1.02),
        moat: Math.round(potentialScore * 0.95),
        businessModel: Math.round(potentialScore * 0.98),
        scalability: Math.round(potentialScore * 1.05 > 99 ? 99 : potentialScore * 1.05)
      },
      progressBreakdown: {
        customerValidation: Math.round(progressScore * 0.9),
        releaseVelocity: Math.round(progressScore * 1.05 > 99 ? 99 : progressScore * 1.05),
        tractionMetrics: Math.round(progressScore * 0.85),
        goalExecution: Math.round(progressScore * 1.1 > 98 ? 98 : progressScore * 1.1)
      },
      roadmap: [
        { id: `r-${Date.now()}-1`, title: 'Verify first 10 user interviews', category: 'Validation', status: 'pending', impact: '+5 Progress Index', proofNeeded: 'Interview transcripts or audio links' },
        { id: `r-${Date.now()}-2`, title: 'Define clear target customer persona', category: 'Positioning', status: 'pending', impact: '+4 Potential Index', proofNeeded: 'Documented ICP deck' },
        { id: `r-${Date.now()}-3`, title: 'Ship public MVP or landing page', category: 'Release Velocity', status: 'in-progress', impact: '+8 Progress Index', proofNeeded: 'Live URL link' }
      ],
      milestones: [
        ...(formData.milestone1 ? [{ date: 'Recent', title: formData.milestone1, verified: Boolean(formData.proofUrl), source: formData.proofUrl || 'Self-reported' }] : []),
        ...(formData.milestone2 ? [{ date: 'Recent', title: formData.milestone2, verified: false, source: 'Self-reported' }] : []),
        { date: 'Initial', title: 'Submitted to VentureVelocity OS', verified: true, source: 'Platform System Audit' }
      ]
    };

    setStartups(prev => [newStartup, ...prev]);
    setSelectedStartupId(newId);
    setActiveTab('dashboard');
    showToast(`Evaluation Complete! ${newStartup.name} scored ${potentialScore} Potential / ${progressScore} Progress`);
  };

  // Filtered Leaderboard Startups
  const filteredStartups = useMemo(() => {
    return startups
      .filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              s.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
        const matchesStage = stageFilter === 'All' || s.stage.toLowerCase().includes(stageFilter.toLowerCase());
        return matchesSearch && matchesCategory && matchesStage;
      })
      .sort((a, b) => {
        if (sortBy === 'potentialIndex') return b.potentialIndex - a.potentialIndex;
        if (sortBy === 'progressIndex') return b.progressIndex - a.progressIndex;
        if (sortBy === 'overall') return (b.potentialIndex + b.progressIndex) - (a.potentialIndex + a.progressIndex);
        return 0;
      });
  }, [startups, searchQuery, categoryFilter, stageFilter, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* GLOBAL TOP BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="h-5 w-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  VentureVelocity
                </span>
                <span className="text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded">
                  OS v2.4
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Global Index: 99.4% Operational</span>
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs sm:text-sm overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Rocket className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>AI Roadmap</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>Competitor Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab('wizard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'wizard'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Evaluate Venture</span>
            </button>
          </nav>

          {/* Actions & Settings */}
          <div className="flex items-center gap-2.5">
            {/* Privacy Quick Toggle */}
            <button
              onClick={toggleCurrentPrivacy}
              title="Toggle Public/Private state for active startup"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                currentStartup.isPublic 
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
              }`}
            >
              {currentStartup.isPublic ? <Eye className="h-3.5 w-3.5 text-indigo-400" /> : <EyeOff className="h-3.5 w-3.5 text-amber-400" />}
              <span>{currentStartup.isPublic ? 'Public Mode' : 'Private Mode'}</span>
            </button>

            {/* API Settings */}
            <button
              onClick={() => setShowApiModal(true)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
              title="Configure Gemini API Key"
            >
              <Key className="h-4 w-4" />
            </button>
          </div>

        </div>
      </header>

      {/* TOAST ALERT SYSTEM */}
      {aiToastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-indigo-500/40 text-indigo-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <span className="text-sm font-medium">{aiToastMessage}</span>
        </div>
      )}

      {/* GEMINI API MODAL */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl">
            <button 
              onClick={() => setShowApiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                <Key className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Gemini AI Configuration</h3>
                <p className="text-xs text-slate-400">Optional: Connect Google Gemini 1.5 API key for high-precision VC scoring</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-500">
                If left blank, VentureVelocity uses its built-in heuristic evaluation engine automatically.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowApiModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT CONTAINERS BASED ON TAB */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">

        {/* ======================================================== */}
        {/* TAB 1: MY STARTUP DASHBOARD */}
        {/* ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* Startup Selector Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Venture:</span>
                <select
                  value={selectedStartupId}
                  onChange={(e) => setSelectedStartupId(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-white text-sm font-semibold rounded-xl px-3.5 py-2 focus:outline-none focus:border-indigo-500"
                >
                  {startups.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category} • {s.stage})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400">Stage: <strong className="text-slate-200">{currentStartup.stage}</strong></span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Category: <strong className="text-slate-200">{currentStartup.category}</strong></span>
                {currentStartup.isVerified && (
                  <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified Progress
                  </span>
                )}
              </div>
            </div>

            {/* Hero Header Card */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 lg:p-8">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">{currentStartup.name}</h1>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      currentStartup.isPublic 
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {currentStartup.isPublic ? 'Public Listing' : 'Private Sandbox'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed">{currentStartup.tagline}</p>
                  
                  {/* Quick Metric Chips */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                    <div className="bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-slate-400">MRR:</span>
                      <strong className="text-slate-100">{currentStartup.metrics.mrr}</strong>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-indigo-400" />
                      <span className="text-slate-400">Traction:</span>
                      <strong className="text-slate-100">{currentStartup.metrics.users}</strong>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-violet-400" />
                      <span className="text-slate-400">Velocity:</span>
                      <strong className="text-emerald-400">{currentStartup.velocity}</strong>
                    </div>
                  </div>
                </div>

                {/* Overall Velocity Score Pill */}
                <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl flex items-center gap-5 shrink-0 shadow-xl">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Venture Score</div>
                    <div className="text-3xl font-black text-white">
                      {Math.round((currentStartup.potentialIndex + currentStartup.progressIndex) / 2)}
                      <span className="text-xs font-medium text-slate-500"> /100</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Top 12% in {currentStartup.category}</div>
                  </div>
                  <div className="h-12 w-px bg-slate-800"></div>
                  <button
                    onClick={() => setActiveTab('wizard')}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Re-Evaluate
                  </button>
                </div>
              </div>
            </div>

            {/* DUAL INDEX METERS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* INDEX A: POTENTIAL INDEX */}
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Index A: Potential Index</h3>
                      <p className="text-xs text-slate-400">Evaluates business opportunity & strategic moat</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-indigo-400">{currentStartup.potentialIndex}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Out of 100</div>
                  </div>
                </div>

                {/* Visual Meter Bar */}
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000"
                      style={{ width: `${currentStartup.potentialIndex}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Low Viability</span>
                    <span className="font-semibold text-indigo-300">Strong VC Potential</span>
                  </div>
                </div>

                {/* Sub-breakdown Bars */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Opportunity</span>
                      <span className="text-white font-bold">{currentStartup.potentialBreakdown.opportunity}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${currentStartup.potentialBreakdown.opportunity}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Defensibility Moat</span>
                      <span className="text-white font-bold">{currentStartup.potentialBreakdown.moat}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${currentStartup.potentialBreakdown.moat}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Business Model</span>
                      <span className="text-white font-bold">{currentStartup.potentialBreakdown.businessModel}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${currentStartup.potentialBreakdown.businessModel}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Scalability</span>
                      <span className="text-white font-bold">{currentStartup.potentialBreakdown.scalability}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${currentStartup.potentialBreakdown.scalability}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* INDEX B: PROGRESS INDEX */}
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Index B: Progress Index</h3>
                      <p className="text-xs text-slate-400">Evaluates milestone velocity & execution proof</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-emerald-400">{currentStartup.progressIndex}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Out of 100</div>
                  </div>
                </div>

                {/* Visual Meter Bar */}
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                      style={{ width: `${currentStartup.progressIndex}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Unvalidated Idea</span>
                    <span className="font-semibold text-emerald-300">High Execution Velocity</span>
                  </div>
                </div>

                {/* Sub-breakdown Bars */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Customer Discovery</span>
                      <span className="text-white font-bold">{currentStartup.progressBreakdown.customerValidation}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${currentStartup.progressBreakdown.customerValidation}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Release Velocity</span>
                      <span className="text-white font-bold">{currentStartup.progressBreakdown.releaseVelocity}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${currentStartup.progressBreakdown.releaseVelocity}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Traction Metrics</span>
                      <span className="text-white font-bold">{currentStartup.progressBreakdown.tractionMetrics}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${currentStartup.progressBreakdown.tractionMetrics}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Goal Completion</span>
                      <span className="text-white font-bold">{currentStartup.progressBreakdown.goalExecution}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${currentStartup.progressBreakdown.goalExecution}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SECTOR PERCENTILE BENCHMARKS & TIMELINE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Sector Peer Comparison */}
              <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-indigo-400" /> 
                      Anonymized Sector Benchmarks ({currentStartup.category})
                    </h3>
                    <p className="text-xs text-slate-400">Where you stand against peer cohort startups at the {currentStartup.stage} stage</p>
                  </div>
                  <span className="text-[11px] font-medium bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">
                    N=142 Cohort Sample
                  </span>
                </div>

                {/* Benchmark Comparison Bars */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">Potential Index Percentile</span>
                      <span className="text-indigo-400 font-bold">78th Percentile</span>
                    </div>
                    <div className="relative h-6 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center px-2">
                      {/* 25th, 50th, 90th percentile indicators */}
                      <div className="absolute left-[25%] top-0 bottom-0 w-px bg-slate-800" title="25th Percentile"></div>
                      <div className="absolute left-[50%] top-0 bottom-0 w-px bg-slate-700 stroke-dash" title="50th Percentile (Median)"></div>
                      <div className="absolute left-[90%] top-0 bottom-0 w-px bg-slate-800" title="90th Percentile"></div>
                      
                      <div 
                        className="h-3 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-md transition-all duration-700" 
                        style={{ width: `${currentStartup.potentialIndex}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">Progress & Execution Velocity</span>
                      <span className="text-emerald-400 font-bold">62nd Percentile</span>
                    </div>
                    <div className="relative h-6 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center px-2">
                      <div className="absolute left-[25%] top-0 bottom-0 w-px bg-slate-800"></div>
                      <div className="absolute left-[50%] top-0 bottom-0 w-px bg-slate-700"></div>
                      <div className="absolute left-[90%] top-0 bottom-0 w-px bg-slate-800"></div>

                      <div 
                        className="h-3 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-md transition-all duration-700" 
                        style={{ width: `${currentStartup.progressIndex}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                  <span>| 25th Pct (Lagging)</span>
                  <span>| 50th Pct (Category Median)</span>
                  <span>| 90th Pct (Outlier Growth)</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-400" /> Verified Milestones
                  </h3>
                  <button 
                    onClick={() => setActiveTab('wizard')}
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    + Log New
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  {currentStartup.milestones.map((m, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg mt-0.5 ${m.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200">{m.title}</span>
                          <span className="text-[10px] text-slate-500">{m.date}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between">
                          <span>Source: {m.source}</span>
                          {m.verified ? (
                            <span className="text-emerald-400 text-[10px] font-semibold">Verified</span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">Unverified</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: STARTUP LEADERBOARD & BENCHMARKS */}
        {/* ======================================================== */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-amber-400" /> Startup Index Leaderboard
                </h2>
                <p className="text-xs text-slate-400">Discover top performing ventures sorted by Potential, Progress, or Velocity</p>
              </div>

              {/* View Toggle & Count */}
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center text-xs">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition ${viewMode === 'cards' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    Cards
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search venture name or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Categories</option>
                <option value="Fintech">Fintech</option>
                <option value="Healthtech">Healthtech</option>
                <option value="Dev Tools">Dev Tools</option>
                <option value="B2B SaaS">B2B SaaS</option>
                <option value="EdTech">EdTech</option>
              </select>

              {/* Stage */}
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Stages</option>
                <option value="Idea">Idea / Pre-seed</option>
                <option value="MVP">MVP Launched</option>
                <option value="Early">Early Stage</option>
                <option value="Seed">Seed / Traction</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-indigo-300 font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="potentialIndex">Sort by: Potential Index</option>
                <option value="progressIndex">Sort by: Progress Index</option>
                <option value="overall">Sort by: Combined Velocity</option>
              </select>
            </div>

            {/* LEADERBOARD LISTING */}
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStartups.map((s, idx) => (
                  <div key={s.id} className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-500">#{idx + 1}</span>
                          <h3 className="font-bold text-white text-base">{s.name}</h3>
                          {s.isVerified && (
                            <ShieldCheck className="h-4 w-4 text-emerald-400" title="Verified Evidence" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{s.tagline}</p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedStartupId(s.id);
                          setActiveTab('dashboard');
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                        title="View Dashboard"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Potential Index</div>
                        <div className="text-xl font-black text-indigo-400 mt-0.5">{s.potentialIndex}</div>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Progress Index</div>
                        <div className="text-xl font-black text-emerald-400 mt-0.5">{s.progressIndex}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                      <span>{s.category} • {s.stage}</span>
                      <span className="text-emerald-400 font-semibold">{s.velocity}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Rank</th>
                      <th className="p-4">Startup</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Stage</th>
                      <th className="p-4 text-center">Potential</th>
                      <th className="p-4 text-center">Progress</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredStartups.map((s, idx) => (
                      <tr key={s.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-bold text-slate-500">#{idx + 1}</td>
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          {s.name}
                          {s.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />}
                        </td>
                        <td className="p-4">{s.category}</td>
                        <td className="p-4">{s.stage}</td>
                        <td className="p-4 text-center font-bold text-indigo-400">{s.potentialIndex}</td>
                        <td className="p-4 text-center font-bold text-emerald-400">{s.progressIndex}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedStartupId(s.id);
                              setActiveTab('dashboard');
                            }}
                            className="px-3 py-1 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: AI GROWTH ROADMAP ENGINE */}
        {/* ======================================================== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 p-6 rounded-3xl space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" /> Customized AI Recommendations
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                7-Day Growth & Index Boost Roadmap for {currentStartup.name}
              </h2>
              <p className="text-xs text-slate-400">
                Completing prioritized validation tasks directly upgrades your startup's Potential and Progress evaluation scores.
              </p>
            </div>

            {/* Task Checklist */}
            <div className="space-y-4">
              {currentStartup.roadmap.map((task) => {
                const isDone = task.status === 'completed';
                return (
                  <div 
                    key={task.id} 
                    className={`border rounded-2xl p-5 transition-all ${
                      isDone 
                        ? 'bg-slate-950/50 border-emerald-500/30 opacity-80' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleRoadmapTask(task.id)}
                        className={`mt-0.5 p-1 rounded-lg border transition ${
                          isDone 
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                            : 'border-slate-700 hover:border-indigo-500 text-transparent'
                        }`}
                      >
                        <Check className="h-4 w-4 stroke-[3]" />
                      </button>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {task.title}
                          </h4>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                            {task.impact}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-indigo-300 font-medium">
                            Category: {task.category}
                          </span>
                          <span>Proof Required: <strong className="text-slate-300">{task.proofNeeded}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Custom Task Option */}
            <div className="p-4 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl text-center">
              <p className="text-xs text-slate-400">Need specific custom benchmarks? Run a fresh evaluation wizard.</p>
              <button
                onClick={() => setActiveTab('wizard')}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:underline"
              >
                + Update Progress & Add Objectives
              </button>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: COMPETITOR MATRIX */}
        {/* ======================================================== */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Sliders className="h-6 w-6 text-indigo-400" /> Stage-Matched Competitor Matrix
              </h2>
              <p className="text-xs text-slate-400">Anonymized side-by-side positioning comparison across peers</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 min-w-[650px]">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Venture Name</th>
                    <th className="p-4">Defensibility Moat</th>
                    <th className="p-4">Monetization Model</th>
                    <th className="p-4">TAM Claim</th>
                    <th className="p-4 text-center">Potential</th>
                    <th className="p-4 text-center">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {startups.map((s) => (
                    <tr key={s.id} className={s.id === selectedStartupId ? 'bg-indigo-500/10' : 'hover:bg-slate-800/30'}>
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        {s.name}
                        {s.id === selectedStartupId && (
                          <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded font-semibold">Active</span>
                        )}
                      </td>
                      <td className="p-4 text-slate-300 max-w-xs truncate">{s.metrics.moat}</td>
                      <td className="p-4">{s.metrics.pricing}</td>
                      <td className="p-4 font-medium text-slate-400">{s.metrics.tam}</td>
                      <td className="p-4 text-center font-bold text-indigo-400">{s.potentialIndex}</td>
                      <td className="p-4 text-center font-bold text-emerald-400">{s.progressIndex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: EVALUATION & UPDATE WIZARD */}
        {/* ======================================================== */}
        {activeTab === 'wizard' && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Wizard Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">Evaluate New Venture / Update Progress</h2>
              <p className="text-xs text-slate-400">Complete the 3-step evaluation to generate your Dual Index Scores</p>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center justify-between max-w-xs mx-auto">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${wizardStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>1</div>
              <div className={`h-1 flex-1 ${wizardStep >= 2 ? 'bg-indigo-600' : 'bg-slate-800'}`}></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${wizardStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>2</div>
              <div className={`h-1 flex-1 ${wizardStep >= 3 ? 'bg-indigo-600' : 'bg-slate-800'}`}></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${wizardStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>3</div>
            </div>

            {/* Form Container */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl">
              
              {/* STEP 1: CORE PROFILE */}
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Step 1: Core Venture Profile</h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Startup Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. CloudScale AI"
                      value={wizardData.name}
                      onChange={(e) => setWizardData({...wizardData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Tagline / One-Liner *</label>
                    <input
                      type="text"
                      placeholder="What problem do you solve?"
                      value={wizardData.tagline}
                      onChange={(e) => setWizardData({...wizardData, tagline: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Category</label>
                      <select
                        value={wizardData.category}
                        onChange={(e) => setWizardData({...wizardData, category: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="B2B SaaS">B2B SaaS</option>
                        <option value="Fintech">Fintech</option>
                        <option value="Healthtech">Healthtech</option>
                        <option value="Dev Tools">Dev Tools</option>
                        <option value="EdTech">EdTech</option>
                        <option value="Consumer AI">Consumer AI</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Current Stage</label>
                      <select
                        value={wizardData.stage}
                        onChange={(e) => setWizardData({...wizardData, stage: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Pre-seed / Idea">Pre-seed / Idea</option>
                        <option value="MVP Launched">MVP Launched</option>
                        <option value="Early Stage">Early Stage</option>
                        <option value="Seed / Traction">Seed / Traction</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      disabled={!wizardData.name}
                      onClick={() => setWizardStep(2)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition"
                    >
                      Next: Business Model →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: BUSINESS & MARKET */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Step 2: Business & Market Moat</h3>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Problem Severity Score (1 = Minor, 10 = Critical)</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={wizardData.problemSeverity}
                      onChange={(e) => setWizardData({...wizardData, problemSeverity: e.target.value})}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                      <span>Low Pain</span>
                      <span className="text-indigo-400">Score: {wizardData.problemSeverity}/10</span>
                      <span>Hair-on-Fire Pain</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Defensibility / Moat</label>
                    <input
                      type="text"
                      placeholder="e.g. Proprietary dataset, network effect, specialized IP"
                      value={wizardData.moat}
                      onChange={(e) => setWizardData({...wizardData, moat: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Target TAM</label>
                      <input
                        type="text"
                        placeholder="e.g. $10B Global"
                        value={wizardData.tam}
                        onChange={(e) => setWizardData({...wizardData, tam: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Pricing Strategy</label>
                      <input
                        type="text"
                        placeholder="e.g. $49/mo subscription"
                        value={wizardData.pricing}
                        onChange={(e) => setWizardData({...wizardData, pricing: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setWizardStep(3)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
                    >
                      Next: Traction & Evidence →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TRACTION & EVIDENCE */}
              {wizardStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Step 3: Traction & Verification Proof</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Current MRR / Revenue</label>
                      <input
                        type="text"
                        placeholder="e.g. $2,500"
                        value={wizardData.mrr}
                        onChange={(e) => setWizardData({...wizardData, mrr: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Active Users / Pilots</label>
                      <input
                        type="text"
                        placeholder="e.g. 50 beta users"
                        value={wizardData.users}
                        onChange={(e) => setWizardData({...wizardData, users: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Key Milestone 1 Achieved</label>
                    <input
                      type="text"
                      placeholder="e.g. Conducted 40 customer validation interviews"
                      value={wizardData.milestone1}
                      onChange={(e) => setWizardData({...wizardData, milestone1: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Verification URL (Optional for Verified Badge)</label>
                    <input
                      type="url"
                      placeholder="Product Hunt, Stripe screenshot, GitHub link"
                      value={wizardData.proofUrl}
                      onChange={(e) => setWizardData({...wizardData, proofUrl: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <button
                      onClick={() => setWizardStep(2)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                    >
                      ← Back
                    </button>
                    
                    <button
                      disabled={isGeneratingAi}
                      onClick={() => calculateScores(wizardData)}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition"
                    >
                      {isGeneratingAi ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Calculating Dual Index...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Generate Venture Evaluation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 VentureVelocity (LaunchGauge OS) • Continuous Benchmarking Engine for High-Growth Startups</p>
      </footer>
    </div>
  );
}
