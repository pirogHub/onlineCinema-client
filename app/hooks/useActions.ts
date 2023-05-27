import { useMemo } from "react"

import { allActions } from "@/store/rootActions"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}