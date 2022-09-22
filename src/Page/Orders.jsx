import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSaveOrder,
  uploadSaveOrderFind,
} from "../features/saveorderSlice/saveOrderSlice";
import { Menu, Input, Button, Modal, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { DoubleLeftOutlined } from "@ant-design/icons";
import SelectedProduct from "./SelectedProduct";
import styles from "../css/Order.module.css";
import { getProductAll } from "./../features/ProductsSlice/ProductSlice";
import { getCategori } from "./../features/Categoris/CategoriSlice";
import { getAllSaveOrder } from "./../features/saveorderSlice/saveOrderSlice";
const Orders = () => {
  const [productOrder, setProductOrder] = useState([]); //lấy sản phẩm ko có kg
  const [valueWeight, setValueWeight] = useState(); //lấy số lượng kg
  const [proSelect, setProSelect] = useState([]);
  // hiện input nhập cân nặng
  const [selectWeight, setSelectWeight] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const { name, id } = useParams();
  const dispatch = useDispatch();
  const naivigate = useNavigate();

  const saveorders = useSelector((data) => data.saveorder.value);
  const products = useSelector((data) => data.product.value);
  const categoris = useSelector((data) => data.categori.value);
  useEffect(() => {
    dispatch(getProductAll());
    dispatch(getCategori());
    dispatch(getAllSaveOrder());
  }, []);

  const apply = async () => {
    const newSaveOrder = saveorders.find(
      (item) =>
        item.id_pro == productOrder._id &&
        item.id_table == id &&
        item.weight == valueWeight
    );
    if (newSaveOrder !== undefined) {
      const upSaveOrder = {
        amount: +newSaveOrder.amount + +1,
        weight: Number(valueWeight),
      };
      await dispatch(
        uploadSaveOrderFind({ id: newSaveOrder._id, data: upSaveOrder })
      );
      setValueWeight(undefined);
      setSelectWeight(false);
    } else {
      const newOrder = {
        id_user: user._id,
        amount: 1,
        id_table: id,
        id_pro: productOrder._id,
        weight: Number(valueWeight),
        name: productOrder.name,
        photo: productOrder.photo,
        price: productOrder.price,
        dvt: productOrder.dvt,
      };

      setValueWeight(undefined);
      setSelectWeight(false);

      await dispatch(addSaveOrder(newOrder));
    }
  };

  const selectProduct = async (pro) => {
    // lấy ra được sản phẩm vừa chọn
    // kiểm tra xem sp lựa chọn đã tồn lại ở bàn này hay chưa
    const newSaveOrder = saveorders.find(
      (item) => item.id_pro == pro._id && item.id_table == id
    );

    // th1 nếu mà sp order mà cần có kg
    if (pro.check == true) {
      // nếu sp là sp theo cân thì hiện input nhập cân nặng
      setSelectWeight(true);
      setProductOrder(pro);
    } else {
      if (newSaveOrder == undefined) {
        const newOrder = {
          id_user: user._id,
          amount: 1,
          id_table: id,
          id_pro: pro._id,
          name: pro.name,
          photo: pro.photo,
          price: pro.price,
          dvt: pro.dvt,
        };
        await dispatch(addSaveOrder(newOrder));
      } else {
        const addSaveOrder = {
          amount: +newSaveOrder.amount + +1,
        };
        await dispatch(
          uploadSaveOrderFind({ id: newSaveOrder._id, data: addSaveOrder })
        );
      }
    }
  };

  const listCate = (id) => {
    if (id == "all") {
      setProSelect([]);
    } else {
      const productFind = products.filter((item) => item.cate_id == id);
      setProSelect(productFind);
    }
  };

  // const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div>
      {/* {user?.loginWeb == 0 || products?.length <= 0 ? (
        <Modal open={isModalOpen}>
          <span style={{ fontWeight: "500", fontSize: 20, color: "red" }}>
            Chưa có sản phẩm. Hãy thêm sản phẩm !
          </span>
          <Button
            style={{ marginTop: 20 }}
            onClick={() => naivigate("/manager/products/add")}
          >
            Thêm sản phẩm
          </Button>
        </Modal>
      ) : ( */}
      <React.Fragment>
        <Row>
          <Col xs={0} sm={0} md={6} lg={4} xl={4}>
            <div className={styles.back}>
              <Link to="/tables">
                {" "}
                <DoubleLeftOutlined className="icon" /> Quay lại{" "}
              </Link>
            </div>
            <div className={styles.menu}>
              <Menu style={{ fontSize: "1.1rem" }}>
                <Menu.Item key="00" onClick={() => listCate("all")}>
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
          <Col xs={24} sm={24} md={12} lg={14} xl={14}>
            <div className="products" style={{ paddingBottom: 10 }}>
              <Row>
                {(proSelect?.length >= 1 ? proSelect : products)?.map(
                  (item_pro) => {
                    return (
                      <Col
                        xs={12}
                        sm={8}
                        md={12}
                        lg={8}
                        xl={6}
                        key={item_pro._id}
                        onClick={() => selectProduct(item_pro)}
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
          <Col xs={0} sm={0} md={6} lg={6} xl={6}>
            <SelectedProduct />
          </Col>
        </Row>

        {/*nhập cân nặng */}
        <Modal
          title="Cân nặng"
          visible={selectWeight}
          onCancel={() => setSelectWeight(false)}
        >
          <Input
            placeholder="Nhập cân nặng"
            value={valueWeight}
            type="number"
            onChange={(e) => setValueWeight(e.target.value)}
          />
          <Button
            onClick={() => apply()}
            style={{ background: "blue", color: "#fff", marginTop: 10 }}
          >
            Áp dụng
          </Button>
        </Modal>
      </React.Fragment>
      {/* )} */}
    </div>
  );
};

export default Orders;
