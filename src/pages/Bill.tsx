import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Home, Printer } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const Bill = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const date = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />

      <div
        className="fixed top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl space-y-8">
          <div className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-8 glow-pink shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

            <div className="relative space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h1 className="text-4xl font-bold gradient-text">LUMINA</h1>
                  <p className="text-muted-foreground">Digital Learning Hub</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-semibold text-primary">Invoice #INV-{Math.floor(Math.random() * 900000 + 100000)}</p>
                  <p className="text-sm text-muted-foreground">{date}</p>
                </div>
              </div>

              <div className="border-y border-primary/20 py-6 flex justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Billed To</p>
                  <p className="text-xl font-bold">{userData.name || 'Valued Student'}</p>
                  <p className="text-muted-foreground">{userData.email}</p>
                  <p className="text-sm text-muted-foreground">{userData.city}, {userData.state}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Status</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-500 font-medium border border-green-500/30">
                    <CheckCircle className="w-4 h-4" />
                    Paid
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex justify-between items-center">
                  <div>
                    <p className="font-bold">LUMINA Quest Full Access</p>
                    <p className="text-sm text-muted-foreground">One-time registration fee for AI-powered learning quest</p>
                  </div>
                  <p className="text-lg font-bold text-primary">₹159.00</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-primary/20 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹159.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">GST (0%)</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold pt-2">
                  <span className="gradient-text">Total</span>
                  <span className="text-primary">₹159.00</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 no-print">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex-1 border-primary/30 hover:bg-primary/10 rounded-xl py-6"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Receipt
                </Button>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all glow-pink rounded-xl py-6"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground text-sm no-print">
            Thank you for choosing LUMINA for your learning journey!
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .glow-pink { box-shadow: none !important; border: 1px solid #ddd !important; }
          .bg-card { background: white !important; }
          .text-primary { color: black !important; }
          .gradient-text { background: none !important; color: black !important; -webkit-text-fill-color: black !important; }
        }
      `}</style>
    </div>
  );
};

export default Bill;
