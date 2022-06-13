import {
    GET_TEACHERS,
    GET_TEACHERS_ERROR,
    GET_TEACHERS_SUCCESS,

    VIEW_TEACHER,
    VIEW_TEACHER_SUCCESS,
    VIEW_TEACHER_ERROR,

    DELETE_TEACHER,
    DELETE_TEACHER_SUCCESS,
    DELETE_TEACHER_ERROR,

    GET_SINGLE_TEACHER,
    GET_SINGLE_TEACHER_ERROR,
    GET_SINGLE_TEACHER_SUCCESS,

    POST_TEACHERS,
    POST_TEACHERS_ERROR,
    POST_TEACHERS_SUCCESS,
    
    CHECK_STUDENT_TEACHER,
    CHECK_STUDENT_TEACHER_ERROR,
    CHECK_STUDENT_TEACHER_SUCCESS,

    PUT_TEACHERS,
    PUT_TEACHERS_ERROR,
    PUT_TEACHERS_SUCCESS,
  } from "../actions";
  
  const INIT_STATE = {
    loading: false,
    isActive: false,
    error: null,
    teachers: null,
    teacher: {},
    success: null,
    teacherGroup:null,
    pagination:{
      current: 1,
      pageSize: 10
    }
  };
  
  export const teacherReducer = (state = INIT_STATE, { type, payload }) => {
    switch (type) {
      case GET_TEACHERS:
        return { ...state, isActive: false, loading: true };
      case GET_TEACHERS_SUCCESS:
        return { ...state, loading: false, isActive: true, teachers: payload.returns, pagination:{...payload.pagination}};
      case GET_TEACHERS_ERROR:
        return { ...state, loading: false, isActive: false, error: payload };

      case DELETE_TEACHER:
        return { ...state, isActive: false, loading: true };
      case DELETE_TEACHER_SUCCESS:
        return { ...state, loading: false, isActive: true, success: payload};
      case DELETE_TEACHER_ERROR:
        return { ...state, loading: false, isActive: false, error: payload };

      case GET_SINGLE_TEACHER:
          return { ...state, loading: true, isActive: false};
      case GET_SINGLE_TEACHER_SUCCESS:
          return { ...state, loading: false, isActive: true, teacher: payload };
      case GET_SINGLE_TEACHER_ERROR:
          return { ...state, loading: false,isActive: false, error: payload };

      case VIEW_TEACHER:
          return { ...state, loading: true, isActive: false};
      case VIEW_TEACHER_SUCCESS:
          return { ...state, loading: false, isActive: true, teacher: payload.teacher, teacherGroup:payload.groups };
      case VIEW_TEACHER_ERROR:
          return { ...state, loading: false,isActive: false, error: payload };

      case POST_TEACHERS:
        return { ...state, loading: true , isActive: false};
      case POST_TEACHERS_SUCCESS:
        return { ...state, loading: false, isActive: true, success: payload };
      case POST_TEACHERS_ERROR:
        return { ...state, loading: false, error: payload };

      case CHECK_STUDENT_TEACHER:
          return { ...state, loading: true , isActive: false};
      case CHECK_STUDENT_TEACHER_SUCCESS:
          return { ...state, loading: false, isActive: true, success: payload };
      case CHECK_STUDENT_TEACHER_ERROR:
          return { ...state, loading: false, error: payload };

        case PUT_TEACHERS:
        return { ...state, loading: true , isActive: false};
      case PUT_TEACHERS_SUCCESS:
        return { ...state, loading: false, isActive: true, success: payload };
      case PUT_TEACHERS_ERROR:
        return { ...state, loading: false, error: payload };

      default:
        return { ...state };
    }
  };
  