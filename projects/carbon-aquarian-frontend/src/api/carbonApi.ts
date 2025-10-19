import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '', // set REACT_APP_API_URL in .env if you have a backend; empty uses same origin
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
  // const res = await api.post<TripResult>('/submit-trip', data)
  const res = {
    data: {
      carbon_saved_kg: 4.25,
      carbon_points: 4,
      txid: 'Q7HZ3K4G9YF0V7QH7L3W3D5A2X9MOCKEXAMPLETRANSACTIONID',
    },
  }
  return res.data
}
