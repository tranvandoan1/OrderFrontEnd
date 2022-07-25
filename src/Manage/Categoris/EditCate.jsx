import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCategori, uploadCategori } from "../../features/Categoris/CategoriSlice";
import styles from "../../css/AdminCate.module.css";
import { useForm } from "react-hook-form";
import { openNotificationWithIcon } from "./../../Notification";
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
const EditCate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoris = useSelector((data) => data.categori.value);
  const categori = categoris?.find((item) => item._id == id);
  useEffect(() => {
    dispatch(getCategori());
  }, []);

  const editCate = (values) => {
    let formData = new FormData();
    formData.append(
      "name",
      values.name == undefined ? categori.name : values.name
    );
    dispatch(uploadCategori({ id: id, data: formData }));
    navigate("/case-manager/categoris");
    openNotificationWithIcon("success", "Sửa thành công ");
  };

  return (
    <>
      <h4 className={styles.h4}>Sửa danh mục</h4>
      {categori !== undefined && (
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          {...formItemLayout}
          onFinish={editCate}
          autoComplete="off"
        >
          <Form.Item label="Tên danh mục" name="name" labelAlign="left">
            <Input defaultValue={categori?.name} placeholder="Tên danh mục" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              <Link to="/case-manager/categoris">Quay lại</Link>
            </Button>
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default EditCate;
