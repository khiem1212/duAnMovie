import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  featchUpdateMovie,
  fetchAddMovie,
  fetchMovieDetailAction,
  fetchMovieDetelAction,
} from "../../action";
import moment from "moment";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { formatDate } from "../../uilts/date";
import { useHistory, useRouteMatch } from "react-router-dom";

function FilmEdit() {
  const history=useHistory();
  const match = useRouteMatch();
  const comeBack = ()=>{
    history.push("/Moviemanger")
  }
  const [imgSrc, setImgSrc] = useState("");

  const id = match.params.id;
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();
  // const handleChangDate=(value)=>{
  //   let ngayKhoiChieu=moment(value).format('DD/MM/YYYY')
  //   formik.setFieldValue(ngayKhoiChieu);
  // }
  const handleChangeFile = async(e) => {
    let file = e.target.files[0];
   

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {

    await  formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }

  
  };
  const handleChangeDatePicker = (value) => {
    // console.log ( ' datepickerchange ' , ) ;
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  };
  const handleChangeImg = (e) => {
    // console.log ( ' datepickerchange ' , ) ;

    formik.setFieldValue("hinhAnh", e.fileList[0]);
  };
  const handleSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const data = useSelector((state) => state.movie.selectedMovie);

  useEffect(() => {
    dispatch(fetchMovieDetailAction(id));
  }, []);
  const goToMovieList = () => {
    history.push("/Moviemanger");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim:data?.maPhim,
      tenPhim: data?.tenPhim,
      trailer: data?.trailer,
      moTa: data?.moTa,
      ngayKhoiChieu: data?.ngayKhoiChieu,
      danhGia: data?.danhGia,
      SapChieu: data?.sapChieu,
      dangChieu: data?.dangChieu,
      Hot: data?.hot,
      hinhAnh: null,
    },

   
    onSubmit: (values) => {
     
      values.maNhom = "GP00";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if(values.hinhAnh!==null)
            formData.append("hinhAnh", values.hinhAnh, "chris2.jpg");
          
        }
      }
      // Gọi api gửi các giá trị formdata về backend xử lý
    
      dispatch(featchUpdateMovie(formData));
     
   
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
 

  return (
    <div>
      
      <h2 style={{textAlign:'center',fontSize:"30px",fontWeight:'700',marginTop:'20px'}}>CHỈNH SỬA PHIM</h2>
      <Form style={{marginTop:"20px"}}
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên Phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item
          label="Traler"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <Input name="trailer" value={formik.values.trailer} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.moTa}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: "white",
            },
          ]}
          style={{ color: "white" }}
          label="Hình ảnh"
        >
          <input type="file" onChange={handleChangeFile} />
          <br />
          <img
            style={{ width: 150, height: 150 }}
            src={imgSrc === "" ? data?.hinhAnh : imgSrc}
            alt=""
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
           
            name="ngayKhoiChieu "
            onChange={handleChangeDatePicker}
            value={moment(formatDate(formik.values.ngayKhoiChieu))}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            name="danhGia"
            onChange={handleSwitch("danhGia")}
            min="1"
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="dangChieu">
          <Switch
            onChange={handleSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="SapChieu">
          <Switch
            onChange={handleSwitch("SapChieu")}
            checked={formik.values.SapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="Hot">
          <Switch onChange={handleSwitch("Hot")} checked={formik.values.Hot} />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button type="primary" htmlType="submit">
           Chỉnh sửa phim
          </Button>
          <Button style={{marginLeft:"20px"}} onClick={()=>comeBack()} type="primary" htmlType="submit">
          Come back MovieList
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FilmEdit;
