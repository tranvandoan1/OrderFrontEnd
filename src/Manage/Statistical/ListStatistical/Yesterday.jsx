import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/plots";
import styles from "../../../css/CssAdmin.module.css";
import { BarChartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../features/Order/Order";
import moment from "moment";
import { Row, Statistic } from "antd";

const Yesterday = () => {
  const dispatch = useDispatch();
  const orders = useSelector((data) => data.order.value);
  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const list = () => {
    if (orders.length > 0) {
      const order = orders.filter((item) => {
        const time = new Date(item.createdAt);

        if (
          `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}` ==
          `${moment().date() - 1}-${moment().month() + 1}-${moment().year()}`
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
          day: "Hôm qua",
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
        // color: () => (data.price < 20000000 ? fail : susse),

        minBarWidth: 20,
        maxBarWidth: 20,
      };
      return (
        <>
          <Row>
            <Statistic
              title="Hôm qua"
              value={`${moment().date() - 1}-${
                moment().month() + 1
              }-${moment().year()}`}
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
          <Bar {...config} style={{ height: 80 }} />
        </>
      );
    }
  };

  return <div>{list()}</div>;
};
export default Yesterday;
