import { motion } from 'framer-motion';

interface SignupFormProps {
  email: string;
  error: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSocialLogin: (provider: 'google' | 'linkedin') => void;
  onSwitchToLogin: () => void;
}

const SignupForm = ({
  email,
  error,
  onEmailChange,
  onSubmit,
  onSocialLogin,
  onSwitchToLogin
}: SignupFormProps) => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Glad to have you!
      </motion.h2>
      <motion.p 
        className="subtitle"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        To access your account, please enter your email and we will send you OTP for verification
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

        <motion.button 
          type="submit" 
          className="loginButton"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Send OTP
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
              <img src="/Logos/Linkedin.png" alt="LinkedIn" />
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
          Already have an account? 
          <motion.button 
            type="button" 
            className="switchModeButton"
            onClick={onSwitchToLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log in
          </motion.button>
        </p>
      </motion.div>
    </>
  );
};

export default SignupForm;