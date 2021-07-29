export const inititialState = {
  token: null,
  userId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        userId: null,
      };
  }
};

export default reducer;
