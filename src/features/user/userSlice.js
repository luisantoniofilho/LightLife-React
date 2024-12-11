import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, signUp } from "./user.thunks";

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

  isLogged: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    crateUser(state, action) {
      state.username = action.payload.username;
    },
    loginUser(state) {
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
  extraReducers: (builder) => {
    builder
      // Sign up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.isLogged = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isLogged = false;
        state.email = "";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
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
