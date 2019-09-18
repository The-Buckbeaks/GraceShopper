import Axios from 'axios'
//initial state
const initialState = {
  plants: [],
  plant: {}
}
//action types
const GET_PLANTS = 'GET_PLANTS'
const GET_SINGLE_PLANT = 'GET_SINGLE_PLANT'

//action creator
const gotAllPlants = plants => ({
  type: GET_PLANTS,
  plants
})
const gotSinglePlant = plant => ({
  type: GET_SINGLE_PLANT,
  plant
})

//thunk creator
export const getAllPlants = () => async dispatch => {
  try {
    const {data} = await Axios.get('/api/plants')
    dispatch(gotAllPlants(data))
  } catch (err) {
    console.error(err)
  }
}
export const getSinglePlant = id => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/plants/${id}`)
    dispatch(gotSinglePlant(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
const plantReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS:
      return {
        ...state,
        plants: action.plants
      }
    case GET_SINGLE_PLANT:
      return {
        ...state,
        plant: action.plant
      }
    default:
      return state
  }
}
export default plantReducer
