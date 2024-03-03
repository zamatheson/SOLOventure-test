import React from 'react';
import { createBrowserHistory } from 'history';
import { login, register } from '../utils/auth';
import { useState } from 'react';

const history = createBrowserHistory();

function NavBar() {
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

  const handleGoToJournal = () => {
    history.push('/journal');
  };

  const handleGoToCommunities = () => {
    history.push('/communities');
  };

  return (
    <nav>
      <div className='buttonContainer'>
        <button onClick={handleGoToJournal}>Go to Journal</button>
        <button onClick={handleGoToCommunities}>Go to Communities</button>
        <button onClick={handleLogin}>Login</button> 
        <button onClick={handleSignup}>Signup</button>
      </div>
    </nav>
  );
};

export default NavBar;
