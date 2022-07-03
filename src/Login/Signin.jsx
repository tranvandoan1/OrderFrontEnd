import React from "react";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../css/Signin.css";
import UserAPI from "../API/Users";
import { Link, useNavigate } from "react-router-dom";
const Signin = () => {
  let navigate = useNavigate();

  const signin = async (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    const { data } = await UserAPI.signin(user);
    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Mời bạn vào trang web");
    navigate("/floor");
  };

  return (
    <Modal visible={true} className="background">
      <div
        className="logo"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <img
          src="https://www.jedecore.com/gif/bon-appetit/bon-appetit-017.gif"
          alt=""
        />
      </div>
      <h3 style={{ textAlign: "center", margin: "20px 0", color: "#ee4d2d" }}>
        Đăng nhập
      </h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={signin}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          <Link style={{ marginLeft: "10px" }} to="/signup">
            Đăng ký
          </Link>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Signin;
