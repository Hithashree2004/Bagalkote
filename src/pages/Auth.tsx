import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import { toast } from 'sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [school, setSchool] = useState('');
  const [purpose, setPurpose] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge.toString());
    }
  }, [dob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      // Save user data to localStorage
      const userData = {
        phone,
        name,
        dob,
        age,
        classLevel,
        city,
        state,
        school,
        purpose
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      toast.success('Account created successfully!');
    } else {
      // Mock login - in real app, verify credentials
      toast.success('Welcome back!');
    }
    navigate('/dashboard');
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
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-8 glow-pink">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            <div className="relative space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mx-auto glow-pink">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold gradient-text">
                  {isLogin ? 'Welcome Back' : 'Join LUMINA'}
                </h2>
                <p className="text-muted-foreground">
                  {isLogin ? 'Continue your learning journey' : 'Start your AI-powered adventure'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="text"
                        placeholder="Auto-calculated"
                        value={age}
                        readOnly
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Input
                        id="class"
                        type="text"
                        placeholder="Enter your class/grade (e.g., 10th Grade)"
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        type="text"
                        placeholder="Enter your state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school">School Name (Optional)</Label>
                      <Input
                        id="school"
                        type="text"
                        placeholder="Enter your school name"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Purpose</Label>
                      <Select value={purpose} onValueChange={setPurpose}>
                        <SelectTrigger className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl">
                          <SelectValue placeholder="Select your purpose" />
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
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all glow-pink rounded-xl py-6"
                  size="lg"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <span className="text-primary font-semibold">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
