import { Button, Form, Input, Select } from "antd";
import React from "react";
import styles from "./style.module.css";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserDetailAction, passTypeUser } from "../../action";
import instance from "../../../../api/instance";
import { fetchProfileAction } from "../../../authencation/action";
import { useParams } from "react-router";
import {  useHistory, useRouteMatch } from "react-router-dom";
const { Option } = Select;


function Updateaccount () {
const history = useHistory();
const comeBack = ()=>{
  history.push("/Managaer")
}
  const match = useRouteMatch();
  
  const taiKhoan = match.params.taiKhoan;
  const data =  useSelector((state)=> state.user.selectedUser);
  const dispatch = useDispatch();
console.log(data)
  const formik =  useFormik({
    enableReinitialize:true,
    initialValues: {
      taiKhoan: data?.taiKhoan,
      matKhau:data?.matKhau ,
      email:data?.email ,
      soDT:data?.soDT ,
      maNhom: data?.maNhom,
      maLoaiNguoiDung: data?.maLoaiNguoiDung,
      hoTen:data?.hoTen ,
    },
    onSubmit: (values) => {
      fetchAddUser(values);
      
    },
});


    const typeUser = useSelector((state) => {
        return state.user.typeUser;
      })
console.log(typeUser)
  const handleChange = (value) => {
    formik.setFieldValue('maLoaiNguoiDung',value)
   
  };
  const fetchAddUser= async (data) => {
  
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "POST",
        data: data,
       
      });

     
    } catch (err) {
      console.log(err)
    }
  };
  useEffect ( () => {
      dispatch(fetchUserDetailAction(taiKhoan));   
    dispatch(passTypeUser);
   
  }, []);

 

  return (
    <div>
      <h2 className={styles.title} style={{textAlign:'center',fontSize:"30px",fontWeight:'700',marginTop:'20px'}}>Chỉnh sửa người dùng</h2>
      <Form onSubmitCapture={formik.handleSubmit} className={styles.form}>
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          className={styles.input}
          type="text"
          placeholder="Ho ten"
          value={formik.values.hoTen}
        />
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          className={styles.input}
          type="text"
          placeholder="Tai Khoan"
          value={formik.values.taiKhoan}
        />
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          className={styles.input}
          type="text"
          placeholder="Password"
          value={formik.values.matKhau}
        />
        <Input
          name="email"
          onChange={formik.handleChange}
          className={styles.input}
          type="email"
          placeholder="Email"
          value={formik.values.email}
        
        />
        <Input
          name="soDT"
          onChange={formik.handleChange}
          className={styles.input}
          type="text"
          placeholder="Number"
          value={formik.values.soDT}
        />
      <Form.Item label="Loại người dùng" name="maRap">
        <>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
            defaultValue="Khách hàng"
          >
            {typeUser?.map((item) => {
              return <Option key={item.maLoaiNguoiDung} value={item.maLoaiNguoiDung}>{item.tenLoai}</Option>;
            })}
          </Select>
        </>
      </Form.Item>
<Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button style={{marginLeft:"20px"}} onClick={()=>comeBack()} type="primary" htmlType="submit">
          Come back ListUser
          </Button>
          </Form.Item>
      </Form>
    </div>
  );
}

export default Updateaccount;
