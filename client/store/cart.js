import axios from 'axios'

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const CREATE_CART = 'CREATE_CART'

// INITIAL STATE
const defaultCart = {
  orderId: null,
  plants: [],
  checkedOut: false
}

// ACTION CREATORS

const getCartItems = cart => ({
  type: GET_CART_ITEMS,
  cart
})

export const addItem = plant => ({
  type: ADD_ITEM,
  plant
})

const removeItem = (plantId, price) => ({
  type: REMOVE_ITEM,
  plantId,
  price
})

export const clearMyCart = cart => ({
  type: CLEAR_CART,
  cart
})

export const createCart = cart => ({
  type: CREATE_CART,
  cart
})

// THUNK CREATORS

// getCart Thunk
export const getCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${id}`)
    dispatch(getCartItems(res.data))
  } catch (err) {
    console.log('there was an error getting the cart', err)
  }
}

//addItem Thunk
export const addItemThunk = (plant, orderId, qty) => async dispatch => {
  try {
    plant.quantity = Number(qty)
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

//createCart Thunk
export const createCartThunk = () => async dispatch => {
  //guest
  try {
    const res = await axios.post('/api/orders/', defaultCart)
    dispatch(createCart(res.data))
  } catch (err) {
    console.log('there was an error creating a cart', err)
  }
}

//clearCart Thunk
export const clearCart = orderId => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/clear/${orderId}`, defaultCart)
    dispatch(clearMyCart(res.data))
    const newCart = await axios.post('/api/orders/', defaultCart)
    dispatch(createCart(newCart.data))
  } catch (err) {
    console.log('there was an error clearing the cart', err)
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
        orderId: action.cart.id,
        plants: [...action.cart.plants]
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
        ...defaultCart,
        orderId: action.cart.id
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
