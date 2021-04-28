//THIS IS WHERE WE LISTEN TO AN EVENT
//reducer is the process of how the data gets pushed inside datalayer and also pulling the data out
//eg: add to basket button press garyo vane data layera bhitra lagcha
//reducer plays a vital role in pushing in data inside datalayer

//context API and Reedux are not the same thing but they use the same storing patterns.
// Basically a global store for application, and has a pattern of dispatching actions into the store.
//reducer just listens eg: when basket gets updated or item gets removed from the basket.

export const initialState = {
  // creating initialState here

  basket: [],
  user: null, //*** ADDED LATER *** adding user for user authentication
  //when the app loads by default we want user to be null
};

//build a SELECTOR (powerful highly used in production environment)
///***YOUTUBE time 2:34.31 8hrs /////
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
// gets the basket total
//using reduce() function, very powerful. -> do some research

//THIS IS WHERE WE LISTEN TO AN EVENT!!
const reducer = (state, action) => {
  // creating reducer here
  //takes 2 parameters ,surrent state of the app and action(adding or removing items from basket)

  console.log(action); //dispatch action,

  switch (action.type) {
    case "ADD_TO_BASKET": // whenever app receives add to basket action it will dispatch to basket
      return {
        ...state, //...state -> return the original state.
        basket: [...state.basket, action.item],
        // but change the basket, basket should now be whatever the basket was + (action.item)- whatever we decided to add
      };

    case "EMPTY_BASKET": //empty the basket
      return {
        ...state, //keep whatever is in state but change basket into its original array which is empty
        basket: [],
      };

    ////***Go THROUGH VIDEO, CHECK AGAIN. // **** youtube time 3:12  ****
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        // use this findidex function
        (basketItem) => basketItem.id === action.id
        // its going through basketItem and saying does any of the basketItem match actionId thats passed in
      );

      //copy the basket into temporary variable newBasket
      let newBasket = [...state.basket]; //copy what state.basket currently had
      if (index >= 0) {
        // if the index is greater than 0, it means that it find item inside the basket
        //***youtube 3:16:00 */
        newBasket.splice(index, 1); //pass the index and splice it by it
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state, // return current ...state and also basket to newBasket.
        basket: newBasket,
      };

    case "SET_USER": // when we get this type
      return {
        ...state, //return everything thats inside current state
        user: action.user, // and update the user
      };
    default:
      return state; //return default state
  }
};
export default reducer;
