import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loginData:null,
    loading : false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState:initialState,
    reducers :{
        setLoading :(state,value) =>{
            state.loading = value.payload;
        },
        setToken :(state,value) =>{
            state.token = value.payload;
        },
        setUser: (state, value) => {
            state.user = value.payload;
        },
        setSignupData : (state,value) => {
            state.signupData = value.payload;
            // console.log(state.value);
        },
        setLoginData : (state,value) => {
            state.loginData = value.payload;
        }
    }
})


export const {setToken, setUser, setLoading,setSignupData,setLoginData} = authSlice.actions;

export default authSlice.reducer;
