import { motion } from 'framer-motion';
import './ProfessionForm.css';

interface ProfessionFormProps {
  selectedProfession: string;
  error: string;
  onProfessionChange: (profession: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const ProfessionForm = ({
  selectedProfession,
  error,
  onProfessionChange,
  onSubmit,
  onBack
}: ProfessionFormProps) => {
  const professions = [
    'Law Professor',
    'Law Student',
    'Other'
  ];

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        And, What Do You Do?
      </motion.h2>
      <motion.p 
        className="subtitle"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Are you a practicing lawyer, a law student, or a paralegal? Selecting your profession helps us build a better community for everyone.
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
          className="professionGrid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="row mainProfessions">
            {professions.slice(0, 2).map((profession, index) => (
              <motion.button
                key={profession}
                type="button"
                className={`professionBubble ${selectedProfession === profession ? 'selected' : ''}`}
                onClick={() => onProfessionChange(profession)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {profession}
              </motion.button>
            ))}
          </div>
          
          <motion.button
            type="button"
            className={`otherButton ${selectedProfession === 'Other' ? 'selected' : ''}`}
            onClick={() => onProfessionChange('Other')}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Other
          </motion.button>
        </motion.div>

        <motion.div 
          className="formActions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button 
            type="button"
            className="backButton"
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </motion.button>
          <motion.button 
            type="submit" 
            className="loginButton"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Finish
          </motion.button>
        </motion.div>
      </motion.form>
    </>
  );
};

export default ProfessionForm;