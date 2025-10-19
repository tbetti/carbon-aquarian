import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTrip } from './tripSlice'

type ResultState = {
  points: number
  isVisible: boolean
  showConfetti: boolean
}

const initialState: ResultState = {
  points: 0,
  isVisible: false,
  showConfetti: false,
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setPoints(state, action: PayloadAction<number>) {
      state.points = action.payload
    },
    setIsVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload
    },
    setShowConfetti(state, action: PayloadAction<boolean>) {
      state.showConfetti = action.payload
    },
    resetResults() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTrip, (state, action) => {
      const distance = action.payload.distanceKm
      state.points += Math.round(distance * 10)
    })
  },
})

export const { setPoints, setIsVisible, setShowConfetti, resetResults } = resultsSlice.actions
export default resultsSlice.reducer
