import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css/LayoutAdmin.module.css";
import { getFloor, uploadFloor } from "../../features/FloorSlice/FloorSlice";
import { openNotificationWithIcon } from "../../Notification";
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
const EditFloor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const floors = useSelector((data) => data.floor.value);
  const floor = floors?.find((item) => item._id == id);
  useEffect(() => {
    dispatch(getFloor());
  }, []);

  const editCate = (values) => {
    const formData = new FormData();
    formData.append(
      "name",
      values.name == undefined ? floor.name : values.name
    );
    dispatch(uploadFloor({ id: id, data: formData }));
    navigate("/case-manager/floor");
    openNotificationWithIcon("success", "Sửa thành công ");
  };

  return (
    <div>
      <h5 className={styles.title}>Sửa danh mục</h5>

      {floor !== undefined && (
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          {...formItemLayout}
          onFinish={editCate}
          autoComplete="off"
        >
          <Form.Item label="Tên tầng" name="name" labelAlign="left">
            <Input defaultValue={floor?.name} placeholder="Tên tầng" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              <Link to="/case-manager/floor">Quay lại</Link>
            </Button>
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditFloor;
