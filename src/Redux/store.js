import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/User/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
