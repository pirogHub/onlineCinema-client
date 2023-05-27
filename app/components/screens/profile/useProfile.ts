import { SubmitHandler, UseFormSetValue } from "react-hook-form"
import { IProfileInput } from "./profile.interface"
import { useMutation, useQuery } from "react-query"
import { userService } from "@/services/user.service"
import { toastError } from "@/utils/toastError"
import { getKeys } from "@/utils/object/getKeys"
import { toastr } from "react-redux-toastr"

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {



    const { isLoading } = useQuery(
        'profile',
        () => userService.getProfile(),
        {
            onError: (error) => {
                toastError(error, 'Get profile')
            },
            onSuccess: ({ data }) => {
                setValue('email', data.email)
            }
        }
    )

    const { mutateAsync } = useMutation(
        'update profile',
        (data: IProfileInput) => userService.updateProfile(data),
        {
            onError: (error) => {
                toastError(error, 'Update profile')
            },
            onSuccess() {
                toastr.success('Update profile', 'update was successful')
            },
        }
    )

    const onSubmit: SubmitHandler<IProfileInput> = async (data) =>
        await mutateAsync(data)

    return {
        onSubmit,
        isLoading,
    }
}
