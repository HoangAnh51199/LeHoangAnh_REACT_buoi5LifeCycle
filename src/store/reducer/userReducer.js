import data from "../../data/danhSachNguoiDung.json";
import { ADD_USER, DELETE_USER, SET_SELECTED_USER, UPDATE_USER } from "../types/userType";

const DEFAULT_STATE = {
  userList: data,
  selectedUser: null,

};

const stringify = localStorage.getItem("USER_LIST");
if (stringify) {
  DEFAULT_STATE.userList = JSON.parse(stringify); //lay local
}

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_USER: {
      // action.payload.id =Date.now();
      state.userList = [...state.userList, action.payload]; //push action.payload từ form input
      localStorage.setItem("USER_LIST", JSON.stringify(state.userList));
      break;
    }
    case SET_SELECTED_USER: {
      state.selectedUser = action.payload;
      break;
    }
    case UPDATE_USER: {
      const data = [...state.userList];
      const idx = data.findIndex((element) => element.id === action.payload.id);
      data[idx] = action.payload;
      state.selectedUser=null;
      state.userList=data;
      localStorage.setItem("USER_LIST", JSON.stringify(state.userList));
      
      break;
    }
    case DELETE_USER: {
      const data =[...state.userList];
      const idx = data.findIndex((element) => element.id === action.payload.id);
      data.splice(idx ,1);
      state.userList =data;
      localStorage.setItem("USER_LIST",JSON.stringify(state.userList));
      break;
    }
  }
  return { ...state };
};
