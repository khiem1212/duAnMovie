import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Upload,
  Switch,
} from "antd";
import moment from "moment";
import "./style.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { fetchAddMovie } from "../../action";
import { useHistory } from "react-router-dom";


function FilmEditor() {
  const [componentSize, setComponentSize] = useState("default");
  // const [Img, setImg] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const history = useHistory();
  const comeBack = ()=>{
    history.push("/Moviemanger")
  }
  const dispatch = useDispatch();
  // const handleChangDate=(value)=>{
  //   let ngayKhoiChieu=moment(value).format('DD/MM/YYYY')
  //   formik.setFieldValue(ngayKhoiChieu);
  // }
  const handleChangeDatePicker = (value) => {
    // console.log ( ' datepickerchange ' , ) ;
    let ngayKhoichieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoichieu);
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
   

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }

    formik.setFieldValue("hinhAnh", file);
  };
  const handleSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      danhGia: "",
      SapChieu: "",
      Hot: "",
      hinhAnh: {},
      dangChieu:"",
    },
    onSubmit: (values) => {
      
      values.maNhom ="GP00";
     
      // Tạo đối tượng formdata = Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        
        } else {
          formData.append("hinhAnh", values.hinhAnh, "chris2.jpg");
        }
      }
   
      // formData.append("hinhAnh", 'https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt41c476486b063ef8/60ee13df31f9ee2ab08a4dfe/Yasuo_0.jpg');

      // Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(fetchAddMovie(formData));
    },
  });
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div>
        <h2 style={{textAlign:'center',fontSize:"30px",fontWeight:'700',marginTop:'20px'}}>THÊM PHIM</h2>
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
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Traler"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <Input name="trailer" />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
        rules={[
          {
            required: "white"
          }
        ]}
      style={{ color: "white" }} label="Hình ảnh">
        <input type="file" onChange={handleChangeFile} />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc} alt="" />
      </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            name="ngayKhoiChieu "
            onChange={handleChangeDatePicker}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            name="danhGia"
            onChange={handleSwitch("danhGia")}
            max="5"
            min="1"
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="dangChieu">
          <Switch onChange={handleSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="SapChieu">
          <Switch onChange={handleSwitch("SapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="Hot">
          <Switch onChange={handleSwitch("Hot")} />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button type="primary" htmlType="submit">
            Thêm phim
          </Button>
          <Button style={{marginLeft:"20px"}} onClick={()=>comeBack()} type="primary" htmlType="submit">
          Come back MovieList
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FilmEditor;
