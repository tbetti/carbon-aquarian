import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ConnectionState = {
  isConnected: boolean
  walletAddress: string
}

const initialState: ConnectionState = {
  isConnected: false,
  walletAddress: '',
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload
    },
    setWalletAddress(state, action: PayloadAction<string>) {
      state.walletAddress = action.payload
    },
    resetConnection() {
      return initialState
    },
  },
})

export const { setIsConnected, setWalletAddress, resetConnection } = connectionSlice.actions
export default connectionSlice.reducer
