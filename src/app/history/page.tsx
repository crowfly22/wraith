"use client";

import { useState } from "react";
import Link from "next/link";

const mockTradeHistory = [
  { id: 1, token: "PEPE2", chain: "ETH", action: "BUY", amount: "0.5 ETH", entryPrice: "$0.00001234", exitPrice: "$0.00002468", pnl: "+$1,234", pnlPercent: "+100%", time: "2024-01-15 14:32:45", status: "closed", gas: "0.003 ETH" },
  { id: 2, token: "SHIB", chain: "ETH", action: "BUY", amount: "100M SHIB", entryPrice: "$0.00002789", exitPrice: "$0.00003200", pnl: "+$567", pnlPercent: "+15%", time: "2024-01-15 13:45:12", status: "closed", gas: "0.002 ETH" },
  { id: 3, token: "FLOKI", chain: "BSC", action: "BUY", amount: "0.2 BNB", entryPrice: "$0.000156", exitPrice: "-", pnl: "...", pnlPercent: "...", time: "2024-01-15 12:20:33", status: "open", gas: "0.001 BNB" },
  { id: 4, token: "BONK", chain: "SOL", action: "BUY", amount: "2 SOL", entryPrice: "$0.000034", exitPrice: "$0.000038", pnl: "+$890", pnlPercent: "+12%", time: "2024-01-15 11:15:28", status: "closed", gas: "0.005 SOL" },
  { id: 5, token: "WIF", chain: "SOL", action: "SELL", amount: "50 WIF", entryPrice: "$1.23", exitPrice: "$2.45", pnl: "+$2,345", pnlPercent: "+99%", time: "2024-01-15 10:08:55", status: "closed", gas: "0.004 SOL" },
  { id: 6, token: "DOGEK", chain: "BSC", action: "BUY", amount: "0.3 BNB", entryPrice: "$0.00000456", exitPrice: "$0.00000890", pnl: "+$789", pnlPercent: "+95%", time: "2024-01-14 22:45:12", status: "closed", gas: "0.002 BNB" },
  { id: 7, token: "SAFE2", chain: "ETH", action: "BUY", amount: "1 ETH", entryPrice: "$0.0000089", exitPrice: "$0.0000045", pnl: "-$456", pnlPercent: "-49%", time: "2024-01-14 20:30:45", status: "closed", gas: "0.004 ETH" },
  { id: 8, token: "RMOON", chain: "ETH", action: "BUY", amount: "0.1 ETH", entryPrice: "$0.0000034", exitPrice: "-", pnl: "...", pnlPercent: "...", time: "2024-01-14 18:15:33", status: "open", gas: "0.003 ETH" },
  { id: 9, token: "SHIPU", chain: "ETH", action: "BUY", amount: "0.5 ETH", entryPrice: "$0.0000067", exitPrice: "$0.0000123", pnl: "+$1,567", pnlPercent: "+84%", time: "2024-01-14 15:20:18", status: "closed", gas: "0.003 ETH" },
  { id: 10, token: "MDOGE", chain: "SOL", action: "BUY", amount: "5 SOL", entryPrice: "$0.000234", exitPrice: "$0.000345", pnl: "+$2,345", pnlPercent: "+47%", time: "2024-01-14 12:10:42", status: "closed", gas: "0.006 SOL" },
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
    .reduce((acc, t) => acc + parseFloat(t.pnl.replace(/[^0-9.-]/g, "")), 0);

  const winRate = (mockTradeHistory.filter(t => t.status === "closed" && t.pnl.startsWith("+")).length / mockTradeHistory.filter(t => t.status === "closed").length * 100).toFixed(0);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 h-full glass border-r border-[var(--color-border-glow)] z-50">
        <div className="p-6">
          <div className="mb-8">
            <Link href="/">
              <h1 className="text-2xl font-bold gradient-text cursor-pointer" style={{ fontFamily: "'Playfair Display', serif" }}>
                WRAITH
              </h1>
            </Link>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Web3 Sniper Bot</p>
          </div>
          <nav className="space-y-2">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[rgba(0,229,255,0.05)] hover:border hover:border-[var(--color-border-glow)] transition-all">
              <span className="text-lg">🎯</span>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/scanner" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[rgba(0,229,255,0.05)] hover:border hover:border-[var(--color-border-glow)] transition-all">
              <span className="text-lg">🔍</span>
              <span className="font-medium">Token Scanner</span>
            </Link>
            <Link href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(0,229,255,0.1)] border border-[var(--color-border-glow)] text-[var(--color-accent)]">
              <span className="text-lg">📊</span>
              <span className="font-medium">Trade History</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[rgba(0,229,255,0.05)] hover:border hover:border-[var(--color-border-glow)] transition-all">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6">
        <header className="mb-8">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trade History
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Track all your sniper trades and performance
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card">
            <span className="text-sm text-[var(--color-text-secondary)]">Total PnL</span>
            <p className="text-2xl font-bold text-[var(--color-success)] mt-1">
              +${totalPnl.toLocaleString()}
            </p>
          </div>
          <div className="glass-card">
            <span className="text-sm text-[var(--color-text-secondary)]">Win Rate</span>
            <p className="text-2xl font-bold text-[var(--color-success)] mt-1">{winRate}%</p>
          </div>
          <div className="glass-card">
            <span className="text-sm text-[var(--color-text-secondary)]">Total Trades</span>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{mockTradeHistory.length}</p>
          </div>
          <div className="glass-card">
            <span className="text-sm text-[var(--color-text-secondary)]">Open Positions</span>
            <p className="text-2xl font-bold text-[var(--color-accent)] mt-1">
              {mockTradeHistory.filter(t => t.status === "open").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-glass"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Chain</label>
              <select
                value={chainFilter}
                onChange={(e) => setChainFilter(e.target.value)}
                className="input-glass"
              >
                <option value="all">All Chains</option>
                <option value="ETH">Ethereum</option>
                <option value="BSC">BSC</option>
                <option value="SOL">Solana</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trade Table */}
        <div className="glass-card">
          <div className="overflow-x-auto">
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
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-purple)] flex items-center justify-center text-xs font-bold">
                          {trade.token[0]}
                        </div>
                        <span className="font-medium">{trade.token}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`tag ${
                        trade.chain === "ETH" ? "tag-info" :
                        trade.chain === "BSC" ? "tag-warning" : "tag-success"
                      }`}>
                        {trade.chain}
                      </span>
                    </td>
                    <td>
                      <span className={`tag ${trade.action === "BUY" ? "tag-success" : "tag-danger"}`}>
                        {trade.action}
                      </span>
                    </td>
                    <td className="font-mono text-sm">{trade.amount}</td>
                    <td className="font-mono text-sm">{trade.entryPrice}</td>
                    <td className="font-mono text-sm">{trade.exitPrice}</td>
                    <td className={`font-medium ${trade.pnl.startsWith("+") ? "text-[var(--color-success)]" : trade.pnl.startsWith("-") ? "text-[var(--color-danger)]" : "text-[var(--color-text-muted)]"}`}>
                      {trade.pnl} <span className="text-xs">({trade.pnlPercent})</span>
                    </td>
                    <td className="text-[var(--color-text-muted)] text-sm">{trade.gas}</td>
                    <td className="text-[var(--color-text-muted)] text-sm">{trade.time}</td>
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
        <div className="mt-6 glass-card">
          <h3 className="text-lg font-semibold mb-4">PnL Over Time</h3>
          <div className="h-64 flex items-center justify-center border border-[var(--color-border-glow)] rounded-xl bg-[rgba(0,0,0,0.3)]">
            <div className="text-center">
              <p className="text-4xl mb-2">📈</p>
              <p className="text-[var(--color-text-muted)]">Chart visualization</p>
              <p className="text-xs text-[var(--color-text-muted)]">Connect wallet to view live PnL chart</p>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-[var(--color-text-muted)]">
          <p>WRAITH © 2026 — Built with Next.js & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}
