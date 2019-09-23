import axios from 'axios'

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const CREATE_CART = 'CREATE_CART'

// INITIAL STATE
const defaultCart = {
  plants: []
}

// ACTION CREATORS

const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  cartItems
})

export const addItem = cartItem => ({
  type: ADD_ITEM,
  cartItem
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
export const getCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/cart`)
    dispatch(getCartItems(res.data))
  } catch (err) {
    console.log('there was an error getting the cart', err)
  }
}

//addItem Thunk
export const addItemThunk = (plant, qty) => async dispatch => {
  try {
    plant.orderQty = Number(qty)
    const res = await axios.post(`/api/orders/add/`, plant)
    dispatch(addItem(res.data))
  } catch (err) {
    console.log('there was an error adding an item', err)
  }
}

//removeItem Thunk IN PROGRESS
// export const removeItemThunk = plantId => async dispatch => {
//   try {
//     const res = await axios.put(`/api/orders/${}`, cart)
//     dispatch(removeItem(res.data))
//   } catch (err) {
//     console.log('there was an error removing an item', err)
//   }
// }

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

// REDUCER

const cart = (state = defaultCart, action) => {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return {
        plants: action.cartItems
      }
    }
    case ADD_ITEM: {
      return {
        plants: [...state.plants, action.cartItem]
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.plants.filter(plant => plant.id !== Number(action.plantId))
      }
    }
    case CLEAR_CART: {
      return defaultCart
    }
    default: {
      return state
    }
  }
}

export default cart
