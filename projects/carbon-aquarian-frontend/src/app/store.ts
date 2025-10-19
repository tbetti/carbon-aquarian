import { configureStore } from '@reduxjs/toolkit'
import connectionSlice from '../slices/connectionSlice'
import resultsSlice from '../slices/resultsSlice'
import tripSlice from '../slices/tripSlice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: { app: appReducer, connection: connectionSlice, results: resultsSlice, trip: tripSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
