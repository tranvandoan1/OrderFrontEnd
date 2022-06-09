import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "../../Notification";
import {
  deleteProduct,
  getProductAll,
} from "../../features/ProductsSlice/ProductSlice";
import { getCategori } from "../../features/Categoris/CategoriSlice";
import { Table, Space, Button, message, Select, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../../css/Home.css";
import { Link, useNavigate } from "react-router-dom";
const ListPro = () => {
  const [check, setCheck] = useState();
  const [data, setData] = useState();
  const products = useSelector((data) => data.product.value);
  const categoris = useSelector((data) => data.categori.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductAll());
    dispatch(getCategori());
  }, []);

  const removeProduct = () => {
    if (data == undefined) {
      openNotificationWithIcon("warning", "Bạn chưa chọn sản phẩm !");
    } else {
      if (confirm("Bạn có muốn xóa không ?")) {
        dispatch(deleteProduct(data.data));
        openNotificationWithIcon("success", "Xóa thành công ");
        setCheck();
      }
    }
  };
  const rowSelection = {
    onChange: (id, data) => setData({ id: id, data: data }),
  };
  const list = () => {
    if (products.length > 0) {
      const confirmm = (e) => {
        if (e.check == "edit") {
          console.log(e);
          navigate(`edit=${e.id}`);
        } else if (e.check == "delete") {
          if (confirm("Bạn có muốn xóa không ?")) {
            dispatch(deleteProduct(e.id));
            openNotificationWithIcon("success", "Xóa thành công ");
            setCheck();
          }
        }
      };

      const columns = [
        {
          title: "Tên sản phẩm",
          dataIndex: "name",
          key: 1,
          width: 200,
        },
        {
          title: "Danh mục ",
          dataIndex: "cate_id",
          render: (cate_id) =>
            categoris.map((item) => item._id == cate_id && item.name),
          key: 2,
        },
        {
          title: "Ảnh ",
          dataIndex: "photo",
          render: (photo) => (
            <img src={photo} style={{ width: "80px" }} alt="" />
          ),
          key: 3,
        },
        {
          title: "Giá tiền ",
          dataIndex: "price",
          render: (price, data) =>
            `${price.toLocaleString("vi-VN")}${
              data.check == true ? "/KG" : ""
            }`,
          key: 4,
        },

        {
          title: "Thao tác",
          dataIndex: "_id",
          key: 5,
          render: (_id, product) => (
            <Space size="middle">
              {(check == undefined || check !== "edit") && (
                <Popconfirm
                  title="Bạn muốn sửa nhiều hay ít ?"
                  onConfirm={() => confirmm({ id: _id, check: "edit" })}
                  onCancel={() => (setCheck(), setCheck("edit"))}
                  okText="Ít"
                  cancelText="Nhiều"
                >
                  <EditOutlined style={{ cursor: "pointer" }} />
                </Popconfirm>
              )}
              {(check == undefined || check !== "delete") && (
                <Popconfirm
                  title="Bạn muốn xóa nhiều hay ít ?"
                  onConfirm={() => confirmm({ id: _id, check: "delete" })}
                  onCancel={() => (setCheck(), setCheck("delete"))}
                  okText="Ít"
                  cancelText="Nhiều"
                >
                  <DeleteOutlined style={{ cursor: "pointer" }} />
                </Popconfirm>
              )}
            </Space>
          ),
        },
      ];

      return (
        <>
          {check !== undefined ? (
            <>
              {check == "edit" && (
                <Button
                  type="primary"
                  style={{ border: 0 }}
                  onClick={() => setCheck()}
                >
                  Sửa
                </Button>
              )}
              {check == "delete" && (
                <Button
                  type="primary"
                  style={{ border: 0 }}
                  onClick={() => removeProduct()}
                >
                  Xóa
                </Button>
              )}
              <Button
                type="primary"
                style={{ background: "red", border: 0, marginLeft: 10 }}
                onClick={() => setCheck()}
              >
                Hủy
              </Button>
              <br />
              <br />
              <Table
                rowSelection={rowSelection}
                rowKey="_id"
                columns={columns}
                style={{ textAlign: "center" }}
                dataSource={products}
              />
            </>
          ) : (
            <Table
              rowKey="_id"
              columns={columns}
              style={{ textAlign: "center" }}
              dataSource={products}
            />
          )}
        </>
      );
    } else if (Object.keys(products).length > 0) {
      return "";
    }
  };
  return (
    <>
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Sản phẩm</h3>
        <Button type="primary">
          <Link to="add">Thêm sản phẩm</Link>
        </Button>
      </div>
      <hr style={{ color: "rgb(165, 165, 165)" }} />

      {list()}
    </>
  );
};

export default ListPro;
