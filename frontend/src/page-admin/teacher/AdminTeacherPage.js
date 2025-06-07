import React, { useEffect, useRef, useState} from "react";
import { request } from "../../util/request";
import { Space, Table, Button, Tag, Modal, message, Input, Form, Select, DatePicker, notification} from 'antd'; // Import Button
import styles from './AdminTeacherPage.module.css'; // Import custom CSS
import { formatDateClient, formatDateServer } from "../../util/service";
import dayjs from "dayjs";
import MainAdminPage from "../../component/layout/MainAdminPage";
function AdminTeacherPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [visible, setVisible] = useState(0);
  const [formTeacher] = Form.useForm();
  const filter = useRef({
    txtSearch : "",
    status: null,
    page: 1,
  });
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      setLoading(true);
      // const queryParams = `?txtSearch=${encodeURIComponent(txtSearch)}&status=${encodeURIComponent(status)}`;
      var param ={
        txtSearch: filter.current.txtSearch || "",
        status: filter.current.status || "",
        page: filter.current.page,
      }
      const res = await request("teacher", "get",param); 
      setLoading(false); 
      if (res) {
        // setTotalRecords(res.list.length);
        let maleCount = 0, femaleCount = 0; 
        res.list.forEach((item) => {
          if (item.Gender === 1) {
            maleCount += 1;
          } else if (item.Gender === 0) {
            femaleCount += 1;
          }
        });
  
        setTotalMale(maleCount);
        setTotalFemale(femaleCount);
        setList(res.list);
        if(filter.current.page === 1) {
          setTotalRecords(res.totalRecords);
        }
      }
    } catch (error) {
      console.error("Error fetching teacher list:", error.message, error.response?.data);
      setLoading(false);
    }
  };
  const onClickBtnEdit = (item,index) => {
    setVisible(true);
    formTeacher.setFieldsValue({
      ...item,
      Dob: dayjs(item.Dob),
      Gender: item.Gender === null ? null : item.Gender + "",
      Id: item.Id, // try create new key Id.
    });
  };
  const onClickBtnDelete = (item,index) =>{
    Modal.confirm({
      title: "Delete",
      content: "Are you sure to remove this Teacher?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const res = await request("teacher/" + item.Id, "delete");
        if (res) {
          message.success(res.message);
          getList();
        }
      },
      onCancel() {
        formTeacher.resetFields();
      },
    });
  };
  const onCloseForm = () => {
    setVisible(false);
    formTeacher.resetFields(); // Clear form data when modal is closed
  };
  const onFinish = async (values) => {
  const isEdit = !!values.Id; // true if editing

  const formData = {
    ...values,
    Gender: values.Gender ? values.Gender : "1",
    IsActive: values.IsActive ? values.IsActive : "1",
  };

  try {
    const endpoint = isEdit ? `teacher/${values.Id}` : "teacher";
    const method = isEdit ? "put" : "post";

    const res = await request(endpoint, method, formData);

    if (res?.error) {
      const errorMessages = typeof res.error === "object"
        ? Object.values(res.error).join(", ")
        : res.error;

      notification.error({
        message: "Error",
        description: errorMessages,
      });
    } else {
      message.success(`Teacher ${isEdit ? "updated" : "created"} successfully!`);
      getList(); // Refresh list
      onCloseForm();
    }
  } catch (error) {
    notification.error({
      message: "Request Failed",
      description: error.message || "Something went wrong",
    });
  }
};

  
  const handleStatus = (value) => {
    filter.current.status = value;
  }
  const handleFilter = () => {
    getList();
  }
  const onChangeSearch = (even) => {
    filter.current.txtSearch = even.target.value;
  }
  return (
    <MainAdminPage laoding={loading}>
      {loading && <h1>Loading...</h1>}
      <div className={styles.containerFilter} >
      <div> <span style={{fontSize: 30, fontWeight: "Bold"}}>List Teacher </span> Male {totalMale} | Female {totalFemale}</div>
        <div>
          <Input onChange={onChangeSearch}
            placeholder="input search by Name or Tel"
            style={{width: "300px"}}
          />
          <Select style={{width:150}} placeholder="Status" allowClear onChange={handleStatus}>
            <Select.Option value= "1">Active</Select.Option>
            <Select.Option value= "0">InActive</Select.Option>
          </Select>
          <Button type="primary" onClick={handleFilter}> Search </Button>
        </div>
        <div>
          <Button onClick={() => setVisible(true)} type="primary"> New </Button>
        </div>  
      </div>
      <Table
        dataSource={list.map(item => ({ ...item, key: item.Id }))}
        pagination={{
          defaultPageSize: 5,
          total: totalRecords,
        }}
        onChange={(pagination) => {
          filter.current.page = pagination.current;
          getList();
        }}
        columns={[
          {
            title: 'FirstName',
            dataIndex: 'FirstName',
            key: 'FirstName',
          },
          {
            title: 'LastName',
            dataIndex: 'LastName',
            key: 'LastName',
          },
          {
            title: 'Gender',
            dataIndex: 'Gender',
            key: 'Gender',
            render: (value, item, index) => (value === null ? null : ( value === 1 ? 'Male' : 'Female')),
          },
          {
            title: 'Date of Birth',
            dataIndex: 'Dob',
            key: 'Dob',
            render: (value) => formatDateClient(value),
          },
          {
            title: 'Tel',
            dataIndex: 'Tel',
            key: 'Tel',
          },
          {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
          },
          {
            title: 'Address',
            dataIndex: 'Current_Address',
            key: 'Current_Address',
          },
          {
            title: 'IsActive',
            dataIndex: 'IsActive',
            key: 'IsActive',
            render: (value) => (value === 1 ? <Tag color="green">Active</Tag> : <Tag color="red">InActive</Tag>)
          },
          {
            title: 'CreateAt',
            dataIndex: 'CreateAt',
            key: 'CreateAt',
            render : (value) => formatDateClient(value)
          },
          {
            title: 'Action',
            key: 'Action',
            dataIndex: "Id",
            align: "center",
            render: (value,item,index) => (
              <Space size="middle">
                <Button onClick={() => onClickBtnEdit(item,index)} type="primary">
                  Edit
                </Button>
                <Button  onClick={() => onClickBtnDelete(item, index)} type="primary" danger>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
      <Modal
        open = {visible}
        onCancel = {onCloseForm}
        title = {formTeacher.getFieldValue("Id") ? "Edit Teacher" : "New Teacher"}
        footer = {null}
        maskClosable= {false}

      >
        <Form 
        form ={formTeacher}
        layout="horizontal"
        style={{marginTop: "10px"}} 
        labelCol={{ span: 6}} 
        wrapperCol={{span: 18}}
        onFinish={onFinish}
        onCancel = {onCloseForm}
        >
          <Form.Item 
          label="FirstName" 
          name="FirstName"
          rules={[{ required: "true", message: "Please fill in firstname!"}]}>
            <Input placeholder="FirstName" />
          </Form.Item>
          <Form.Item 
          label="LastName" 
          name="LastName"
          rules={[{ required: "true", message: "Please fill in Lastname!"}]}>
            <Input placeholder="LastName" />
          </Form.Item>
          <Form.Item label="Gender" name="Gender">
            <Select placeholder="Select Gender" defaultValue="1"> {/* Default value should be set here */}
              <Select.Option value="1">Male</Select.Option>
              <Select.Option value="0">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Dob" name="Dob">
            {/* <Input placeholder="LastName" /> */}
            <DatePicker format="DD/MM/YY"  style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item 
          label="Tel" 
          name="Tel"
          rules={[{ required: "true", message: "Please fill in Telephone!"}]}>
            <Input placeholder="Tel" />
          </Form.Item>
          <Form.Item label="Email" name="Email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Current_Address" name="Current_Address">
            <Input.TextArea placeholder="Current_Address" />
          </Form.Item>
          <Form.Item label="IsActive" name="IsActive" >
          <Select placeholder="Select Status" defaultValue="1"> {/* Default value should be set here */}
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Inactive</Select.Option>
          </Select>
        </Form.Item>
          <div style={{textAlign: "right"}}>
            <Space>
              <Button htmlType="reset">Cancel</Button>
              <Button  type="primary" htmlType="submit">{formTeacher.getFieldValue("Id") ? "Update" : "Submit"}</Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </MainAdminPage>
  );
}

export default AdminTeacherPage;