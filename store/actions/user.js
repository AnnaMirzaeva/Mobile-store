export const TRY_TO_LOGIN = "TRY_TO_LOGIN";
export const LOGOUT = "LOGOUT";

export const TryToLogin = (email, password) => {
  return { type: TRY_TO_LOGIN, email: email, password: password };
};

export const Logout = () => {
  return { type: LOGOUT };
};
