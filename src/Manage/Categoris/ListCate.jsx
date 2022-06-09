import React from "react";
import { Table, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCategori,
  removeCategori,
} from "../../features/Categoris/CategoriSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { openNotificationWithIcon } from "../../Notification";
const ListCate = () => {
  const categoris = useSelector((data) => data.categori.value);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategori());
  }, []);
  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Thao tác",
      key: "data._id",
      render: (data) => (
        <>
          <Space size="middle" style={{ marginRight: 10 }}>
            <Link to={`/case-manager/categoris/edit=${data._id}`}>
              <EditOutlined />
            </Link>
          </Space>
          <Space size="middle">
            <a>
              <DeleteOutlined onClick={() => deleteCate(data._id)} />
            </a>
          </Space>
        </>
      ),
    },
  ];
  const deleteCate = (data) => {
    if (confirm("Bạn có muốn xóa không ?")) {
      dispatch(removeCategori(data));
      openNotificationWithIcon("success", "Xóa thành công ");
    }
  };

  return (
    <>
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Danh mục</h3>
        <Button type="primary">
          <Link to="add">Thêm danh mục</Link>
        </Button>
      </div>
      <hr
        style={{
          color: "rgb(165, 165, 165)",
          marginBottom: 20,
          marginTop: 0,
        }}
      />
      <Table
        columns={columns}
        rowKey="_id"
        style={{ textAlign: "center" }}
        dataSource={categoris}
      />
    </>
  );
};

export default ListCate;
