import { Button, DatePicker, Modal, Row, Select, Space, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../../../css/CssAdmin.module.css";
import { Bar } from "@ant-design/plots";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "./../../../features/Order/Order";
import moment from "moment";

const SelectTime = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dipsatch = useDispatch();
  const orders = useSelector((data) => data.order.value);
  const orderUser = orders?.filter((item) => item.id_user == user._id);
  const [date, setDate] = useState();
  const [check, setCheck] = useState();

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
    if (orderUser.length > 0) {
      const timeSelect = new Date(date);
      const order = orderUser.filter((item) => {
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
  const handleChange = (value) => {
    setCheck(value);
  };

  return (
    <>
      Chọn :{" "}
      <Select
        style={{
          width: 120,
          marginRight: 20,
        }}
        onChange={handleChange}
        placeholder="Chọn"
      >
        <Select.Option value="1">Ngày</Select.Option>
        <Select.Option value="2">Tháng</Select.Option>
        <Select.Option value="3">Năm</Select.Option>
      </Select>
      {check !== undefined && (
        <>
          Chọn ngày : <DatePicker onChange={onChange} />
        </>
      )}
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
