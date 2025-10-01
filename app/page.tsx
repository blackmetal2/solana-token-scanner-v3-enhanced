'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TokenScanner from '@/components/TokenScanner'
import TrendingTokens from '@/components/TrendingTokens'
import WalletVerificationModal from '@/components/WalletVerificationModal'
import ScanResultsModal from '@/components/ScanResultsModal'

export default function Home() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [selectedToken, setSelectedToken] = useState('')
  const [isWalletVerified, setIsWalletVerified] = useState(false)

  const handleTryNow = () => {
    const scannerElement = document.getElementById('scanner')
    if (scannerElement) {
      scannerElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleScan = (address: string) => {
    if (!isWalletVerified) {
      setSelectedToken(address)
      setShowWalletModal(true)
    } else {
      setSelectedToken(address)
      setShowResultsModal(true)
    }
  }

  const handleWalletVerified = () => {
    setIsWalletVerified(true)
    setShowWalletModal(false)
    setShowResultsModal(true)
  }

  const handleTokenClick = (address: string) => {
    setSelectedToken(address)

    // Scroll to scanner and fill address
    const scannerElement = document.getElementById('scanner')
    if (scannerElement) {
      scannerElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    // Trigger scan after scroll
    setTimeout(() => {
      handleScan(address)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <Header onTryNowClick={handleTryNow} />

      {/* Hero Section */}
      <Hero />

      {/* Scanner Section */}
      <div id="scanner">
        <TokenScanner onScan={handleScan} />
      </div>

      {/* Trending Tokens */}
      <TrendingTokens onTokenClick={handleTokenClick} />

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#14F195] to-[#00D18C] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">S</span>
              </div>
              <span className="text-white font-semibold">Solana Scanner</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <a
                href="#"
                className="hover:text-[#14F195] transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-[#14F195] transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-[#14F195] transition-colors"
              >
                Terms
              </a>
            </div>

            <p className="text-sm text-neutral-500">
              © 2025 Solana Scanner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WalletVerificationModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onVerified={handleWalletVerified}
      />

      <ScanResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        tokenAddress={selectedToken}
      />
    </main>
  )
}
