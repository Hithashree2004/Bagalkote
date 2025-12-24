import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mic, BookOpen, Video, Music, Image as ImageIcon, Sparkles, Gamepad2, X, Moon, Sun, Globe, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ParticleBackground from '@/components/ParticleBackground';
import DateTimeDisplay from '@/components/DateTimeDisplay';
import NewspaperSection from '@/components/NewspaperSection';
import CurrentAffairsPanel from '@/components/CurrentAffairsPanel';
import RoadMapSection from '@/components/RoadMapSection';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

type GeneratedContent = {
  topic: string;
  summaryLines: string[];
  imageUrls: string[];
  suggestedVideos: { title: string; url: string; thumbnail?: string; videoId?: string }[];
  bookRecommendations: string[];
  threeDModelUrl?: string;
};

const educationalKeywords = [
  'math',
  'science',
  'physics',
  'chemistry',
  'biology',
  'history',
  'geography',
  'education',
  'literature',
  'language',
  'grammar',
  'economics',
  'finance',
  'accounting',
  'technology',
  'engineering',
  'computer',
  'programming',
  'coding',
  'astronomy',
  'geology',
  'medicine',
  'anatomy',
  'psychology',
  'sociology',
  'philosophy',
  'law',
  'statistics',
  'calculus',
  'algebra',
  'art',
  'music'
];

const curatedTopics = [
  {
    keywords: ['alphabet', 'alphabets', 'letters', 'abc'],
    topic: 'English Alphabet',
    summaryLines: [
      'The English alphabet has 26 letters.',
      'Uppercase: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z.',
      'Lowercase: a b c d e f g h i j k l m n o p q r s t u v w x y z.',
      'Vowels: A E I O U.',
      'Consonants: the remaining 21 letters.',
      'Letters combine to form syllables, words, and sentences.'
    ],
    imageUrls: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Alphabet_English.svg/1024px-Alphabet_English.svg.png'],
    aiVideoUrl: 'https://www.youtube.com/embed/hq3yfQnllfQ?vq=hd1080', // ABCD song
    suggestedVideos: [
      { title: 'ABCD Song for Kids', url: 'https://www.youtube.com/embed/hq3yfQnllfQ', thumbnail: 'https://img.youtube.com/vi/hq3yfQnllfQ/0.jpg' },
      { title: 'Learn the Alphabet', url: 'https://www.youtube.com/embed/kG3dH1Jas92', thumbnail: 'https://img.youtube.com/vi/kG3dH1Jas92/0.jpg' }
    ]
  },
  {
    keywords: ['quadratic equation', 'quadratic equations', 'quadratic'],
    topic: 'Quadratic Equations',
    summaryLines: [
      'A quadratic equation has the form ax² + bx + c = 0 with a ≠ 0.',
      'Its graph is a parabola opening upward when a > 0 and downward when a < 0.',
      'Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a.',
      'Discriminant Δ = b² - 4ac determines the nature of roots.',
      'Δ > 0 gives two distinct real roots, Δ = 0 one repeated root, Δ < 0 complex roots.',
      'Equations can be solved by factoring when the polynomial splits into linear factors.',
      'Completing the square rewrites ax² + bx + c into a(x + b/2a)² plus a constant.'
    ],
    imageUrls: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Quadratic_function.svg/1024px-Quadratic_function.svg.png'],
    aiVideoUrl: 'https://www.youtube.com/embed/VOaq87-q0lk?vq=hd1080', // explanatory video
    suggestedVideos: [
      { title: 'Quadratic Equations Explained', url: 'https://www.youtube.com/embed/VOaq87-q0lk', thumbnail: 'https://img.youtube.com/vi/VOaq87-q0lk/0.jpg' },
      { title: 'Solving Quadratic Equations', url: 'https://www.youtube.com/embed/xX_UX8b2LCE', thumbnail: 'https://img.youtube.com/vi/xX_UX8b2LCE/0.jpg' }
    ]
  }
];

const getYouTubeSearchUrl = (query: string) => {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' educational explained')}`;
};

const getYouTubeEmbedUrl = (query: string) => {
  // Create a YouTube search embed URL
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query + ' educational tutorial')}`;
};

const getUnsplashImageUrls = (query: string) => {
  // Return high-quality, topic-specific images with proper resolution
  const topicImages: Record<string, string[]> = {
    'physics': [
      'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'chemistry': [
      'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'biology': [
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'mathematics': [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'computer': [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'history': [
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'education': [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&h=1080&fit=crop&q=95&auto=format'
    ]
  };

  const lowerQuery = query.toLowerCase();
  for (const [key, images] of Object.entries(topicImages)) {
    if (lowerQuery.includes(key)) {
      return images;
    }
  }

  // Default educational images with high quality
  return [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop&q=95&auto=format',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&h=1080&fit=crop&q=95&auto=format'
  ];
};

const getBookRecommendations = (query: string): string[] => {
  const lowerQuery = query.toLowerCase();
  const bookMap: Record<string, string[]> = {
    'physics': ['"Concepts of Physics" by H.C. Verma', '"University Physics" by Young and Freedman', '"Fundamentals of Physics" by Halliday and Resnick'],
    'chemistry': ['"Organic Chemistry" by Morrison and Boyd', '"Inorganic Chemistry" by J.D. Lee', '"Physical Chemistry" by P.W. Atkins'],
    'biology': ['"Biology" by Campbell and Reece', '"Molecular Biology of the Gene" by Watson', '"Human Anatomy" by Netter'],
    'mathematics': ['"Calculus" by James Stewart', '"Linear Algebra and Its Applications" by Gilbert Strang', '"Discrete Mathematics" by Rosen'],
    'computer': ['"Introduction to Algorithms" by Cormen', '"Computer Networks" by Tanenbaum', '"Operating System Concepts" by Silberschatz'],
    'history': ['"A History of the World" by J.M. Roberts', '"The Guns of August" by Barbara Tuchman', '"Sapiens" by Yuval Noah Harari'],
    'economics': ['"Principles of Economics" by Mankiw', '"Macroeconomics" by Olivier Blanchard', '"Microeconomics" by Varian'],
    'psychology': ['"Psychology" by David Myers', '"Thinking, Fast and Slow" by Daniel Kahneman', '"The Man Who Mistook His Wife for a Hat" by Oliver Sacks'],
    'heart': ['"Cardiology" by Hurst', '"The Heart" by Fuster', '"Atlas of Heart Anatomy"'],
    'solar system': ['"Astronomy Today" by Chaisson and McMillan', '"An Introduction to the Solar System" by Woolfson', '"Cosmic Perspective" by Bennett'],
    'kidney': ['"Nephrology" by Brenner', '"Renal Pathology" by Jennette', '"Kidney Disease" by Taal'],
    'quadratic equation': ['"Algebra" by Artin', '"College Algebra" by Blitzer', '"Intermediate Algebra" by Martin-Gay'],
    'english alphabet': ['"English Grammar in Use" by Murphy', '"The Alphabet Book" for Kids', '"Phonics Pathways" by Hiskes']
  };

  for (const [key, books] of Object.entries(bookMap)) {
    if (lowerQuery.includes(key)) {
      return books;
    }
  }

  return ['"General Knowledge Encyclopedia"', '"Educational Reference Books"'];
};

const get3DModelUrl = (query: string): string | undefined => {
  const lowerQuery = query.toLowerCase();
  const modelMap: Record<string, string> = {
    'heart': 'https://sketchfab.com/models/4c7e6b4f0c0b4f9e9f0b4f9e9f0b4f9e/embed',
    'solar system': 'https://sketchfab.com/models/solar-system-3d-model/embed',
    'kidney': 'https://sketchfab.com/models/human-kidney-3d-model/embed',
    'brain': 'https://sketchfab.com/models/brain-anatomy-3d-model/embed',
    'dna': 'https://sketchfab.com/models/dna-helix-3d-model/embed',
    'atom': 'https://sketchfab.com/models/atomic-structure-3d-model/embed'
  };

  for (const [key, url] of Object.entries(modelMap)) {
    if (lowerQuery.includes(key)) {
      return url;
    }
  }

  return undefined;
};

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [funzoneMood, setFunzoneMood] = useState<string>('happy');

  const funTasks = useMemo(() => {
    if (!funzoneMood) return [];
    const tasks = {
      happy: ['Dance to your favorite song', 'Call a friend and share a joke', 'Watch a comedy show'],
      sad: ['Listen to uplifting music', 'Take a walk in nature', 'Write down three things you\'re grateful for'],
      confused: ['Take a deep breath and meditate for 5 minutes', 'Organize your thoughts in a journal', 'Talk to someone you trust'],
      bored: ['Try a new hobby', 'Read a book', 'Play a game'],
      tensed: ['Do some stretching exercises', 'Listen to calming music', 'Practice deep breathing']
    };
    return tasks[funzoneMood as keyof typeof tasks] || [];
  }, [funzoneMood]);


  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const mockUser = userData
    ? {
        age: userData.age,
        class: userData.classLevel,
        purpose: userData.purpose || 'Regular Study'
      }
    : {
        age: 15,
        class: '10th',
        purpose: 'Regular Study'
      };

  const allSuggestedContent = [
    {
      id: 1,
      title: 'Physics: Laws of Motion',
      category: 'Science',
      difficulty: 'Medium',
      description: "Master Newton's laws and their applications",
      summary:
        "Newton's laws of motion form the foundation of classical mechanics. The first law (Law of Inertia) states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. The second law (F=ma) quantitatively relates force, mass, and acceleration, showing that acceleration is directly proportional to net force and inversely proportional to mass. The third law states that for every action, there is an equal and opposite reaction. These laws explain everything from falling apples to rocket propulsion and are crucial for understanding mechanics in physics.",
      relevance: 'Essential for Class 10 board exams and JEE preparation'
    },
    {
      id: 2,
      title: 'Mathematics: Quadratic Equations',
      category: 'Math',
      difficulty: 'Medium',
      description: 'Learn to solve complex quadratic problems',
      summary:
        'Quadratic equations are polynomial equations of degree 2, typically written in the form ax² + bx + c = 0 where a ≠ 0. They can be solved using multiple methods: factoring (when the equation can be written as a product of linear factors), completing the square (rewriting the equation to isolate the square term), or the quadratic formula x = (-b ± √(b²-4ac)) / 2a. The discriminant D = b²-4ac determines the nature of roots: if D > 0, two distinct real roots; D = 0, one repeated real root; D < 0, two complex roots. Quadratic equations appear in physics, engineering, and real-world applications like projectile motion and optimization problems.',
      relevance: 'High weightage in competitive exams like JEE, NEET, and board exams'
    },
    {
      id: 3,
      title: 'Chemistry: Periodic Table',
      category: 'Science',
      difficulty: 'Easy',
      description: 'Understanding elements and their properties',
      summary:
        'The periodic table is a tabular arrangement of all known chemical elements, organized by increasing atomic number and grouped by similar chemical properties. Elements are arranged in periods (horizontal rows) and groups/families (vertical columns). Key trends include: atomic radius decreases across a period and increases down a group; electronegativity increases across periods and decreases down groups; ionization energy follows similar patterns. The periodic table helps predict element behavior, chemical bonding, and reactivity. Modern periodic table has 118 elements, with metals on the left, nonmetals on the right, and metalloids along the zigzag line.',
      relevance: 'Foundation for all chemistry concepts and essential for NEET preparation'
    },
    {
      id: 4,
      title: 'English: Grammar Essentials',
      category: 'Language',
      difficulty: 'Easy',
      description: 'Perfect your grammar for exams',
      summary:
        'Master essential grammar concepts including tenses, voice (active/passive), narration (direct/indirect speech), subject-verb agreement, articles, and prepositions. Understanding sentence structure and correct word usage improves both written and spoken communication.',
      relevance: 'Critical for language section in all exams'
    },
    {
      id: 5,
      title: 'Current Affairs: National Events',
      category: 'GK',
      difficulty: 'Medium',
      description: 'Stay updated with important events',
      summary:
        'Current affairs cover recent developments in politics, economics, sports, science, and international relations. Focus on government schemes, policy changes, important appointments, awards, and significant national events. Regular reading helps in competitive exam preparation.',
      relevance: 'Essential for competitive exams'
    },
    {
      id: 6,
      title: 'Logical Reasoning: Patterns',
      category: 'Aptitude',
      difficulty: 'Medium',
      description: 'Develop analytical thinking skills',
      summary:
        'Logical reasoning involves identifying patterns, sequences, and relationships. Common types include number series, letter series, coding-decoding, blood relations, and syllogisms. Practice improves speed and accuracy in solving these problems systematically.',
      relevance: 'High scoring section in aptitude tests'
    },
    {
      id: 7,
      title: 'Biology: Cell Structure',
      category: 'Science',
      difficulty: 'Easy',
      description: 'Explore the building blocks of life',
      summary: 'Cells are the basic unit of life. Eukaryotic cells have a nucleus and organelles, while prokaryotic cells lack a nucleus. Understanding cell membrane, cytoplasm, and organelles is fundamental.',
      relevance: 'Core biology concept'
    },
    {
      id: 8,
      title: 'History: Ancient Civilizations',
      category: 'History',
      difficulty: 'Medium',
      description: 'Journey through ancient history',
      summary: 'Ancient civilizations like Egypt, Mesopotamia, Indus Valley shaped human history. Key aspects include governance, trade, religion, and technological advancements.',
      relevance: 'Important for history exams'
    },
    {
      id: 9,
      title: 'Computer Science: Algorithms',
      category: 'Technology',
      difficulty: 'Hard',
      description: 'Learn fundamental algorithms',
      summary: 'Algorithms are step-by-step procedures for calculations. Sorting, searching, and graph algorithms are essential in computer science.',
      relevance: 'For tech competitive exams'
    },
    {
      id: 10,
      title: 'Engineering Mathematics',
      category: 'Engineering',
      difficulty: 'Medium',
      description: 'Core math for engineering students',
      summary: 'Differential equations, linear algebra, complex analysis, and numerical methods form the backbone of engineering mathematics.',
      relevance: 'Essential for engineering courses'
    },
    {
      id: 11,
      title: 'Medical Anatomy',
      category: 'Medical',
      difficulty: 'Hard',
      description: 'Human body systems and structures',
      summary: 'Study of human anatomy including skeletal, muscular, cardiovascular, and nervous systems. Crucial for medical understanding.',
      relevance: 'Foundation for medical studies'
    },
    {
      id: 12,
      title: 'Physics for JEE',
      category: 'JEE',
      difficulty: 'Hard',
      description: 'Advanced physics concepts for JEE preparation',
      summary: 'Mechanics, thermodynamics, electromagnetism, optics, and modern physics with problem-solving techniques.',
      relevance: 'Critical for JEE Main and Advanced'
    },
    {
      id: 13,
      title: 'Chemistry for NEET',
      category: 'NEET',
      difficulty: 'Hard',
      description: 'Organic, inorganic, and physical chemistry',
      summary: 'Comprehensive coverage of chemical reactions, periodic table, biomolecules, and chemical equilibrium.',
      relevance: 'Essential for NEET preparation'
    },
    {
      id: 14,
      title: 'Current Affairs for UPSC',
      category: 'UPSC',
      difficulty: 'Medium',
      description: 'Latest national and international events',
      summary: 'Analysis of current affairs, government policies, international relations, and socio-economic developments.',
      relevance: 'Key component of UPSC preparation'
    },
    {
      id: 15,
      title: 'General Knowledge for Govt Exams',
      category: 'Govt Exam',
      difficulty: 'Easy',
      description: 'Static GK and general awareness',
      summary: 'History, geography, polity, economy, science, and technology basics for competitive examinations.',
      relevance: 'Foundation for all government job exams'
    },
    {
      id: 16,
      title: 'English Literature for BA',
      category: 'BA',
      difficulty: 'Medium',
      description: 'Classic literature and analysis',
      summary: 'Study of poetry, prose, drama, and literary criticism from various periods and authors.',
      relevance: 'Core for BA English programs'
    },
    {
      id: 17,
      title: 'Biology for BSc',
      category: 'BSc',
      difficulty: 'Medium',
      description: 'Life sciences fundamentals',
      summary: 'Cell biology, genetics, ecology, evolution, and microbiology concepts for science graduates.',
      relevance: 'Essential for BSc Biology'
    },
    {
      id: 18,
      title: 'Aptitude for KCET',
      category: 'KCET',
      difficulty: 'Medium',
      description: 'Quantitative and logical reasoning',
      summary: 'Mathematics, physics, chemistry problems along with logical reasoning and English comprehension.',
      relevance: 'KCET entrance preparation'
    },
    {
      id: 19,
      title: 'State Administration for KAS',
      category: 'KAS',
      difficulty: 'Hard',
      description: 'Karnataka state administration',
      summary: 'Karnataka history, polity, economy, and administrative structure for KAS aspirants.',
      relevance: 'Specific to Karnataka Administrative Service'
    },
    {
      id: 20,
      title: 'Physics: Optics and Light',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Understanding light and optical phenomena',
      summary: 'Study of reflection, refraction, lenses, mirrors, and wave nature of light. Covers ray optics, wave optics, and applications in daily life.',
      relevance: 'Important for board exams and competitive entrance'
    },
    {
      id: 21,
      title: 'Mathematics: Trigonometry',
      category: 'Math',
      difficulty: 'Medium',
      description: 'Master angles and trigonometric functions',
      summary: 'Trigonometric ratios, identities, equations, and applications. Includes sine, cosine, tangent functions and their inverses.',
      relevance: 'Essential for geometry and calculus'
    },
    {
      id: 22,
      title: 'Chemistry: Chemical Bonding',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Types of chemical bonds and their properties',
      summary: 'Ionic, covalent, and metallic bonding. Lewis structures, VSEPR theory, and molecular geometry explanations.',
      relevance: 'Foundation for understanding chemical reactions'
    },
    {
      id: 23,
      title: 'Biology: Human Physiology',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Functioning of human body systems',
      summary: 'Digestive, respiratory, circulatory, nervous, and endocrine systems. Homeostasis and organ functions.',
      relevance: 'Core for medical and biology studies'
    },
    {
      id: 24,
      title: 'Computer Science: Programming Basics',
      category: 'Technology',
      difficulty: 'Easy',
      description: 'Introduction to coding and algorithms',
      summary: 'Variables, loops, conditionals, functions, and basic data structures. Introduction to problem-solving with code.',
      relevance: 'Essential for tech careers'
    },
    {
      id: 25,
      title: 'Physics: Electricity and Magnetism',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Electric circuits and magnetic fields',
      summary: 'Ohm\'s law, series/parallel circuits, electromagnetic induction, and magnetic effects of current.',
      relevance: 'Important for physics and engineering'
    },
    {
      id: 26,
      title: 'Mathematics: Coordinate Geometry',
      category: 'Math',
      difficulty: 'Medium',
      description: 'Graphs and coordinate systems',
      summary: 'Distance formula, section formula, straight lines, circles, and parabolas in coordinate plane.',
      relevance: 'Analytical geometry fundamentals'
    },
    {
      id: 27,
      title: 'Chemistry: Organic Chemistry Basics',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Carbon compounds and reactions',
      summary: 'Hydrocarbons, functional groups, isomerism, and basic organic reactions like substitution and addition.',
      relevance: 'Foundation for organic chemistry'
    },
    {
      id: 28,
      title: 'English: Reading Comprehension',
      category: 'Language',
      difficulty: 'Easy',
      description: 'Improve reading and understanding skills',
      summary: 'Techniques for reading passages, identifying main ideas, inferences, and answering comprehension questions.',
      relevance: 'Critical for all competitive exams'
    },
    {
      id: 29,
      title: 'History: Modern India',
      category: 'History',
      difficulty: 'Medium',
      description: 'Freedom struggle and independence',
      summary: 'British rule, freedom movement, partition, and post-independence developments in India.',
      relevance: 'Essential for history and competitive exams'
    },
    {
      id: 30,
      title: 'Physics: Thermodynamics',
      category: 'Science',
      difficulty: 'Hard',
      description: 'Heat, work, and energy transformations',
      summary: 'Laws of thermodynamics, heat engines, entropy, and thermodynamic processes.',
      relevance: 'Advanced physics for engineering'
    },
    {
      id: 31,
      title: 'Mathematics: Calculus Basics',
      category: 'Math',
      difficulty: 'Hard',
      description: 'Limits, derivatives, and integrals',
      summary: 'Introduction to differential and integral calculus, applications in physics and engineering.',
      relevance: 'Foundation for advanced mathematics'
    },
    {
      id: 32,
      title: 'Chemistry: Electrochemistry',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Chemical reactions and electricity',
      summary: 'Electrochemical cells, redox reactions, electrolysis, and Faraday\'s laws.',
      relevance: 'Important for chemistry and engineering'
    },
    {
      id: 33,
      title: 'Biology: Genetics and Evolution',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Heredity and species development',
      summary: 'Mendelian genetics, DNA structure, mutations, natural selection, and evolutionary theory.',
      relevance: 'Core concepts in modern biology'
    },
    {
      id: 34,
      title: 'Computer Science: Data Structures',
      category: 'Technology',
      difficulty: 'Hard',
      description: 'Arrays, linked lists, stacks, and queues',
      summary: 'Fundamental data structures, their operations, and applications in programming.',
      relevance: 'Essential for software development'
    },
    {
      id: 35,
      title: 'Physics: Modern Physics',
      category: 'Science',
      difficulty: 'Hard',
      description: 'Quantum mechanics and relativity',
      summary: 'Photoelectric effect, dual nature of matter, nuclear physics, and special relativity.',
      relevance: 'Advanced physics concepts'
    },
    {
      id: 36,
      title: 'Mathematics: Probability',
      category: 'Math',
      difficulty: 'Medium',
      description: 'Chance and random events',
      summary: 'Probability axioms, conditional probability, Bayes theorem, and distributions.',
      relevance: 'Statistics and data analysis'
    },
    {
      id: 37,
      title: 'Chemistry: Physical Chemistry',
      category: 'Science',
      difficulty: 'Hard',
      description: 'Chemical kinetics and equilibrium',
      summary: 'Rate of reactions, equilibrium constants, Le Chatelier\'s principle, and solution chemistry.',
      relevance: 'Advanced chemistry concepts'
    },
    {
      id: 38,
      title: 'English: Writing Skills',
      category: 'Language',
      difficulty: 'Easy',
      description: 'Essay and letter writing',
      summary: 'Structure of essays, formal letters, report writing, and grammar in writing.',
      relevance: 'Communication skills for exams'
    },
    {
      id: 39,
      title: 'Geography: World Geography',
      category: 'Geography',
      difficulty: 'Medium',
      description: 'Continents, countries, and physical features',
      summary: 'Major continents, countries, rivers, mountains, climate zones, and natural resources.',
      relevance: 'General knowledge and competitive exams'
    },
    {
      id: 40,
      title: 'Economics: Microeconomics',
      category: 'Economics',
      difficulty: 'Medium',
      description: 'Individual economic decisions',
      summary: 'Demand and supply, elasticity, consumer behavior, and market structures.',
      relevance: 'Business and social sciences'
    },
    {
      id: 41,
      title: 'Physics: Mechanics for JEE',
      category: 'JEE',
      difficulty: 'Hard',
      description: 'Advanced mechanics problems',
      summary: 'Kinematics, dynamics, work-energy, rotational mechanics with JEE-level problem solving.',
      relevance: 'Critical for JEE Physics'
    },
    {
      id: 42,
      title: 'Chemistry: Inorganic Chemistry for NEET',
      category: 'NEET',
      difficulty: 'Medium',
      description: 'Elements and their compounds',
      summary: 'Periodic properties, coordination compounds, metallurgy, and qualitative analysis.',
      relevance: 'NEET Chemistry syllabus'
    },
    {
      id: 43,
      title: 'Biology: Ecology and Environment',
      category: 'Science',
      difficulty: 'Easy',
      description: 'Interactions in ecosystems',
      summary: 'Ecosystems, food chains, biodiversity, pollution, and environmental conservation.',
      relevance: 'Environmental science basics'
    },
    {
      id: 44,
      title: 'Computer Science: Web Development',
      category: 'Technology',
      difficulty: 'Medium',
      description: 'HTML, CSS, and JavaScript basics',
      summary: 'Building websites, responsive design, and interactive web applications.',
      relevance: 'Modern web development skills'
    },
    {
      id: 45,
      title: 'Mathematics: Statistics',
      category: 'Math',
      difficulty: 'Medium',
      description: 'Data analysis and interpretation',
      summary: 'Mean, median, mode, variance, standard deviation, and data visualization.',
      relevance: 'Data science and research'
    },
    {
      id: 46,
      title: 'Chemistry: Biochemistry',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Chemistry of living organisms',
      summary: 'Carbohydrates, proteins, lipids, nucleic acids, and metabolic pathways.',
      relevance: 'Biology and medical sciences'
    },
    {
      id: 47,
      title: 'English: Vocabulary Building',
      category: 'Language',
      difficulty: 'Easy',
      description: 'Expand your word knowledge',
      summary: 'Synonyms, antonyms, idioms, phrasal verbs, and contextual usage of words.',
      relevance: 'Language proficiency and exams'
    },
    {
      id: 48,
      title: 'History: World History',
      category: 'History',
      difficulty: 'Medium',
      description: 'Major civilizations and events',
      summary: 'Ancient, medieval, and modern world history, major wars, revolutions, and discoveries.',
      relevance: 'Global perspective and competitive exams'
    }
  ];

  const getFilteredContent = () => {
    if (!userData?.purpose) return allSuggestedContent.slice(0, 6);
    const purpose = userData.purpose.toLowerCase();
    let filtered = allSuggestedContent.filter(content => {
      const cat = content.category.toLowerCase();
      const title = content.title.toLowerCase();
      return cat.includes(purpose) || title.includes(purpose) || purpose.includes(cat) ||
             (purpose === 'engineering' && ['science', 'math', 'technology', 'engineering', 'jee'].includes(cat)) ||
             (purpose === 'medical' && ['science', 'medical', 'neet'].includes(cat)) ||
             (purpose === 'bsc' && ['science', 'math', 'bsc'].includes(cat)) ||
             (purpose === 'ba' && ['language', 'history', 'ba'].includes(cat));
    });
    if (filtered.length < 6) {
      // Add more general science/math topics if needed
      const additional = allSuggestedContent.filter(content =>
        !filtered.find(f => f.id === content.id) &&
        ['science', 'math', 'language'].includes(content.category.toLowerCase())
      ).slice(0, 6 - filtered.length);
      filtered = [...filtered, ...additional];
    }
    return filtered.slice(0, 12); // Max 12 suggestions
  };

  const suggestedContent = useMemo(() => getFilteredContent(), [userData?.purpose]);

  const processQuery = async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setSelectedContent(null);
    toast.info('🤖 ' + t('processing') + ' learning content...');
    try {
      const normalized = trimmed.toLowerCase();
      if (/^[a-z]$/.test(normalized)) {
        const letter = normalized.toUpperCase();
        const lower = normalized.toLowerCase();
        const topic = `Letter ${letter}`;
        const summaryLines = [
          `The letter ${letter} is the ${letter.charCodeAt(0) - 64}th letter in the English alphabet.`,
          `Uppercase: ${letter}`,
          `Lowercase: ${lower}`,
          `It is a ${'AEIOU'.includes(letter) ? 'vowel' : 'consonant'}.`,
          `Phonetic sound: /${lower}/`,
          `Example word starting with ${letter}: ${letter}ntelope` // placeholder
        ];

        const curatedImage = curatedTopics.find((entry) =>
          entry.topic.toLowerCase().includes(topic.toLowerCase())
        )?.imageUrls?.[0];

        const imageUrls = [
          curatedImage || `https://source.unsplash.com/1920x1080/?${encodeURIComponent(trimmed)},education&sig=${Date.now()}`,
        ];

        const suggestedVideos = [
          {
            title: `Learn Letter ${letter} - Phonics`,
            url: getYouTubeSearchUrl(`letter ${letter} phonics`),
          },
          {
            title: `Letter ${letter} - Writing Practice`,
            url: getYouTubeSearchUrl(`letter ${letter} writing practice`),
          },
          {
            title: `Alphabet Song - Letter ${letter}`,
            url: getYouTubeSearchUrl(`alphabet song letter ${letter}`),
          },
          {
            title: `${letter} Words for Kids`,
            url: getYouTubeSearchUrl(`letter ${letter} words for kids`),
          },
        ];
        setGeneratedContent({
          topic,
          summaryLines,
          imageUrls,
          suggestedVideos,
          bookRecommendations: getBookRecommendations(topic),
          threeDModelUrl: get3DModelUrl(topic),
        });
        toast.success('✨ Content generated successfully!');
        return;
      }
      const curatedMatch = curatedTopics.find((entry) =>
        entry.keywords.some((keyword) => normalized.includes(keyword))
      );
      if (curatedMatch) {
        setGeneratedContent({
          topic: curatedMatch.topic,
          summaryLines: curatedMatch.summaryLines.slice(0, 10),
          imageUrls: curatedMatch.imageUrls.slice(0, 1),
          suggestedVideos: curatedMatch.suggestedVideos,
          bookRecommendations: getBookRecommendations(curatedMatch.topic),
          threeDModelUrl: get3DModelUrl(curatedMatch.topic),
        });
        toast.success('✨ Content generated successfully!');
        return;
      }
      const encodedTopic = encodeURIComponent(trimmed);
      const baseImageUrls = getUnsplashImageUrls(trimmed);
      const suggestedVideos = [
        { 
          title: `${trimmed} - Complete Tutorial`, 
          url: getYouTubeSearchUrl(`${trimmed} complete tutorial`),
          thumbnail: '',
          videoId: ''
        },
        { 
          title: `${trimmed} - Explained Simply`, 
          url: getYouTubeSearchUrl(`${trimmed} explained simply`),
          thumbnail: '',
          videoId: ''
        },
        { 
          title: `Learn ${trimmed} - Step by Step`, 
          url: getYouTubeSearchUrl(`learn ${trimmed} step by step`),
          thumbnail: '',
          videoId: ''
        },
        { 
          title: `${trimmed} - Crash Course`, 
          url: getYouTubeSearchUrl(`${trimmed} crash course`),
          thumbnail: '',
          videoId: ''
        }
      ];
      try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTopic}`);
        if (!response.ok) {
          throw new Error('Topic not found');
        }
        const data = await response.json();
        const extract = typeof data.extract === 'string' ? data.extract : '';
        const title = typeof data.title === 'string' ? data.title : trimmed;
        const sentences = extract ? extract.match(/[^.!?]+[.!?]?/g) ?? [] : [];
        const summaryLines = sentences.map((sentence) => sentence.trim()).filter(Boolean).slice(0, 10);
        const wikiImage = typeof (data as any)?.thumbnail?.source === 'string' ? (data as any).thumbnail.source : null;
        const imageUrls = [wikiImage || baseImageUrls[0]];
        
        // Enhanced suggested videos with more variety
        const enhancedSuggestedVideos = [
          { 
            title: `${title} - Complete Explanation`, 
            url: getYouTubeSearchUrl(`${title} complete explanation`),
            thumbnail: '',
            videoId: ''
          },
          { 
            title: `${title} - Tutorial for Beginners`, 
            url: getYouTubeSearchUrl(`${title} tutorial beginners`),
            thumbnail: '',
            videoId: ''
          },
          { 
            title: `${title} - Advanced Concepts`, 
            url: getYouTubeSearchUrl(`${title} advanced concepts`),
            thumbnail: '',
            videoId: ''
          },
          { 
            title: `${title} - Practical Examples`, 
            url: getYouTubeSearchUrl(`${title} practical examples`),
            thumbnail: '',
            videoId: ''
          }
        ];
        
        setGeneratedContent({
          topic: title,
          summaryLines: summaryLines.length > 0 ? summaryLines : [`Information about ${trimmed}.`],
          imageUrls: [imageUrls[0]],
          suggestedVideos: enhancedSuggestedVideos,
          bookRecommendations: getBookRecommendations(title),
          threeDModelUrl: get3DModelUrl(title)
        });
        toast.success(t('contentGenerated'));
      } catch (err) {
        const fallbackSuggestedVideos = [
          {
            title: `${trimmed} - Educational Video`,
            url: getYouTubeSearchUrl(`${trimmed} educational`),
          },
          {
            title: `${trimmed} - Learn Online`,
            url: getYouTubeSearchUrl(`${trimmed} learn online`),
          },
          {
            title: `${trimmed} - Study Guide`,
            url: getYouTubeSearchUrl(`${trimmed} study guide`),
          },
          {
            title: `${trimmed} - Lecture Series`,
            url: getYouTubeSearchUrl(`${trimmed} lecture series`),
          },
        ];
        setGeneratedContent({
          topic: trimmed,
          summaryLines: [`Search results for ${trimmed}.`, 'Please explore the videos and images for more information.'],
          imageUrls: [baseImageUrls[0]],
          suggestedVideos: fallbackSuggestedVideos,
          bookRecommendations: getBookRecommendations(trimmed),
          threeDModelUrl: get3DModelUrl(trimmed)
        });
        toast.success(t('fallbackContent'));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'Topic not found') {
        setError(t('topicNotFound'));
      } else if (message === 'No educational content found') {
        setError(t('noEducationalContent'));
      } else {
        setError(t('fetchError'));
      }
      toast.error(t('unableToFetch'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await processQuery(query);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error(t('voiceNotSupported'));
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setIsListening(true);
      toast.info(t('listening'));
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error(t('microphoneError'));
    };
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ')
        .trim();
      if (transcript) {
        setQuery(transcript);
        void processQuery(transcript);
      }
    };
    recognition.start();
  };

  const handleContentClick = (content: any) => {
    // Redirect to YouTube search for the content
    const searchQuery = `${content.title} ${content.category} explained`;
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeUrl, '_blank');
  };



  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />
      <div
        className="fixed top-[25%] right-[30%] w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.5) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
      />
      <div
        className="fixed bottom-[30%] left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <DateTimeDisplay />
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="border-primary/30 hover:bg-primary/10"
              >
                {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                {theme === 'light' ? t('darkMode') : t('lightMode')}
              </Button>
              <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                <SelectTrigger className="w-32 border-primary/30">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="kn">{t('kannada')}</SelectItem>
                  <SelectItem value="hi">{t('hindi')}</SelectItem>
                  <SelectItem value="ta">{t('tamil')}</SelectItem>
                  <SelectItem value="te">{t('telugu')}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={funzoneMood} onValueChange={setFunzoneMood}>
                <SelectTrigger className="w-40 border-primary/30">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('funzone')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">{t('happy')}</SelectItem>
                  <SelectItem value="sad">{t('sad')}</SelectItem>
                  <SelectItem value="confused">{t('confused')}</SelectItem>
                  <SelectItem value="bored">{t('bored')}</SelectItem>
                  <SelectItem value="tensed">{t('tensed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">{t('dashboardTitle')}</h1>
            <p className="text-muted-foreground">{t('dashboardSubtitle')}</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex gap-2 items-center bg-card border-2 border-primary/30 rounded-full p-2 glow-pink">
                <Search className="w-5 h-5 text-muted-foreground ml-4" />
                <Input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-lg"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={handleVoiceInput}
                  className={`rounded-full hover:bg-primary/20 ${isListening ? 'bg-primary text-primary-foreground animate-pulse' : ''}`}
                  aria-pressed={isListening}
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-accent rounded-full px-8 glow-pink hover:scale-105 transition-all"
                >
                  {isLoading ? t('processing') : t('searchButton')}
                </Button>
              </div>
            </form>
          </div>
          {error && (
            <div className="max-w-3xl mx-auto w-full">
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-500 font-semibold text-center">
                {error}
              </div>
            </div>
          )}
          {isLoading && (
            <div className="max-w-4xl mx-auto w-full space-y-8">
              {/* Images Section Loading */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-72 w-full rounded-3xl" />
              </div>
              {/* Videos Section Loading */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="aspect-video w-full rounded-3xl" />
              </div>
              {/* Text Section Loading */}
              <div className="space-y-3">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-32 w-full rounded-3xl" />
              </div>
            </div>
          )}
          {/* Newspaper and Current Affairs Section */}
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8">
              <NewspaperSection />
              <CurrentAffairsPanel />
            </div>
          </div>

          {generatedContent && (
            <div className="max-w-4xl mx-auto w-full space-y-8">
              {/* Images Section */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold gradient-text">{t('hdImages')}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {generatedContent.imageUrls.map((url) => (
                    <div 
                      key={generatedContent.topic} 
                      className="group relative overflow-hidden rounded-xl border border-primary/30 bg-card cursor-pointer hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
                      onClick={() => { setSelectedImageUrl(url); setShowImageModal(true); }}
                    >
                      <img
                        src={url}
                        alt={`${generatedContent.topic} HD illustration`}
                        className="h-80 w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://source.unsplash.com/1920x1080/?${encodeURIComponent(generatedContent.topic)},education&sig=${Date.now()}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 justify-center">
                  <a
                    href={`https://unsplash.com/s/photos/${encodeURIComponent(generatedContent.topic)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold"
                  >
                    {t('seeMoreImages')} on Unsplash
                  </a>
                  <span className="text-muted-foreground">|</span>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(generatedContent.topic)}&tbm=isch`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold"
                  >
                    Search on Google Images
                  </a>
                </div>
              </div>

              {/* Videos Section - Suggested Videos Only */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold gradient-text">{t('suggestedVideos')}</h3>
                {generatedContent.suggestedVideos.length > 0 && (
                  <>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedContent.suggestedVideos.map((video, index) => (
                          <a
                            key={index}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block relative overflow-hidden rounded-xl border border-primary/20 bg-card cursor-pointer hover:scale-105 transition-all shadow-md hover:shadow-xl"
                          >
                            <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <Video className="w-12 h-12 text-primary" />
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                            </div>
                            <div className="p-4">
                              <p className="text-sm font-semibold text-foreground line-clamp-2">{video.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">Click to watch on YouTube</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(generatedContent.topic + ' educational tutorial')}`, '_blank')}
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        {t('suggestMoreVideos')}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(generatedContent.topic + ' lecture')}`, '_blank')}
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Find Lectures
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* Text Section */}
              <div className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-6 glow-pink">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="relative space-y-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                    {generatedContent.topic}
                  </span>
                  <h2 className="text-2xl font-bold gradient-text">{t('aiStudyNotes')}</h2>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {generatedContent.summaryLines.map((line, index) => (
                      <li key={`${generatedContent.topic}-${index}`}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Textbook Section */}
              <div className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-6 glow-pink">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="relative space-y-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                    {generatedContent.topic}
                  </span>
                  <h2 className="text-2xl font-bold gradient-text">{t('textbook')}</h2>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {generatedContent.bookRecommendations.map((book, index) => (
                      <li key={`${generatedContent.topic}-book-${index}`}>{book}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3D View Section */}
              {generatedContent.threeDModelUrl && (
                <div className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-6 glow-pink">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  <div className="relative space-y-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                      {generatedContent.topic}
                    </span>
                    <h2 className="text-2xl font-bold gradient-text">{t('threeDView')}</h2>
                    <div className="aspect-video overflow-hidden rounded-2xl border border-accent/30 bg-black/40">
                      <iframe
                        src={generatedContent.threeDModelUrl}
                        title={`3D model of ${generatedContent.topic}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
            <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black/95 border-0">
              {selectedImageUrl && (
                <div className="relative w-full h-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full"
                    onClick={() => setShowImageModal(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                  <img
                    src={selectedImageUrl}
                    alt="Full screen preview"
                    className="w-full h-auto max-h-[90vh] object-contain p-4"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                    Click outside or press ESC to close
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-primary/30 p-6 hover:border-primary transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-pink">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{t('text')}</h3>
                <p className="text-sm text-muted-foreground">{t('textDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-secondary/30 p-6 hover:border-secondary transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center glow-blue">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-foreground">{t('textbook')}</h3>
                <p className="text-sm text-muted-foreground">{t('textbookDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-accent/30 p-6 hover:border-accent transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center glow-cyan">
                  <Box className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground">{t('threeDView')}</h3>
                <p className="text-sm text-muted-foreground">{t('threeDViewDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-accent/30 p-6 hover:border-accent transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center glow-green">
                  <Video className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground">{t('video')}</h3>
                <p className="text-sm text-muted-foreground">{t('videoDesc')}</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-primary/30 p-6 hover:border-primary transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-pink">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{t('images')}</h3>
                <p className="text-sm text-muted-foreground">{t('imagesDesc')}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold gradient-text">{t('personalizedTitle')}</h2>
              <p className="text-muted-foreground">{t('personalizedSubtitle')} {mockUser.class} grade • {mockUser.purpose}</p>
              <Select value={userData?.purpose || ''} onValueChange={(value) => {
                const updated = { ...userData, purpose: value };
                setUserData(updated);
                localStorage.setItem('userData', JSON.stringify(updated));
              }}>
                <SelectTrigger className="w-auto max-w-xs mx-auto bg-card border-primary/30">
                  <SelectValue placeholder={t('selectPurpose')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular study">Regular Study</SelectItem>
                  <SelectItem value="engineering">Engineering (All Branches)</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="bsc">BSc</SelectItem>
                  <SelectItem value="ba">BA</SelectItem>
                  <SelectItem value="kcet">KCET</SelectItem>
                  <SelectItem value="neet">NEET</SelectItem>
                  <SelectItem value="jee">JEE</SelectItem>
                  <SelectItem value="general state govt exam">General State Govt Exam</SelectItem>
                  <SelectItem value="upsc">UPSC</SelectItem>
                  <SelectItem value="kas">KAS</SelectItem>
                  <SelectItem value="central government exam">Central Government Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedContent.map((content) => (
                <div
                  key={content.id}
                  onClick={() => handleContentClick(content)}
                  className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-6 cursor-pointer hover:scale-105 transition-all glow-pink group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                        {content.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {content.difficulty}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold gradient-text mb-2">{content.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
                    </div>
                    <div className="pt-2 border-t border-primary/20">
                      <p className="text-xs text-primary font-semibold">{content.relevance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center space-y-4 pt-8">
              <h3 className="text-2xl font-bold gradient-text">Quick Actions</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/games">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all rounded-xl">
                    <Gamepad2 className="mr-2" />
                    Play Games
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all">
                    <Sparkles className="mr-2" />
                    Take Quiz
                  </Button>
                </Link>
                <Link to="/rooms">
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all">
                    <BookOpen className="mr-2" />
                    Study Rooms
                  </Button>
                </Link>
              </div>
            </div>

            {funTasks.length > 0 && (
              <div className="relative overflow-hidden rounded-3xl bg-card border border-accent/30 p-6 glow-purple">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                <div className="relative space-y-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                    Funzone - {t(funzoneMood)}
                  </span>
                  <h2 className="text-2xl font-bold gradient-text">Fun Tasks</h2>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {funTasks.map((task, index) => (
                      <li key={`fun-${index}`}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Road Map Section */}
          <div className="max-w-6xl mx-auto w-full">
            <RoadMapSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
