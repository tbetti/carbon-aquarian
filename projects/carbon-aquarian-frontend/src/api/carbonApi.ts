import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000', // set REACT_APP_API_URL in .env if you have a backend; empty uses same origin
  headers: { 'Content-Type': 'application/json' },
})

export type SubmitTripRequest = {
  vehicle_model_id: string
  distance_km: number
  actual_mode: string
  wallet_address: string
}

export type TripResult = {
  carbon_saved_kg: number
  carbon_points: number
  txid: string
}

export async function submitTripApi(data: SubmitTripRequest): Promise<TripResult> {
  const res = await api.post<TripResult>('/calculate_and_reward', data)
  // const res = { data: { carbon_saved_kg: 3.00675, carbon_points: 3, txid: 'UZV7YCOWK6NVIE7SHJTLWEKR' } }
  return res.data
}
