import axios from 'axios'
import {runInNewContext} from 'vm'

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const CHECKOUT = 'CHECKOUT'
const CREATE_CART = 'CREATE_CART'

// INITIAL STATE
const defaultCart = {
  address: '',
  items: [],
  shippingMethod: null,
  quantity: 0,
  gift: false,
  totalCost: 0,
  checkedOut: false
}

// ACTION CREATORS
// We need action creators to set each of the cart properties (based off of the order properties)

const getCartItems = cart => ({
  type: GET_CART_ITEMS,
  cart
})

const addItem = item => ({
  type: ADD_ITEM,
  item
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

const createCart = () => ({
  type: CREATE_CART
})

// THUNK CREATORS

//createCart Thunk
export const createCartThunk = () => async dispatch => {
  //guest
  try {
    const res = await axios.post('/', defaultCart)
    dispatch(createCart(res.data))
  } catch (err) {
    console.error('there was an error creating a cart!', err)
  }
}

// export const checkoutThunk = (cart) = async dispatch => ({
//   try {
// make an axios update request here with the submission data (from cart)
//   } catch (error) {
//     console.error('There was an error checking out.')
//   }
// })

// REDUCER

const cart = (state = defaultCart, action) => {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return {
        ...state,
        items: action.items,
        quantity: action.items.length
      }
    }
    case ADD_ITEM: {
      return {
        ...state,
        items: [...state.items, action.item],
        totalCost: state.totalCost + action.item.price
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== Number(action.plantId)),
        totalCost: state.totalCost - action.price
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
      return {...state}
      //we might eventually need to return something related to the session, if a user is logged in
    }
    default: {
      return state
    }
  }
}

export default cart
