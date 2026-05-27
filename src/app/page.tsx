"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const mockTokens = [
  { name: "PEPE 2.0", symbol: "PEPE2", chain: "ETH", price: "$0.00001234", change: "+245%", volume: "$1.2M", status: "new" },
  { name: "Shiba Inu", symbol: "SHIB", chain: "ETH", price: "$0.00002789", change: "+18%", volume: "$450M", status: "trending" },
  { name: "Floki", symbol: "FLOKI", chain: "BSC", price: "$0.000156", change: "+67%", volume: "$89M", status: "hot" },
  { name: "Bonk", symbol: "BONK", chain: "SOL", price: "$0.000034", change: "+12%", volume: "$234M", status: "stable" },
  { name: "WIF", symbol: "WIF", chain: "SOL", price: "$2.45", change: "+89%", volume: "$567M", status: "trending" },
];

const mockTrades = [
  { token: "PEPE2", action: "BUY", amount: "0.5 ETH", time: "2s ago", pnl: "+$1,234" },
  { token: "SHIB", action: "SELL", amount: "100M SHIB", time: "15s ago", pnl: "+$567" },
  { token: "FLOKI", action: "BUY", amount: "0.2 BNB", time: "1m ago", pnl: "..." },
  { token: "BONK", action: "BUY", amount: "2 SOL", time: "3m ago", pnl: "+$890" },
  { token: "WIF", action: "SELL", amount: "50 WIF", time: "5m ago", pnl: "+$2,345" },
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

const sidebarTokens = [
  { name: "APE 2.0", price: "$0.0000123", change: "+245%", color: "#00e5ff" },
  { name: "Shiba Inu", price: "$0.0000278", change: "+18%", color: "#F0B90B" },
  { name: "Pepe", price: "$0.0000345", change: "+67%", color: "#00e676" },
  { name: "Doge", price: "$0.0000567", change: "+12%", color: "#a855f7" },
  { name: "INU", price: "$0.0000890", change: "+89%", color: "#f472b6" },
];

export default function Home() {
  const [activeChain, setActiveChain] = useState("ETH");
  const [sniperActive, setSniperActive] = useState(true);
  const [stats, setStats] = useState({
    totalProfit: "$45,678",
    winRate: "78%",
    totalTrades: "234",
    activeSnipers: "3",
  });

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
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <h1 className="gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>WRAITH</h1>
          <p>WEB3 SNIPER BOT</p>
        </div>

        {/* Navigation */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Navigation</div>
          <nav>
            <Link href="/" className="sidebar-nav-item active">
              <span className="icon">🎯</span>
              <span>Dashboard</span>
            </Link>
            <Link href="/scanner" className="sidebar-nav-item">
              <span className="icon">🔍</span>
              <span>Token Scanner</span>
            </Link>
            <Link href="/history" className="sidebar-nav-item">
              <span className="icon">📊</span>
              <span>Trade History</span>
            </Link>
            <Link href="/settings" className="sidebar-nav-item">
              <span className="icon">⚙️</span>
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Chain Selector */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Active Chain</div>
          {chains.map((chain) => (
            <button
              key={chain.symbol}
              onClick={() => setActiveChain(chain.symbol)}
              className={`sidebar-chain-btn ${activeChain === chain.symbol ? "active" : ""}`}
            >
              <span className="icon" style={{ color: chain.color }}>{chain.icon}</span>
              <span>{chain.name}</span>
              {activeChain === chain.symbol && (
                <span className="status-dot online" style={{ marginLeft: "auto" }}></span>
              )}
            </button>
          ))}
        </div>

        {/* Sniper Status */}
        <div className="sidebar-card">
          <div className="sidebar-card-header">
            <span className="sidebar-card-title">Sniper Status</span>
            <span className={`status-dot ${sniperActive ? "online" : "offline"}`}></span>
          </div>
          <button
            onClick={() => setSniperActive(!sniperActive)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              background: sniperActive ? "var(--color-success)" : "var(--color-danger)",
              color: sniperActive ? "#000" : "#fff",
              transition: "all 0.2s ease",
            }}
          >
            {sniperActive ? "ACTIVE" : "PAUSED"}
          </button>
          <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "6px" }}>
            Monitoring {activeChain} mempool...
          </p>
        </div>

        {/* Wallet */}
        <div className="sidebar-card">
          <div className="sidebar-card-header">
            <span className="sidebar-card-title">Wallet</span>
            <span className="status-dot online"></span>
          </div>
          <div className="sidebar-wallet-address">0x16DA...bf0F</div>
          <div className="sidebar-wallet-balance">
            <span className="amount gradient-text">2.45</span>
            <span className="unit">ETH</span>
          </div>
        </div>

        {/* Hot Tokens */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Hot Tokens</div>
          {sidebarTokens.map((token, i) => (
            <div key={i} className="sidebar-token">
              <div className="sidebar-token-icon" style={{ background: `${token.color}22`, color: token.color }}>
                {token.name[0]}
              </div>
              <div className="sidebar-token-info">
                <div className="sidebar-token-name">{token.name}</div>
                <div className="sidebar-token-price">{token.price}</div>
              </div>
              <div className="sidebar-token-change" style={{ color: "var(--color-success)" }}>
                {token.change}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Trades */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Recent Trades</div>
          {mockTrades.map((trade, i) => (
            <div key={i} className="sidebar-trade">
              <div
                className="sidebar-trade-icon"
                style={{
                  background: trade.action === "BUY" ? "rgba(0,230,118,0.15)" : "rgba(255,82,82,0.15)",
                  color: trade.action === "BUY" ? "var(--color-success)" : "var(--color-danger)",
                }}
              >
                {trade.action === "BUY" ? "↑" : "↓"}
              </div>
              <div className="sidebar-trade-info">
                <div className="sidebar-trade-action">{trade.action} {trade.token}</div>
                <div className="sidebar-trade-time">{trade.time}</div>
              </div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-success)" }}>
                {trade.pnl}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
              Sniper Dashboard
            </h2>
            <p style={{ color: "var(--color-text-secondary)", marginTop: "4px", fontSize: "14px" }}>
              Real-time {activeChain} mempool monitoring & auto-snipe
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="glass-card" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="status-dot online pulse-glow"></span>
              <span style={{ fontSize: "13px" }}>Connected</span>
            </div>
            <button className="btn-primary">+ New Sniper</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div className="glass-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Total Profit</span>
              <span style={{ fontSize: "12px", color: "var(--color-success)" }}>↑ 12.5%</span>
            </div>
            <p style={{ fontSize: "28px", fontWeight: 700 }} className="gradient-text">{stats.totalProfit}</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>Last 30 days</p>
          </div>
          <div className="glass-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Win Rate</span>
              <span style={{ fontSize: "12px", color: "var(--color-success)" }}>↑ 3.2%</span>
            </div>
            <p style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-success)" }}>{stats.winRate}</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>183/234 trades</p>
          </div>
          <div className="glass-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Total Trades</span>
              <span style={{ fontSize: "12px", color: "var(--color-accent)" }}>Live</span>
            </div>
            <p style={{ fontSize: "28px", fontWeight: 700 }}>{stats.totalTrades}</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>All time</p>
          </div>
          <div className="glass-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Active Snipers</span>
              <span style={{ fontSize: "12px", color: "var(--color-accent-purple)" }}>3/5</span>
            </div>
            <p style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-accent-purple)" }}>{stats.activeSnipers}</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>Running now</p>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
          {/* Mempool Monitor */}
          <div className="glass-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Mempool Monitor</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="status-dot online pulse-glow"></span>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Live</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {mockMempool.map((tx, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(0,0,0,0.3)",
                  transition: "all 0.2s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className={`tag ${
                      tx.type === "Add Liquidity" ? "tag-success" :
                      tx.type === "Remove Liquidity" ? "tag-danger" :
                      tx.type === "Swap" ? "tag-info" : "tag-warning"
                    }`}>
                      {tx.type}
                    </span>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 500 }}>{tx.token}</p>
                      <p style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>{tx.hash}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "13px", fontWeight: 500 }}>{tx.amount}</p>
                    <p style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{tx.gas} • {tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card">
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button className="btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                🎯 Quick Snipe
              </button>
              <button style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid rgba(168,85,247,0.3)",
                background: "rgba(168,85,247,0.15)",
                color: "var(--color-accent-purple)",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}>
                🔍 Scan Token
              </button>
              <button style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid rgba(0,230,118,0.2)",
                background: "rgba(0,230,118,0.1)",
                color: "var(--color-success)",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}>
                📊 View Analytics
              </button>
              <button style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid rgba(255,82,82,0.2)",
                background: "rgba(255,82,82,0.1)",
                color: "var(--color-danger)",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}>
                🚨 Emergency Stop
              </button>
            </div>

            {/* Active Snipers */}
            <div style={{ marginTop: "24px" }}>
              <h4 style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Active Snipers
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { name: "Liquidity Sniper", chain: "ETH", status: "watching" },
                  { name: "Volume Bot", chain: "BSC", status: "active" },
                  { name: "Mempool Sniper", chain: "SOL", status: "watching" },
                ].map((sniper, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.2)",
                  }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 500 }}>{sniper.name}</p>
                      <p style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{sniper.chain}</p>
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

        {/* Hot Tokens Table */}
        <div className="glass-card" style={{ marginTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Hot Tokens</h3>
            <Link href="/scanner" style={{ fontSize: "13px", color: "var(--color-accent)", textDecoration: "none" }}>
              View All →
            </Link>
          </div>
          <div style={{ overflowX: "auto" }}>
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
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-purple))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>
                          {token.symbol[0]}
                        </div>
                        <div>
                          <p style={{ fontWeight: 500 }}>{token.name}</p>
                          <p style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{token.symbol}</p>
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
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>{token.price}</td>
                    <td style={{ color: "var(--color-success)", fontWeight: 500 }}>{token.change}</td>
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
                      <button className="snipe-btn">Snipe</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: "32px", textAlign: "center", fontSize: "11px", color: "var(--color-text-muted)" }}>
          <p>WRAITH © 2026 — Built with Next.js & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}
