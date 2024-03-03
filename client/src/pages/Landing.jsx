import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import FeaturedDestinations from '../components/FeaturedDestinations';
import { login, register } from '../utils/auth';
import Journal from './Journal';
import Communities from './Communities';


function Landing() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = { username, password };
      const result = await login(userData);
      console.log('Login result', result);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  const handleSignup = async () => {
    try {
      const userData = { username, password };
      const result = await register(userData);
      console.log('Signup result', result);
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <BrowserRouter>
      <div className="landing">
        {/* Header content */}
        <div className="header-content">
        <div className="header-content-left">
          <a href="/Homepage">
          <img className="logo" src="/img/1.png" alt="SoloVenture logo" />
          </a>
        </div>
          <p>Explore the world.</p>
          <div>
            <nav>
              <div className='buttonContainer'>
                <button> <Link className="linkButton" to="/Journal">Go to Journal</Link> </button>
                <button> <Link className="linkButton" to="/Communities">Go to Communities</Link> </button>
                <button onClick={handleSignup}>Signup</button>
              </div>
            </nav>
          </div>
        </div>
        {/* Main content */}
        <Routes>
          <Route path="/Journal" element={<Journal />} />
          <Route path="/Communities" element={<Communities />} />
          <Route path="/" element={<FeaturedDestinations />} />
        </Routes>
        <br />
        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <form className="auth-form">
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div className='footer-button'>
                <button onClick={handleLogin}>Login</button>
              </div>
            </form>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default Landing;
