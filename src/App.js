import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, InputNumber, Table,  } from "antd"
import axios from "axios"

import  { Component }  from 'react'
import ModalEdit from './component/ModalEdit'




function App() {
  const columns = [
    {
      key: "1",
      title: "id",
      dataIndex: "id"
    },
    {
      key: "2",
      title: "name",
      dataIndex: "name"
    },
    {
      title: "age",
      dataIndex: "age"
    },
    {
      key: "3",
      title: "status",
      dataIndex: "status"
    },
    {
      key: "4",
      title: "action",
      render: (_, record) => {
        return (
          <>
            <Button onClick={()=>{
              editStudent(record)
             
            }}>Edit</Button>
            <Button onClick={() => {
              deleteStudent(record)
              console.log(record.id);
            }}>Delete</Button>
          </>
        )
      }
    }
  ]
  const [value, setValue] = useState("");
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const [data, setData] = useState([])
  const [idRecord, setIdRecord] = useState("")
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    axios.get("http://localhost:3000/studentList")
      .then(res => {
        let dataTable=res.data
        for (let i = 0; i < dataTable.length; i++) {
         dataTable[i].key=`${i+1}`
        }
        console.log(dataTable);
        setData(dataTable)

      })
  }, [])
  const deleteStudent = (record) => {
    let id = record.id
    console.log("id", id);
    axios.delete(`http://localhost:3000/studentList/${id}`)
    window.location.reload()
  }
  const editStudent=(record)=>{
    setOpen(true)
    setIdRecord(record.id)
  }
  return (
    <>
      <Form 
        layout="horizontal"
        autoComplete='off'
        onFinish={(value) => {
          console.log(1);
          console.log(value);
          let id = Date.now()
          let newData = { id: id, name: value.name, email: value.email, age: value.age, status: value.status }
          axios.post("http://localhost:3000/studentList",
            newData)
          window.location.reload()
        }}>

        <Form.Item name="name" label="T??n h???c vi??n"
          rules={[
            { whitespace: true, message: "T??n h???c vi??n kh??ng ???????c ????? tr???ng" },
            { min: 4, message: "T??n h???c vi??n t???i thi???u 4 k?? t???" },
            { required: true, message: "Vui l??ng nh???p t??n h???c vi??n" }
          ]} hasFeedback >
          <Input placeholder='T??n h???c vi??n' style={{ width: "300px" }} />
        </Form.Item>
        <Form.Item name="age" label="Tu???i"
          rules={[
            { required: true, message: "Vui l??ng ch???n tu???i" }
          ]} hasFeedback>
          <InputNumber placeholder='Tu???i' min={1} />
        </Form.Item>
        <Form.Item name="status" label="Tr???ng th??i"
          rules={[
            { required: true, message: "Vui l??ng ch???n tr???ng th??i" }
          ]} hasFeedback>
          <Radio.Group onChange={onChange} value={value}>
            <Radio style={{color:"red"}} value={"Ban"}>Ban</Radio>
            <Radio style={{color:"green"}}value={"Allow"}>Allow</Radio>
          </Radio.Group>

        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit'>Submit</Button>
        </Form.Item>

      </Form>
      <Table
        dataSource={data}
        columns={columns}
      >

      </Table>
      <ModalEdit id={idRecord} open={open} />
    </>


  );
}

export default App;
