export interface TokenPair {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  quoteToken: {
    address: string
    name: string
    symbol: string
  }
  priceNative: string
  priceUsd: string
  txns: {
    m5: { buys: number; sells: number }
    h1: { buys: number; sells: number }
    h6: { buys: number; sells: number }
    h24: { buys: number; sells: number }
  }
  volume: {
    h24: number
    h6: number
    h1: number
    m5: number
  }
  priceChange: {
    m5: number
    h1: number
    h6: number
    h24: number
  }
  liquidity: {
    usd: number
    base: number
    quote: number
  }
  fdv: number
  pairCreatedAt: number
}

export interface DexScreenerResponse {
  schemaVersion: string
  pairs: TokenPair[] | null
}

export async function fetchTokenData(address: string): Promise<DexScreenerResponse> {
  const apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${address}`

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: DexScreenerResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching token data:', error)
    throw error
  }
}

export async function fetchTrendingTokens(): Promise<TokenPair[]> {
  // Lista de tokens populares/trending no Solana para demonstração
  const trendingAddresses = [
    'So11111111111111111111111111111111111111112', // SOL
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK
    '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', // ORCA
  ]

  try {
    const promises = trendingAddresses.map(addr => fetchTokenData(addr))
    const results = await Promise.all(promises)

    const tokens: TokenPair[] = []
    results.forEach(result => {
      if (result.pairs && result.pairs.length > 0) {
        tokens.push(result.pairs[0])
      }
    })

    return tokens.slice(0, 4)
  } catch (error) {
    console.error('Error fetching trending tokens:', error)
    return []
  }
}
