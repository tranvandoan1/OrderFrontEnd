import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/plots";
import styles from "../../../css/CssAdmin.module.css";
import { BarChartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../features/Order/Order";
import { Select } from "antd";
import StatisticsMonth from "./StatisticsMonth";
import moment from "moment";
const { Option } = Select;
const d = new Date();
const date =
  `${d.getDate()}`.length == 1 ? `0${d.getDate() - 1}` : `${d.getDate() - 1}`;
const month =
  `${d.getMonth() + 1}`.length == 1
    ? `0${d.getMonth() + 1}`
    : `${d.getMonth() + 1}`;

const List = () => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(1);
  const orders = useSelector((data) => data.order.value);
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  console.log(`${date}-${month}-${d.getFullYear()}`);

  const list = () => {
    if (orders.length > 0) {
      const order = orders.filter(
        (item) => item.time == `${date}-${month}-${d.getFullYear()}`
      );
      let sum = 0;
      for (let i = 0; i < order.length; i++) {
        sum += order[i].sum_price;
      }
      const data = [
        {
          day: "Hôm nay",
          price: sum,
        },
      ];
      const paletteSemanticRed = "#F4664A";
      const brandColor = "#5B8FF9";

      const config = {
        data,
        xField: "price",
        yField: "day",
        barWidthRatio: 0.6,
        legend: false,
        meta: {
          price: {
            alias: "Tiền",
          },
        },
        label: {
          content: (originData) => {
            const val = parseFloat(originData.value);

            if (val < 0.05) {
              return (val * 100).toFixed(1) + "%";
            }
          },
          offset: 10,
        },
        seriesField: "",
        color: ({ price }) => {
          console.log(price)
          if (price > 200) {
            return paletteSemanticRed;
          }

          return brandColor;
        },

        minBarWidth: 20,
        maxBarWidth: 20,
      };
      return <Bar {...config} style={{ height: 80 }} />;
    }
  };
  const handleChange = (value) => {
    setCheck(value);
  };
  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.statistical}>
        <div className={styles.title}>
          <h5 style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
            <BarChartOutlined style={{ fontSize: 30, color: "chocolate" }} />{" "}
            Thống kê doanh thu
          </h5>
          <Select
            defaultValue="1"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="1">Hôm nay</Option>
            <Option value="2">Tháng này</Option>
            <Option value="3">Năm nay</Option>
          </Select>
        </div>
        <hr style={{ height: 0.1 }} />
        {check == 1 ? list() : check == 2 ? <StatisticsMonth /> : ""}
      </div>
    </div>
  );
};
export default List;
