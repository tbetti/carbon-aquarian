import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { submitTripApi, SubmitTripRequest, TripResult } from '../api/carbonApi'

interface TripState {
  vehicleModelId: string
  distanceKm: number
  actualMode: string // should use actual options instead
  manualWalletAddress: string
  submitted: boolean
  submitStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  submitError: string | null
  lastResult: TripResult | null
}

const initialState: TripState = {
  vehicleModelId: 'd5f5b9f8-3e3c-4b5d-bc64',
  distanceKm: 12.5,
  actualMode: 'train',
  manualWalletAddress: '',
  submitted: false,
  submitStatus: 'idle',
  submitError: null,
  lastResult: null,
}

export const submitTrip = createAsyncThunk<TripResult, SubmitTripRequest, { rejectValue: string }>(
  'trips/calculate_and_reward',
  async (data, { rejectWithValue }) => {
    try {
      const result = await submitTripApi(data)
      return result
    } catch (err) {
      // you can inspect err and return a better message
      return rejectWithValue('Failed to submit trip')
    }
  },
)

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setVehicleModelId(state, action: PayloadAction<string>) {
      state.vehicleModelId = action.payload
    },
    setDistanceKm(state, action: PayloadAction<number>) {
      state.distanceKm = action.payload
    },
    setActualMode(state, action: PayloadAction<string>) {
      state.actualMode = action.payload
    },
    setManualWalletAddress(state, action: PayloadAction<string>) {
      state.actualMode = action.payload
    },
    setSubmitted(state, action: PayloadAction<boolean>) {
      state.submitted = action.payload
    },
    clearLastResult(state) {
      state.lastResult = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTrip.pending, (state) => {
        state.submitStatus = 'loading'
        state.submitError = null
      })
      .addCase(submitTrip.fulfilled, (state, action: PayloadAction<TripResult>) => {
        state.submitStatus = 'succeeded'
        state.lastResult = action.payload
      })
      .addCase(submitTrip.rejected, (state, action) => {
        state.submitStatus = 'failed'
        state.submitError = action.payload ?? 'Unknown error'
      })
  },
})

export const { setVehicleModelId, setDistanceKm, setActualMode, setManualWalletAddress, setSubmitted, clearLastResult } = tripSlice.actions
export default tripSlice.reducer
