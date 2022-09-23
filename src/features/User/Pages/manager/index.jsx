import React from 'react'
import  { Fragment, useEffect } from 'react'
import { Button, Table } from 'antd';
import {
  EditOutlined,
  CreditCardOutlined,
  DeleteOutlined
  
} from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchDeletelAction, fetchUser } from '../../action';
import { fetchProfileAction } from '../../../authencation/action';
import { NavLink } from 'react-router-dom';


function Managaer() {
  const dispatch=useDispatch();
  


  const onSearch = async (value) => {
    dispatch(fetchUser(value))
  }
  const columns = [
    {
    
      title: 'TÀI KHOẢN',
      dataIndex: 'taiKhoan',
     
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // s
    },
    {
      title: 'HỌ TÊN',
      dataIndex: 'hoTen',
      defaultSortOrder: 'descend',
      render:(text,data)=>{   
        return <Fragment>
          <>
          <p style={{margin:'auto',fontSize:'16px',fontWeight:'700',color:'blueviolet'}}>{data.hoTen}</p>
          </>
        </Fragment>
       } 
    },
    {
      title: 'MẬT KHẨU',
      dataIndex: 'matKhau',
  
     
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      render:(text,data)=>{   
        return <Fragment>
          <>
          <p style={{margin:'auto',fontSize:'16px'}}>{data.email}</p>
          </>
        </Fragment>
       } 
    },
    {
      title: 'SỐ ĐIỆN THOẠI',
      dataIndex: 'soDT',
      defaultSortOrder: 'descend',
     
     
    },
    {
      title: 'LOẠI NGƯỜI DÙNG',
      dataIndex: 'maLoaiNguoiDung',
      defaultSortOrder: 'descend',
     
     
    },
    {
      title: 'CHỨC NĂNG',
      dataIndex: 'taiKhoan',
      defaultSortOrder: 'descend',
     
      render:(text,data)=>{
       
        return <Fragment>
          <>
          
          <DeleteOutlined style={{marginRight:"20px",fontSize:"25px"}} onClick={()=>{ dispatch(fetchDeletelAction(data.taiKhoan))}} >Delete</DeleteOutlined>
          <NavLink style={{fontSize:"25px"}} key={2}  to={`/Updateaccount/${data.taiKhoan}`}><EditOutlined /></NavLink>
       
          </>
        </Fragment>
       } 
    },
   
   ,
  ];
  const data = useSelector((state)=> state.user.profile);



  // const hung=useSelector((state)=> state.user);

  //
 

  useEffect(()=>{
    dispatch(fetchUser());
   
  },[])





  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
 
  return (
    <div>
      <h2 style={{textAlign:'center',fontSize:"30px",fontWeight:'700',marginTop:'20px'}}>DANH SÁCH NGƯỜI DÙNG</h2>
      <Search style={{margin:"20px",width:"800px"}} placeholder="input search text" onSearch={onSearch} enterButton />
      <Table style={{margin:"20px"}} columns={columns} dataSource={data} onChange={onChange} /></div>
  )
}

export default Managaer