import axios from 'axios'
import {runInNewContext} from 'vm'

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
  // try {   we need to write a thunk that updates the inventory quantity of each plant in the order....
  //   const res = await axios.put('/api/plants/${plant.id}')
  // }
}
export const getOrderHistory = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/orders')
    dispatch(gotOrderHistory(res.data))
  } catch (err) {
    console.log(err)
  }
}
// Need a name to ship to even if the user is a guest

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
      return action.orderHistory
    }
    default: {
      return state
    }
  }
}

export default order
