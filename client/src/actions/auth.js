import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(authData);
        dispatch({ type: "AUTH", data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(authData);
        dispatch({ type: "AUTH", data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
}