import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loginData:null,
    loading : false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
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
            console.log(state.token);
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


export const {setToken, setLoading,setSignupData,setLoginData} = authSlice.actions;

export default authSlice.reducer;