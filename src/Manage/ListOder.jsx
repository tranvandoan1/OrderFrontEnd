import React from "react";
import { Collapse, Descriptions, Empty, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrder, removeOrder } from "../features/Order/Order";

import { getAllTable } from "../features/TableSlice/TableSlice";
import { DeleteOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const ListOder = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const orders = useSelector((data) => data.order.value);
  const tables = useSelector((data) => data.table.value);

  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getAllTable());
  }, []);
  const deleteOrder = async (id) => {
    const order = orders.find((item) => item._id == id);
    if (confirm("Bạn có muốn xóa không ?")) {
      await dispatch(removeOrder(order._id));
    }
  };
  return (
    <div style={{ height: "100vh", background: "#fff", overflow: "hidden" }}>
      <div className="srcoll">
        {orders?.length > 0 ? (
          <Collapse accordion>
            {orders.map((item, index) => {
              const time = new Date(item.createdAt);
              return (
                <Panel
                  style={{ fontWeight: "400", fontSize: 16 }}
                  header={`#${
                    item._id
                  }${" ----------- "} Ngày ${time.getDate()}-${
                    time.getMonth() + 1
                  }-${time.getFullYear()}`}
                  key={index}
                >
                  <div
                    style={{
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: "500", fontSize: 16 }}>
                      Tên khác hàng : {item.seller_name}
                    </span>
                    <br />
                    {tables.map(
                      (table) =>
                        table._id == item.table_id && (
                          <span
                            style={{ fontWeight: "500", fontSize: 16 }}
                            key={table._id}
                          >
                            Tên bàn : {table.name}
                          </span>
                        )
                    )}
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: "500", fontSize: 16 }}>
                      Giờ đến : {item.start_time}
                    </span>
                    <span style={{ fontWeight: "500", fontSize: 16 }}>
                      Giờ về : {item.end_time}
                    </span>
                  </div>
                  <span style={{ fontWeight: "500", fontSize: 16 }}>
                    {item.sale > 0 && <>Giảm : {item.sale} %</>}
                  </span>
                  <br />
                  <br />
                  <span style={{ fontWeight: "500", fontSize: 16 }}>
                    Thực đơn
                  </span>
                  <Descriptions bordered size="default">
                    {item?.orders?.map((itemDetail) => {
                      return (
                        <div
                          key={itemDetail._id}
                          style={{ fontWeight: "400", fontSize: 16 }}
                        >
                          <Descriptions.Item label="Sản phẩm">
                            {itemDetail.name_pro} (
                            <span style={{ color: "red", fontWeight: "600" }}>
                              x{itemDetail.amount}
                            </span>
                            ) :
                            {itemDetail.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            {itemDetail.weight ? "VND/KG" : "VND"}
                            <br />
                            {itemDetail.weight > 1 && (
                              <>Cân nặng : {itemDetail.weight} KG</>
                            )}
                          </Descriptions.Item>

                          <br />
                        </div>
                      );
                    })}
                  </Descriptions>
                  <br></br>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid rgb(218, 218, 218)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "20px 0",
                      }}
                    >
                      {item.sale > 0 && (
                        <span
                          style={{
                            width: "100%",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                          }}
                        >
                          Tổng :{" "}
                          <span>
                            {" "}
                            {item.sumPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            VND
                          </span>
                        </span>
                      )}
                      <span
                        style={{
                          width: "100%",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                        }}
                      >
                        Tổng thanh toán :{" "}
                        <span
                          style={{
                            color: "red",
                            fontWeight: "500",
                            fontSize: 23,
                          }}
                        >
                          {" "}
                          {Math.ceil(item.sumPrice * ((100 - item.sale) / 100))
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          VND
                        </span>
                      </span>
                    </div>

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
    </div>
  );
};

export default ListOder;
