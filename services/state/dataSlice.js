import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookmarks: null
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addBookmark(state, action) {
      state.bookmarks = action.payload
    }
  }
})

export const { addBookmark } = dataSlice.actions
export default dataSlice.reducer
