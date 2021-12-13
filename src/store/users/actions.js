import { GET_USER, GET_USER_SUCCESS, API_ERROR } from './actionTypes';

export const getUsers = (user, history) => {
    return {
        type: GET_USER,
        payload: { user, history }
    }
}

export const getUsersSuccess = (user) => {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    }
}

export const addUsers = (user, history) => {
    return {
        type: ADD_USER,
        payload: { user, history }
    }
}

export const apiError = (error) => {
    return {
        type: API_ERROR,
        payload: error
    }
}
