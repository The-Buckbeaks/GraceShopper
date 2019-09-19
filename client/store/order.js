import axios from 'axios'

const CHECKOUT = 'CHECKOUT'

const checkout = cart => ({
  type: CHECKOUT,
  cart
})

//checkout Thunk
export const checkoutThunk = (
  orderId,
  address,
  shippingMethod,
  gift,
  userId
) => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/${orderId}`, {
      address,
      shippingMethod,
      gift,
      checkedOut: true,
      userId
    })
    dispatch(checkout(res.data))
  } catch (err) {
    console.log('There was an error checking out.', err)
  }
  // try {   we need to write a thunk that updates the inventory quantity of each plant in the order....
  //   const res = await axios.put('/api/plants/${plant.id}')
  // }
}

// Need a name to ship to even if the user is a guest

const initialState = {
  address: '',
  shippingMethod: '',
  gift: false,
  totalCost: 0,
  checkedOut: false,
  userId: null
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT: {
      return action.cart
    }
    default: {
      return state
    }
  }
}

export default order
