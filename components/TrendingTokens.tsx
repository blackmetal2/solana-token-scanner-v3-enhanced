'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchTrendingTokens, type TokenPair } from '@/lib/dexscreener'
import { formatNumber } from '@/lib/utils'

interface TrendingTokensProps {
  onTokenClick: (address: string) => void
}

export default function TrendingTokens({ onTokenClick }: TrendingTokensProps) {
  const [tokens, setTokens] = useState<TokenPair[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTrendingTokens()
  }, [])

  const loadTrendingTokens = async () => {
    try {
      const trending = await fetchTrendingTokens()
      setTokens(trending)
    } catch (error) {
      console.error('Failed to load trending tokens:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="gradient-text">🔥 Trending Now</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="glass rounded-xl p-6 animate-pulse"
              >
                <div className="h-6 bg-neutral-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-neutral-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-neutral-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="gradient-text">🔥 Trending Now</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tokens.map((token, index) => (
              <motion.div
                key={token.pairAddress}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onTokenClick(token.baseToken.address)}
                className="group glass rounded-xl p-6 cursor-pointer hover:border-solana-green/30 transition-all duration-300 hover:scale-105"
              >
                {/* Token Symbol */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white truncate">
                    ${token.baseToken.symbol}
                  </h3>
                  {token.priceChange.h24 > 0 ? (
                    <span className="text-safe text-sm font-semibold">
                      +{token.priceChange.h24.toFixed(2)}%
                    </span>
                  ) : (
                    <span className="text-danger text-sm font-semibold">
                      {token.priceChange.h24.toFixed(2)}%
                    </span>
                  )}
                </div>

                {/* Token Name */}
                <p className="text-sm text-neutral-400 mb-3 truncate">
                  {token.baseToken.name}
                </p>

                {/* Price */}
                <div className="mb-3">
                  <p className="text-xs text-neutral-500 mb-1">Price</p>
                  <p className="text-lg font-bold text-white">
                    ${parseFloat(token.priceUsd).toFixed(6)}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-neutral-500 mb-1">Volume 24h</p>
                    <p className="text-white font-semibold">
                      ${formatNumber(token.volume.h24)}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500 mb-1">Liquidity</p>
                    <p className="text-white font-semibold">
                      ${formatNumber(token.liquidity.usd)}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-solana-green">Click to scan</span>
                  <svg
                    className="w-4 h-4 text-solana-green transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
