import { Button, DatePicker, Modal, Row, Space, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../../../css/CssAdmin.module.css";
import { Bar } from "@ant-design/plots";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "./../../../features/Order/Order";
import moment from "moment";

const SelectTime = () => {
  const dipsatch = useDispatch();
  const orders = useSelector((data) => data.order.value);
  const [date, setDate] = useState();
  useEffect(() => {
    dipsatch(getOrder());
  }, []);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
    // setIsModalVisible(false);
  };
  // const [isModalVisible, setIsModalVisible] = useState(true);

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const datee = moment().date();
  const month = moment().month();
  const year = moment().year();
  const list = () => {
    if (orders.length > 0) {
      const timeSelect = new Date(date);
      const order = orders.filter((item) => {
        const time = new Date(item.createdAt);

        if (
          time.getDate() == timeSelect.getDate() &&
          time.getMonth() + 1 == timeSelect.getMonth() + 1 &&
          time.getFullYear() == moment().year()
        ) {
          return item;
        }
      });
      let sum = 0;
      for (let i = 0; i < order.length; i++) {
        sum += order[i].sum_price;
      }
      const data = [
        {
          day: date !== undefined ? date : "",
          price: sum,
        },
      ];
      const config = {
        data,
        xField: "price",
        yField: "day",
        barWidthRatio: 0.6,
        legend: false,
        seriesField: "",
        meta: {
          price: {
            alias: "Tiền",
          },
        },
        label: {
          content: (data) => {
            return `${data.price.toLocaleString("vi-VN")} VNĐ`;
          },
          offset: 10,
          position: "middle",

          style: {
            fill: "#FFFFFF",
            opacity: 1,
            fontWeight: "600",
          },
        },

        minBarWidth: 20,
        maxBarWidth: 20,
      };

      return (
        <>
          <Row>
            <Statistic
              title="Ngày chọn"
              value={
                date ==
                `${year}-${
                  `${month}`.length == 1 ? `0${month + 1}` : month + 1
                }-${datee}`
                  ? "Hôm nay"
                  : date
              }
            />
            <Statistic
              title="Doanh thu"
              value={`${sum}`}
              suffix="VNĐ"
              style={{
                margin: "0 32px",
              }}
            />
          </Row>
          <br />
          {sum !== 0 ? (
            <Bar {...config} style={{ height: 80 }} />
          ) : (
            "Chưa có doanh số"
          )}
        </>
      );
    }
  };
  return (
    <>
      Chọn ngày : <DatePicker onChange={onChange} />
      {/* <br />
      <br />
      <Modal title="Chọn ngày" visible={isModalVisible} onCancel={handleCancel}>
        <DatePicker onChange={onChange} style={{ width: "100%" }} />
      </Modal> */}
      {date !== undefined && list()}
    </>
  );
};

export default SelectTime;
