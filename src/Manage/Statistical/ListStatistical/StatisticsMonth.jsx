import { Bar } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getOrder } from "./../../../features/Order/Order";

const StatisticsMonth = () => {
  const dispatch = useDispatch();
  const [monthPrice, setMonthPrice] = useState();
  const orders = useSelector((data) => data.order.value);
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  const list = () => {
    if (orders.length > 0) {
      const price = [];
      orders.map((item) => price.push(item.sum_price));

      const lp = () => {
        let sum = 0;
        for (let i = 0; i < price.length; i++) {
          sum += price[i];
        }
        return sum;
      };

      const data = [
        {
          day: "Tháng 1",
          value: 38,
          price: 100000,
        },
        {
          day: "Tháng 2",
          value: 52,
          price: 100000,
        },
        {
          day: "Tháng 3",
          value: 61,
          price: 10000,
        },
        {
          day: "Tháng 4",
          value: 145,
          price: 1000000,
        },
        {
          day: "Tháng 5",
          value: 48,
          price: 100000,
        },
        {
          day: "Tháng 6",
          value: 48,
          price: 10000,
        },
        {
          day: "Tháng 7",
          value: 48,
          price: 100000,
        },
        {
          day: "Tháng 8",
          value: 48,
          price: 100000,
        },
        {
          day: "Tháng 9",
          value: 48,
          price: 100000,
        },
        {
          day: "Tháng 10",
          value: 48,
          price: 100000,
        },
        {
          day: "Tháng 11",
          value: 48,
          price: 100000,
        },
        {
          day: "Tháng 12",
          value: 48,
          price: 100000,
        },
      ];
      const config = {
        data,
        xField: "price",
        yField: "day",
        barWidthRatio: 0.6,
        meta: {
          price: {
            alias: "Tiền",
          },
        },
        legend: false,
      };
      return <Bar {...config} style={{ height: 350 }} />;
    }
  };
  return <div>{list()}</div>;
};

export default StatisticsMonth;
