import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import styles from "../../css/LayoutAdmin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "../../Notification";
import { addTablee} from "./../../features/TableSlice/TableSlice";
import { getFloor } from "./../../features/FloorSlice/FloorSlice";
const AddTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const floors = useSelector((data) => data.floor.value);
  useEffect(() => {
    dispatch(getFloor());
  }, []);
  const addCate = (values) => {
    dispatch(addTablee(values));
    openNotificationWithIcon("success", "Thêm thành công ");
    navigate("/case-manager/table");
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  return (
    <div>
      <h5 className={styles.title}>Thêm bàn</h5>
      <Form
        initialValues={{
          remember: true,
        }}
        {...formItemLayout}
        onFinish={addCate}
      >
        <Form.Item
          name="name"
          label="Tên bàn"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Chưa nhập tên bàn!",
            },
          ]}
        >
          <Input placeholder="Bàn"/>
        </Form.Item>
        <Form.Item
          name="floor_id"
          labelAlign="left"
          label="Tầng"
          rules={[
            {
              required: true,
              message: "Chưa chọn tầng!",
            },
          ]}
        >
          <Select placeholder="Chọn tầng">
            {floors.map((item) => (
              <Option
                value={item._id}
                key={item._id}
                style={{ textTransform: "capitalize" }}
              >
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            <Link to="/case-manager/table">Quay lại</Link>
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTable;
