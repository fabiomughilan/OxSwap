import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Extracted CSS from <style>
import { ScrollCard } from './components/ScrollCard';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { SearchFilterBar } from './components/SearchFilterBar';
import { ActivityFeed } from './components/ActivityFeed';
import { ActionModal } from './components/ActionModal';
import { ConfirmModal } from './components/ConfirmModal';
import { Toast } from './components/Toast';
import { ParticleBackground } from './components/ParticleBackground';

export default function SwapScrollsDashboard() {
  const [scrolls, setScrolls] = useState([
    { id: 1, fromChain: 'Polygon', toChain: 'Sui', tokenIn: 'MATIC', tokenOut: 'SUI', amount: '10', status: 'Minted', rare: true, createdAt: Date.now() - 200000 },
    { id: 2, fromChain: 'Ethereum', toChain: 'Sui', tokenIn: 'ETH', tokenOut: 'SUI', amount: '0.14', status: 'Pending', rare: false, createdAt: Date.now() - 113000 },
    { id: 3, fromChain: 'Polygon', toChain: 'Near', tokenIn: 'MATIC', tokenOut: 'NEAR', amount: '15', status: 'Swapped', rare: false, createdAt: Date.now() - 80000 },
    { id: 4, fromChain: 'Polygon', toChain: 'Sui', tokenIn: 'USDC', tokenOut: 'SUI', amount: '25', status: 'Minted', rare: false, createdAt: Date.now() - 43000 }
  ]);

  const [activityFeed, setActivityFeed] = useState([
    { icon: "🪄", text: "Minted 10 MATIC → SUI", ts: Date.now() - 180000 },
    { icon: "🔥", text: "Swapped 0.14 ETH → SUI", ts: Date.now() - 70000 },
    { icon: "🎁", text: "Gifted a SwapScroll to 0xA9...1D3", ts: Date.now() - 59000 },
  ]);

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [selectedScroll, setSelectedScroll] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleBurn = id => {
    const updated = scrolls.map(s => s.id === id ? { ...s, status: 'Swapped' } : s);
    setScrolls(updated);
    const burnt = scrolls.find(s => s.id === id);
    setActivityFeed([{ icon: '🔥', text: Burned and swapped ${burnt.amount} ${burnt.tokenIn}, ts: Date.now() }, ...activityFeed]);
    showToast(SwapScroll #${id} burned and cross-chain swap executed!);
  };

  const handleGift = (id, toAddr) => {
    const gifted = scrolls.find(s => s.id === id);
    setScrolls(scrolls.filter(s => s.id !== id));
    const truncated = toAddr.slice(0, 6) + '...' + toAddr.slice(-4);
    setActivityFeed([{ icon: '🎁', text: Gifted ${gifted.amount} ${gifted.tokenIn} to ${truncated}, ts: Date.now() }, ...activityFeed]);
    showToast(SwapScroll gifted to ${truncated}!);
  };

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filteredScrolls = scrolls.filter(s => {
    const matchFilter = filter === 'all' || s.status === filter;
    const searchMatch = [s.tokenIn, s.tokenOut, s.amount, s.fromChain, s.toChain].some(val => val.toLowerCase().includes(search));
    return matchFilter && (!search || searchMatch);
  });

  return (
    <div className="dashboard-container">
      <ParticleBackground />
      <Header walletAddress="0x8A...F2b4" />
      <div className="top-row">
        <h1 className="page-title">My SwapScrolls</h1>
        <div className="user-profile">
          <div className="user-circle">Ξ</div>
          <span>0x8A...F2b4</span>
        </div>
      </div>

      <StatsBar scrolls={scrolls} />
      <SearchFilterBar onSearch={setSearch} onFilter={setFilter} current={filter} />

      {filteredScrolls.length === 0 ? (
        <div className="empty-list">You don't own any SwapScrolls yet. <a href="/mint">Mint one!</a></div>
      ) : (
        <div className="gallery-grid">
          {filteredScrolls.map(s => (
            <ScrollCard
              key={s.id}
              scroll={s}
              onAction={() => setSelectedScroll(s)}
            />
          ))}
        </div>
      )}

      <ActivityFeed entries={activityFeed} />
      <ActionModal
        scroll={selectedScroll}
        onClose={() => setSelectedScroll(null)}
        onBurn={() => { setModalType('burn'); }}
        onGift={() => { setModalType('gift'); }}
      />
      <ConfirmModal
        type={modalType}
        scroll={selectedScroll}
        onCancel={() => setModalType(null)}
        onConfirm={modalType === 'burn' ? handleBurn : handleGift}
      />
      <Toast message={toast} />
    </div>
  );
}