"use client";

import { useState } from "react";
import Link from "next/link";

const mockTradeHistory = [
  { id: 1, token: "PEPE2", chain: "ETH", action: "BUY", amount: "0.5 ETH", entryPrice: "$0.00001234", exitPrice: "$0.00002468", pnl: "+$1,234", pnlPercent: "+100%", time: "2024-01-15 14:32", status: "closed", gas: "0.003 ETH" },
  { id: 2, token: "SHIB", chain: "ETH", action: "BUY", amount: "100M SHIB", entryPrice: "$0.00002789", exitPrice: "$0.00003200", pnl: "+$567", pnlPercent: "+15%", time: "2024-01-15 13:45", status: "closed", gas: "0.002 ETH" },
  { id: 3, token: "FLOKI", chain: "BSC", action: "BUY", amount: "0.2 BNB", entryPrice: "$0.000156", exitPrice: "-", pnl: "...", pnlPercent: "...", time: "2024-01-15 12:20", status: "open", gas: "0.001 BNB" },
  { id: 4, token: "BONK", chain: "SOL", action: "BUY", amount: "2 SOL", entryPrice: "$0.000034", exitPrice: "$0.000038", pnl: "+$890", pnlPercent: "+12%", time: "2024-01-15 11:15", status: "closed", gas: "0.005 SOL" },
  { id: 5, token: "WIF", chain: "SOL", action: "SELL", amount: "50 WIF", entryPrice: "$1.23", exitPrice: "$2.45", pnl: "+$2,345", pnlPercent: "+99%", time: "2024-01-15 10:08", status: "closed", gas: "0.004 SOL" },
  { id: 6, token: "DOGEK", chain: "BSC", action: "BUY", amount: "0.3 BNB", entryPrice: "$0.00000456", exitPrice: "$0.00000890", pnl: "+$789", pnlPercent: "+95%", time: "2024-01-14 22:45", status: "closed", gas: "0.002 BNB" },
  { id: 7, token: "SAFE2", chain: "ETH", action: "BUY", amount: "1 ETH", entryPrice: "$0.0000089", exitPrice: "$0.0000045", pnl: "-$456", pnlPercent: "-49%", time: "2024-01-14 20:30", status: "closed", gas: "0.004 ETH" },
  { id: 8, token: "RMOON", chain: "ETH", action: "BUY", amount: "0.1 ETH", entryPrice: "$0.0000034", exitPrice: "-", pnl: "...", pnlPercent: "...", time: "2024-01-14 18:15", status: "open", gas: "0.003 ETH" },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState("all");
  const [chainFilter, setChainFilter] = useState("all");

  const filteredTrades = mockTradeHistory.filter(t => 
    (filter === "all" || t.status === filter) &&
    (chainFilter === "all" || t.chain === chainFilter)
  );

  const totalPnl = mockTradeHistory
    .filter(t => t.status === "closed")
    .reduce((acc, t) => acc + parseFloat(t.pnl.replace(/[^0-9.-]/g, "") || "0"), 0);

  const winRate = (mockTradeHistory.filter(t => t.status === "closed" && t.pnl.startsWith("+")).length / mockTradeHistory.filter(t => t.status === "closed").length * 100).toFixed(0);

  return (
    <div className="flex min-h-screen">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Link href="/">
            <h1 className="gradient-text" style={{ fontFamily: "'Playfair Display', serif", cursor: "pointer" }}>WRAITH</h1>
          </Link>
          <p>WEB3 SNIPER BOT</p>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Navigation</div>
          <nav>
            <Link href="/" className="sidebar-nav-item">
              <span className="icon">🎯</span>
              <span>Dashboard</span>
            </Link>
            <Link href="/scanner" className="sidebar-nav-item">
              <span className="icon">🔍</span>
              <span>Token Scanner</span>
            </Link>
            <Link href="/history" className="sidebar-nav-item active">
              <span className="icon">📊</span>
              <span>Trade History</span>
            </Link>
            <Link href="/settings" className="sidebar-nav-item">
              <span className="icon">⚙️</span>
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <header style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Trade History</h2>
          <p style={{ color: "var(--color-text-secondary)", marginTop: "4px", fontSize: "14px" }}>
            Track all your sniper trades and performance
          </p>
        </header>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div className="glass-card">
            <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Total PnL</span>
            <p style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-success)", marginTop: "4px" }}>+${totalPnl.toLocaleString()}</p>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Win Rate</span>
            <p style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-success)", marginTop: "4px" }}>{winRate}%</p>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Total Trades</span>
            <p style={{ fontSize: "24px", fontWeight: 700, marginTop: "4px" }}>{mockTradeHistory.length}</p>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Open Positions</span>
            <p style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-accent)", marginTop: "4px" }}>{mockTradeHistory.filter(t => t.status === "open").length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card" style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>Status</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-glass">
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>Chain</label>
              <select value={chainFilter} onChange={(e) => setChainFilter(e.target.value)} className="input-glass">
                <option value="all">All Chains</option>
                <option value="ETH">Ethereum</option>
                <option value="BSC">BSC</option>
                <option value="SOL">Solana</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card">
          <div style={{ overflowX: "auto" }}>
            <table className="table-glass">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Chain</th>
                  <th>Action</th>
                  <th>Amount</th>
                  <th>Entry</th>
                  <th>Exit</th>
                  <th>PnL</th>
                  <th>Gas</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrades.map((trade) => (
                  <tr key={trade.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-purple))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                          {trade.token[0]}
                        </div>
                        <span style={{ fontWeight: 500 }}>{trade.token}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`tag ${trade.chain === "ETH" ? "tag-info" : trade.chain === "BSC" ? "tag-warning" : "tag-success"}`}>
                        {trade.chain}
                      </span>
                    </td>
                    <td>
                      <span className={`tag ${trade.action === "BUY" ? "tag-success" : "tag-danger"}`}>
                        {trade.action}
                      </span>
                    </td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>{trade.amount}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>{trade.entryPrice}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>{trade.exitPrice}</td>
                    <td style={{ fontWeight: 500, color: trade.pnl.startsWith("+") ? "var(--color-success)" : trade.pnl.startsWith("-") ? "var(--color-danger)" : "var(--color-text-muted)" }}>
                      {trade.pnl} <span style={{ fontSize: "11px" }}>({trade.pnlPercent})</span>
                    </td>
                    <td style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>{trade.gas}</td>
                    <td style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>{trade.time}</td>
                    <td>
                      <span className={`tag ${trade.status === "open" ? "tag-warning" : "tag-success"}`}>
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PnL Chart Placeholder */}
        <div className="glass-card" style={{ marginTop: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>PnL Over Time</h3>
          <div style={{ height: "256px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--color-border-glow)", borderRadius: "12px", background: "rgba(0,0,0,0.3)" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "40px", marginBottom: "8px" }}>📈</p>
              <p style={{ color: "var(--color-text-muted)" }}>Chart visualization</p>
              <p style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Connect wallet to view live PnL chart</p>
            </div>
          </div>
        </div>

        <footer style={{ marginTop: "32px", textAlign: "center", fontSize: "11px", color: "var(--color-text-muted)" }}>
          <p>WRAITH © 2026 — Built with Next.js & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}
