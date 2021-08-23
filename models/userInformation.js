class UserInformation {
  constructor(login, email, firstName, lastName, address) {
    (this.login = login),
      (this.email = email),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.address = address);
  }
}

export default UserInformation;
