class UserSession {
  constructor() {
    this.idUser = null;
  }

  static getInstance() {
    if (!UserSession.instance) {
      UserSession.instance = new UserSession();
    }
    return UserSession.instance;
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


export default UserSession;