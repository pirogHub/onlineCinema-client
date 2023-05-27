import { useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/router"

export const useAuthRedirect = () => {
    const { user } = useAuth()

    const { query, push } = useRouter()


    const redirect = query.redirect ? String(query.redirect) : "/"

    useEffect(() => {
        if (user) push(redirect)
    }, [user, redirect, push])
}