import { configureStore } from "@reduxjs/toolkit";
import myPetSlice from "./slice/myPetSlice";

export const store = configureStore({
  reducer: {
    myPet: myPetSlice,
  },
});
