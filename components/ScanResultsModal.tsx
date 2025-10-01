'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { fetchTokenData, type TokenPair } from '@/lib/dexscreener'
import { formatNumber, formatAddress } from '@/lib/utils'

interface ScanResultsModalProps {
  isOpen: boolean
  onClose: () => void
  tokenAddress: string
}

export default function ScanResultsModal({
  isOpen,
  onClose,
  tokenAddress,
}: ScanResultsModalProps) {
  const [loading, setLoading] = useState(true)
  const [tokenData, setTokenData] = useState<TokenPair | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && tokenAddress) {
      loadTokenData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, tokenAddress])

  const loadTokenData = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchTokenData(tokenAddress)

      if (data.pairs && data.pairs.length > 0) {
        setTokenData(data.pairs[0])
      } else {
        setError('Token not found or no trading pairs available')
      }
    } catch (err) {
      setError('Failed to fetch token data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getRiskLevel = (token: TokenPair | null) => {
    if (!token) return { level: 'unknown', color: 'neutral', label: 'Unknown' }

    const liquidityUsd = token.liquidity.usd
    const age = Date.now() - token.pairCreatedAt

    // Simple risk assessment
    if (liquidityUsd < 10000 || age < 86400000) {
      return { level: 'high', color: 'red', label: 'High Risk' }
    } else if (liquidityUsd < 50000 || age < 604800000) {
      return { level: 'medium', color: 'yellow', label: 'Medium Risk' }
    } else {
      return { level: 'low', color: 'green', label: 'Lower Risk' }
    }
  }

  const risk = getRiskLevel(tokenData)

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            {/* Modal Content */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
                <div className="glass rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#14F195]/30 mx-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <Dialog.Title className="text-2xl font-bold text-white">
                      Scan Results
                    </Dialog.Title>
                    <Dialog.Close className="text-neutral-400 hover:text-white transition-colors">
                      <svg
                        className="w-6 h-6"
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
                    </Dialog.Close>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <svg
                        className="animate-spin h-12 w-12 text-[#14F195] mb-4"
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
                      <p className="text-neutral-400">Analyzing token...</p>
                    </div>
                  ) : error ? (
                    <div className="py-12 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-red-400 mb-4">{error}</p>
                      <button
                        onClick={onClose}
                        className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  ) : tokenData ? (
                    <div className="space-y-6">
                      {/* Token Info */}
                      <div className="text-center pb-6 border-b border-neutral-700">
                        <h3 className="text-3xl font-bold text-white mb-2">
                          ${tokenData.baseToken.symbol}
                        </h3>
                        <p className="text-neutral-400 mb-4">
                          {tokenData.baseToken.name}
                        </p>
                        <p className="text-sm text-neutral-500 font-mono">
                          {formatAddress(tokenData.baseToken.address, 6)}
                        </p>
                      </div>

                      {/* Risk Assessment */}
                      <div
                        className={`p-4 rounded-lg border-2 ${
                          risk.color === 'green'
                            ? 'bg-green-500/10 border-green-500/30'
                            : risk.color === 'yellow'
                            ? 'bg-yellow-500/10 border-yellow-500/30'
                            : 'bg-red-500/10 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">
                            {risk.color === 'green'
                              ? '✅'
                              : risk.color === 'yellow'
                              ? '⚠️'
                              : '🚨'}
                          </span>
                          <h4
                            className={`text-lg font-bold ${
                              risk.color === 'green'
                                ? 'text-green-400'
                                : risk.color === 'yellow'
                                ? 'text-yellow-400'
                                : 'text-red-400'
                            }`}
                          >
                            {risk.label}
                          </h4>
                        </div>
                        <p className="text-sm text-neutral-300">
                          {risk.level === 'low'
                            ? 'This token appears to have good liquidity and trading history.'
                            : risk.level === 'medium'
                            ? 'Exercise caution. Limited liquidity or newer token.'
                            : 'High risk detected. Very low liquidity or brand new token.'}
                        </p>
                      </div>

                      {/* Token Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-neutral-800/50 rounded-lg">
                          <p className="text-sm text-neutral-400 mb-1">Price</p>
                          <p className="text-xl font-bold text-white">
                            ${parseFloat(tokenData.priceUsd).toFixed(8)}
                          </p>
                          <p
                            className={`text-sm mt-1 ${
                              tokenData.priceChange.h24 > 0
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {tokenData.priceChange.h24 > 0 ? '+' : ''}
                            {tokenData.priceChange.h24.toFixed(2)}% (24h)
                          </p>
                        </div>

                        <div className="p-4 bg-neutral-800/50 rounded-lg">
                          <p className="text-sm text-neutral-400 mb-1">
                            Liquidity
                          </p>
                          <p className="text-xl font-bold text-white">
                            ${formatNumber(tokenData.liquidity.usd)}
                          </p>
                        </div>

                        <div className="p-4 bg-neutral-800/50 rounded-lg">
                          <p className="text-sm text-neutral-400 mb-1">
                            Volume 24h
                          </p>
                          <p className="text-xl font-bold text-white">
                            ${formatNumber(tokenData.volume.h24)}
                          </p>
                        </div>

                        <div className="p-4 bg-neutral-800/50 rounded-lg">
                          <p className="text-sm text-neutral-400 mb-1">FDV</p>
                          <p className="text-xl font-bold text-white">
                            ${formatNumber(tokenData.fdv)}
                          </p>
                        </div>
                      </div>

                      {/* Trading Activity */}
                      <div className="p-4 bg-neutral-800/50 rounded-lg">
                        <h4 className="text-sm font-semibold text-white mb-3">
                          24h Trading Activity
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-neutral-400">Buys</p>
                            <p className="text-green-400 font-semibold">
                              {tokenData.txns.h24.buys}
                            </p>
                          </div>
                          <div>
                            <p className="text-neutral-400">Sells</p>
                            <p className="text-red-400 font-semibold">
                              {tokenData.txns.h24.sells}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <a
                          href={tokenData.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 bg-gradient-to-r from-[#14F195] to-[#00D18C] hover:from-[#00D18C] hover:to-[#14F195] text-black font-semibold rounded-lg transition-all duration-300 text-center"
                        >
                          View on DexScreener
                        </a>
                        <button
                          onClick={onClose}
                          className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
