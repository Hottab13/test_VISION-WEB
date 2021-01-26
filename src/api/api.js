import Axios from "axios";

const instance = Axios.create({
  //withCredentials:true,
  baseURL: "http://erp.apptrix.ru/api/clients/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = {
  getAuthCreate(
    email,
    password,
    phone,
    name,
    surname,
    is_active,
    invited_by = "RU-637164",
    country_key = "RU"
  ) {
    return instance
      .post(`create/`, {
        user: {
          email,
          password,
          is_active,
        },
        phone,
        invited_by,
        name,
        surname,
        country_key,
      })
      .then((res) => res)
      .catch((err) => {
        if (err.response) {
          console.log("client received an error response (5xx, 4xx)");
          alert(err.response.request.response);
        } else if (err.request) {
          console.log(
            "client never received a response, or request never left "
          );
        } else {
          console.log("anything else");
        }
      });
  },
  getAuthLogin(username, password) {
    return instance
      .post(`token/`, {
        username,
        password,
      })
      .then((res) => res)
      .catch((err) => {
        if (err.response) {
          console.log("client received an error response (5xx, 4xx)");
          console.log(err.response);
          alert(err.response.data.detail);
        } else if (err.request) {
          console.log(
            "client never received a response, or request never left "
          );
        } else {
          console.log("anything else");
        }
      });
  },
};
