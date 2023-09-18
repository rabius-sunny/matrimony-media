import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isHome: true,
  from: null
}

const utilSlice = createSlice({
  name: 'utilSlice',
  initialState,
  reducers: {
    atHome(state) {
      state.isHome = true
    },
    notHome(state) {
      state.isHome = false
    },
    addFrom(state, action) {
      state.from = action.payload
    },
    removeFrom(state) {
      state.from = null
    }
  }
})

export const { atHome, notHome, addFrom, removeFrom } = utilSlice.actions
export default utilSlice.reducer
