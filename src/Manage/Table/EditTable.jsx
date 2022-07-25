import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTable, getTable } from "../../features/TableSlice/TableSlice";
import styles from "../../css/LayoutAdmin.module.css";
import { Button, Form, Input, Select } from "antd";
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
const EditTable = () => {
  const { id } = useParams();
  const tables = useSelector((data) => data.table.value);
  const table = tables?.find((item) => item._id == id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTable());
  }, []);
  const uploadTable = (value) => {
    const newData = {
      ...table,
      name: value.name == undefined ? table.name : value.name,
    };

    dispatch(editTable(newData));
    navigate("/case-manager/table");
    openNotificationWithIcon("success", "Sửa thành công ");
  };

  return (
    <div>
      <h5 className={styles.title}>Sửa bàn</h5>
      {table !== undefined && (
        <Form {...formItemLayout} onFinish={uploadTable}>
          <Form.Item name="name" label="Tên bàn" labelAlign="left">
            <Input defaultValue={table?.name} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              <Link to="/case-manager/table">Quay lại</Link>
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

export default EditTable;
