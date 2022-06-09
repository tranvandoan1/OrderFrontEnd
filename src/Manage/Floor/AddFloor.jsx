import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "../../css/LayoutAdmin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openNotificationWithIcon } from "../../Notification";
import { addFloor } from "../../features/FloorSlice/FloorSlice";
const AddFloor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickAddFloor = (values) => {
    dispatch(addFloor(values));
    openNotificationWithIcon("success", "Thêm thành công ");
    navigate("/case-manager/floor");
  };

  return (
    <div>
      <h5 className={styles.title}>Thêm tầng</h5>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={clickAddFloor}
        autoComplete="off"
      >
        <Form.Item
          label="Tên tầng"
          name="name"
          rules={[
            {
              required: true,
              message: "Chưa nhập tên !",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            <Link to="/case-manager/floor">Quay lại</Link>
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddFloor;
