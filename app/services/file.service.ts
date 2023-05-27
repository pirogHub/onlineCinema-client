import { getActorsUrl } from "@/config/api.config"
import { IActor } from "@/shared/types/movie.types"
import axios from "api/interceptors"

export const fileService = {
    async upload(files: FormData | FormData[], folder?: string) {

        return axios.post<{ url: string, name: string }[]>(('/files'), files, {
            params: { folder },
            headers: { 'Content-Type': 'multipart/form-data' }

        })

    }
}