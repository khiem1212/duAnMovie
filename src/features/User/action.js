import {  useHistory } from "react-router-dom";
import instance from "../../api/instance";
import { SET_SELECTED_MOVIE } from "../Movie/action";

export const SET_USER = "user/SET_USER";
export const SET_DELETED_USER = "user/SET_DELETED_USER";
export const SET_ADD_USER = "user/SET_ADD_USER";
export const SET_UPDATE_USER = "user/SET_UPDATE_USER";
export const SET_passTypeUser = "user/SET_passTypeUser";
export const SET_SELECTED_USER = "user/ SET_SELECTED_USER";




export const fetchUser =  (taiKhoan) => {
  return async (dispatch) => {
    if(taiKhoan===''){
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        method: "GET",
        params: {
          MaNhom: "GP00",
        },
      });

      dispatch({
        type: SET_USER,
        payload: res.data.content,
      });
    } catch (err) {}

  } else{
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        method: "GET",
        params: {
          MaNhom: "GP00",
          tuKhoa:taiKhoan
        },
      });

      dispatch({
        type: SET_USER,
        payload: res.data.content,
      });
    } catch (err) {}
  }
  };
};
export const fetchDeletelAction = (acount) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/XoaNguoiDung",
        method: "DELETE",
        params: {
          TaiKhoan: acount,
        },
      });
      alert("xoa nguoi dung thanh cong")
      console.log(res);
    } catch (err) {}
  };
};

export const fetchAddUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "  /api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: data,
      });
alert("them nguoi dung thanh cong")
      dispatch({
        type: SET_ADD_USER,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const passTypeUser = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
      method: "GET",
    });
   
    dispatch({
      type: SET_passTypeUser,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};
export const fetchUpdateUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyDatVe/TaoLichChieu",
        method: "POST",
        data: data,
      });
alert("cap nhat nguoi dung thanh cong")

      dispatch({
        type: SET_UPDATE_USER,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const fetchUserDetailAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayThongTinNguoiDung",
        method: "POST",

        params: {
          taiKhoan: data,
         
        },
      });

      dispatch({
        type: SET_SELECTED_USER,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};
