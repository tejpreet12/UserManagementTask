import { createSlice } from '@reduxjs/toolkit';

const initialState = { users: [] };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push({ id: String(state.users.length + 1), ...action.payload });
    },
    editUser(state, action) {
      const idx = state.users.findIndex(u => u.id === action.payload.id);
      if (idx >= 0) state.users[idx] = action.payload;
    },
    removeUser(state, action) {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
  },
});

export const { addUser, editUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
