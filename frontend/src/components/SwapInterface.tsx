import React, { useState } from 'react';
import { ethers } from 'ethers';
import './LoginPage.css';

export default function WalletLoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [toast, setToast] = useState('');
  const [user, setUser] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const walletAuth = async () => {
    if (!window.ethereum) {
      showToast('MetaMask not detected!');
      return null;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const message = 0xSwap login for ${account} at ${new Date().toISOString()};
      const signature = await signer.signMessage(message);
      showToast('Wallet connected!');
      return { address: account, signature };
    } catch {
      showToast('Wallet connection cancelled.');
      return null;
    }
  };

  const handleWalletLogin = async () => {
    const walletUser = await walletAuth();
    if (walletUser) setUser(walletUser);
  };

  const logout = () => setUser(null);

  return (
    <div className="login-page">
      <h1>0xSwap</h1>
      <p className="subtitle">Connect your wallet or sign up to summon magical cross-chain swaps.</p>

      <div className="form-container">
        <div className="tabs">
          <div className={tab ${activeTab === 'login' ? 'active' : ''}} onClick={() => setActiveTab('login')}>Login</div>
          <div className={tab ${activeTab === 'signup' ? 'active' : ''}} onClick={() => setActiveTab('signup')}>Sign Up</div>
        </div>

        {user ? (
          <div className="logged-in-box">
            Connected Wallet: <strong>{user.address.slice(0, 6)}...{user.address.slice(-4)}</strong>
            <br /><button className="logout-btn" onClick={logout}>Log Out</button>
          </div>
        ) : (
          <>
            <button className="wallet-btn" onClick={handleWalletLogin}>
              <svg className="wallet-icon" viewBox="0 0 24 24"><path d="M12 0L2 7v10l10 7 10-7V7L12 0z" /></svg>
              {activeTab === 'login' ? 'Connect MetaMask Wallet' : 'Sign Up with MetaMask Wallet'}
            </button>
            <div className="divider">OR</div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Email</label>
              <input type="email" placeholder="you@email.com" required />
              <label>Password</label>
              <input type="password" placeholder="" required />
              {activeTab === 'signup' && (
                <>
                  <label>Confirm Password</label>
                  <input type="password" placeholder="" required />
                </>
              )}
              <button type="submit" className="submit-btn">{activeTab === 'login' ? 'Login' : 'Sign Up'}</button>
            </form>
          </>
        )}
      </div>

      {toast && <div id="toast" className="show">{toast}</div>}
    </div>
  );
}