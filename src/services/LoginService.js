import { checkStatus } from "../utils/http.js";

class LoginService {
  authFetch(url, method = "get", body = null) {
    const token = localStorage.getItem("token");
    const requestParams = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    };
    return fetch(url, requestParams, body);
  }

  addAuthentication(login) {
    return fetch("/api/v1/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    })
      .then(checkStatus)
      .then((response) => response.json());
  }
  editUser(user) {
    return this.authFetch("/api/v1/edituser", "PUT", JSON.stringify(user));
  }
  addUser(user) {
    return this.authFetch("/api/v1/user", "POST", JSON.stringify(user)).then(
      checkStatus
    );
  }
  isTokenValid() {
    const token = localStorage.getItem("token");
    return this.authFetch(`/api/v1/validateToken?token=${token}`)
      .then(checkStatus)
      .then((response) => response.json());
  }
  getLoginByEmail(email) {
    return this.authFetch(`/api/v1/user/?email=${email}`)
      .then(checkStatus)
      .then((response) => response.json());
  }

  loginExists(login) {
    return this.authFetch("/api/v1/isUserTrue", "POST", JSON.stringify(login))
      .then(checkStatus)
      .then((response) => response.json());
  }
  changePassword(login) {
    return this.authFetch(
      "/api/v1/changePassword",
      "PUT",
      JSON.stringify(login)
    ).then(checkStatus);
  }
  getAllLogins() {
    return this.authFetch("/api/v1/user/all")
      .then(checkStatus)
      .then((response) => response.json());
  }
  getLoginById(id) {
    return this.authFetch(`/api/v1/user/${id}`)
      .then(checkStatus)
      .then((response) => response.json());
  }
  deleteUserById(id) {
    return this.authFetch("/api/v1/user/" + id, "delete").then(checkStatus);
  }
  loginEmailExists(email) {
    return this.authFetch(`/api/v1/user/email?email=${email}`)
      .then(checkStatus)
      .then((response) => response.json());
  }
}

const loginService = new LoginService();

export default loginService;
