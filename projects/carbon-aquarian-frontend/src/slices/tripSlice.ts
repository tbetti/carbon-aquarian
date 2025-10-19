import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Trip = { id: string; distanceKm: number; date: string }

type tripState = {
  trips: Trip[]
}

const initialState: tripState = {
  trips: [],
}

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    addTrip(state, action: PayloadAction<Trip>) {
      state.trips.push(action.payload)
    },
    resetTrip() {
      return initialState
    },
  },
})

export const { addTrip, resetTrip } = tripSlice.actions
export default tripSlice.reducer
