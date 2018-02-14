import { loaders } from '../../utils'

//ACTION TYPES
const GET_LOADING = 'GET_LOADING'

//ACTION CREATORS
export const getLoading = loading => {
  return {
    type: GET_LOADING,
    loading
  }
}

//REDUCER
export default function(state = loaders, action) {
  switch(action.type) {
    case GET_LOADING:
      return {...state, ...action.loading}
    default:
      return state
  }
}
