import USERS from "../../data/dummy-user-data";
import USERSINFORMATION from "../../data/dummy-user-information-data";
import { LOGOUT, TRY_TO_LOGIN } from "../actions/user";

const initialState = {
  userInformation: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRY_TO_LOGIN: {
      const user = USERS.find(
        (user) =>
          user.login === action.email && user.password === action.password
      );

      if (user) {
        const information = USERSINFORMATION.find(
          (info) => info.login === user.login
        );

        if (information) {
          return {
            userInformation: information,
            isAuthenticated: true,
          };
        }
      }
    }
    case LOGOUT: {
      return {
        userInformation: null,
        isAuthenticated: false,
      };
    }
  }

  return state;
};
