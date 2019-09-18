import axios from 'axios'

// ACTION TYPES
const GET_CART_ITEMS = 'GOT_CART_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const CHECKOUT = 'CHECKOUT'

// INITIAL STATE
const defaultCart = {
  address: '',
  items: [],
  shippingMethod: null,
  quantity: 0,
  gift: false,
  totalCost: 0,
  checkedOut: false
  // selected: {}
  // ^^ selected can be a plant object whose quantity we can increase/decrease?
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

const removeItem = (id, price) => ({
  type: REMOVE_ITEM,
  id,
  price
})

const clearCart = id => ({
  type: CLEAR_CART,
  id
})

const checkout = cart => ({
  type: CHECKOUT,
  cart
})

// THUNK CREATORS

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
        totalCost: state.cost + action.item.price
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== Number(action.id)),
        totalCost: state.cost - action.price
      }
    }
    case CLEAR_CART: {
      return {
        ...state,
        items: [],
        quantity: 0,
        gift: false,
        totalCost: 0,
        checkedOut: false
      }
    }
    case CHECKOUT: {
      return {
        ...state,
        checkedOut: true
      }
    }
    default: {
      return state
    }
  }
}

export default cart
