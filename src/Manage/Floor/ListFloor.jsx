import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFloor } from "../../features/FloorSlice/FloorSlice";

const ListFloor = () => {
  const dispatch = useDispatch();
  const floors = useSelector((data) => data.floor.value);
  useEffect(() => {
    dispatch(getFloor());
  }, []);

  const columns = [
    {
      title: "Tên tầng",
      dataIndex: "name",
      key: "1",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "2",
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "id",
      render: (id, data) => (
        <>
          <Space size="middle" style={{ marginRight: 10 }}>
            <Link to={`/case-manager/floor/edit=${id}`}>
              <EditOutlined />
            </Link>
          </Space>
          <Space size="middle">
            <a>
              <DeleteOutlined onClick={() => deleteCate(_id)} />
            </a>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Tầng</h3>
        <Button type="primary">
          <Link to="add">Thêm tầng</Link>
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
        rowKey="_id"
        columns={columns}
        style={{ textAlign: "center" }}
        dataSource={floors}
      />
    </>
  );
};

export default ListFloor;
