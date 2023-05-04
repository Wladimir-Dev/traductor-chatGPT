import { useReducer } from 'react'
import { type FromLanguage, type Action, type State, type Language } from '../types'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}
const reducer = (state: State, action: Action) => {
  const { type } = action
  switch (type) {
    case 'INTERCHANGE_LANGUAGE':
      if (state.fromLanguage === 'auto') return state
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    case 'SET_FROM_LANGUAGE':
      return {
        ...state,
        fromLanguage: action.payload
      }
    case 'SET_TO_LANGUAGE':
      return {
        ...state,
        toLanguage: action.payload
      }
    case 'SET_FROM_TEXT':
      return {
        ...state,
        fromText: action.payload,
        loading: true,
        result: ''
      }
    case 'SET_RESULT':
      return {
        ...state,
        result: action.payload
      }

    default:
      return state
  }
}
export function useStore () {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState)

  const interchangeLanguage = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGE' })
  }
  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }
  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }
  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }
  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }
  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
