import { Button, Form, Input, Select } from "antd";
import React from "react";
import styles from "./style.module.css";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { passTypeUser } from "../../action";
import instance from "../../../../api/instance";
import { fetchProfileAction } from "../../../authencation/action";
import { useHistory } from "react-router-dom";
const { Option } = Select;


function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const comeBack = ()=>{
    history.push("/Managaer")
  }
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP00",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: (values) => {
      fetchAddUser(values);
      
    },
});
    const typeUser = useSelector((state) => {
        return state.user.typeUser;
      })

  const handleChange = (value) => {
    formik.setFieldValue('maLoaiNguoiDung',value)
   
  };
  const fetchAddUser= async (data) => {
  
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: data,
       
      });

     alert("them nguuoi dung thanh cong")
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
        
    dispatch(passTypeUser);
   
  }, []);
  return (
    <div>
      <h2 className={styles.title}>THÊM NGƯỜI DÙNG</h2>
      <Form onSubmitCapture={formik.handleSubmit} className={styles.form}>
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          className={styles.input}
          type="text"
          placeholder="Ho ten"
        />
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          className={styles.input}
          type="text"
          placeholder="Tai Khoan"
        />
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        <Input
          name="email"
          onChange={formik.handleChange}
          className={styles.input}
          type="email"
          placeholder="Email"
        />
        <Input 
          name="soDt"
          onChange={formik.handleChange}
          className={styles.input}
          type="number"
          placeholder="Number"
        />
      <Form.Item label="Loại người dùng" name="maRap">
        <>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            {typeUser?.map((item) => {
              return <Option value={item.maLoaiNguoiDung}>{item.tenLoai}</Option>;
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

export default AddUser;
