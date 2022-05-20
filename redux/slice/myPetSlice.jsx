import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myPets: [],
  currentPetId: null,
  currentPetInfo: {
    id: "",
    name: "",
    photoURL: "",
    spicie: "",
    birthDate: "",
    breed: "",
    gender: "",
    weight: "",
    ownerName: "",
  },
  loading: false,
  error: null,
  calender: {
    selectedDate: "",
  },
};

const myPetSlice = createSlice({
  name: "myPet",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.currentPetId = action.payload;
      state.currentPetInfo.id = action.payload.id;
    },
    setPetSpicie: (state, action) => {
      state.currentPetInfo.spicie = action.payload;
    },
    setpetNameAndBirthDate: (state, action) => {
      state.currentPetInfo.name = action.payload.name;
      state.currentPetInfo.birthDate = action.payload.birthDate;
    },
    setGenderBreedWeight: (state, action) => {
      state.currentPetInfo.gender = action.payload.gender;
      state.currentPetInfo.breed = action.payload.breed;
      state.currentPetInfo.weight = action.payload.weight;
    },
    setOwnerName: (state, action) => {
      state.currentPetInfo.ownerName = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.calender.selectedDate = action.payload;
    },
    setPetData(state, action) {
      state.currentPetInfo = action.payload;
      state.currentPetId = action.payload.id;
    },
    resetPetInfo(state) {
      state.currentPetInfo = {
        id: "",
        name: "",
        photoURL: "",
        spicie: "",
        birthDate: "",
        breed: "",
      };
      state.currentPetId = null;
    },
  },
});

export const {
  setId,
  setPetSpicie,
  setpetNameAndBirthDate,
  setGenderBreedWeight,
  setOwnerName,
  setSelectedDate,
  setPetData,
  resetPetInfo
} = myPetSlice.actions;

export default myPetSlice.reducer;
