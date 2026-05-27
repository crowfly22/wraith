"use client";

import { useState } from "react";
import Link from "next/link";

const mockScanResults = [
  { name: "DogeKing", symbol: "DOGEK", chain: "BSC", price: "$0.00000456", change: "+1,245%", volume: "$23M", liquidity: "$1.2M", holders: "1,234", age: "2h", risk: "medium", verified: true },
  { name: "SafeMoon 2.0", symbol: "SAFE2", chain: "ETH", price: "$0.0000089", change: "+567%", volume: "$45M", liquidity: "$3.4M", holders: "5,678", age: "5h", risk: "low", verified: true },
  { name: "Floki Inu", symbol: "FLOKI", chain: "BSC", price: "$0.000156", change: "+89%", volume: "$89M", liquidity: "$12M", holders: "45,678", age: "2d", risk: "low", verified: true },
  { name: "BabyDoge", symbol: "BABYD", chain: "BSC", price: "$0.00000000123", change: "+2,345%", volume: "$12M", liquidity: "$500K", holders: "890", age: "1h", risk: "high", verified: false },
  { name: "RocketMoon", symbol: "RMOON", chain: "ETH", price: "$0.0000034", change: "+456%", volume: "$8M", liquidity: "$800K", holders: "2,345", age: "3h", risk: "medium", verified: true },
  { name: "ShibaPunk", symbol: "SHIPU", chain: "ETH", price: "$0.0000067", change: "+789%", volume: "$34M", liquidity: "$2.1M", holders: "3,456", age: "8h", risk: "low", verified: true },
  { name: "MetaDog", symbol: "MDOGE", chain: "SOL", price: "$0.000234", change: "+123%", volume: "$56M", liquidity: "$5.6M", holders: "12,345", age: "1d", risk: "low", verified: true },
  { name: "MoonShot", symbol: "MOON", chain: "BSC", price: "$0.00000089", change: "+3,456%", volume: "$5M", liquidity: "$200K", holders: "456", age: "30m", risk: "high", verified: false },
];

export default function ScannerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChain, setSelectedChain] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("change");

  const filteredTokens = mockScanResults
    .filter(t => 
      (selectedChain === "ALL" || t.chain === selectedChain) &&
      (riskFilter === "ALL" || t.risk === riskFilter) &&
      (searchQuery === "" || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "change") return parseFloat(b.change.replace(/[^0-9.-]/g, "")) - parseFloat(a.change.replace(/[^0-9.-]/g, ""));
      if (sortBy === "volume") return parseFloat(b.volume.replace(/[^0-9.]/g, "")) - parseFloat(a.volume.replace(/[^0-9.]/g, ""));
      if (sortBy === "liquidity") return parseFloat(b.liquidity.replace(/[^0-9.]/g, "")) - parseFloat(a.liquidity.replace(/[^0-9.]/g, ""));
      return 0;
    });

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
            <Link href="/scanner" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(0,229,255,0.1)] border border-[var(--color-border-glow)] text-[var(--color-accent)]">
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6">
        <header className="mb-8">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Token Scanner
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Scan and analyze tokens across multiple chains
          </p>
        </header>

        {/* Filters */}
        <div className="glass-card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Search</label>
              <input
                type="text"
                placeholder="Token name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-glass"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Chain</label>
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="input-glass"
              >
                <option value="ALL">All Chains</option>
                <option value="ETH">Ethereum</option>
                <option value="BSC">BSC</option>
                <option value="SOL">Solana</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Risk Level</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="input-glass"
              >
                <option value="ALL">All Risks</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-glass"
              >
                <option value="change">24h Change</option>
                <option value="volume">Volume</option>
                <option value="liquidity">Liquidity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Scan Results</h3>
            <span className="text-sm text-[var(--color-text-muted)]">{filteredTokens.length} tokens found</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table-glass">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Chain</th>
                  <th>Price</th>
                  <th>24h</th>
                  <th>Volume</th>
                  <th>Liquidity</th>
                  <th>Holders</th>
                  <th>Age</th>
                  <th>Risk</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-purple)] flex items-center justify-center text-xs font-bold">
                          {token.symbol[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{token.name}</p>
                            {token.verified && <span className="text-[var(--color-accent)]">✓</span>}
                          </div>
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
                    <td className="font-mono text-sm">{token.price}</td>
                    <td className="text-[var(--color-success)] font-medium">{token.change}</td>
                    <td>{token.volume}</td>
                    <td>{token.liquidity}</td>
                    <td>{token.holders}</td>
                    <td className="text-[var(--color-text-muted)]">{token.age}</td>
                    <td>
                      <span className={`tag ${
                        token.risk === "low" ? "tag-success" :
                        token.risk === "medium" ? "tag-warning" : "tag-danger"
                      }`}>
                        {token.risk}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[var(--color-border-glow)] text-[var(--color-accent)] text-sm hover:bg-[rgba(0,229,255,0.2)] transition-all">
                          Analyze
                        </button>
                        <button className="px-3 py-1 rounded-lg bg-[rgba(0,230,118,0.1)] border border-[rgba(0,230,118,0.2)] text-[var(--color-success)] text-sm hover:bg-[rgba(0,230,118,0.2)] transition-all">
                          Snipe
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Token Analysis Panel */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4">Token Security Check</h3>
            <div className="space-y-3">
              {[
                { label: "Contract Verified", status: "pass", icon: "✓" },
                { label: "No Honeypot", status: "pass", icon: "✓" },
                { label: "Liquidity Locked", status: "pass", icon: "✓" },
                { label: "Ownership Renounced", status: "warning", icon: "⚠" },
                { label: "No Mint Function", status: "pass", icon: "✓" },
                { label: "Tax < 10%", status: "pass", icon: "✓" },
              ].map((check, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                  <span className="text-sm">{check.label}</span>
                  <span className={`tag ${
                    check.status === "pass" ? "tag-success" :
                    check.status === "warning" ? "tag-warning" : "tag-danger"
                  }`}>
                    {check.icon} {check.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4">Quick Sniper Config</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Buy Amount</label>
                <input type="text" placeholder="0.1 ETH" className="input-glass" />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Slippage Tolerance</label>
                <input type="text" placeholder="12%" className="input-glass" />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Gas Price (Gwei)</label>
                <input type="text" placeholder="Auto" className="input-glass" />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Take Profit (%)</label>
                <input type="text" placeholder="100%" className="input-glass" />
              </div>
              <button className="w-full btn-primary mt-2">
                🎯 Configure Sniper
              </button>
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
