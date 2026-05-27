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
            <Link href="/scanner" className="sidebar-nav-item active">
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
      </aside>

      <main className="main-content">
        <header style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Token Scanner</h2>
          <p style={{ color: "var(--color-text-secondary)", marginTop: "4px", fontSize: "14px" }}>
            Scan and analyze tokens across multiple chains
          </p>
        </header>

        {/* Filters */}
        <div className="glass-card" style={{ marginBottom: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>Search</label>
              <input type="text" placeholder="Token name or symbol..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-glass" />
            </div>
            <div>
              <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>Chain</label>
              <select value={selectedChain} onChange={(e) => setSelectedChain(e.target.value)} className="input-glass">
                <option value="ALL">All Chains</option>
                <option value="ETH">Ethereum</option>
                <option value="BSC">BSC</option>
                <option value="SOL">Solana</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>Risk Level</label>
              <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="input-glass">
                <option value="ALL">All Risks</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-glass">
                <option value="change">24h Change</option>
                <option value="volume">Volume</option>
                <option value="liquidity">Liquidity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="glass-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Scan Results</h3>
            <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{filteredTokens.length} tokens found</span>
          </div>
          <div style={{ overflowX: "auto" }}>
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
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-purple))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>
                          {token.symbol[0]}
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <p style={{ fontWeight: 500 }}>{token.name}</p>
                            {token.verified && <span style={{ color: "var(--color-accent)" }}>✓</span>}
                          </div>
                          <p style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{token.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`tag ${token.chain === "ETH" ? "tag-info" : token.chain === "BSC" ? "tag-warning" : "tag-success"}`}>
                        {token.chain}
                      </span>
                    </td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>{token.price}</td>
                    <td style={{ color: "var(--color-success)", fontWeight: 500 }}>{token.change}</td>
                    <td>{token.volume}</td>
                    <td>{token.liquidity}</td>
                    <td>{token.holders}</td>
                    <td style={{ color: "var(--color-text-muted)" }}>{token.age}</td>
                    <td>
                      <span className={`tag ${token.risk === "low" ? "tag-success" : token.risk === "medium" ? "tag-warning" : "tag-danger"}`}>
                        {token.risk}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="snipe-btn">Analyze</button>
                        <button className="snipe-btn" style={{ background: "rgba(0,230,118,0.1)", borderColor: "rgba(0,230,118,0.2)", color: "var(--color-success)" }}>Snipe</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security + Config */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "24px" }}>
          <div className="glass-card">
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Token Security Check</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Contract Verified", status: "pass", icon: "✓" },
                { label: "No Honeypot", status: "pass", icon: "✓" },
                { label: "Liquidity Locked", status: "pass", icon: "✓" },
                { label: "Ownership Renounced", status: "warning", icon: "⚠" },
                { label: "No Mint Function", status: "pass", icon: "✓" },
                { label: "Tax < 10%", status: "pass", icon: "✓" },
              ].map((check, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "10px", background: "rgba(0,0,0,0.3)" }}>
                  <span style={{ fontSize: "13px" }}>{check.label}</span>
                  <span className={`tag ${check.status === "pass" ? "tag-success" : check.status === "warning" ? "tag-warning" : "tag-danger"}`}>
                    {check.icon} {check.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Quick Sniper Config</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>Buy Amount</label>
                <input type="text" placeholder="0.1 ETH" className="input-glass" />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>Slippage Tolerance</label>
                <input type="text" placeholder="12%" className="input-glass" />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>Gas Price (Gwei)</label>
                <input type="text" placeholder="Auto" className="input-glass" />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>Take Profit (%)</label>
                <input type="text" placeholder="100%" className="input-glass" />
              </div>
              <button className="btn-primary" style={{ marginTop: "4px" }}>
                🎯 Configure Sniper
              </button>
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
