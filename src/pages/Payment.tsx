import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, QrCode } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import { toast } from 'sonner';

const Payment = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  const handleConfirmPayment = () => {
    toast.success('Payment confirmed! Generating your bill...');
    setTimeout(() => {
      navigate('/bill');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />

      <div
        className="fixed top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md space-y-8">
          <div className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-8 glow-pink">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

            <div className="relative space-y-6 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mx-auto glow-pink">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold gradient-text">Complete Payment</h2>
                <p className="text-muted-foreground">
                  Scan the QR code to pay ₹159 for full access
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl mx-auto w-64 h-64 flex flex-col items-center justify-center shadow-lg border-2 border-[#5f259f]/20 relative overflow-hidden group">
                {/* Use the provided QR code image if available */}
                <img 
                  src="/payment-qr.png" 
                  alt="PhonePe Payment QR" 
                  className="w-full h-full object-contain z-10"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PAYMENT_AWAITING_UPLOAD";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-0">
                  <p className="text-[10px] text-[#5f259f] font-bold">Awaiting PhonePe QR</p>
                </div>
              </div>

              <div className="bg-[#5f259f]/5 border border-[#5f259f]/20 rounded-xl p-4 text-xs text-muted-foreground text-left space-y-2">
                <p className="font-bold text-[#5f259f] flex items-center gap-2">
                   ✅ Success! Use the PhonePe QR you just sent:
                </p>
                <ol className="list-decimal ml-4 space-y-1 decoration-[#5f259f]">
                  <li>Right click the <strong>PhonePe image</strong> in our chat</li>
                  <li>Save as <code className="bg-[#5f259f]/10 px-1 border border-[#5f259f]/20 rounded">payment-qr.png</code></li>
                  <li>Drop it in your <code className="bg-[#5f259f]/10 px-1 border border-[#5f259f]/20 rounded">public/</code> folder</li>
                  <li>Refresh this page and it will work!</li>
                </ol>
              </div>

              <div className="space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground">Amount to Pay</p>
                  <p className="text-2xl font-bold text-primary">₹159.00</p>
                </div>

                <Button
                  onClick={handleConfirmPayment}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all glow-pink rounded-xl py-6"
                  size="lg"
                >
                  Confirm Payment
                </Button>
                
                <p className="text-xs text-muted-foreground italic">
                  *Once you pay, click Confirm to generate your receipt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
