import { useHistory } from "react-router-dom";
import instance from "../../api/instance";

export const SET_MOVIES = "movie/SET_MOVIES";
export const SET_DELETED_MOVIE = "movie/SET_DELETED_MOVIE";
export const SET_SELECTED_MOVIE = "movie/SET_SELECTED_MOVIE";
export const SET_CINEMAS = "movie/SET_CINEMAS";
export const SET_SCHEDULE = "movie/SET_SCHEDULE";
export const SET_MOVIES_SHOWTIME = "movie/SET_MOVIES_SHOWTIME";



export const fetchMoviesAction = (maPhim) => {
    return async (dispatch) => {
      if(maPhim===''){
        
        try {

          const res = await instance.request({
            url: "/api/QuanLyPhim/LayDanhSachPhim",
            method: "GET",
            params: {
              maNhom: "GP00",
            },
          });
    
          dispatch({
            type: SET_MOVIES,
            payload: res.data.content,
          });
        } catch (err) {}
      }else{
            
        try {

          const res = await instance.request({
            url: "/api/QuanLyPhim/LayDanhSachPhim",
            method: "GET",
            params: {
              maNhom: "GP00",
              tenPhim:maPhim,
            },
          });
       
          dispatch({
            type: SET_MOVIES,
            payload: res.data.content,
          });
        } catch (err) {}
      }
      }
    };
  ;
  export const fetchMovieDetelAction = (id) => {
    return async (dispatch) => {
      try {
        const res = await instance.request({
          url: "/api/QuanLyPhim/XoaPhim",
          method: "DELETE",
          params: {
            MaPhim: id,
          },
        });
  
        dispatch({
          type: SET_DELETED_MOVIE,
          payload: res.data.content,
        });
        alert("xoa phim thanh cong")
      } catch (err) {}
    };
  };
  export const fetchMovieDetailAction = (id) => {
    return async (dispatch) => {
      try {
        const res = await instance.request({
          url: "/api/QuanLyPhim/LayThongTinPhim",
          method: "GET",
          params: {
            MaPhim: id,
          },
        });
  
        dispatch({
          type: SET_SELECTED_MOVIE,
          payload: res.data.content,
        });
      } catch (err) {}
    };
  };
  
  export const fetchCinemasAction = async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinHeThongRap",
        method: "GET",
      });
  
      dispatch({
        type: SET_CINEMAS,
        payload: res.data.content,
      });
      
      return res.data.content;
    } catch (err) {}
  };
  export const fetchAddMovie = async(formData) => {
  
    
      try {
        const res = await instance.request({
          url: "/api/QuanLyPhim/ThemPhimUploadHinh",
          method: "POST",
          data: formData,
         
         
        });

        alert("cap nhat phim thanh cong")
   
      } catch (err) {
    
      }
    };
  ;
  export const featchUpdateMovie = async(formData) => {
  
  
    
      try {
        const res = await instance.request({
          url: "/api/QuanLyPhim/CapNhatPhimUpload",
          method: "POST",
          data: formData,
         
         
        });

        alert("cap nhat thanh cong")
        
      } catch (err) {
      
      }
    };
  ;
  
  export const fetchMovieScheduleAction = (id) => {
    return async (dispatch) => {
      try {
        const res = await instance.request({
          url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
          method: "GET",
          params: {
            maHeThongRap: id,
            maNhom: "GP02",
          },
        });
  
        dispatch({
          type: SET_SCHEDULE,
          payload: res.data.content,
        });
      } catch (err) {}
    };
  };
  export const fetchMovieScheduleActionn = (id) => {
    return async (dispatch) => {
      try {
        const res = await instance.request({
          url: "/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
          method: "GET",
          params: {
            maHeThongRap: id,
            maNhom: "GP02",
          },
        });
  
        dispatch({
          type: SET_SCHEDULE,
          payload: res.data.content,
        });
      } catch (err) {}
    };
  };
 
