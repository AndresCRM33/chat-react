export const SET_USER_NAME = 'SET_USER_NAME';
export const LOG_OUT = 'LOG_OUT';

export const setUserName = (name) => ({
    type: SET_USER_NAME,
    payload: name,
})

export const logOut = () => ({
    type: SET_USER_NAME,
    payload: "",
})