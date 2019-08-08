import React, { useReducer, useCallback, useEffect } from 'react'


const LOADED = 'LOADED'
const INIT = 'INIT'
const PENDING = 'PENDING'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
    files: [],
    pending: [],
    next: null,
    uploading: false,
    uploaded: {},
    status: 'idle'
}

const reducer = ( state, action ) => {
    switch (action.type) {
        case 'load':
            return {
                ...state,
                files: action.files,
                status: LOADED
            }
        case 'submit':
            return {
                ...state,
                uploading: true,
                pending: state.files,
                status: INIT
            }
        default:
            return state
    }
}

const useFileHandlers = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const onChange = e => {
        if (e.target.files.length) {
            const arrFiles = Array.from(e.target.files)

            const files = arrFiles.map(( file, id ) => {
                const src = window.URL.createObjectURL(file)
                return { file, id, src }
            })

            dispatch({ type: 'load', files })
        }
    }

    const onSubmit = useCallback(
        e => {
            e.preventDefault()

            if (state.files.length) {
                dispatch({ type: 'submit' })
            }
            else {
                window.alert('you don\'t have any files loaded')
            }
        },
        [ state.files.length ]
    )
    return { ...state, onChange, onSubmit }
}

export default useFileHandlers
