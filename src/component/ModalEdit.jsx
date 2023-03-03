import axios from "axios"
import { Form, Input, Button, Radio, InputNumber, Table, Modal } from "antd"
import React, { useEffect, useState } from 'react'

const ModalEdit = (props) => {
    let { id, open } = props
    const[openModal, setOpenModal]=useState(open)
    const [value, setValue] = useState("")
    useEffect(()=>{
        setOpenModal(open)
    },[open])
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };


   
    
    const handleCancel = () => {
        setOpenModal(false);
      };
    return (
        <>
       
      <Modal
      closable={false}
        open={openModal}
        title="Title"
        
        footer={[ <Button key="back" onClick={handleCancel}>
        Return
      </Button>,]}
      >
         <Form
                layout="horizontal"
                autoComplete='off'
                onFinish={(value) => {
                  let newData = { id: id, name: value.name, email: value.email, age: value.age, status: value.status }
                  axios.put(`http://localhost:3000/studentList/${id}`,
                    newData)
                    setOpenModal(false)
                  window.location.reload()
                }}>
                <Form.Item name="name" label="Tên học viên"
                  rules={[
                    { whitespace: true, message: "Tên học viên không được để trống" },
                    { min: 4, message: "Tên học viên tối thiểu 4 ký tự" },
                    { required: true, message: "Vui lòng nhập tên học viên" }
                  ]} hasFeedback >
                  <Input placeholder='Tên học viên' style={{ width: "300px" }} />
                </Form.Item>
                <Form.Item name="age" label="Tuổi"
                  rules={[
                    { required: true, message: "Vui lòng chọn tuổi" }
                  ]} hasFeedback>
                  <InputNumber placeholder='Tuổi' min={1} />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái"
                  rules={[
                    { required: true, message: "Vui lòng chọn trạng thái" }
                  ]} hasFeedback>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio  style={{color:"red"}} value={"Ban"}>Ban</Radio>
                    <Radio style={{color:"green"}}value={"Allow"}>Aloww</Radio>
                  </Radio.Group>
  
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
  
              </Form>
      </Modal>
  
      </>
    )
  }
  export default ModalEdit