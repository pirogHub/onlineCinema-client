import { useAuth } from "@/hooks/useAuth"
import { userService } from "@/services/user.service"
import { useQuery } from "react-query"

export const useFavorites = () => {
    const { user } = useAuth()
    const { isLoading, data: favoriteMovies, refetch } =
        useQuery('favorite movies',
            () => userService.getFavorites(), {
            select: ({ data }) => data,
            enabled: !!user

        })

    return {
        isLoading,
        favoriteMovies,
        refetch
    }
}