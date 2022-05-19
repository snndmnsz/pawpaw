import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myPets: [],
  currentPetId: "132",
  currentPetInfo: {
    id: "123",
    name: "Kuttie",
    spicie: "cat",
    birthDate: "2022/04/11 00:00",
    breed: "Brıths",
    gender: "male",
    weight: "12",
    ownerName: "Sinan dz",
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
  },
});

export const {
  setId,
  setPetSpicie,
  setpetNameAndBirthDate,
  setGenderBreedWeight,
  setOwnerName,
  setSelectedDate,
} = myPetSlice.actions;

export default myPetSlice.reducer;
