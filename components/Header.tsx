'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeaderProps {
  onTryNowClick: () => void
}

export default function Header({ onTryNowClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#14F195] to-[#00D18C] rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-[#14F195] to-[#00D18C] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">S</span>
              </div>
            </div>
            <span className="text-xl lg:text-2xl font-bold gradient-text">
              Solana Scanner
            </span>
          </Link>

          {/* Try Now Button */}
          <button
            onClick={onTryNowClick}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#14F195] to-[#00D18C] transition-all duration-300 group-hover:from-[#00D18C] group-hover:to-[#14F195]"></div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#14F195]/20 to-[#00D18C]/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>

            {/* Text */}
            <span className="relative z-10 text-black font-semibold">Try Now</span>

            {/* Arrow Icon */}
            <svg
              className="relative z-10 w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1"
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
          </button>
        </div>
      </div>
    </header>
  )
}
