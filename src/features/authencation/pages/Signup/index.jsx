import { Button, Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import styles from "./style.module.css";
import * as yup from "yup";


import { useDispatch } from "react-redux";

import instance from "../../../../api/instance";
import { SET_PROFILE } from "../../action";
import { useHistory } from "react-router-dom"

const schema = yup.object({
  taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
  matKhau: yup.string().required("*Trường này bắt buộc nhập"),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit:  (values) => {
      signIn(values);
   
    },
    validationSchema: schema,
  });

  const signIn = async (user) => {
    
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });

      const profile = { ...res.data.content };
      delete profile.accessToken;

      localStorage.setItem("token", res.data.content.accessToken);
      dispatch({ type: SET_PROFILE, payload: profile });
      history.push("/Managaer");
    } catch (err) {
     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="text"
          placeholder="Username"
        />
        {formik.touched.taiKhoan && formik.errors.taiKhoan && (
          <p className={styles.errorText}>{formik.errors.taiKhoan}</p>
        )}

        <Input
          name="matKhau"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        {formik.touched.matKhau && formik.errors.matKhau && (
          <p className={styles.errorText}>{formik.errors.matKhau}</p>
        )}

        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Signin;
