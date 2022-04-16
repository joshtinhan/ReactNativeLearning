const initialState = {
  currentUser: null,
  name: null,
  email: null,
  uid: null,
};
export const user = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case "create_user":
      return {
        ...state,
        email: action.email,
        uid: action.uid,
        name: action.name,
      };
    default:
      return {
        ...state,
      };
  }
};
