import axios from 'axios'

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const CHECKOUT = 'CHECKOUT'
const CREATE_CART = 'CREATE_CART'

// INITIAL STATE
const defaultCart = {
  orderId: null,
  plants: [],
  checkedOut: false
}

// ACTION CREATORS
// We need action creators to set each of the cart properties (based off of the order properties)

const getCartItems = cart => ({
  type: GET_CART_ITEMS,
  cart
})

const addItem = plant => ({
  type: ADD_ITEM,
  plant
})

const removeItem = (plantId, price) => ({
  type: REMOVE_ITEM,
  plantId,
  price
})

const clearCart = orderId => ({
  type: CLEAR_CART,
  orderId
})

const checkout = cart => ({
  type: CHECKOUT,
  cart
})

const createCart = cart => ({
  type: CREATE_CART,
  cart
})

// THUNK CREATORS

// getCart Thunk
export const getCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(getCartItems(res.data))
  } catch (err) {
    console.log('there was an error getting the cart', err)
  }
}

//addItem Thunk
export const addItemThunk = (plant, orderId) => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/${orderId}`, plant)
    dispatch(addItem(res.data))
  } catch (err) {
    console.log('there was an error adding an item', err)
  }
}

//removeItem Thunk
export const removeItemThunk = cart => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/${cart.id}`, cart)
    dispatch(removeItem(res.data))
  } catch (err) {
    console.log('there was an error removing an item', err)
  }
}

//checkout Thunk
export const checkoutThunk = cart => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/${cart.id}`, {checkedOut: true})
    dispatch(checkout(res.data))
  } catch (err) {
    console.log('There was an error checking out.', err)
  }
}

//createCart Thunk
export const createCartThunk = () => async dispatch => {
  //guest
  try {
    const res = await axios.post('/api/orders/', defaultCart)
    dispatch(createCart(res.data))
    console.log('res.data from createCartThunk', res.data)
  } catch (err) {
    console.log('there was an error creating a cart!', err)
  }
}

//Update Cart
// -- ADMIN USE ONLY: CODE IS HERE FOR FUTURE REFERENCE, updateCart does not exist yet
// export const updateCartThunk = (orderId, cart) => async dispatch => {
//   try {
//     const {updateResponse} = await axios.put(`/api/orders/${orderId}`, cart)
//     const {data} = await axios.get(`/api/orders/${orderId}`)
//     dispatch(updateCart(data))
//   } catch (err) {
//     console.log('there was an error updating that order', err)
//   }
// }

// REDUCER

const cart = (state = defaultCart, action) => {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return {
        ...state,
        plants: action.plants
      }
    }
    case ADD_ITEM: {
      return {
        ...state,
        plants: [...state.plants, action.plant]
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.plants.filter(plant => plant.id !== Number(action.plantId))
      }
    }
    case CLEAR_CART: {
      return {
        defaultCart
      }
    }
    case CHECKOUT: {
      return {
        ...state,
        checkedOut: true
      }
    }
    case CREATE_CART: {
      return {
        ...state,
        orderId: action.cart.id
      }
    }
    default: {
      return state
    }
  }
}

export default cart
