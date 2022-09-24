import { Button, Form, DatePicker, InputNumber, Select } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../../../api/instance";
import { fetchProfileAction } from "../../../authencation/action";
import {
  fetchCinemasAction,
  fetchMovieDetailAction,
  fetchMovieScheduleAction,
  fetchMovieShowTime,
} from "../../action";
import { useHistory, useRouteMatch } from "react-router-dom";
const { Option } = Select;

function ShowTime(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const comeBack = ()=>{
    history.push("/Moviemanger")
  }
  const match = useRouteMatch();
  const id = match.params.id;
 
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: '',
      maRap: "",
      giaVe: "",
    },
    onSubmit: (values) => {
      
      fetchMovieShowTime(values);
      
    },
  });
  const fetchMovieShowTime = async (data) => {
  
      try {
        const res = await instance.request({
          url: "/api/QuanLyDatVe/TaoLichChieu",
          method: "POST",
          data: data,
         
        });
  
       alert("tao lich chieu thanh cong")
      } catch (err) {
      
      }
    };
  
 

  const selectedMovie = useSelector((state) => {
    return state.movie.selectedMovie;
  });

  const cinemas = useSelector((state) => {
    return state.movie.cinemas;
  });

  

  const schedule = useSelector((state) => {
    return state.movie.schedule;
  });

  const fetchMovieDetail = () => {
    dispatch(fetchMovieDetailAction(id));
  };

  const fetchCinemas =  () => {
    dispatch(fetchCinemasAction);
  };

  const fetchMovieSchedule = (id) => {
    dispatch(fetchMovieScheduleAction(id));
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchCinemas();
    dispatch(fetchProfileAction);
  }, []);

  const handleChange = (value) => {
   
    fetchMovieSchedule(value);
  };
  const handleChangee = (values) => {
   
   formik.setFieldValue('maRap',values)
   
  };
  const onChange = (values, ) => {
  
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    formik.setFieldValue ('ngayChieuGioChieu',moment(values).format ('DD-MM-YYYY hh:mm:ss') )

  };
  const onOk = (value) => {
  
  };
  const onChangee = (value) => {
   
    formik.setFieldValue('giaVe', value)
  };
  return (
    <div>
    <h2 style={{textAlign:'center',fontSize:"30px",fontWeight:'700',marginTop:'20px'}}>Tạo lịch chiếu</h2>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item label="Tên hệ thống rạp" name="username">
        <>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            {cinemas?.map((item) => {
              return (
                <Option key={item.maHeThongRap} value={item.maHeThongRap}>{item.tenHeThongRap}</Option>
              );
            })}
          </Select>
        </>
      </Form.Item>
      <Form.Item label="Cụm rạp" name="maRap">
        <>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChangee}
          >
            {schedule?.lstCumRap.map((item) => {
              return <Option key={item.maCumRap} value={item.maCumRap}>{item.tenCumRap}</Option>;
            })}
          </Select>
        </>
      </Form.Item>

      <Form.Item label="Ngày/giờ chiếu" name="ngayChieuGioChieu">
      <DatePicker showTime format="DD/MM/YY hh:mm:ss" onChange={onChange} onOk={onOk} />
      </Form.Item>

      <Form.Item label="Giá" name="giaVe">
      <InputNumber min={1} max={200000} defaultValue={75000} onChange={onChangee}></InputNumber>
      </Form.Item>
      <Form.Item label="Xác nhận" name="username">
        <Button type="primary" htmlType="submit">Tạo lịch chiếu</Button>
        <Button style={{marginLeft:"20px"}} onClick={()=>comeBack()} type="primary" htmlType="submit">
          Come back MovieList
          </Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default ShowTime;
