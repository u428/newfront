import axios from "axios";

export const token = localStorage.getItem("token");
export const role = localStorage.getItem("role");

const URL = "https://qorakol-ilm-ziyo.uz/api/v1"

export const delay = async (ms) =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const fetchAuthLogin = (req) => {
  console.log(req);
  return axios
  .post(`${URL}/auth/login`, req)
  .then((response) => ({ response }))
  .catch((error) => ({ error }));
}


export const fetchAuthMe = async (tokens) =>
  await axios
    .get(`${URL}/auth/me`, {
      headers: {
        Authorization: tokens,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

export const fetchAuthSetting = async (req) =>
  await axios
    .put(`${URL}/api/user/update`, req, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

    export const fetchGetCheckLogin = async (login) =>
  await axios
    .get(`${URL}/auth/check_login?login=${login}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

    // teachers

export const fetchGetTeachersList = async (req) =>
  await axios
    .get(`${URL}/static/get_teachers_list?page=${Number(req.current)}&limit=${Number(req.pageSize)}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));


export const fetchGetTeachersListSearch = async (req) =>
  await axios
    .get(`${URL}/static/get_teachers_list_search?name=${req}`,{
      headers: {
        Authorization: token,
      },
    })


export const fetchDeleteTeacher = async (id) =>
  await axios
    .delete(`${URL}/a23d_m23_i23n/delete_teacher?id=${Number(id)}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));


    
export const fetchViewTeacher = async (id) =>
await axios
  .get(`${URL}/static/view_teacher?id=${Number(id)}`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  export const fetchGetSingleTeacher = async (id) =>
  await axios
    .get(`${URL}/static/get_single_teacher?id=${Number(id)}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

    
export const fetchPostTeacher = async (req) =>
await axios
  .post(
    `${URL}/a23d_m23_i23n/add_teacher`,
    req, 
    {
    headers: {
      Authorization: token
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
export const fetchCheckStudentTeacher = async (req) =>
await axios
  .post(
    `${URL}/teacher/student_check`,
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
    `${URL}/a23d_m23_i23n/put_teacher`,
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
    `${URL}/static/get_language`,
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
    `${URL}/static/get_subjects`,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  export const fetchGetSingleSubjectsList = async (id) =>
  await axios
    .get(
      `${URL}/static/get_subject_one?id=${id}`,
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
    `${URL}/a23d_m23_i23n/add_subject`,
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
    `${URL}/a23d_m23_i23n/put_subject`,
    req,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
  export const fetchDeleteSubject = async (id) =>
  await axios
  .delete(
    `${URL}/a23d_m23_i23n/delete_subject?id=${id}`,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));


// groups

export const fetchGetGroupsList = async (req) =>
  await axios
    .get(`${URL}/static/get_group_list?current=${Number(req.current)}&pageSize=${Number(req.pageSize)}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

    export const fetchGetGroupsTeacherList = async (req) =>
  await axios
    .get(`${URL}/teacher/groups`,{
      headers: {
        Authorization: token,
      },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

    
export const fetchGetGroupsListSearch = async (name) =>
await axios
  .get(`${URL}/depend/get_group_list_search?name=${name}`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

    
  export const fetchGetSingleGroups = async (id) =>
  await axios
    .get(
      `${URL}/static/get_group_one?id=${id}`,
      {
      headers: {
        Authorization: token,
      },
      })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));

  export const fetchPostGroup = async (req) =>
  await axios
  .post(
    `${URL}/a23d_m23_i23n/add_group`,
    req,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  export const fetchPutGroup = async (req) =>
  await axios
  .put(
    `${URL}/a23d_m23_i23n/put_group`,
    req,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
  export const fetchDeleteGroup = async (id) =>
  await axios
  .delete(
    `${URL}/a23d_m23_i23n/delete_group?id=${id}`,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));


  export const fetchGetTeacherGroups = async (id) =>
  await axios
  .get(
    `${URL}/static/get-teacher-groups?id=${id}`,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));


  // Students

  
export const fetchGetStudentList = async (req) =>
await axios
  .get(`${URL}/depend/get_students?current=${Number(req.current)}&pageSize=${Number(req.pageSize)}`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
export const fetchGetStudentGroupList = async (id) =>
await axios
  .get(`${URL}/depend/get_student_list_by_group?id=${id}`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
export const fetchGetNewStudentList = async (req) =>
await axios
  .get(`${URL}/static/get_students_new?current=${Number(req.current)}&pageSize=${Number(req.pageSize)}`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
export const fetchGetNewStudentOne = async (name) =>
await axios
  .get(`${URL}/depend/get_Students_list_search?name=${name}`,{
    headers: {
      Authorization: token,
    },
  })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
export const fetchGetSingleStudent = async (id) =>
await axios
  .get(
    `${URL}/static/get_student?id=${id}`,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

  
export const fetchGetSingleStudentGroups = async (id) =>
await axios
  .get(
    `${URL}/depend/get_group_list_student?id=${id}`,
    {
    headers: {
      Authorization: token,
    },
    })
  .then((response) => ({ response }))
  .catch((error) => ({ error }));

export const fetchPostStudent = async (req) =>
await axios
.post(
  `${URL}/depend/add_student`,
  req,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));


export const fetchPostStudentGroup = async (req) =>
await axios
.post(
  `${URL}/depend/student_group`,
  req,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));


export const fetchPostStudentLogin = async (req) =>
await axios
.post(
  `${URL}/depend/add_student_login`,
  req,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));

export const fetchPutStudent = async (req) =>
await axios
.put(
  `${URL}/auth/add_student`,
  req,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));


export const fetchDeleteStudent = async (id) =>
await axios
.delete(
  `${URL}/depend/delete_new_student?id=${id}`,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));

export const fetchPaymentStudent = async (req) =>
await axios
.post(
  `${URL}/a23d_m23_i23n/payment`,
  req,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));

// dashboard statistic
export const fetchDashboardStatistic = async () =>
await axios
.get(
  `${URL}/static/get_dashboard`,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));

export const fetchDashboardStatisticChart = async () =>
await axios
.get(
  `${URL}/static/line_graph`,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));


// Super Admin
export const fetchGetAllControllers = async () =>
await axios
.get(
  `${URL}/a23d_m23_i23n/get-all-controllers`,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));

export const fetchGetControllerAuth = async (id) =>
await axios
.get(
  `${URL}/a23d_m23_i23n/get-controller?id=${id}`,
  {
  headers: {
    Authorization: token,
  },
  })
.then((response) => ({ response }))
.catch((error) => ({ error }));



