// ...existing code...
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://mainnet.api.perawallet.app/v1/',
  headers: { 'Content-Type': 'application/json' },
})

export type PeraResult = {
  asset_id: number
  verification_tier: string
}

export async function connectPeraApi(): Promise<PeraResult> {
  // allow inspecting non-2xx status codes in the response
  try {
    const res = await api.post<PeraResult>('/public/verified-assets/', undefined, {
      validateStatus: () => true,
    })

    if (res.status === 200) {
      return res.data
    }

    if (res.status === 405) {
      // return a mock shaped like PeraResult when the endpoint is not allowed
      const mock: PeraResult = {
        asset_id: 5,
        verification_tier: 'mock',
      }
      return mock
    }

    // unexpected status -> throw so callers can handle it
    throw new Error(`peraApi: unexpected status ${res.status}`)
  } catch (err: any) {
    // Axios errors may include a response; if it's a 405 return the mock
    if (err?.response?.status === 405) {
      return {
        asset_id: 0,
        verification_tier: 'mock',
      }
    }
    // rethrow other errors for callers to handle
    throw err
  }
}
