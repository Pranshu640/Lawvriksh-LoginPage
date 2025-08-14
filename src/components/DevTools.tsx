import React, { useState, useEffect } from 'react';
import './DevTools.css';

interface DevToolsProps {
  onNavigate: (page: string) => void;
  onAction?: (action: string) => void;
  currentPage: string;
}

const DevTools: React.FC<DevToolsProps> = ({ onNavigate, onAction, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut to toggle dev tools (Ctrl/Cmd + D)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pages = [
    { id: 'login', name: 'Login', description: 'Login page' },
    { id: 'signup', name: 'Sign Up', description: 'Registration page' },
    { id: 'otp', name: 'OTP', description: 'OTP verification' },
    { id: 'forgot-password', name: 'Forgot Password', description: 'Password reset' },
    { id: 'profile', name: 'Profile Setup', description: 'User profile form' },
    { id: 'interests', name: 'Interests', description: 'Interest selection' },
    { id: 'profession', name: 'Profession', description: 'Profession selection' },
  ];

  const devActions = [
    { id: 'reset', name: 'Reset All', description: 'Clear all form data' },
  ];

  const handlePageSelect = (pageId: string) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  const handleActionSelect = (actionId: string) => {
    if (onAction) {
      onAction(actionId);
    }
    setIsOpen(false);
  };

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className={`devTools ${isOpen ? 'open' : ''}`}>
      <button 
        className="devToolsToggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Dev Tools"
      >
        🛠️
      </button>
      
      {isOpen && (
        <div className="devToolsPanel">
          <div className="devToolsHeader">
            <h3>Dev Navigation</h3>
            <span className="currentPage">Current: {currentPage}</span>
          </div>
          
          <div className="devToolsPages">
            {pages.map((page) => (
              <button
                key={page.id}
                className={`devToolsPageButton ${currentPage === page.id ? 'active' : ''}`}
                onClick={() => handlePageSelect(page.id)}
              >
                <span className="pageName">{page.name}</span>
                <span className="pageDescription">{page.description}</span>
              </button>
            ))}
            
            <div className="devToolsSection">
              <div className="sectionTitle">Actions</div>
              {devActions.map((action) => (
                <button
                  key={action.id}
                  className="devToolsActionButton"
                  onClick={() => handleActionSelect(action.id)}
                >
                  <span className="pageName">{action.name}</span>
                  <span className="pageDescription">{action.description}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="devToolsFooter">
            <small>Development mode only</small>
            <small>Press Ctrl/Cmd + D to toggle</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevTools;