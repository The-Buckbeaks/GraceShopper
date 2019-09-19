import Axios from 'axios'

const CHECKOUT = 'CHECKOUT'

const checkout = cart => ({
  type: CHECKOUT,
  cart
})

//checkout Thunk
export const checkoutThunk = cart => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/${cart.id}`, {checkedOut: true})
    dispatch(checkout(res.data))
  } catch (err) {
    console.log('There was an error checking out.', err)
  }
}

const order = (state = {}, action) => {
  switch (action.type) {
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

export default order
