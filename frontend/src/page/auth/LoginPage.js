import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import styles from "./LoginPage.module.css";
import {request} from "../../util/request.js";
import { setIsLogin, setRefreshToken, setToken, setUser } from '../../util/service.js';
const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // State to track success
  const onFinish = async (values) => {
    var param = {
      "Username" : values.username,
      "Password" : values.password
    };
    // create function 
    const res = await request("user/login","post",param);
    if(res.message){
      setMessage(res.message);
      setUser(JSON.stringify(res.user)); // JSON.stringify JSON(object) => JSON(object string);
      setIsLogin("1");
      setToken(res.access_token);
      setRefreshToken(res.refresh_token);
      setIsSuccess(true); // Mark as successful
      window.location.href = "/admin";
    } else if(res.error) {
      if(res.error.Username){
        setMessage(res.error.Username);
        setIsSuccess(false); // Mark as unsuccessful
      }
      if(res.error.Password){
        setMessage(res.error.Password);
        setIsSuccess(false); // Mark as unsuccessful
      }
    }
  };
  return (
    <div className={styles.loginContainer}>
        <h1>Login </h1>
        <p className={isSuccess ? styles.successMessage : styles.errorMessage}>{message}</p>
        <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="#">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <a href="#">Register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};
export default LoginPage;