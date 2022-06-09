import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSaveOrder,
  uploadSaveOrder,
  updateSaveorder,
} from "../features/saveorderSlice/saveOrderSlice";
import { Menu, Input, Button, Modal, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { DoubleLeftOutlined } from "@ant-design/icons";
import SelectedProduct from "./SelectedProduct";
import styles from "../css/Order.module.css";
import { getProductAll } from "./../features/ProductsSlice/ProductSlice";
const Orders = () => {
  const [productOrder, setProductOrder] = useState([]); //lấy sản phẩm ko có kg
  const [productOrderWeight, setProductOrderWeight] = useState([]); //lấy sản phẩm có kg
  const [valueWeight, setValueWeight] = useState(); //lấy số lượng kg
  const [proSelect, setProSelect] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const { floor_id, table_id } = useParams();
  const dispatch = useDispatch();

  const saveorders = useSelector((data) => data.saveorder.value);
  const products = useSelector((data) => data.product.value);
  const categoris = useSelector((data) => data.categori.value);
  useEffect(() => {
    dispatch(getProductAll());
  }, []);
  const apply = () => {
    if (Number(productOrderWeight.weight) == Number(valueWeight)) {
      const newOrder = {
        ...productOrderWeight,
        id_user: user._id,
        amount: productOrderWeight.amount + 1,
        id_table: table_id,
        floor_id: floor_id,
        weight: Number(valueWeight),
      };
      setValueWeight();
      setSelectWeight(false);
      dispatch(uploadSaveOrder(newOrder));
    } else {
      const newOrder = {
        id_user: user._id,
        amount: 1,
        id_table: table_id,
        floor_id: floor_id,
        id_pro: productOrder._id,
        weight: Number(valueWeight),
        name: productOrder.name,
        photo: productOrder.photo,
        price: productOrder.price,
      };
      setValueWeight();
      setSelectWeight(false);
      dispatch(addSaveOrder(newOrder));
    }
  };

  const selectProduct = async (id_pro) => {
    // lấy ra được sản phẩm vừa chọn
    const proOrder = products.find((item) => item._id == id_pro);
    // kiểm tra xem sp lựa chọn đã tồn lại ở bàn này hay chưa
    const newSaveOrder = saveorders.find(
      (item) => item.id_pro == proOrder._id && item.id_table == table_id
    );
    // th1 nếu mà sp order mà cần có kg
    if (proOrder.check == true) {
      if (newSaveOrder == undefined) {
        // nếu sp là sp theo cân thì hiện input nhập cân nặng
        setSelectWeight(true);
        setProductOrder(proOrder);
      } else {
        setSelectWeight(true);
        setProductOrderWeight(newSaveOrder);
      }
    } else {
      if (newSaveOrder == undefined) {
        const newOrder = {
          id_user: "6254c487d6b358408cc354d3",
          amount: `1`,
          id_table: table_id,
          id_pro: proOrder._id,
          name: proOrder.name,
          photo: proOrder.photo,
          price: proOrder.price,
          floor_id: floor_id,
        };
        dispatch(addSaveOrder(newOrder));
      } else {
        const upSaveOrder = {
          ...newSaveOrder,
          amount: +newSaveOrder.amount + +1,
        };
        dispatch(uploadSaveOrder(upSaveOrder));
      }
    }
  };
  const listCate = (id) => {
    const cates = categoris.filter((item) => item._id == id);
    const pro = [];
    products.filter((item) => {
      cates.map((cate) => {
        if (item.cate_id == cate._id) {
          pro.push(item);
        }
      });
    });

    setProSelect(pro);
  };
  const All = () => {
    setProSelect([]);
  };

  // hiện input nhập cân nặng
  const [selectWeight, setSelectWeight] = useState(false);
  const weightCancel = () => {
    setSelectWeight(false);
  };
  return (
    <div>
      <Row>
        <Col xs={12} sm={6} md={6} lg={4} xl={4}>
          <div className={styles.back}>
            <Link to={`/floor/floor_id=${floor_id}`}>
              {" "}
              <DoubleLeftOutlined className="icon" /> Quay lại{" "}
            </Link>
          </div>
          <div className={styles.menu}>
            <Menu style={{ fontSize: "1.1rem" }}>
              <Menu.Item key="00" onClick={() => All()}>
                Tất cả
              </Menu.Item>
              {categoris.map((item, index) => {
                return (
                  <Menu.Item
                    key={index}
                    style={{ textTransform: "capitalize" }}
                    onClick={() => listCate(item._id)}
                  >
                    {item.name}
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        </Col>
        <Col xs={12} sm={6} md={12} lg={14} xl={14}>
          <div className="products">
            <Row>
              {(proSelect.length >= 1 ? proSelect : products).map(
                (item_pro) => {
                  return (
                    <Col
                      xs={12}
                      sm={4}
                      md={12}
                      lg={8}
                      xl={6}
                      key={item_pro._id}
                      onClick={() => selectProduct(item_pro._id)}
                    >
                      <div className="list_pro">
                        <div className="img">
                          <img src={item_pro.photo} alt="" />
                          <div className="name-price">
                            <div className="name">{item_pro.name}</div>
                            <div className="price">
                              {item_pro.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              đ
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                }
              )}
            </Row>
          </div>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <SelectedProduct />
        </Col>
      </Row>

      {/* cân nặng */}
      <Modal title="Cân nặng" visible={selectWeight} onCancel={weightCancel}>
        <Input
          placeholder="Nhập cân nặng"
          value={valueWeight}
          onChange={(e) => setValueWeight(e.target.value)}
        />
        <Button
          onClick={() => apply()}
          style={{ background: "blue", color: "#fff", marginTop: 10 }}
        >
          Áp dụng
        </Button>
      </Modal>
    </div>
  );
};

export default Orders;
