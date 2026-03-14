import { useState, useRef, useEffect } from 'react';
import { Search, Image as ImageIcon, Video, MessageSquare, Send, Bot, User, Sparkles, Loader2, BookOpen, ExternalLink, HelpCircle, FileText, Youtube, Lock, CheckCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface VideoLink {
  title: string;
  url: string;
  thumbnail: string;
}

interface Question {
  id: number;
  text: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: string;
  videos?: VideoLink[];
  questions?: Question[];
}

export default function TutorWidget() {
  const [query, setQuery] = useState('');
  const [searchedTopic, setSearchedTopic] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  // States for TEXT Mode (Chat)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);
  }, []);

  const handleConfirmPayment = () => {
    localStorage.setItem('isSubscribed', 'true');
    setIsSubscribed(true);
    setShowPaymentModal(false);
    toast.success('Premium features unlocked!');
    
    // Add a success message to chat with a link to the bill
    const billMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: "Thank you for your payment! 🎊 Your premium content is now unlocked. You can view your receipt here: [View My Bill](/bill)"
    };
    setChatHistory(prev => [...prev, billMsg]);
  };

  const API_URL = 'http://localhost:8001/chat';

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const generateVideos = (topic: string): VideoLink[] => {
    const encodedTopic = encodeURIComponent(topic);
    return [
      {
        title: `${topic} Explained in 5 Minutes`,
        url: `https://www.youtube.com/results?search_query=${encodedTopic}+explained+simply`,
        thumbnail: `https://img.youtube.com/vi/placeholder1/0.jpg`
      },
      {
        title: `Mastering ${topic} - Comprehensive Guide`,
        url: `https://www.youtube.com/results?search_query=${encodedTopic}+tutorial`,
        thumbnail: `https://img.youtube.com/vi/placeholder2/0.jpg`
      },
      {
        title: `${topic} Experiments and Visuals`,
        url: `https://www.youtube.com/results?search_query=${encodedTopic}+animation`,
        thumbnail: `https://img.youtube.com/vi/placeholder3/0.jpg`
      },
      {
        title: `Advanced ${topic} for Competitive Exams`,
        url: `https://www.youtube.com/results?search_query=${encodedTopic}+jee+neet`,
        thumbnail: `https://img.youtube.com/vi/placeholder4/0.jpg`
      },
      {
        title: `${topic} - Real-world Applications`,
        url: `https://www.youtube.com/results?search_query=${encodedTopic}+applications`,
        thumbnail: `https://img.youtube.com/vi/placeholder5/0.jpg`
      },
      {
        title: `Historical Discovery of ${topic}`,
        url: `https://www.youtube.com/results?search_query=${encodedTopic}+history`,
        thumbnail: `https://img.youtube.com/vi/placeholder6/0.jpg`
      },
      {
        title: `${topic} Problem Solving Session`,
        url: `https://www.youtube.com/results?search_query=${encodedTopic}+problems`,
        thumbnail: `https://img.youtube.com/vi/placeholder7/0.jpg`
      },
      {
        title: `Visualizing ${topic} in 3D`,
        url: `https://www.youtube.com/results?search_query=${encodedTopic}+3d+animation`,
        thumbnail: `https://img.youtube.com/vi/placeholder8/0.jpg`
      }
    ];
  };

  const generateQuestions = (topic: string): Question[] => {
    const templates = [
      `What is the fundamental principle behind ${topic}?`,
      `How does ${topic} affect its surrounding environment?`,
      `Explain the role of variables in ${topic}.`,
      `What are the most common misconceptions about ${topic}?`,
      `How can ${topic} be applied in real-world scenarios?`,
      `Compare ${topic} with other similar concepts in this field.`,
      `Describe the historical development of ${topic}.`,
      `What are the key mathematical formulas associated with ${topic}?`,
      `How do environmental factors influence the efficiency of ${topic}?`,
      `List three major applications of ${topic} in modern industry.`,
      `What happens if the core components of ${topic} are altered?`,
      `Analyze the relationship between ${topic} and energy conservation.`,
      `Why is ${topic} considered a foundational topic in this subject?`,
      `Provide a step-by-step breakdown of the process of ${topic}.`,
      `What are the limitations of current theories regarding ${topic}?`,
      `How does ${topic} integrate with other PCMB subjects?`,
      `Identify the primary experimental methods used to study ${topic}.`,
      `What are the safety considerations or ethical implications of ${topic}?`,
      `Explain ${topic} in the context of microscopic versus macroscopic scales.`,
      `What future advancements are expected in the field of ${topic}?`
    ];
    return templates.map((text, i) => ({ id: i + 1, text }));
  };

  const generateExplanation = (topic: string) => {
    const lowerTopic = topic.toLowerCase();
    
    const specificResponses: Record<string, string> = {
      "photosynthesis": `Hello! I'm your Lumina AI Tutor. Let's dive deep into **Photosynthesis**.

### 🌿 Chemical Process
Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. In plants, photosynthesis generally involves the green pigment chlorophyll and generates oxygen as a byproduct.

**Chemical Equation:**
$$6CO_2 + 6H_2O + \text{light energy} \rightarrow C_6H_{12}O_6 + 6O_2$$

### 🔬 Key Stages
1. **Light-Dependent Reactions**: Occur in the thylakoid membranes of chloroplasts. They capture energy from sunlight to produce ATP and NADPH.
2. **Calvin Cycle (Light-Independent)**: Occurs in the stroma. It uses the ATP and NADPH from the light-dependent reactions to fix carbon from $CO_2$ into glucose.

### 🍎 Real-World Importance
Without photosynthesis, there would be no oxygen in our atmosphere and no food for most life on Earth. It is the primary producer of energy in almost all ecosystems.

### 💡 Exam Tip
Remember that chlorophyll absorbs blue and red light most efficiently, but reflects green light, which is why leaves appear green!`,

      "thermodynamics": `Hello! I'm your Lumina AI Tutor. Let's explore the laws of **Thermodynamics**.

### 🔥 The Four Laws
Thermodynamics is the study of heat, work, and energy. It is governed by four fundamental laws:
1. **Zeroth Law**: If two systems are in thermal equilibrium with a third system, they are in equilibrium with each other.
2. **First Law (Conservation of Energy)**: Energy cannot be created or destroyed, only transformed. $\Delta U = Q - W$.
3. **Second Law (Entropy)**: The total entropy of an isolated system can never decrease over time.
4. **Third Law**: As temperature approaches absolute zero, the entropy of a system approaches a constant minimum.

### ⚙️ Heat Engines
The Kelvin-Planck and Clausius statements are crucial here. No engine can be 100% efficient due to the second law!

### 🎯 JEE/NEET Focus
Pay close attention to **Carnot Cycle** and **Isothermal vs Adiabatic** processes. These are high-frequency topics in competitive exams.`,

      "newton's laws": `Hello! Let's master **Newton's Laws of Motion**.

### 🍎 The Three Laws
1. **Inertia**: An object remains at rest or in uniform motion unless acted upon by a net force.
2. **F = ma**: The acceleration of an object is directly proportional to the net force and inversely proportional to its mass.
3. **Action-Reaction**: For every action, there is an equal and opposite reaction.

### 📐 Applications
- **Friction**: $f = \mu N$. Remember that static friction is usually greater than kinetic friction.
- **Tension**: Crucial for pulley and string problems.

### 📝 Solving Strategy
Always draw a **Free Body Diagram (FBD)** before writing equations. This prevents sign errors in $F = ma$.`,

      "cell": `Hello! Let's study the **Cell: The Unit of Life**.

### 🧬 Structure & Function
Cells are the fundamental building blocks of all living organisms. 
- **Prokaryotic**: No nucleus (e.g., Bacteria).
- **Eukaryotic**: Has a membrane-bound nucleus (e.g., Plant/Animal cells).

### 🏭 Organelles
1. **Nucleus**: The control center containing DNA.
2. **Mitochondria**: The "Powerhouse" where ATP is produced.
3. **Ribosomes**: Protein synthesis factories.
4. **Chloroplasts**: Site of photosynthesis (Plant cells only).

### 🔬 Micro-Tip
Remember the difference between **Mitosis** (body cells) and **Meiosis** (germ cells). Mitosis results in diploid cells, Meiosis in haploid!`,

      "atomic structure": `Hello! Let's dive into the **Structure of the Atom**.

### ⚛️ Historical Models
1. **Thomson**: Plum pudding model (discovery of electron).
2. **Rutherford**: Alpha scattering experiment (discovery of nucleus).
3. **Bohr**: Quantized energy levels/orbits.
4. **Quantum Mechanical Model**: Orbitals and probability clouds.

### 📊 Subatomic Particles
- **Protons**: Positive charge, in nucleus.
- **Neutrons**: No charge, in nucleus.
- **Electrons**: Negative charge, in shells.

### 🧪 Pro-Tip
Understand **Electronic Configuration** (spdf notation) and the **Heisenberg Uncertainty Principle**. They are vital for advanced Chemistry.`
    };

    // Return specific response if found, else a much better general template
    if (specificResponses[lowerTopic]) {
      return specificResponses[lowerTopic];
    }

    return `Hello! I'm your Lumina AI Tutor. Let's explore **${topic}**.

### 🧩 Core Concept
**${topic}** is a fundamental topic in science that describes how specific components interact within a system. To master this, you need to understand the relationship between the inputs and the resulting observed phenomena.

### 📈 Key Principles
1. **Definition**: Clearly defining **${topic}** is the first step. It is the study/observation of specific interactions.
2. **Variables**: Factors like temperature, concentration, or force often influence the rate of **${topic}**.
3. **Mathematical Representation**: Most advanced theories of **${topic}** can be expressed through quantitative equations (like those found in your JEE/NEET prep books).

### 🌍 Real-World Connection
We see **${topic}** in action every day, from the technology we use to the natural processes in the environment. Applying these theoretical concepts to real situations helps solidify your understanding.

### 🎓 Expert Study Tip
Try to derive the formulas related to **${topic}** from first principles. This ensures you never forget them during a high-pressure exam!

What specific part of **${topic}** should we dive into deeper?`;
  };

  const startChat = async (topic: string) => {
    const userPrompt = `Help me understand: ${topic}`;

    const initialMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userPrompt,
    };

    setChatHistory([initialMessage]);
    setIsTyping(true);

    // Simulated "AI" search with structured response
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateExplanation(topic),
        videos: generateVideos(topic),
        questions: generateQuestions(topic)
      };
      setChatHistory([initialMessage, responseMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearchedTopic(query.trim());
    setHasSearched(true);
    startChat(query.trim());
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !searchedTopic) return;

    const userMessageText = chatInput.trim();
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageText,
    };

    setChatHistory((prev) => [...prev, newUserMsg]);
    setChatInput('');
    setIsTyping(true);

    // Follow-up simulation
    setTimeout(() => {
      const newBotMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `That's a great follow-up question about **${searchedTopic}**! 

Based on our previous discussion, it's important to remember that ${userMessageText.toLowerCase().includes('how') ? 'the process is dynamic and adapts to changes' : 'this detail adds another layer of complexity to our understanding'}. 

Is there a specific part of this you'd like me to explain further?`,
      };
      setChatHistory((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-primary/20 rounded-[2rem] glow-pink overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text text-center">Unlock Premium Content</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Scan to pay ₹159 and get access to all video lessons and premium study materials.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4 space-y-6">
            <div className="bg-white p-4 rounded-2xl w-64 h-64 shadow-xl border-2 border-[#5f259f]/20">
              <img 
                src="/payment-qr.png" 
                alt="PhonePe Payment QR" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PAYMENT_AWAITING_UPLOAD";
                }}
              />
            </div>
            <div className="w-full p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">Amount to Pay</p>
              <p className="text-2xl font-bold text-primary">₹159.00</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center border-t border-primary/10 pt-4">
            <Button
              onClick={handleConfirmPayment}
              className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all glow-pink rounded-xl py-6 font-bold"
            >
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 1. SEARCH BAR SECTION */}
      <div className="text-center space-y-6">
        {!hasSearched && (
          <div className="mb-8">
            <h2 className="text-4xl font-bold gradient-text mb-2 animate-pulse">What would you like to learn today?</h2>
            <p className="text-muted-foreground text-lg">Your AI-powered tutor for PCMB mastery.</p>
          </div>
        )}

        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group">
          <div
            className="flex gap-2 items-center bg-card/40 backdrop-blur-xl rounded-full p-2 transition-all duration-500 border-2"
            style={{
              borderColor: hasSearched ? 'rgba(255,27,141,0.3)' : 'rgba(255,27,141,0.6)',
              boxShadow: hasSearched
                ? '0 0 20px rgba(255,27,141,0.1)'
                : '0 0 30px 5px rgba(255,27,141,0.3), 0 0 60px 10px rgba(255,27,141,0.1)',
            }}
          >
            <Search className="w-6 h-6 text-primary ml-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <Input
              type="text"
              placeholder="e.g. Projectile Motion, Photosynthesis, Thermodynamics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-lg h-12 placeholder:text-muted-foreground/50"
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-full px-10 font-bold text-white shadow-[0_0_20px_rgba(255,27,141,0.4)] hover:scale-105 active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, #ff1b8d, #c040fb)' }}
            >
              Learn Now
            </Button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
          <div className="max-w-5xl mx-auto bg-card/60 backdrop-blur-lg border border-primary/20 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[750px] glow-pink">
            
            {/* Header */}
            <div className="bg-primary/10 border-b border-primary/20 p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary animate-ping rounded-full opacity-20" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-extrabold text-xl tracking-tight">Lumina AI Tutor</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Mastering: {searchedTopic}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">PCMB Specialization</div>
              </div>
            </div>

            {/* Chat Body */}
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth"
            >
              {chatHistory.map((msg) => (
                <div key={msg.id} className={`flex flex-col gap-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md ${msg.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                      {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex flex-col gap-3 w-full">
                      {/* Message Content */}
                      <div className={`p-5 rounded-[2rem] shadow-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-sm' 
                          : 'bg-muted/30 border border-primary/10 rounded-tl-sm text-foreground'
                      }`}>
                        {msg.content}
                      </div>

                      {/* Enhanced Sections (Assistant Only) */}
                      {msg.role === 'assistant' && (msg.videos || msg.questions) && (
                        <div className="space-y-6 mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                          
                              <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                  <div className="flex items-center gap-2">
                                    <Youtube className="w-5 h-5 text-red-500" />
                                    <h4 className="font-bold text-lg">Curated Video Lessons</h4>
                                  </div>
                                  {!isSubscribed && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                                      <Lock className="w-3 h-3" />
                                      Limited
                                    </span>
                                  )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {(isSubscribed ? msg.videos : msg.videos.slice(0, 4)).map((vid, idx) => (
                                    <a 
                                      key={idx} 
                                      href={vid.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="group flex flex-col bg-background/50 border border-primary/10 p-3 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary/60 uppercase tracking-tighter">Lesson {idx + 1}</span>
                                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                                      </div>
                                      <h5 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">{vid.title}</h5>
                                    </a>
                                  ))}
                                  {!isSubscribed && (
                                    <Button
                                      onClick={() => setShowPaymentModal(true)}
                                      className="w-full md:col-span-2 mt-2 h-14 rounded-2xl bg-white/5 border border-primary/30 border-dashed hover:bg-primary/10 hover:border-primary/50 text-primary font-bold transition-all flex items-center justify-center gap-2 group"
                                      variant="ghost"
                                    >
                                      <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                      Unlock {msg.videos.length - 4} More Premium Videos
                                    </Button>
                                  )}
                                  {isSubscribed && msg.videos.length > 4 && (
                                    <div className="md:col-span-2 text-center py-2">
                                      <span className="flex items-center justify-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 w-fit mx-auto">
                                        <CheckCircle className="w-3 h-3" />
                                        Full Video Library Unlocked
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                          {/* Questions Section */}
                          {msg.questions && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 px-2">
                                <HelpCircle className="w-5 h-5 text-accent" />
                                <h4 className="font-bold text-lg">Critical Thinking Questions (20)</h4>
                              </div>
                              <div className="bg-accent/5 border border-accent/20 rounded-[2rem] p-6">
                                <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                                  {msg.questions.map((q) => (
                                    <div key={q.id} className="flex gap-4 items-start p-3 bg-background/40 rounded-xl border border-accent/10 hover:border-accent/30 transition-colors">
                                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-[10px] flex items-center justify-center font-bold">{q.id}</span>
                                      <p className="text-sm font-medium leading-relaxed">{q.text}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start animate-in fade-in duration-300">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-muted/30 border border-primary/10 rounded-[1.5rem] p-4 flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-6 bg-background/40 border-t border-primary/10 backdrop-blur-md">
              <form onSubmit={handleSendMessage} className="relative flex items-center max-w-4xl mx-auto">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for more details or test me on this topic..."
                  className="pr-14 bg-background border-primary/20 h-14 rounded-full focus-visible:ring-primary/40 focus-visible:border-primary/40 text-lg shadow-inner"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1.5 w-11 h-11 rounded-full bg-gradient-to-r from-primary to-accent hover:scale-110 active:scale-95 transition-all text-white shadow-lg"
                  disabled={isTyping || !chatInput.trim()}
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </Button>
              </form>
              <p className="text-[10px] text-center text-muted-foreground mt-3 font-medium uppercase tracking-[0.2em] opacity-50">Lumina AI can make mistakes. Verify important info.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.4);
        }
      `}</style>
    </div>
  );
}
