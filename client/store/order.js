import axios from 'axios'

const CHECKOUT = 'CHECKOUT'
const ORDER_HISTORY = 'ORDER_HISTORY'

const checkout = order => ({
  type: CHECKOUT,
  order
})
const gotOrderHistory = orderHistory => ({
  type: ORDER_HISTORY,
  orderHistory
})

//checkout Thunk
export const checkoutThunk = orderInfo => async dispatch => {
  try {
    const res = await axios.post(`/api/orders/submit`, orderInfo)
    dispatch(checkout(res.data))
  } catch (err) {
    console.log('There was an error checking out.', err)
  }
}
export const getOrderHistory = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/orders')
    dispatch(gotOrderHistory(res.data))
  } catch (err) {
    console.log(err)
  }
}

const initialState = {
  id: '',
  address: '',
  shippingMethod: '',
  gift: false,
  totalCost: 0,
  checkedOut: false,
  userId: null,
  orderHistory: []
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT: {
      return action.order
    }
    case ORDER_HISTORY: {
      return {...state, orderHistory: action.orderHistory}
    }
    default: {
      return state
    }
  }
}

export default order
