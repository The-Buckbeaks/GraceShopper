import React from 'react'
import {connect} from 'react-redux'
import {order} from '../store'

class OrderForm extends React.Component {
  constructor() {
    super()
    this.state = {
      address: '',
      shippingMethod: '',
      gift: false,
      totalCost: 0,
      checkedOut: false,
      userId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.checkedOut(this.state)
      alert(`Your order has been successfully submitted to the registrar.`)
      this.setState({
        address: '',
        shippingMethod: '',
        gift: false,
        totalCost: 0,
        checkedOut: false,
        userId: null
      })
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    this.props.getAllCampuses()
  }
  render() {
    return (
      <div className="students">
        <h2>Add a New Student</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <label htmlFor="campusId">Campus:</label>

          <select
            name="campusId"
            onChange={this.handleChange}
            value={this.state.campusId}
          >
            <option name="campusId" value={null}>
              Enroll at one of our campuses:
            </option>
            {this.props.campuses && this.props.campuses.length
              ? this.props.campuses.map(campus => (
                  <option
                    key={campus.id}
                    name="campusId"
                    value={Number(campus.id)}
                  >
                    {campus.name}
                  </option>
                ))
              : 'No Campuses to Display'}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  addStudent: studentInfo => dispatch(addStudent(studentInfo)),
  getAllCampuses: () => dispatch(getCampuses())
})
const mapStateToProps = state => ({
  campuses: state.campuses
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
