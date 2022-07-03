import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { upload } from "../../API/Users";
import styles from "../../css/Account.module.css";
import { openNotificationWithIcon } from "../../Notification";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [edit, setEdit] = useState();
  const editAccount = () => {
    setEdit(true);
  };
  const loadFile = (event) => {
    console.log(event.target.files[0])
    setEdit(URL.createObjectURL(event.target.files[0]));
  };
  const onFinish = async (values) => {
    const photo = document.querySelector("#images").files[0];
    if (photo == undefined) {
      let formData = new FormData();
      formData.append(
        "name",
        values.name == undefined ? user.name : values.name
      );
      formData.append(
        "email",
        values.email == undefined ? user.email : values.email
      );
      formData.append(
        "phone",
        values.phone == undefined ? user.phone : values.phone
      );
      const { data } = await upload(user._id, formData);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data));
      setEdit();
      openNotificationWithIcon("success", "Cập nhật hồ sơ ");
    } else {
      const imageRef = ref(storage, `images/${photo.name}`);
      uploadBytes(imageRef, photo).then(() => {
        getDownloadURL(imageRef).then(async (url) => {
          let formData = new FormData();
          formData.append(
            "name",
            values.name == undefined ? user.name : values.name
          );
          formData.append(
            "email",
            values.email == undefined ? user.email : values.email
          );
          formData.append(
            "phone",
            values.phone == undefined ? user.phone : values.phone
          );
          formData.append("avatar", url);
          const { data } = await upload(user._id, formData);
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(data));
          setEdit();
          openNotificationWithIcon("success", "Cập nhật hồ sơ");
        });
      });
    }
  };
  console.log(edit);
  return (
    <div>
      {user && (
        <>
          <div className={styles.header}>
            <h5>Hồ Sơ Của Tôi</h5>
            <p style={{ opacity: 0.7 }}>
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </p>
          </div>

          <Row style={{ marginTop: 10 }}>
            <Col
              xs={12}
              sm={4}
              md={12}
              lg={5}
              xl={5}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={styles.logo}>
                <h5>Logo quán</h5>
                <Avatar
                  src="https://123design.org/wp-content/uploads/2020/07/LOGOLM0200-Chibi-%C4%90%E1%BB%87-nh%E1%BA%A5t-%C4%91%E1%BA%A7u-b%E1%BA%BFp-nh%C3%AD-Vua-%C4%91%E1%BA%A7u-b%E1%BA%BFp.jpg"
                  size={150}
                  shape="square"
                  style={{ height: "100%" }}
                  alt=""
                />
              </div>
            </Col>
            <Col
              xs={12}
              sm={4}
              md={12}
              lg={13}
              xl={13}
              className={styles.colLeft}
            >
              <Form
                name="basic"
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Tên quán"
                  style={{ marginTop: 30, fontSize: 16 }}
                  size={20}
                >
                  <span className={styles.listSpan}>BOM BOM</span>
                </Form.Item>
                <Form.Item
                  label="Tên của bạn"
                  name="name"
                  style={{ marginTop: 30 }}
                >
                  <Input placeholder="Basic usage" defaultValue={user.name} />
                </Form.Item>
                <Form.Item label="Email" name="email" style={{ marginTop: 30 }}>
                  <Input
                    placeholder="Basic usage"
                    defaultValue={user.email}
                    id="emails"
                  />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  style={{ marginTop: 30 }}
                >
                  <Input placeholder="Basic usage" defaultValue={user.phone} />
                </Form.Item>

                <div style={{ marginTop: 20 }}>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ background: "blue", color: "#fff" }}
                    >
                      Lưu
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Col>
            <Col
              xs={12}
              sm={4}
              md={12}
              lg={6}
              xl={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={styles.user_image}>
                {user.avatar == "" ? (
                  <div className={styles.user_avatar}>
                    <UserOutlined style={{ fontSize: 35, padding: 20 }} />
                  </div>
                ) : edit !== undefined ? (
                  <Avatar size={100} src={edit} />
                ) : (
                  <Avatar size={100} src={user.avatar} />
                )}
                <label htmlFor="images" className={styles.user_choose_photo}>
                  <div className={styles.choose_photo}>Chọn ảnh</div>
                </label>
              </div>
              <Input
                type="file"
                name=""
                id="images"
                style={{ display: "none" }}
                onChange={() => loadFile(event)}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Account;
