import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  email: any;
  token: any;
  id: any;
  userName: any;
}
const initialState: InitialStateProps = {
  email: null,
  token: null,
  id: null,
  userName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.userName = action.payload.userName;
    },

    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
