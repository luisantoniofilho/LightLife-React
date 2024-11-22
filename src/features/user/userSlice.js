import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
  gender: "male",
  goal: "gain",
  physicalData: {
    age: 0,
    weight: 0, // kg
    height: 0, // cm
  },
  physicalActivityLevel: null,
  /* Scale
   1.6 = no physical activity (only the workout)
   1.7 = low physical activity
   1.8 = moderate physical activity
   1.9 = intense physical activity
  */
  macros: {
    trainingDayMacros: {
      // grams
      carbs: 0,
      protein: 0,
      fat: 0,
    },
    restDayMacros: {
      // grams
      carbs: 0,
      protein: 0,
      fat: 0,
    },
  },

  isLogged: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Example
    updateName(state, action) {
      state.username = action.payload;
    },
    createUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    loginUser(state, action) {
      if (!state.username || !state.password) return;

      if (
        state.email === action.payload.email &&
        state.password === action.payload.password
      )
        state.isLogged = true;
    },
    updatePhysicalData(state, action) {
      state.physicalData.age = action.payload.age;
      state.physicalData.weight = action.payload.weight;
      state.physicalData.height = action.payload.height;
      state.goal = action.payload.goal;
      state.physicalActivityLevel = action.payload.physicalActivityLevel;
      state.gender = action.payload.gender;
    },
    updateTrainingDayMacros(state, action) {
      state.macros.trainingDayMacros.carbs = action.payload.carbs;
      state.macros.trainingDayMacros.protein = action.payload.protein;
      state.macros.trainingDayMacros.fat = action.payload.fat;
    },
    updateRestDayMacros(state, action) {
      state.macros.restDayMacros.carbs = action.payload.carbs;
      state.macros.restDayMacros.protein = action.payload.protein;
      state.macros.restDayMacros.fat = action.payload.fat;
    },
  },
});

export const {
  updateName,
  updatePhysicalData,
  updateTrainingDayMacros,
  updateRestDayMacros,
  createUser,
  loginUser,
} = userSlice.actions;

export default userSlice.reducer;
