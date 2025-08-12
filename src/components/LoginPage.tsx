import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import OTPForm from './auth/OTPForm';
import PasswordSetupForm from './auth/PasswordSetupForm';
import UserSetupForm from './auth/UserSetupForm';
import InterestsForm from './auth/InterestsForm';
import ProfessionForm from './auth/ProfessionForm';
import './auth/styles/BaseAuth.css';
import './auth/styles/MobileAuth.css';
import './auth/styles/MobilePages.css';
import './auth/styles/DesktopAuth.css';

type PageMode = 'login' | 'signup' | 'otp-verify' | 'social-confirm' | 'set-password' | 'user-setup' | 'interests' | 'profession';

const LoginPage = () => {
  const [mode, setMode] = useState<PageMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedProfession, setSelectedProfession] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [, setSocialProvider] = useState<'google' | 'linkedin' | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
  };

  // Event handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setMode('otp-verify');
  };

  const handleSocialLogin = (provider: 'google' | 'linkedin') => {
    setSocialProvider(provider);
    if (mode === 'login') {
      setIsLoggedIn(true);
    } else {
      setMode('social-confirm');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    setMode('set-password');
  };

  const handleSocialConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    setMode('set-password');
  };

  const handleSetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password || !confirmPassword) {
      setError('Please enter both password fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setMode('user-setup');
  };

  const handleUserSetup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!userName.trim()) {
      setError('Please enter your name.');
      return;
    }
    setMode('interests');
  };

  const handleInterests = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (selectedInterests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    if (selectedInterests.length > 3) {
      setError('Please select a maximum of 3 interests.');
      return;
    }
    setMode('profession');
  };

  const handleProfession = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!selectedProfession) {
      setError('Please select your profession.');
      return;
    }
    setIsLoggedIn(true);
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        // Remove if already selected
        return prev.filter(i => i !== interest);
      } else if (prev.length < 3) {
        // Add if less than 3 selected
        return [...prev, interest];
      }
      // Don't add if already at max (3)
      return prev;
    });
  };

  const handleResendOTP = () => {
    setError('');
    setOtp(['', '', '', '', '', '']);
    console.log('OTP resent');
  };

  // Progress calculation
  const getProgress = () => {
    switch (mode) {
      case 'user-setup': return 33;
      case 'interests': return 66;
      case 'profession': return 100;
      default: return 0;
    }
  };

  const showProgressBar = mode === 'user-setup' || mode === 'interests' || mode === 'profession';
  const showFullBackground = mode === 'user-setup' || mode === 'interests' || mode === 'profession';

  // Success screen
  if (isLoggedIn) {
    return (
      <motion.div
        className="loggedInContainer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="successCard"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="successIcon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Welcome to LawVriksh!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            You have successfully logged in. Ready to create amazing content?
          </motion.p>
          <motion.button
            className="continueButton"
            onClick={() => window.location.reload()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Render current form
  const renderCurrentForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            email={email}
            password={password}
            rememberMe={rememberMe}
            error={error}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onRememberMeChange={setRememberMe}
            onSubmit={handleLogin}
            onSocialLogin={handleSocialLogin}
            onSwitchToSignup={() => setMode('signup')}
          />
        );
      case 'signup':
        return (
          <SignupForm
            email={email}
            error={error}
            onEmailChange={setEmail}
            onSubmit={handleSendOTP}
            onSocialLogin={handleSocialLogin}
            onSwitchToLogin={() => setMode('login')}
          />
        );
      case 'otp-verify':
        return (
          <OTPForm
            title="Glad to have you!"
            subtitle="To access your account, please enter your email and we will send you OTP for verification"
            email={email}
            otp={otp}
            error={error}
            showEmail={true}
            buttonText="Verify Email"
            onOtpChange={handleOtpChange}
            onSubmit={handleVerifyOTP}
            onResendOTP={handleResendOTP}
          />
        );
      case 'social-confirm':
        return (
          <OTPForm
            title="Check Your Inbox!"
            subtitle="We've sent a 6-digit magic code to your email. Go find it and type it in below to continue."
            otp={otp}
            error={error}
            showEmail={false}
            buttonText="Continue"
            onOtpChange={handleOtpChange}
            onSubmit={handleSocialConfirm}
            onResendOTP={handleResendOTP}
          />
        );
      case 'set-password':
        return (
          <PasswordSetupForm
            password={password}
            confirmPassword={confirmPassword}
            error={error}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onSubmit={handleSetPassword}
          />
        );
      case 'user-setup':
        return (
          <UserSetupForm
            userName={userName}
            error={error}
            onUserNameChange={setUserName}
            onSubmit={handleUserSetup}
          />
        );
      case 'interests':
        return (
          <InterestsForm
            selectedInterests={selectedInterests}
            error={error}
            onToggleInterest={toggleInterest}
            onSubmit={handleInterests}
            onBack={() => setMode('user-setup')}
          />
        );
      case 'profession':
        return (
          <ProfessionForm
            selectedProfession={selectedProfession}
            error={error}
            onProfessionChange={setSelectedProfession}
            onSubmit={handleProfession}
            onBack={() => setMode('interests')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`loginPage ${showFullBackground ? 'fullBackground' : ''}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AnimatePresence>
        {showProgressBar && (
          <motion.div
            className="progressBar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="progressFill"
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showFullBackground && (
          <motion.div
            className="imageSection"
            variants={itemVariants}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.img
              src="/46536f06c88c5e0eff7a6536a7762f3bd445c0ac.png"
              alt="Lawvriksh Tree"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.div
              className="imageText"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                For your rightful place in the creator economy.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className='imageTextBottom'
              >
                Your peers are about to start producing high-value content in minutes, not days. Don't get left behind.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`formSection ${showFullBackground ? 'fullWidth' : ''}`}
        variants={itemVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Mobile Logo */}
        <motion.div
          className="mobileLogoContainer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="mobileLogo">LawVriksh</h1>
        </motion.div>

        <motion.div
          className="formContainer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >


          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              className="loginForm"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {renderCurrentForm()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;