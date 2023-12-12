import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isHome: true,
  from: null,
  token: '',
  id: ''
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
    addFrom(state, { payload }) {
      state.from = payload
    },
    removeFrom(state) {
      state.from = null
    },
    addAuth(state, { payload: { token, id } }) {
      state.token = token
      state.id = id
    },
    remmoveAuth(state) {
      state.token = ''
      state.id = ''
    }
  }
})

export const { atHome, notHome, addFrom, removeFrom, updateSecondary } =
  utilSlice.actions
export default utilSlice.reducer
