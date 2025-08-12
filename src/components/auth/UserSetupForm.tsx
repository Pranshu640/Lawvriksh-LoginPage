import { motion } from 'framer-motion';

interface UserSetupFormProps {
  userName: string;
  error: string;
  onUserNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const UserSetupForm = ({
  userName,
  error,
  onUserNameChange,
  onSubmit
}: UserSetupFormProps) => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What should we call you?
      </motion.h2>
      <motion.p 
        className="subtitle"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        This is the last step, we promise! Let us know what name to use on your new profile.
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
          className="inputGroup NameInput"
          initial={{ opacity: 0, x: -20, height: 0 }}
          animate={{ opacity: 1, x: 0, height: "auto" }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <label htmlFor="userName">Enter your Name</label>
          <motion.input
            type="text"
            id="userName"
            placeholder="Enter your Name"
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.button 
          type="submit" 
          className="loginButton NameButton"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Next
        </motion.button>
      </motion.form>
    </>
  );
};

export default UserSetupForm;