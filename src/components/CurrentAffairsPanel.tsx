import { useState } from 'react';
import { TrendingUp, Calendar, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type CurrentAffair = {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  url?: string;
};

const currentAffairsData: CurrentAffair[] = [
  {
    id: 1,
    title: 'India Economic Growth Forecast',
    date: 'Jan 20, 2025',
    category: 'Economy',
    description: 'IMF projects India to grow at 6.5% in 2025, maintaining its position as fastest-growing major economy.',
    url: 'https://www.google.com/search?q=India+economic+growth+2025'
  },
  {
    id: 2,
    title: 'New Education Policy Updates',
    date: 'Jan 20, 2025',
    category: 'Education',
    description: 'Government announces major reforms in higher education curriculum and examination patterns.',
    url: 'https://www.google.com/search?q=India+education+policy+updates'
  },
  {
    id: 3,
    title: 'Space Mission Achievement',
    date: 'Jan 19, 2025',
    category: 'Science',
    description: 'ISRO successfully launches new satellite for weather monitoring and disaster management.',
    url: 'https://www.google.com/search?q=ISRO+latest+satellite+launch'
  },
  {
    id: 4,
    title: 'Climate Summit Outcomes',
    date: 'Jan 19, 2025',
    category: 'Environment',
    description: 'Global leaders commit to enhanced climate action with focus on renewable energy transition.',
    url: 'https://www.google.com/search?q=climate+summit+2025'
  },
  {
    id: 5,
    title: 'Sports Championship Results',
    date: 'Jan 18, 2025',
    category: 'Sports',
    description: 'Indian athletes secure multiple medals in international athletics championship.',
    url: 'https://www.google.com/search?q=India+athletics+championship+2025'
  },
  {
    id: 6,
    title: 'Technology Innovation',
    date: 'Jan 18, 2025',
    category: 'Technology',
    description: 'Indian startups unveil breakthrough AI solutions for healthcare and agriculture sectors.',
    url: 'https://www.google.com/search?q=India+AI+innovation+healthcare'
  },
  {
    id: 7,
    title: 'International Relations',
    date: 'Jan 17, 2025',
    category: 'Politics',
    description: 'India strengthens bilateral ties with key nations through strategic partnerships.',
    url: 'https://www.google.com/search?q=India+international+relations+2025'
  },
  {
    id: 8,
    title: 'Healthcare Initiative',
    date: 'Jan 17, 2025',
    category: 'Health',
    description: 'New nationwide health screening program launched to improve preventive healthcare.',
    url: 'https://www.google.com/search?q=India+health+screening+program'
  }
];

const categoryColors: Record<string, string> = {
  Economy: 'bg-green-500/20 text-green-700 dark:text-green-400',
  Education: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  Science: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
  Environment: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
  Sports: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  Technology: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400',
  Politics: 'bg-red-500/20 text-red-700 dark:text-red-400',
  Health: 'bg-pink-500/20 text-pink-700 dark:text-pink-400'
};

const CurrentAffairsPanel = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedAffairs = showAll ? currentAffairsData : currentAffairsData.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold gradient-text">Current Affairs</h2>
      </div>

      <div className="bg-card border border-primary/30 rounded-2xl p-6 space-y-4">
        <div className="space-y-3">
          {displayedAffairs.map((affair) => (
            <div
              key={affair.id}
              className="group relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-card to-card/50 p-4 hover:border-primary/40 transition-all hover:shadow-lg cursor-pointer"
              onClick={() => affair.url && window.open(affair.url, '_blank')}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                    {affair.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`text-xs ${categoryColors[affair.category] || 'bg-gray-500/20 text-gray-700'}`}>
                    {affair.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{affair.date}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {affair.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-primary/20">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="w-full border-primary/30 hover:bg-primary/10"
          >
            {showAll ? 'Show Less' : 'View All Current Affairs'}
            <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </Button>
        </div>

        <div className="text-center pt-2">
          <Button
            variant="ghost"
            onClick={() => window.open('https://en.wikipedia.org/wiki/Portal:Current_events', '_blank')}
            className="text-sm text-primary hover:text-primary/80"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            More on Wikipedia Current Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairsPanel;