"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Sniper Settings
    defaultBuyAmount: "0.1",
    slippage: "12",
    gasPrice: "auto",
    maxGas: "100",
    autoApprove: true,
    
    // Take Profit / Stop Loss
    takeProfit1: "50",
    takeProfit2: "100",
    takeProfit3: "200",
    stopLoss: "30",
    
    // Safety
    minLiquidity: "10000",
    maxBuyTax: "10",
    maxSellTax: "10",
    checkHoneypot: true,
    checkContractVerified: true,
    
    // Notifications
    notifyOnBuy: true,
    notifyOnSell: true,
    notifyOnSnipe: true,
    telegramBot: "",
    discordWebhook: "",
    
    // Advanced
    mevProtection: true,
    frontrunProtection: true,
    privateMempool: false,
  });

  const handleSave = () => {
    // Save settings logic
    alert("Settings saved!");
  };

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
            <Link href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[rgba(0,229,255,0.05)] hover:border hover:border-[var(--color-border-glow)] transition-all">
              <span className="text-lg">📊</span>
              <span className="font-medium">Trade History</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(0,229,255,0.1)] border border-[var(--color-border-glow)] text-[var(--color-accent)]">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Settings
              </h2>
              <p className="text-[var(--color-text-secondary)] mt-1">
                Configure your sniper bot parameters
              </p>
            </div>
            <button onClick={handleSave} className="btn-primary">
              💾 Save Settings
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sniper Settings */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🎯</span> Sniper Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Default Buy Amount</label>
                <input
                  type="text"
                  value={settings.defaultBuyAmount}
                  onChange={(e) => setSettings({...settings, defaultBuyAmount: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Slippage Tolerance (%)</label>
                <input
                  type="text"
                  value={settings.slippage}
                  onChange={(e) => setSettings({...settings, slippage: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Gas Price (Gwei)</label>
                <input
                  type="text"
                  value={settings.gasPrice}
                  onChange={(e) => setSettings({...settings, gasPrice: e.target.value})}
                  className="input-glass"
                  placeholder="auto"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Max Gas (Gwei)</label>
                <input
                  type="text"
                  value={settings.maxGas}
                  onChange={(e) => setSettings({...settings, maxGas: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <span className="text-sm">Auto-approve tokens</span>
                <button
                  onClick={() => setSettings({...settings, autoApprove: !settings.autoApprove})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.autoApprove ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.autoApprove ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Take Profit / Stop Loss */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📈</span> Take Profit / Stop Loss
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Take Profit 1 (%)</label>
                <input
                  type="text"
                  value={settings.takeProfit1}
                  onChange={(e) => setSettings({...settings, takeProfit1: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Take Profit 2 (%)</label>
                <input
                  type="text"
                  value={settings.takeProfit2}
                  onChange={(e) => setSettings({...settings, takeProfit2: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Take Profit 3 (%)</label>
                <input
                  type="text"
                  value={settings.takeProfit3}
                  onChange={(e) => setSettings({...settings, takeProfit3: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Stop Loss (%)</label>
                <input
                  type="text"
                  value={settings.stopLoss}
                  onChange={(e) => setSettings({...settings, stopLoss: e.target.value})}
                  className="input-glass"
                />
              </div>
            </div>
          </div>

          {/* Safety Settings */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🛡️</span> Safety Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Min Liquidity (USD)</label>
                <input
                  type="text"
                  value={settings.minLiquidity}
                  onChange={(e) => setSettings({...settings, minLiquidity: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Max Buy Tax (%)</label>
                <input
                  type="text"
                  value={settings.maxBuyTax}
                  onChange={(e) => setSettings({...settings, maxBuyTax: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Max Sell Tax (%)</label>
                <input
                  type="text"
                  value={settings.maxSellTax}
                  onChange={(e) => setSettings({...settings, maxSellTax: e.target.value})}
                  className="input-glass"
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <span className="text-sm">Check Honeypot</span>
                <button
                  onClick={() => setSettings({...settings, checkHoneypot: !settings.checkHoneypot})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.checkHoneypot ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.checkHoneypot ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <span className="text-sm">Require Verified Contract</span>
                <button
                  onClick={() => setSettings({...settings, checkContractVerified: !settings.checkContractVerified})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.checkContractVerified ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.checkContractVerified ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🔔</span> Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <span className="text-sm">Notify on Buy</span>
                <button
                  onClick={() => setSettings({...settings, notifyOnBuy: !settings.notifyOnBuy})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.notifyOnBuy ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.notifyOnBuy ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <span className="text-sm">Notify on Sell</span>
                <button
                  onClick={() => setSettings({...settings, notifyOnSell: !settings.notifyOnSell})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.notifyOnSell ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.notifyOnSell ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <span className="text-sm">Notify on Snipe</span>
                <button
                  onClick={() => setSettings({...settings, notifyOnSnipe: !settings.notifyOnSnipe})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.notifyOnSnipe ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.notifyOnSnipe ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Telegram Bot Token</label>
                <input
                  type="text"
                  value={settings.telegramBot}
                  onChange={(e) => setSettings({...settings, telegramBot: e.target.value})}
                  className="input-glass"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Discord Webhook</label>
                <input
                  type="text"
                  value={settings.discordWebhook}
                  onChange={(e) => setSettings({...settings, discordWebhook: e.target.value})}
                  className="input-glass"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="glass-card lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>⚡</span> Advanced Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <div>
                  <span className="text-sm block">MEV Protection</span>
                  <span className="text-xs text-[var(--color-text-muted)]">Protect from MEV attacks</span>
                </div>
                <button
                  onClick={() => setSettings({...settings, mevProtection: !settings.mevProtection})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.mevProtection ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.mevProtection ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <div>
                  <span className="text-sm block">Frontrun Protection</span>
                  <span className="text-xs text-[var(--color-text-muted)]">Prevent frontrunning</span>
                </div>
                <button
                  onClick={() => setSettings({...settings, frontrunProtection: !settings.frontrunProtection})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.frontrunProtection ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.frontrunProtection ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,0,0,0.3)]">
                <div>
                  <span className="text-sm block">Private Mempool</span>
                  <span className="text-xs text-[var(--color-text-muted)]">Use private transactions</span>
                </div>
                <button
                  onClick={() => setSettings({...settings, privateMempool: !settings.privateMempool})}
                  className={`w-12 h-6 rounded-full transition-all ${settings.privateMempool ? "bg-[var(--color-success)]" : "bg-[var(--color-text-muted)]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.privateMempool ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
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
