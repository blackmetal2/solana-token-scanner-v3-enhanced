'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TokenScannerProps {
  onScan: (address: string) => void
}

export default function TokenScanner({ onScan }: TokenScannerProps) {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleScan = async () => {
    if (!address.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      onScan(address)
      setIsLoading(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleScan()
    }
  }

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Scanner Card */}
          <div className="glass rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-solana-green to-safe flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Token Scanner
                </h2>
                <p className="text-sm text-neutral-400">
                  Enter Solana token address to analyze
                </p>
              </div>
            </div>

            {/* Input Group */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter token address (e.g., So11111...)"
                  className="w-full px-4 py-3 sm:py-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-solana-green focus:ring-2 focus:ring-solana-green/20 transition-all"
                  disabled={isLoading}
                />
                {address && (
                  <button
                    onClick={() => setAddress('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <button
                onClick={handleScan}
                disabled={!address.trim() || isLoading}
                className="group relative px-8 py-3 sm:py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-solana-green to-safe transition-all duration-300 group-hover:from-safe group-hover:to-solana-green"></div>

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-solana-green/50 to-safe/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 text-black">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Scan Token
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Info */}
            <div className="mt-4 flex items-start gap-2 text-sm text-neutral-400">
              <svg
                className="w-5 h-5 flex-shrink-0 text-solana-green mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>
                Wallet verification required before scanning to prevent spam and
                bot abuse
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
