import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthResponse, IEmailPassword } from './user.interface'
import { AuthService } from '@/services/auth/auth.service'
import { toastr } from 'react-redux-toastr'
import { toastError } from '@/utils/toastError'
import { errorCatch } from 'api/api.helpers'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword & { isAdmin?: boolean }>("auth/register",
    async ({ email, password, isAdmin }, thunkApi) => {

        try {
            const response = await AuthService.register(email, password, isAdmin)

            toastr.success('Registration', 'Completed successfully')
            return response.data
        } catch (error) {
            toastError(error)
            return thunkApi.rejectWithValue(error)
        }
    }
)
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>("auth/login",
    async ({ email, password }, thunkApi) => {

        try {
            const response = await AuthService.login(email, password)

            toastr.success('Login', 'Completed successfully')
            return response.data
        } catch (error) {
            toastError(error)
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
    await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>("auth/check-auth",
    async (_, thunkApi) => {

        try {
            const response = await AuthService.getNewTokens()

            toastr.success('Login', 'Completed successfully')
            return response.data
        } catch (error) {
            if (errorCatch(error) === 'jwt expired') {
                toastr.error(
                    'Logout',
                    'Your authorization is finished. Please sing in again'
                )
                thunkApi.dispatch(logout())
            }
            toastError(error)
            return thunkApi.rejectWithValue(error)
        }
    }
)