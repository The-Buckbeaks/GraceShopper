import axios from 'axios'

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const CREATE_CART = 'CREATE_CART'
const EDIT_ITEM = 'EDIT_ITEM'

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

const removeItem = plantId => ({
  type: REMOVE_ITEM,
  plantId
})

export const clearMyCart = cart => ({
  type: CLEAR_CART,
  cart
})

export const createCart = cart => ({
  type: CREATE_CART,
  cart
})

const editedItem = plants => ({
  type: EDIT_ITEM,
  plants
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
    const res = await axios.post(`/api/orders/add`, plant)
    // dispatch(addItem(res.data))
    dispatch(getCart(res.data))
  } catch (err) {
    console.log('there was an error adding an item', err)
  }
}

// removeItem Thunk
export const removeItemThunk = plant => async dispatch => {
  try {
    plant.orderQty = 0
    const res = await axios.post(`/api/orders/remove`, plant)
    dispatch(removeItem(res.data))
  } catch (err) {
    console.log('there was an error removing an item', err)
  }
}

//clearCart Thunk
export const clearCart = () => async dispatch => {
  try {
    const res = await axios.post(`/api/orders/clear`)
    dispatch(clearMyCart(res.data))
  } catch (err) {
    console.log('there was an error clearing the cart', err)
  }
}

//editItem Thunk

export const editItem = (plant, qty) => async dispatch => {
  try {
    plant.orderQty = Number(qty)
    const res = await axios.post('/api/orders/edit/', plant)
    dispatch(editedItem(res.data))
  } catch (err) {
    console.log('there was an error editing the item', err)
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
        plants: state.plants.filter(
          plant => plant.id !== Number(action.plantId)
        )
      }
    }
    case CLEAR_CART: {
      return defaultCart
    }
    case EDIT_ITEM: {
      return {
        ...state,
        plants: [...action.plants]
      }
    }
    default: {
      return state
    }
  }
}

export default cart
