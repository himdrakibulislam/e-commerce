import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {  getUser } from './authApi';
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from '../../firebase/firebase.config';
const provider = new GoogleAuthProvider();
const initialState = {
  user:{},
  isLoading: true,
  firebaseStatus:false,
  token: '',
}
 
 export const authUser = createAsyncThunk('auth/getUser', async () => {
    const data = await getUser();
    return data;
  })

export const authToken = createAsyncThunk('auth/token',async () => {
    const token = await Cookies.get('authCookie');
    return token;
});


export const sighInwithGoogle = createAsyncThunk('auth/google',async () => {
    const data = await signInWithPopup(auth, provider);
    return data;
  });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    setUser:(state,action) => {
      state.user = action.payload;
    },
    addToken:(state,action) => {
      state.token = action.payload;
    }
  },
  extraReducers: builder => {
    builder
    .addCase(authUser.pending, (state) => {
      state.isLoading = true;
      state.error = false
    })
    .addCase(authUser.fulfilled,(state,action) => {

        state.user = action.payload;
        state.isLoading = false;

    })
    .addCase(authUser.rejected,(state,action) => {
        state.error = true;
        state.isLoading = false;
    })



    .addCase(authToken.pending, (state) => {
      state.error = false
    })
    .addCase(authToken.fulfilled,(state,action) => {
        state.token = action.payload;
    })
    .addCase(authToken.rejected,(state,action) => {
        state.error = true;
      
    })
    

    .addCase(sighInwithGoogle.pending, (state) => {
      state.isLoading = true;
      state.authError = ''
    })
    .addCase(sighInwithGoogle.fulfilled,(state,{payload}) => {
        state.user = {
          name:payload.displayName,
          email:payload.email,
          photoURL:payload.photoURL
          };
        state.isLoading = false;
        state.firebaseStatus = true;
    })
    .addCase(sighInwithGoogle.rejected,(state,action) => {
        state.error = true;
        state.isLoading = false;
    })

    
  }
    
  
})

// Action creators are generated for each case reducer function
export const {setUser,addToken} = authSlice.actions;
export default authSlice.reducer ; 