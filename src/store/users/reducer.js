import { LOGIN_USER, LOGIN_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, API_ERROR } from './actionTypes';

const initialState = {
    error: "",
    loading: false,
    user_date: null,
    data: []
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            state = {
                ...state,
                loading: true,
                user_date: action
            }
            break;
        case GET_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
                user_date: null
            }
            break;
        case GET_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
                user_date: null
            }
            break;
        case API_ERROR:
            state = { ...state, error: action.payload, loading: false };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default login;