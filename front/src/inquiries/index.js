import axios from "utils/axios";
import { setToken } from "utils/localStorage";
import UserStore from 'store/userStore'
import ErrorStore from 'store/errorStore'


export const getMessage = async () => {
    const response = await axios.get('/protected/message')
    return response.data
}

export const getUserData = async () => {
    const response = await axios.get('/protected/inform')
    const {name, email, id} = response.data.user_info_token
    UserStore.update({name, email, id})
}

export const login = async (email, password) => {
    try {
        const response = await axios.post('/auth/login', {email, password})
        await setToken('accessToken', response.data.id_token)
        ErrorStore.resetLoginError()
    } catch (e) {
        ErrorStore.getLoginError(e.response.data.message)
    }
}

export const changePassword = async (email, password) => {
    try {
        const response = await axios.put('/auth/change', {email, password})
        await setToken('accessToken', response.data.id_token)
        ErrorStore.resetLoginError()
    } catch (e) {
        ErrorStore.getLoginError(e.response.data.message)
    }
}

export const submitRegistration = async (name, email, password) => {
    try {
        const response = await axios.post('/auth/register', {name, email, password})
        setToken('accessToken', response.data.id_token)
        ErrorStore.resetRegistrationError()
    } catch (e) {
        ErrorStore.getRegistrationError(e.response.data.message)
        return e.response.data.message
    }
}
