import axios from "axios";

export const token = localStorage.getItem("token");
export const role = localStorage.getItem("role");

export const delay = async (ms) =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const fetchAuthLogin = async (req) =>
  await axios
    .post("/auth/login", req)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

export const fetchAuthMe = async (tokens) =>
  await axios
    .get("/auth/me", {
      headers: {
        Authorization: tokens,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

export const fetchAuthSetting = async (req) =>
  await axios
    .put("/api/user/update", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

export const fetchGetProducts = async () =>
  await axios
    .get("/api/product/", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));


export const fetchGetTeachersList = async () =>
  await axios
    .get("/static/get_teachers_list", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

  export const fetchGetSingleTeacher = async () =>
  await axios
    .get("/static/get_single_teacher?id=1", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

    
export const fetchPostTeachersList = async (req) =>
await axios
  .post(
    "/static/get_teachers_list",
    req, 
    {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));
