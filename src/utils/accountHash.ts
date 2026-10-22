// A hashed-login account hash is "0x" followed by 32 hex characters.
export const ACCOUNT_HASH_PATTERN = /^0x[a-fA-F0-9]{32}$/

export const isValidAccountHash = (value: string): boolean =>
  ACCOUNT_HASH_PATTERN.test(value.trim())

export const accountHashFromFile = async (file: Blob): Promise<string> => {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')

  return `0x${hashHex.slice(-32)}`
}
