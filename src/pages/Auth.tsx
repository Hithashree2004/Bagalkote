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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
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
      // Name validation: starts with alphabet, optional 1-2 digits at end, not only numbers
      const nameRegex = /^[A-Za-z]+[0-9]{0,2}$/;
      if (!nameRegex.test(name) || /^\d+$/.test(name)) {
        toast.error('Name must start with a letter, optional 1-2 digits at end, not only numbers.');
        return;
      }

      // Age validation: 5-100
      const calculatedAge = parseInt(age);
      if (isNaN(calculatedAge) || calculatedAge < 5 || calculatedAge > 100) {
        toast.error('Age must be between 5 and 100.');
        return;
      }

      // Email validation: standard format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Invalid email format.');
        return;
      }

      // Password validation: min 8 chars, 1 upper, 1 lower, 1 number, 1 special
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        toast.error('Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      // Save user data to localStorage
      const userData = {
        email,
        name,
        dob,
        age,
        city,
        state,
        school,
        purpose,
        password, // Save password for verification
        xp: 0 // Initialize XP for the leaderboard
      };
      // For mock purposes, we store all users in an array called 'registeredUsers'
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.some((u: any) => u.email === email);
      if (userExists) {
        toast.error('User already exists!');
        return;
      }
      existingUsers.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      localStorage.setItem('userData', JSON.stringify(userData)); // Set current logged in user
      localStorage.setItem('username', name); // Store username for greeting
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      // Email validation for login
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Invalid email format.');
        return;
      }

      // Login - verify credentials with email
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find((u: any) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('username', user.name); // Store username for greeting
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials!');
        return;
      }
    }
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
                      <Label htmlFor="city">City</Label>
                      <Select value={city} onValueChange={setCity}>
                        <SelectTrigger className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl">
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bangalore">Bangalore</SelectItem>
                          <SelectItem value="Mysore">Mysore</SelectItem>
                          <SelectItem value="Mangalore">Mangalore</SelectItem>
                          <SelectItem value="Hubli">Hubli</SelectItem>
                          <SelectItem value="Belgaum">Belgaum</SelectItem>
                          <SelectItem value="Gulbarga">Gulbarga</SelectItem>
                          <SelectItem value="Davangere">Davangere</SelectItem>
                          <SelectItem value="Bellary">Bellary</SelectItem>
                          <SelectItem value="Bijapur">Bijapur</SelectItem>
                          <SelectItem value="Shimoga">Shimoga</SelectItem>
                          <SelectItem value="Tumkur">Tumkur</SelectItem>
                          <SelectItem value="Raichur">Raichur</SelectItem>
                          <SelectItem value="Bidar">Bidar</SelectItem>
                          <SelectItem value="Hospet">Hospet</SelectItem>
                          <SelectItem value="Gadag">Gadag</SelectItem>
                          <SelectItem value="Hassan">Hassan</SelectItem>
                          <SelectItem value="Bhadravati">Bhadravati</SelectItem>
                          <SelectItem value="Chitradurga">Chitradurga</SelectItem>
                          <SelectItem value="Udupi">Udupi</SelectItem>
                          <SelectItem value="Chikmagalur">Chikmagalur</SelectItem>
                          <SelectItem value="Kolar">Kolar</SelectItem>
                          <SelectItem value="Mandya">Mandya</SelectItem>
                          <SelectItem value="Chikballapur">Chikballapur</SelectItem>
                          <SelectItem value="Bagalkot">Bagalkot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select value="Karnataka" disabled>
                        <SelectTrigger className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school">College Name (Optional)</Label>
                      <Input
                        id="school"
                        type="text"
                        placeholder="Enter your college name"
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
                          <SelectItem value="kcet">KCET</SelectItem>
                          <SelectItem value="neet">NEET</SelectItem>
                          <SelectItem value="jee_mains">JEE Main</SelectItem>
                          <SelectItem value="jee_advanced">JEE Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
