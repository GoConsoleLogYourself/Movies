import { Reducer, createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  dark: boolean;
  light: boolean;
}
const initialState: InitialStateProps = {
  dark: false,
  light: true,
};
const themeSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.dark = true;
      state.light = false;
    },
    setLightTheme: (state) => {
      state.dark = false;
      state.light = true;
    },
  },
});

export const { setDarkTheme, setLightTheme } = themeSlice.actions;
export default themeSlice.reducer as Reducer<typeof initialState>;
