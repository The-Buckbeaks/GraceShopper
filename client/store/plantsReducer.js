import Axios from 'axios'
//initial state
const initialState = {
  plants: [],
  plant: {}
}
//action types
const GET_PLANTS = 'GET_PLANTS'
const GET_SINGLE_PLANTS = 'GET_SINGLE_PLANTS'

//action creator
const gotAllPlants = plants => ({
  type: GET_PLANTS,
  plants
})
const gotSinglePlants = plant => ({
  type: GET_SINGLE_PLANTS,
  plant
})

//thunk creator
export const getAllPlants = () => async dispatch => {
  const {data} = await Axios.get('/api/plants')
  dispatch(gotAllPlants(data))
}
export const getSinglePlant = id => async dispatch => {
  const {data} = await Axios.get(`/api/plants/${id}`)
  dispatch(gotSinglePlants(data))
}

//reducer
const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS:
      return {
        ...state,
        plants: action.plants
      }
    case GET_SINGLE_PLANTS:
      return {
        ...state,
        plant: action.plant
      }
    default:
      return state
  }
}
export default rootReducer
