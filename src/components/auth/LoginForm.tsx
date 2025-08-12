import { motion } from 'framer-motion';
import { useState } from 'react';

interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  error: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSocialLogin: (provider: 'google' | 'linkedin') => void;
  onSwitchToSignup: () => void;
}

const LoginForm = ({
  email,
  password,
  rememberMe,
  error,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
  onSocialLogin,
  onSwitchToSignup
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome Back!
      </motion.h2>
      <motion.p 
        className="subtitle"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        To access your account, please enter your email and the password
      </motion.p>
      
      <motion.form 
        onSubmit={onSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {error && (
          <motion.p 
            className="errorMessage"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        
        <motion.div 
          className="inputGroup"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="email">Email</label>
          <motion.input
            type="email"
            id="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div 
          className="inputGroup"
          initial={{ opacity: 0, x: -20, height: 0 }}
          animate={{ opacity: 1, x: 0, height: "auto" }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <label htmlFor="password">Password</label>
          <div className="passwordInputContainer">
            <motion.input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <motion.button 
              type="button" 
              className="passwordToggle"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="options"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <label>
            <motion.input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => onRememberMeChange(e.target.checked)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            Remember me
          </label>
          <motion.a 
            href="#" 
            onClick={(e) => { e.preventDefault(); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Forgot password?
          </motion.a>
        </motion.div>

        <motion.button 
          type="submit" 
          className="loginButton"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Log In
        </motion.button>

        <motion.div 
          className="socialLogin"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div 
            className="divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span>OR</span>
          </motion.div>
          <motion.div 
            className="socialButtons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button 
              type="button" 
              className="socialButton googleButton"
              onClick={() => onSocialLogin('google')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <img src="/Logos/Google.png" alt="Google"/>
            </motion.button>
            <motion.button 
              type="button" 
              className="socialButton linkedinButton"
              onClick={() => onSocialLogin('linkedin')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <img src="/Logos/Linkedin.png" alt="LinkedIn"/>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.form>

      <motion.div 
        className="switchMode"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p>
          Don't have an account? 
          <motion.button 
            type="button" 
            className="switchModeButton"
            onClick={onSwitchToSignup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign up
          </motion.button>
        </p>
      </motion.div>
    </>
  );
};

export default LoginForm;