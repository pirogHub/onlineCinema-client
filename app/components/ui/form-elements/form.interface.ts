import { EditorProps } from 'draft-js'
import { InputHTMLAttributes, ButtonHTMLAttributes, CSSProperties } from 'react'
import { FieldError, FieldErrorsImpl } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> { }


export interface IFieldProps {
    placeholder: string
    error?: FieldError | FieldErrorsImpl<any> | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps


export interface IField extends TypeInputPropsField { }

type TypeEditorPropsField = EditorProps & IFieldProps

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
    onChange: (...event: any[]) => void
    value: string

}


export interface IUploadField {
    folder?: string
    file?: string
    onChange: (...event: any[]) => void
    placeholder: string
    error?: FieldError
    style?: CSSProperties
    isNoImage?: boolean

}