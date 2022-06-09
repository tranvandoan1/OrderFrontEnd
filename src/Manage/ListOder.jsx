import React from "react";
import { Collapse, Descriptions, Empty, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrder, removeOrder } from "../features/Order/Order";
import {
  getOrderDetail,
  removeOrderDetail,
} from "../features/OrderDetail/OrderDetail";
import { getTable } from "../features/TableSlice/TableSlice";
import { DeleteOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const ListOder = () => {
  const dispatch = useDispatch();
  const orders = useSelector((data) => data.order.value);
  const orderdetails = useSelector((data) => data.orderdetail.value);
  const tables = useSelector((data) => data.table.value);
  useEffect(() => {
    dispatch(getOrder());
    dispatch(getOrderDetail());
    dispatch(getTable());
  }, []);
  const deleteOrder = (id) => {
    const order = orders.find((item) => item._id == id);
    const orderDetail = orderdetails.filter((item) => item.bill == order.bill);
    if (confirm("Bạn có muốn xóa không ?")) {
      dispatch(removeOrder(order._id));
      dispatch(removeOrderDetail(orderDetail));
    }
  };
  return (
    <div style={{ height: "100vh", background: "#fff", flex: "0 0 200px" }}>
      {orders.length > 0 ? (
        <Collapse accordion>
          {orders.map((item, index) => {
            return (
              <Panel
                header={`#${item._id}${" ----------- "}${item.createdAt}`}
                key={index}
              >
                <div className="header-order" style={{ textAlign: "left" }}>
                  <span>Tên khác hàng : {item.customer_name}</span>
                  <br />
                  {tables.map(
                    (table) =>
                      table._id == item.id_table && (
                        <span>Tên bàn : {table.name}</span>
                      )
                  )}
                  <br />
                  {item.sale > 0 && <>Giảm : {item.sale} %</>}
                </div>
                <br />
                <Descriptions>
                  {orderdetails.map((itemDetail) => {
                    if (itemDetail.bill == item.bill) {
                      return (
                        <div key={itemDetail._id}>
                          <Descriptions.Item label="Sản phẩm">
                            {itemDetail.namePro} :{" "}
                            {itemDetail.weight && (
                              <>/ Cân nặng : {itemDetail.weight} KG</>
                            )}
                          </Descriptions.Item>
                          <Descriptions.Item label="Gía tiền">
                            {itemDetail.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            VND
                          </Descriptions.Item> <br />
                          <Descriptions.Item label="Số lượng">
                            Số lượng : {itemDetail.quantity}
                          </Descriptions.Item>
                        </div>
                      );
                    }
                  })}
                </Descriptions>
                <br></br>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    Tổng :{" "}
                    {item.sum_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    VND
                  </span>
                  <DeleteOutlined
                    style={{ cursor: "pointer", fontSize: 18 }}
                    onClick={() => deleteOrder(item._id)}
                  />
                </div>
              </Panel>
            );
          })}
        </Collapse>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default ListOder;
