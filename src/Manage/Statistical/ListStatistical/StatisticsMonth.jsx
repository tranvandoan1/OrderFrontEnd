import { Bar } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getOrder } from "./../../../features/Order/Order";
import { Row, Statistic } from "antd";

const StatisticsMonth = () => {
  const dispatch = useDispatch();
  const [monthPrice, setMonthPrice] = useState();
  const orders = useSelector((data) => data.order.value);
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  const date = moment("2022-06-11"); // Thursday Feb 2015
  const dow = date.day();
  console.log(dow);
  const list = () => {
    if (orders.length > 0) {
      // lấy ngày trong tuần
      function getThisWeekDates() {
        var weekDates = [];

        for (var i = 1; i <= 7; i++) {
          weekDates.push(moment("2002-06").day(i));
        }

        return weekDates;
      }
      let dayOfWeek = [];
      getThisWeekDates().forEach((date) => {
        const timeDate = new Date(date.format());
        dayOfWeek.push({
          date: timeDate.getDate(),
          month: timeDate.getMonth() + 1,
          year: timeDate.getFullYear(),
        });
      });

      console.log(dayOfWeek);
      const newOrder = [];
      orders.map((item) => {
        dayOfWeek.map((week) => {
          const time = new Date(item.createdAt);
          // console.log(week.date)
          // console.log(time.getDate() == week.date)
          if (
            time.getDate() == week.date - 1 &&
            time.getMonth() + 1 == week.month &&
            week.year == time.getFullYear()
          ) {
            newOrder.push(item);
          }
        });
      });

      console.log(newOrder);
      const dayOfMonth = moment(
        `${moment().year()}-${moment().month() + 1}`,
        "YYYY-MM"
      ).daysInMonth();
      const price = [];

      newOrder.map((item) => {
        const time = new Date(item.createdAt);
        if (
          time.getDate() < dayOfMonth &&
          time.getMonth() + 1 == moment().month() + 1 &&
          time.getFullYear() == moment().year()
        ) {
          price.push(item.sum_price);
        }
      });

      let sum = 0;
      for (let i = 0; i < price.length; i++) {
        sum += price[i];
      }
      const data = [
        {
          day: "Tháng này",
          value: 38,
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
        minBarWidth: 20,
        maxBarWidth: 20,
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
      };
      return (
        <>
          <Row>
            <Statistic
              title="Tháng này"
              value={`${moment().month() + 1}-${moment().year()}`}
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

export default StatisticsMonth;
