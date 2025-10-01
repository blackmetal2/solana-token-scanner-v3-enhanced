'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'

interface WalletVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerified: () => void
}

export default function WalletVerificationModal({
  isOpen,
  onClose,
  onVerified,
}: WalletVerificationModalProps) {
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const wallets = [
    {
      name: 'Phantom',
      icon: '👻',
      color: 'from-purple-500 to-purple-700',
      available: typeof window !== 'undefined' && 'phantom' in window,
    },
    {
      name: 'Solflare',
      icon: '🔥',
      color: 'from-orange-500 to-red-600',
      available: typeof window !== 'undefined' && 'solflare' in window,
    },
    {
      name: 'Backpack',
      icon: '🎒',
      color: 'from-blue-500 to-blue-700',
      available: false,
    },
  ]

  const handleConnect = async (walletName: string) => {
    setConnecting(true)
    setError(null)

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if wallet is available
      if (walletName === 'Phantom') {
        if (typeof window !== 'undefined' && 'phantom' in window) {
          // Real Phantom connection would go here
          onVerified()
        } else {
          throw new Error('Phantom wallet not installed')
        }
      } else if (walletName === 'Solflare') {
        if (typeof window !== 'undefined' && 'solflare' in window) {
          // Real Solflare connection would go here
          onVerified()
        } else {
          throw new Error('Solflare wallet not installed')
        }
      } else {
        // For demo purposes, allow connection anyway
        onVerified()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    } finally {
      setConnecting(false)
    }
  }

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
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
                <div className="glass rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#14F195]/30 mx-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <Dialog.Title className="text-2xl font-bold text-white mb-2">
                        Wallet Verification
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-neutral-400">
                        Connect your wallet to verify and prevent spam
                      </Dialog.Description>
                    </div>
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

                  {/* Info Banner */}
                  <div className="mb-6 p-4 bg-[#14F195]/10 border border-[#14F195]/30 rounded-lg">
                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-[#14F195] flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <div className="text-sm">
                        <p className="text-white font-semibold mb-1">
                          Your wallet is secure
                        </p>
                        <p className="text-neutral-300">
                          We only verify ownership. Your funds are safe and
                          read-only.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Wallet Options */}
                  <div className="space-y-3">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.name}
                        onClick={() => handleConnect(wallet.name)}
                        disabled={connecting}
                        className="group relative w-full p-4 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 hover:border-[#14F195]/50 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${wallet.color} flex items-center justify-center text-2xl`}
                            >
                              {wallet.icon}
                            </div>
                            <div className="text-left">
                              <p className="text-white font-semibold">
                                {wallet.name}
                              </p>
                              <p className="text-xs text-neutral-400">
                                {wallet.available
                                  ? 'Detected'
                                  : 'Not installed'}
                              </p>
                            </div>
                          </div>

                          {connecting ? (
                            <svg
                              className="animate-spin h-5 w-5 text-[#14F195]"
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
                          ) : (
                            <svg
                              className="w-5 h-5 text-neutral-400 group-hover:text-[#14F195] transition-colors"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Footer */}
                  <p className="mt-6 text-xs text-center text-neutral-500">
                    By connecting, you agree to our{' '}
                    <button className="text-[#14F195] hover:underline">
                      Terms of Service
                    </button>
                  </p>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
