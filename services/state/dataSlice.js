import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookmarks: null,
  localBookmarks: []
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addBookmark(state, { payload }) {
      state.bookmarks = payload
    },
    addSingleBookmark(state, { payload }) {
      state.bookmarks = [...state.bookmarks, payload]
    },
    removeSingleBookmark(state, { payload }) {
      state.bookmarks = state.bookmarks.filter((item) => item !== payload)
    },
    addLocalBookmark(state, { payload }) {
      state.localBookmarks = [...state.localBookmarks, payload]
    },
    removeLocalBookmark(state, { payload }) {
      state.localBookmarks = state.localBookmarks.filter(
        (item) => item !== payload
      )
    }
  }
})

export const {
  addBookmark,
  addLocalBookmark,
  removeLocalBookmark,
  addSingleBookmark,
  removeSingleBookmark
} = dataSlice.actions
export default dataSlice.reducer
