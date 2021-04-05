import { SET_CURRENT_USER } from "./user.types";

const setCurrentUser = user  => ({
    type: SET_CURRENT_USER,
    payload: user
})

export default setCurrentUser;

