import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTable, removeTable } from "./../../features/TableSlice/TableSlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getFloor } from "../../features/FloorSlice/FloorSlice";
import { openNotificationWithIcon } from "../../Notification";
const ListTable = () => {
  const dispatch = useDispatch();
  const tables = useSelector((data) => data.table.value);
  const floors = useSelector((data) => data.floor.value);
  useEffect(() => {
    dispatch(getTable());
    dispatch(getFloor());
  }, []);
  const deleteCate = (id) => {
    if (confirm("Bạn có muốn xóa không ?")) {
      dispatch(removeTable(id));
      openNotificationWithIcon("success", "Xóa thành công ");
    }
  };
  const columns = [
    {
      title: "Tên bàn",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tầng",
      dataIndex: "floor_id",
      key: "floor_id",
      render: (floor_id) =>
        floors.map((item) => item._id == floor_id && item.name),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Thao tác",
      render: (data) => (
        <>
          <Space size="middle" style={{ marginRight: 10 }}>
            <Link to={`/case-manager/table/edit=${data._id}`}>
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
  return (
    <div>
      <Button type="primary">
        <Link to="add">Thêm bàn</Link>
      </Button>
      <br />
      <br />
      <Table
        columns={columns}
        rowKey={(item) => item._id}
        style={{ textAlign: "center" }}
        dataSource={tables}
      />
    </div>
  );
};

export default ListTable;
