import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  t: '',
  c: '',
  e: ''
}

const seedSlice = createSlice({
  name: 'seedSlice',
  initialState,
  reducers: {
    rEducer(state, action) {
      state.t = action.payload
    }
  }
})

export const { rEducer } = seedSlice.actions
export default seedSlice.reducer
