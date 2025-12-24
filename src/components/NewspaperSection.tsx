import { useState } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Language = 'kannada' | 'english';
type NewspaperOption = {
  id: string;
  name: string;
  displayName: string;
  url: string;
  epaperUrl: string;
};

const newspapers: Record<Language, NewspaperOption[]> = {
  kannada: [
    {
      id: 'prajavani',
      name: 'Prajavani',
      displayName: 'ಪ್ರಜಾವಾಣಿ (Prajavani)',
      url: 'https://www.prajavani.net/',
      epaperUrl: 'https://epaper.prajavani.net/'
    },
    {
      id: 'vijaykarnataka',
      name: 'Vijay Karnataka',
      displayName: 'ವಿಜಯ ಕರ್ನಾಟಕ (Vijay Karnataka)',
      url: 'https://www.vijaykarnataka.com/',
      epaperUrl: 'https://epaper.vijaykarnataka.com/'
    }
  ],
  english: [
    {
      id: 'deccanherald',
      name: 'Deccan Herald',
      displayName: 'Deccan Herald',
      url: 'https://www.deccanherald.com/',
      epaperUrl: 'https://epaper.deccanherald.com/'
    },
    {
      id: 'timesofindia',
      name: 'Times of India',
      displayName: 'Times of India',
      url: 'https://timesofindia.indiatimes.com/',
      epaperUrl: 'https://epaper.timesgroup.com/'
    }
  ]
};

const NewspaperSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [selectedNewspaper, setSelectedNewspaper] = useState<string>('deccanherald');

  const currentNewspapers = newspapers[selectedLanguage];
  const currentNewspaper = currentNewspapers.find(n => n.id === selectedNewspaper) || currentNewspapers[0];

  const handleLanguageChange = (value: string) => {
    const lang = value as Language;
    setSelectedLanguage(lang);
    setSelectedNewspaper(newspapers[lang][0].id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Newspaper className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold gradient-text">Today's Newspaper</h2>
      </div>

      <Tabs value={selectedLanguage} onValueChange={handleLanguageChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-card border border-primary/30">
          <TabsTrigger value="kannada" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            ಕನ್ನಡ (Kannada)
          </TabsTrigger>
          <TabsTrigger value="english" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            English
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedLanguage} className="space-y-4 mt-4">
          <div className="bg-card border border-primary/30 rounded-2xl p-6 space-y-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Select Newspaper:</h3>
              <RadioGroup value={selectedNewspaper} onValueChange={setSelectedNewspaper}>
                {currentNewspapers.map((newspaper) => (
                  <div key={newspaper.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={newspaper.id} id={newspaper.id} />
                    <Label 
                      htmlFor={newspaper.id} 
                      className="text-base cursor-pointer hover:text-primary transition-colors"
                    >
                      {newspaper.displayName}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="border-t border-primary/20 pt-4 space-y-3">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 text-center space-y-3">
                <Newspaper className="w-16 h-16 mx-auto text-primary" />
                <h4 className="text-xl font-bold gradient-text">{currentNewspaper.displayName}</h4>
                <p className="text-sm text-muted-foreground">
                  Click below to read today's edition
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => window.open(currentNewspaper.epaperUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open E-Paper (Today's Edition)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(currentNewspaper.url, '_blank')}
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewspaperSection;