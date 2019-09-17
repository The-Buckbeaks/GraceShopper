import axios from 'axios'

// ACTION TYPES
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHECKOUT = 'CHECKOUT'

// INITIAL STATE
const defaultCart = {
  items: [],
  quantity: 0,
  cost: 0,
  checkedOut: false
}

// ACTION CREATORS
const gotCartItems = cart => ({
  type: GOT_CART_ITEMS,
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

// THUNK CREATORS

// still need to build thunk creators

// REDUCER

const cart = (state = defaultCart, action) => {
  switch (action.type) {
    case GOT_CART_ITEMS: {
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
        cost: state.cost + action.item.price
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== Number(action.id)),
        cost: state.cost - action.price
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
