import { toast } from "react-hot-toast";
import {setLoading, setToken } from "../../Redux/slices/authSlice";
import { resetCart } from "../../Redux/slices/cartSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";



const {
    SIGNUP_API,
    LOGIN_API,
} = endpoints;




export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    navigate,
){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                phoneNumber
            });

            console.log("SIGNUP API RESPONSE........... ",response);
            // console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            toast.success("Signup Successful");
            toast.toString("Login First");
            // navigate("/login");
            
        } catch (error) {
            console.log("SIGNUP API ERROR...........",error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}



export function login(email, password, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",LOGIN_API, {
                email,
                password,
            })

            console.log("LOGIN API RESPONSE...........", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            // const userImage = response.data?.user?.image ? response.data.user.image :
            // `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            // dispatch(setUser({ ...response.data.user, image: userImage}));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/");

        } catch (error) {
            console.log("LOGIN API ERROR...........",error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}



export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        // dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }
}
