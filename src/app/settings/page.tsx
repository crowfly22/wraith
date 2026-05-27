"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    defaultBuyAmount: "0.1",
    slippage: "12",
    gasPrice: "auto",
    maxGas: "100",
    autoApprove: true,
    takeProfit1: "50",
    takeProfit2: "100",
    takeProfit3: "200",
    stopLoss: "30",
    minLiquidity: "10000",
    maxBuyTax: "10",
    maxSellTax: "10",
    checkHoneypot: true,
    checkContractVerified: true,
    notifyOnBuy: true,
    notifyOnSell: true,
    notifyOnSnipe: true,
    telegramBot: "",
    discordWebhook: "",
    mevProtection: true,
    frontrunProtection: true,
    privateMempool: false,
  });

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} style={{
      width: "48px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer",
      background: value ? "var(--color-success)" : "var(--color-text-muted)", transition: "all 0.2s ease", position: "relative",
    }}>
      <div style={{
        width: "20px", height: "20px", borderRadius: "50%", background: "#fff", position: "absolute", top: "2px",
        left: value ? "26px" : "2px", transition: "all 0.2s ease",
      }} />
    </button>
  );

  const SettingRow = ({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: () => void }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.3)" }}>
      <div>
        <span style={{ fontSize: "13px", display: "block" }}>{label}</span>
        {desc && <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{desc}</span>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
    <div>
      <label style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="input-glass" placeholder={placeholder} />
    </div>
  );

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
            <Link href="/history" className="sidebar-nav-item">
              <span className="icon">📊</span>
              <span>Trade History</span>
            </Link>
            <Link href="/settings" className="sidebar-nav-item active">
              <span className="icon">⚙️</span>
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Settings</h2>
            <p style={{ color: "var(--color-text-secondary)", marginTop: "4px", fontSize: "14px" }}>Configure your sniper bot parameters</p>
          </div>
          <button className="btn-primary" onClick={() => alert("Settings saved!")}>💾 Save Settings</button>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Sniper Settings */}
          <div className="glass-card">
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🎯</span> Sniper Settings
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <InputField label="Default Buy Amount" value={settings.defaultBuyAmount} onChange={(v) => setSettings({...settings, defaultBuyAmount: v})} />
              <InputField label="Slippage Tolerance (%)" value={settings.slippage} onChange={(v) => setSettings({...settings, slippage: v})} />
              <InputField label="Gas Price (Gwei)" value={settings.gasPrice} onChange={(v) => setSettings({...settings, gasPrice: v})} placeholder="auto" />
              <InputField label="Max Gas (Gwei)" value={settings.maxGas} onChange={(v) => setSettings({...settings, maxGas: v})} />
              <SettingRow label="Auto-approve tokens" value={settings.autoApprove} onChange={() => setSettings({...settings, autoApprove: !settings.autoApprove})} />
            </div>
          </div>

          {/* TP/SL */}
          <div className="glass-card">
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📈</span> Take Profit / Stop Loss
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <InputField label="Take Profit 1 (%)" value={settings.takeProfit1} onChange={(v) => setSettings({...settings, takeProfit1: v})} />
              <InputField label="Take Profit 2 (%)" value={settings.takeProfit2} onChange={(v) => setSettings({...settings, takeProfit2: v})} />
              <InputField label="Take Profit 3 (%)" value={settings.takeProfit3} onChange={(v) => setSettings({...settings, takeProfit3: v})} />
              <InputField label="Stop Loss (%)" value={settings.stopLoss} onChange={(v) => setSettings({...settings, stopLoss: v})} />
            </div>
          </div>

          {/* Safety */}
          <div className="glass-card">
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🛡️</span> Safety Settings
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <InputField label="Min Liquidity (USD)" value={settings.minLiquidity} onChange={(v) => setSettings({...settings, minLiquidity: v})} />
              <InputField label="Max Buy Tax (%)" value={settings.maxBuyTax} onChange={(v) => setSettings({...settings, maxBuyTax: v})} />
              <InputField label="Max Sell Tax (%)" value={settings.maxSellTax} onChange={(v) => setSettings({...settings, maxSellTax: v})} />
              <SettingRow label="Check Honeypot" value={settings.checkHoneypot} onChange={() => setSettings({...settings, checkHoneypot: !settings.checkHoneypot})} />
              <SettingRow label="Require Verified Contract" value={settings.checkContractVerified} onChange={() => setSettings({...settings, checkContractVerified: !settings.checkContractVerified})} />
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card">
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🔔</span> Notifications
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <SettingRow label="Notify on Buy" value={settings.notifyOnBuy} onChange={() => setSettings({...settings, notifyOnBuy: !settings.notifyOnBuy})} />
              <SettingRow label="Notify on Sell" value={settings.notifyOnSell} onChange={() => setSettings({...settings, notifyOnSell: !settings.notifyOnSell})} />
              <SettingRow label="Notify on Snipe" value={settings.notifyOnSnipe} onChange={() => setSettings({...settings, notifyOnSnipe: !settings.notifyOnSnipe})} />
              <InputField label="Telegram Bot Token" value={settings.telegramBot} onChange={(v) => setSettings({...settings, telegramBot: v})} placeholder="Optional" />
              <InputField label="Discord Webhook" value={settings.discordWebhook} onChange={(v) => setSettings({...settings, discordWebhook: v})} placeholder="Optional" />
            </div>
          </div>

          {/* Advanced */}
          <div className="glass-card" style={{ gridColumn: "span 2" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚡</span> Advanced Settings
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              <SettingRow label="MEV Protection" desc="Protect from MEV attacks" value={settings.mevProtection} onChange={() => setSettings({...settings, mevProtection: !settings.mevProtection})} />
              <SettingRow label="Frontrun Protection" desc="Prevent frontrunning" value={settings.frontrunProtection} onChange={() => setSettings({...settings, frontrunProtection: !settings.frontrunProtection})} />
              <SettingRow label="Private Mempool" desc="Use private transactions" value={settings.privateMempool} onChange={() => setSettings({...settings, privateMempool: !settings.privateMempool})} />
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
