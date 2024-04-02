import { createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/firebase';

// Slice to fetch User Detail

const initialState = {
  isLoading: true,
  isProfileUploading: false,
  isProfileUploadError: false,
  error: null,
  success: null,
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  user: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.success = null;
      state.isLoading = true;
      state.error = false;
      state.user = null;
    },

    // Profile update Loading
    startProfileUpdateLoading(state) {
      state.success = null;
      state.isLoading = true;
      state.error = false;
    },

    // SET PASSWORD
    setPassword(state, action) {
      state.password = action.payload;
    },

    // SET FULL NAME
    setFullName(state, action) {
      state.fullName = action.payload;
    },

    // SET EMAIL
    setEmail(state, action) {
      state.email = action.payload;
    },

    // SET PHONE NUMBER
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },

    // Forgot Pass Loading Start
    startForgotPassLoading(state) {
      state.success = null;
      state.isLoading = true;
      state.error = false;
    },

    // Upload Profile Picture Loading
    startUploadProfilePictureLoading(state) {
      state.success = null;
      state.isProfileUploading = true;
      state.isProfileUploadError = false;
    },

    // Password Reset Loading
    startPasswordResetLoading(state) {
      state.success = null;
      state.isLoading = true;
      state.error = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.success = null;
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
    },

    // Profile Update has error
    profileUpdateHasError(state, action) {
      state.success = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    // Password Reset Has Error
    passwordResetHasError(state, action) {
      state.success = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    // Profile Picture Upload Error
    profilePictureUploadError(state, action) {
      state.success = null;
      state.isProfileUploading = false;
      state.isProfileUploadError = action.payload;
    },

    // Forgot Pass Has Error
    forgotPassHasError(state, action) {
      state.success = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    // Profile Update Success
    profileUpdateSuccess(state, action) {
      state.success = true;
      state.isLoading = false;
      state.error = false;
      state.user = action.payload;
    },

    // Profile Picture Upload Success
    profilePictureUploadSuccess(state, action) {
      state.success = true;
      state.isProfileUploading = false;
      state.isProfileUploadError = false;
      state.user = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.success = true;
      state.isLoading = false;
      state.error = false;
      state.user = action.payload;
    },

    // Password Reset Success
    passwordResetSuccess(state) {
      state.success = true;
      state.isLoading = false;
      state.error = false;
    },

    // Forgot Pass Success
    forgotPassSuccess(state) {
      state.success = true;
      state.isLoading = false;
      state.error = false;
    },
  },
});

// sign up user with firebase
export const signUpUser = () => async (dispatch, getState) => {
  dispatch(actions.startLoading());
  try {
    const { email, password, fullName, phoneNumber } = getState().user;
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(actions.getUserSuccess(response.user));
    updateProfile(auth.currentUser, {
      displayName: fullName,
      phoneNumber,
    });
  } catch (error) {
    dispatch(actions.hasError(error.message));
  }
};

// sign in user with firebase
export const signInUser = () => async (dispatch, getState) => {
  dispatch(actions.startLoading());
  try {
    const { email, password } = getState().user;
    const response = await signInWithEmailAndPassword(auth, email, password);
    dispatch(actions.getUserSuccess(response.user));
  } catch (error) {
    dispatch(actions.hasError(error.message));
  }
};

// Reducer
export default slice.reducer;
export const { actions } = slice;
