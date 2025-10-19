import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { submitTripApi, SubmitTripRequest, TripResult } from '../api/carbonApi'

export type Trip = { id: string; distanceKm: number; date: string }

interface TripState {
  trips: Trip[]
  submitStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  submitError: string | null
  lastResult: TripResult | null
}

const initialState: TripState = {
  trips: [],
  submitStatus: 'idle',
  submitError: null,
  lastResult: null,
}

export const submitTrip = createAsyncThunk<TripResult, SubmitTripRequest, { rejectValue: string }>(
  'trips/submitTrip',
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
    addTrip(state, action: PayloadAction<Trip>) {
      state.trips.push(action.payload)
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

export const { addTrip, clearLastResult } = tripSlice.actions
export default tripSlice.reducer
