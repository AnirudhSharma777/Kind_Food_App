import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
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
        },
        setSignupData : (state,value) => {
            state.signupData = value.payload;
            // console.log(state.value);
        },
    }
})


export const {setToken, setLoading,setSignupData} = authSlice.actions;

export default authSlice.reducer;