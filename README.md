# Solana Token Scanner v3-Enhanced

Modern Next.js application for scanning and analyzing Solana tokens in real-time.

## 🎯 Features

- **Typewriter Animation Hero** - Dynamic text animation inspired by Phanes Bot
- **Token Scanner** - Real-time token analysis using DexScreener API
- **Trending Tokens** - Display of top 4 trending Solana tokens
- **Wallet Verification** - Anti-spam protection with Phantom/Solflare wallet integration
- **Detailed Results** - Comprehensive token safety analysis with risk assessment
- **Responsive Design** - Mobile-first, optimized for all screen sizes
- **Modern UI** - Glassmorphism effects, gradients, and smooth animations

## 🛠️ Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Radix UI** (modals)
- **DexScreener API** (token data)
- **Solana Wallet Adapter** (wallet integration)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Quick Start

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. The hero section displays with typewriter animation
3. Scroll down to the Token Scanner
4. Enter a Solana token address (or click a trending token)
5. Verify your wallet to scan (first time only)
6. View detailed token analysis

## 🎨 Design Features

### Colors
- **Solana Green**: #14F195
- **Safe**: #00D18C
- **Danger**: #FF4747

### Key Features
- Typewriter animation with rotating words
- DexScreener API integration
- Wallet verification modal
- Risk assessment algorithm
- Mobile-optimized responsive design

## 📁 Project Structure

```
v3-enhanced/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── TokenScanner.tsx
│   ├── TrendingTokens.tsx
│   ├── WalletVerificationModal.tsx
│   └── ScanResultsModal.tsx
├── lib/
│   ├── dexscreener.ts
│   └── utils.ts
└── public/
```

## 📄 License

MIT License
