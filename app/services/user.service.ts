import { getUsersUrl } from "@/config/api.config"
import { IProfileInput } from "@/screens/profile/profile.interface"
import { IMovie } from "@/shared/types/movie.types"
import { IUser } from "@/shared/types/user.interface"
import axios from "api/interceptors"

export const userService = {
    async getAll(searchTerm?: string) {
        return axios.get<IUser[]>(getUsersUrl(""), {
            params: searchTerm
                ? {
                    searchTerm
                }
                : {}
        })
    },
    async getProfile() {
        return axios.get<IUser>(getUsersUrl("/profile"))
    },
    async getFavorites() {
        return axios.get<IMovie[]>(getUsersUrl("/profile/favorites"))
    },
    async toggleFavorite(movieId: string) {
        return axios.put<string>(getUsersUrl("/profile/favorites"), {
            movieId
        })
    },
    async updateProfile(data: IProfileInput) {
        return axios.put<string>(getUsersUrl("/profile"), data)
    },
    async deleteUser(_id: string) {
        return axios.delete<string>(getUsersUrl(`/${_id}`))
    },
    async getById(_id: string) {
        return axios.get<IUser>((getUsersUrl(`/${_id}`)))

    },
    async update(_id: string, data: IProfileInput) {
        return axios.put<string>(getUsersUrl(`/${_id}`), data)
    },
}