"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Mock data for demo
const mockTokens = [
  { name: "PEPE 2.0", symbol: "PEPE2", chain: "ETH", price: "$0.00001234", change: "+245%", volume: "$1.2M", status: "new" },
  { name: "Shiba Inu", symbol: "SHIB", chain: "ETH", price: "$0.00002789", change: "+18%", volume: "$450M", status: "trending" },
  { name: "Floki", symbol: "FLOKI", chain: "BSC", price: "$0.000156", change: "+67%", volume: "$89M", status: "hot" },
  { name: "Bonk", symbol: "BONK", chain: "SOL", price: "$0.000034", change: "+12%", volume: "$234M", status: "stable" },
  { name: "WIF", symbol: "WIF", chain: "SOL", price: "$2.45", change: "+89%", volume: "$567M", status: "trending" },
];

const mockTrades = [
  { token: "PEPE2", action: "BUY", amount: "0.5 ETH", price: "$0.00001234", time: "2s ago", status: "success", pnl: "+$1,234" },
  { token: "SHIB", action: "SELL", amount: "100M SHIB", price: "$0.00002789", time: "15s ago", status: "success", pnl: "+$567" },
  { token: "FLOKI", action: "BUY", amount: "0.2 BNB", price: "$0.000156", time: "1m ago", status: "pending", pnl: "..." },
  { token: "BONK", action: "BUY", amount: "2 SOL", price: "$0.000034", time: "3m ago", status: "success", pnl: "+$890" },
  { token: "WIF", action: "SELL", amount: "50 WIF", price: "$2.45", time: "5m ago", status: "success", pnl: "+$2,345" },
];

const mockMempool = [
  { hash: "0x1a2b...3c4d", type: "Add Liquidity", token: "NEW TOKEN", amount: "10 ETH", gas: "45 Gwei", time: "0.5s" },
  { hash: "0x5e6f...7g8h", type: "Swap", token: "USDC → ETH", amount: "50,000 USDC", gas: "32 Gwei", time: "1.2s" },
  { hash: "0x9i0j...1k2l", type: "Remove Liquidity", token: "PEPE2", amount: "100 ETH", gas: "67 Gwei", time: "2.1s" },
  { hash: "0xm3n4...5o6p", type: "Approve", token: "SHIB", amount: "∞", gas: "28 Gwei", time: "3.4s" },
];

const chains = [
  { name: "Ethereum", symbol: "ETH", color: "#627EEA", icon: "Ξ" },
  { name: "BSC", symbol: "BSC", color: "#F0B90B", icon: "◆" },
  { name: "Solana", symbol: "SOL", color: "#00FFA3", icon: "◎" },
];

export default function Home() {
  const [activeChain, setActiveChain] = useState("ETH");
  const [isConnected, setIsConnected] = useState(true);
  const [sniperActive, setSniperActive] = useState(true);
  const [stats, setStats] = useState({
    totalProfit: "$45,678",
    winRate: "78%",
    totalTrades: "234",
    activeSnipers: "3",
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalProfit: `$${(45678 + Math.random() * 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
        totalTrades: String(234 + Math.floor(Math.random() * 5)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 h-full glass border-r border-[var(--color-border-glow)] z-50">
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
              WRAITH
            </h1>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Web3 Sniper Bot</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(0,229,255,0.1)] border border-[var(--color-border-glow)] text-[var(--color-accent)]">
              <span className="text-lg">🎯</span>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/scanner" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[rgba(0,229,255,0.05)] hover:border hover:border-[var(--color-border-glow)] transition-all">
              <span className="text-lg">🔍</span>
              <span className="font-medium">Token Scanner</span>
            </Link>
            <Link href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[rgba(0,229,255,0.05)] hover:border hover:border-[var(--color-border-glow)] transition-all">
              <span className="text-lg">📊</span>
              <span className="font-medium">Trade History</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[rgba(0,229,255,0.05)] hover:border hover:border-[var(--color-border-glow)] transition-all">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Settings</span>
            </Link>
          </nav>

          {/* Chain Selector */}
          <div className="mt-8">
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Active Chain</p>
            <div className="space-y-2">
              {chains.map((chain) => (
                <button
                  key={chain.symbol}
                  onClick={() => setActiveChain(chain.symbol)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeChain === chain.symbol
                      ? "bg-[rgba(0,229,255,0.1)] border border-[var(--color-border-glow)]"
                      : "hover:bg-[rgba(255,255,255,0.03)]"
                  }`}
                >
                  <span className="text-lg" style={{ color: chain.color }}>{chain.icon}</span>
                  <span className={`font-medium ${activeChain === chain.symbol ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"}`}>
                    {chain.name}
                  </span>
                  {activeChain === chain.symbol && (
                    <span className="ml-auto status-dot online"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sniper Status */}
          <div className="mt-8 glass-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Sniper Status</span>
              <span className={`status-dot ${sniperActive ? "online" : "offline"}`}></span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSniperActive(!sniperActive)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  sniperActive
                    ? "bg-[var(--color-success)] text-black"
                    : "bg-[var(--color-danger)] text-white"
                }`}
              >
                {sniperActive ? "ACTIVE" : "PAUSED"}
              </button>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              Monitoring {activeChain} mempool...
            </p>
          </div>

          {/* Wallet */}
          <div className="mt-4 glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Wallet</span>
              <span className="status-dot online"></span>
            </div>
            <p className="text-xs font-mono text-[var(--color-text-secondary)]">0x16DA...bf0F</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold gradient-text">2.45</span>
              <span className="text-sm text-[var(--color-text-secondary)]">ETH</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sniper Dashboard
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-1">
              Real-time {activeChain} mempool monitoring & auto-snipe
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-card py-2 px-4 flex items-center gap-2">
              <span className="status-dot online pulse-glow"></span>
              <span className="text-sm">Connected</span>
            </div>
            <button className="btn-primary">
              + New Sniper
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--color-text-secondary)]">Total Profit</span>
              <span className="text-[var(--color-success)]">↑ 12.5%</span>
            </div>
            <p className="text-3xl font-bold gradient-text">{stats.totalProfit}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Last 30 days</p>
          </div>
          <div className="glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--color-text-secondary)]">Win Rate</span>
              <span className="text-[var(--color-success)]">↑ 3.2%</span>
            </div>
            <p className="text-3xl font-bold text-[var(--color-success)]">{stats.winRate}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">183/234 trades</p>
          </div>
          <div className="glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--color-text-secondary)]">Total Trades</span>
              <span className="text-[var(--color-accent)]">Live</span>
            </div>
            <p className="text-3xl font-bold text-[var(--color-text-primary)]">{stats.totalTrades}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">All time</p>
          </div>
          <div className="glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--color-text-secondary)]">Active Snipers</span>
              <span className="text-[var(--color-accent-purple)]">3/5</span>
            </div>
            <p className="text-3xl font-bold text-[var(--color-accent-purple)]">{stats.activeSnipers}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Running now</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mempool Monitor */}
          <div className="lg:col-span-2 glass-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Mempool Monitor</h3>
              <div className="flex items-center gap-2">
                <span className="status-dot online pulse-glow"></span>
                <span className="text-xs text-[var(--color-text-muted)]">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              {mockMempool.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,229,255,0.03)] transition-all">
                  <div className="flex items-center gap-3">
                    <span className={`tag ${
                      tx.type === "Add Liquidity" ? "tag-success" :
                      tx.type === "Remove Liquidity" ? "tag-danger" :
                      tx.type === "Swap" ? "tag-info" : "tag-warning"
                    }`}>
                      {tx.type}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{tx.token}</p>
                      <p className="text-xs text-[var(--color-text-muted)] font-mono">{tx.hash}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{tx.amount}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{tx.gas} • {tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <span>🎯</span> Quick Snipe
              </button>
              <button className="w-full py-3 rounded-xl bg-[rgba(168,85,247,0.2)] border border-[rgba(168,85,247,0.3)] text-[var(--color-accent-purple)] font-medium hover:bg-[rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2">
                <span>🔍</span> Scan Token
              </button>
              <button className="w-full py-3 rounded-xl bg-[rgba(0,230,118,0.1)] border border-[rgba(0,230,118,0.2)] text-[var(--color-success)] font-medium hover:bg-[rgba(0,230,118,0.2)] transition-all flex items-center justify-center gap-2">
                <span>📊</span> View Analytics
              </button>
              <button className="w-full py-3 rounded-xl bg-[rgba(255,82,82,0.1)] border border-[rgba(255,82,82,0.2)] text-[var(--color-danger)] font-medium hover:bg-[rgba(255,82,82,0.2)] transition-all flex items-center justify-center gap-2">
                <span>🚨</span> Emergency Stop
              </button>
            </div>

            {/* Active Snipers */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Active Snipers</h4>
              <div className="space-y-2">
                {[
                  { name: "Liquidity Sniper", chain: "ETH", status: "watching" },
                  { name: "Volume Bot", chain: "BSC", status: "active" },
                  { name: "Mempool Sniper", chain: "SOL", status: "watching" },
                ].map((sniper, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[rgba(0,0,0,0.2)]">
                    <div>
                      <p className="text-sm font-medium">{sniper.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{sniper.chain}</p>
                    </div>
                    <span className={`tag ${sniper.status === "active" ? "tag-success" : "tag-warning"}`}>
                      {sniper.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hot Tokens */}
        <div className="mt-6 glass-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Hot Tokens</h3>
            <Link href="/scanner" className="text-sm text-[var(--color-accent)] hover:underline">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table-glass">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Chain</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Volume</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockTokens.map((token, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-purple)] flex items-center justify-center text-xs font-bold">
                          {token.symbol[0]}
                        </div>
                        <div>
                          <p className="font-medium">{token.name}</p>
                          <p className="text-xs text-[var(--color-text-muted)]">{token.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`tag ${
                        token.chain === "ETH" ? "tag-info" :
                        token.chain === "BSC" ? "tag-warning" : "tag-success"
                      }`}>
                        {token.chain}
                      </span>
                    </td>
                    <td className="font-mono">{token.price}</td>
                    <td className="text-[var(--color-success)]">{token.change}</td>
                    <td>{token.volume}</td>
                    <td>
                      <span className={`tag ${
                        token.status === "new" ? "tag-info" :
                        token.status === "trending" ? "tag-success" :
                        token.status === "hot" ? "tag-danger" : "tag-warning"
                      }`}>
                        {token.status}
                      </span>
                    </td>
                    <td>
                      <button className="px-3 py-1 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[var(--color-border-glow)] text-[var(--color-accent)] text-sm hover:bg-[rgba(0,229,255,0.2)] transition-all">
                        Snipe
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="mt-6 glass-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Trades</h3>
            <Link href="/history" className="text-sm text-[var(--color-accent)] hover:underline">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {mockTrades.map((trade, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,229,255,0.03)] transition-all">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    trade.action === "BUY" ? "bg-[rgba(0,230,118,0.2)] text-[var(--color-success)]" : "bg-[rgba(255,82,82,0.2)] text-[var(--color-danger)]"
                  }`}>
                    {trade.action === "BUY" ? "↑" : "↓"}
                  </span>
                  <div>
                    <p className="font-medium">{trade.action} {trade.token}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{trade.amount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${trade.pnl.startsWith("+") ? "text-[var(--color-success)]" : "text-[var(--color-text-secondary)]"}`}>
                    {trade.pnl}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{trade.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-[var(--color-text-muted)]">
          <p>WRAITH © 2026 — Built with Next.js & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}
