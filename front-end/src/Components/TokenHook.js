// TokenHook.js
import { useState, useEffect } from 'react';

const TokenHook = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token); // Convert token to a boolean value
  }, []);

  return hasToken;
};

export default TokenHook;