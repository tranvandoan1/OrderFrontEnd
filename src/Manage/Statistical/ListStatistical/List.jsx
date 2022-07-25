import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/plots";
import styles from "../../../css/CssAdmin.module.css";
import { BarChartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../features/Order/Order";
import { Row, Select, Statistic } from "antd";
import StatisticsMonth from "./StatisticsMonth";
import moment from "moment";
import Yesterday from "./Yesterday";
import Year from "./Year";
import SelectTime from "./SelectTime";
import { remove } from "../../../API/Order";
const { Option } = Select;

const List = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [check, setCheck] = useState("today");
  const orders = useSelector((data) => data.order.value);
  const orderUser = orders?.filter((item) => item.user_id == user._id);
  console.log(orderUser, "asadas");
  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const date = moment().date();
  const month = moment().month();
  const year = moment().year();
  const list = () => {
    if (orderUser.length > 0) {
      let order = [];

      orderUser.filter((item) => {
        if (item.user_id == user._id) {
          const time = new Date(item.createdAt);
          if (
            check == "today"
              ? date == time.getDate()
              : check == "yesterDay"
              ? date - 1 == time.getDate()
              : " " &&
                (check == "today" ||
                  check == "thisMonth" ||
                  check == "yesterDay")
              ? month + 1 == time.getMonth() + 1
              : check == "lastMonth"
              ? month == time.getMonth() + 1
              : " " && check == "lastYear"
              ? year - 1 == time.getFullYear()
              : check == "today" ||
                check == "thisMonth" ||
                check == "thisYear" ||
                check == "yesterDay" ||
                check == "lastMonth"
              ? year == time.getFullYear()
              : " "
          ) {
            order.push(item);
          }
        }
      });

      // tính tổng tiền
      let sum = 0;
      for (let i = 0; i < order.length; i++) {
        sum += Math.ceil(order[i].sum_price * ((100 - order[i].sale) / 100));
      }

      const data = [
        {
          day:
            check == "today"
              ? "Hôm nay"
              : check == "thisMonth"
              ? "Tháng này"
              : check == "thisYear"
              ? "Năm nay"
              : check == "yesterDay"
              ? "Hôm qua"
              : check == "lastMonth"
              ? "Tháng trước"
              : check == "lastYear"
              ? "Năm trước"
              : " ",
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
        tooltip: {
          customContent: (title, items) => {
            return (
              <>
                <h6 style={{ marginTop: 10, fontSize: 13 }}>{title}</h6>
                <ul style={{ paddingLeft: 0 }}>
                  {items?.map((item, index) => {
                    const { name, value, color } = item;
                    return (
                      <li
                        key={item.year}
                        className="g2-tooltip-list-item"
                        data-index={index}
                        style={{
                          marginBottom: 4,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className="g2-tooltip-marker"
                          style={{ backgroundColor: color }}
                        ></span>
                        <span
                          style={{
                            display: "inline-flex",
                            flex: 1,
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ margiRight: 16 }}>
                            Tiền :{" "}
                            {value
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            VNĐ
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
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
              title={
                check == "today"
                  ? "Hôm nay"
                  : check == "thisMonth"
                  ? "Tháng này"
                  : check == "thisYear"
                  ? "Năm nay"
                  : check == "yesterDay"
                  ? "Hôm qua"
                  : check == "lastMonth"
                  ? "Tháng trước"
                  : check == "lastYear"
                  ? "Năm trước"
                  : " "
              }
              value={`${
                check == "today"
                  ? `${moment().date()}-`
                  : check == "yesterDay"
                  ? `${moment().date() - 1}-`
                  : check == "lastMonth"
                  ? `${moment().month()}-`
                  : ""
              }${
                check == "today" || check == "thisMonth" || check == "yesterDay"
                  ? `${moment().month() + 1}-`
                  : ""
              }${
                check == "lastYear"
                  ? `${moment().year() - 1} `
                  : `${moment().year()} `
              }`}
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
          {sum == 0 ? (
            <span className={styles.noData}>Chưa có doanh thu</span>
          ) : (
            <Bar {...config} style={{ height: 80 }} />
          )}
        </>
      );
    } else {
      return "Chưa có doanh số";
    }
  };
  const handleChange = (value) => {
    console.log(value);
    setCheck(value);
  };
  return (
    <div>
      <div className={styles.statistical}>
        <div className={styles.title}>
          <h5 style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
            <BarChartOutlined
              style={{ fontSize: 30, color: "cadetblue", marginRight: 10 }}
            />{" "}
            Doanh số
          </h5>
          <Select
            defaultValue="today"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="today">Hôm nay</Option>
            <Option value="thisWeek">Tuần này</Option>
            <Option value="thisMonth">Tháng này</Option>
            <Option value="thisYear">Năm nay</Option>
            <Option value="yesterDay">Hôm qua</Option>
            <Option value="lastWeek">Tuần trước</Option>
            <Option value="lastMonth">Tháng trước</Option>
            <Option value="lastYear">Năm trước</Option>
            <Option value="selectDay">Chọn</Option>
          </Select>
        </div>
        <hr style={{ background: "rgb(161, 161, 161)", height: 0.5 }} />

        {check == "today" ||
        check == "thisMonth" ||
        check == "thisYear" ||
        check == "yesterDay" ||
        check == "lastMonth" ||
        check == "lastYear" ? (
          list()
        ) : check == "selectDay" ? (
          <SelectTime />
        ) : check == "thisWeek" ? (
          <StatisticsMonth />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default List;
