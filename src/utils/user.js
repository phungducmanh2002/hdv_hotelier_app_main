class UserSession {
  constructor() {
    if (UserSession.instance) {
      return UserSession.instance;
    }

    this.idUser = null;
    UserSession.instance = this;
  }

  setIdUser(idUser) {
    this.idUser = idUser;
  }

  getIdUser() {
    return this.idUser;
  }

  clearSession() {
    this.idUser = null;
  }
}

// Đảm bảo rằng class chỉ có một instance
const instance = new UserSession();
Object.freeze(instance);

export default instance;