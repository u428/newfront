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


export const fetchGetTeachersList = async (req) =>
  await axios
    .get("/static/get_teachers_list?page="+Number(req.current)+"&limit="+Number(req.pageSize), {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

export const fetchDeleteTeacher = async (id) =>
  await axios
    .delete("/a23d_m23_i23n/delete_teacher?id="+Number(id), {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

  export const fetchGetSingleTeacher = async (id) =>
  await axios
    .get("/static/get_single_teacher?id="+id, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

    
export const fetchPostTeacher = async (req) =>
await axios
  .post(
    "/a23d_m23_i23n/put_teacher",
    req, 
    {
    headers: {
      Authorization: token
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
export const fetchPutTeacher = async (req) =>
await axios
  .put(
    "/a23d_m23_i23n/put_teacher",
    req, 
    {
    headers: {
      Authorization: token
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

    //  language
export const fetchGetLanguagesList = async () =>
await axios
  .get(
    "/static/get_language",
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  // subject
     
export const fetchGetSubjectsList = async () =>
await axios
  .get(
    "/static/get_subjects",
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  export const fetchPostSubject = async (req) =>
  await axios
  .post(
    "/a23d_m23_i23n/add_subject",
    req,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  export const fetchPutSubject = async (req) =>
  await axios
  .put(
    "/a23d_m23_i23n/put_subject",
    req,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));


