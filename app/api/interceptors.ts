import axios from 'axios';
import { API_URL, APP_SERVER_URL } from 'config/api.config';
import Cookies from 'js-cookie';
import { errorCatch } from './api.helpers';
import { AuthService } from '@/services/auth/auth.service';
import { removeTokensStorage } from '@/services/auth/auth.helper';
import { IS_PRODUCTION } from '@/config/constants';
export const axiosClassic = axios.create({
    baseURL: IS_PRODUCTION ? APP_SERVER_URL : API_URL,
    headers: {
        'Content-Type': "application/json"
    }
})


export const instance = axios.create({
    baseURL: IS_PRODUCTION ? APP_SERVER_URL : API_URL,
    // baseURL: API_URL,
    headers: {
        'Content-Type': "application/json"
    }
})

instance.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken')
    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})


instance.interceptors.response.use(config => {


    return config
}, async (error) => {
    const originalRequest = error.config

    if (
        (
            error.response.status === 401
            || errorCatch(error) === "jwt-expired"
            || errorCatch(error) === "jwt must be provided"
        )
        && error.config && !error.config._isRetry
    ) {
        originalRequest._isRetry = true

        try {
            await AuthService.getNewTokens()
            return instance.request(originalRequest)
        } catch (error) {
            if (errorCatch(error) === "jwt expired") {
                removeTokensStorage()
                localStorage.removeItem('user')
            }
        }
        throw error
    }
})

export default instance