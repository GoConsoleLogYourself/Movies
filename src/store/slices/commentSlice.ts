import { Reducer, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { IComment } from "../../models/IComment";

interface InitialStateProps {
  comments: IComment[];
}
const initialState: InitialStateProps = {
  comments: [],
};
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<IComment>) {
      state.comments.push(action.payload);
    },
    incrementLikes(state, action: PayloadAction<number>) {
      const current = state.comments.find((item) => item.id === action.payload);
      current!.likes += 1;
    },
    decrementLikes(state, action: PayloadAction<number>) {
      const current = state.comments.find((item) => item.id === action.payload);
      current!.likes -= 1;
    },
    deleteComment(state, action: PayloadAction<number>) {
      const current = state.comments.find((item) => item.id === action.payload);
      const index = state.comments.indexOf(current!);
      state.comments.splice(index, 1);
    },
  },
});

export const { addComment, decrementLikes, incrementLikes, deleteComment } =
  commentSlice.actions;
export default commentSlice.reducer as Reducer<typeof initialState>;
