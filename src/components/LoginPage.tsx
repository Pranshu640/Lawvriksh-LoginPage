import { useState, useRef } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState<string[]>(['', '', '', '']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState('');

  const handlePasscodeChange = (index: number, value: string) => {
    if (value.length > 1 || !/^[0-9]?$/.test(value)) return;

    const newPasscode = [...passcode];
    newPasscode[index] = value;
    setPasscode(newPasscode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !passcode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fullPasscode = passcode.join('');

    if (!email || fullPasscode.length !== 4) {
      setError('Please enter your email and the 4-digit passcode.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, passcode: fullPasscode }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Could not connect to the server. Please try again later.');
      console.error('Login error:', err);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="loggedInContainer">
        <h1>Hello</h1>
      </div>
    );
  }

  return (
    <div className="loginPage">
      <div className="imageSection">
        <img src="/46536f06c88c5e0eff7a6536a7762f3bd445c0ac.png" alt="Lawvriksh Tree" />
        <div className="imageText">
          <h2>For your rightful place in the creator economy.</h2>
          <p>Your peers are about to start producing high-value content in minutes, not days. Don’t get left behind.</p>
        </div>
      </div>
      <div className="formSection">
        <div className="formContainer">
          <h1 className="logo">LawVriksh</h1>
          <div className="loginForm">
            <h2>Glad to have you!</h2>
            <p className="subtitle">To access your account, please enter your email and the passcode we just sent.</p>
            <form onSubmit={handleSubmit}>
            {error && <p className="errorMessage">{error}</p>}
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputGroup">
              <label>Passcode</label>
              <div className="passcodeInputs">
                {passcode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePasscodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    required
                  />
                ))}
              </div>
            </div>
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Resend Passcode</a>
            </div>
            <button type="submit" className="loginButton">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
