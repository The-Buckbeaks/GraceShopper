/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as AllPlants} from './AllPlants'
export {default as SinglePlant} from './SinglePlant'
export {default as SinglePlantView} from './SinglePlantView'
export {default as Splash} from './splash'
export {default as SingleCartItem} from './SingleCartItem'
export {default as OrderForm} from './order-form'
export {default as confirmationForm} from './confirmationForm'
