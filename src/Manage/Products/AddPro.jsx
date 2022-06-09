import { Form, Input, Button, Select, Upload, Spin, Alert } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/LayoutAdmin.module.css";
import { getCategori } from "../../features/Categoris/CategoriSlice";
import { addProduct } from "../../features/ProductsSlice/ProductSlice";
import { storage } from "../../firebase";
import { openNotificationWithIcon } from "../../Notification";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const { Option } = Select;
const AddPro = () => {
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoris = useSelector((data) => data.categori.value);
  useEffect(() => {
    dispatch(getCategori());
  }, []);
  const onSubmit = (data) => {
    setCheck(true);
    const photo = document.querySelector("#photo").files[0];
    const imageRef = ref(storage, `images/${photo.name}`);
    uploadBytes(imageRef, photo).then(() => {
      getDownloadURL(imageRef).then((url) => {
        const product = {
          cate_id: data.cate_id,
          photo: url,
          name: data.name,
          price: Number(data.price),
        };
        dispatch(addProduct(product));
        navigate("/case-manager/products");
        openNotificationWithIcon("success", "Thêm thành công ");
        setCheck(false);
      });
    });
  };

  return (
    <div style={{ height: "100%" }}>
      <h5 className={styles.title}>
        Thêm sản phẩm{" "}
        {check == true && (
          <Spin tip="Loading...">
            <Alert message="Đang thêm..." type="info" />
          </Spin>
        )}
      </h5>
      <Form {...formItemLayout} onFinish={onSubmit}>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Chưa nhập tên sản phẩm!",
            },
          ]}
        >
          <Input placeholder="Tên sản phẩm" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Chưa nhập giá sản phẩm!",
            },
          ]}
        >
          <Input placeholder="Giá sản phẩm" />
        </Form.Item>
        <Form.Item
          name="cate_id"
          label="Danh mục"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Chưa nhập giá sản phẩm!",
            },
          ]}
        >
          <Select placeholder="Chọn danh mục">
            {categoris.map((item) => (
              <Option value={item._id} style={{ textTransform: "capitalize" }}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ display: "flex", justifycontent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5 style={{ width: "20%", fontSize: 16, fontWeight: "400" }}>
              Ảnh :{" "}
            </h5>
            <div
              style={{
                width: "80%",
                textAlign: "left",
              }}
            >
              <Input type="file" name="photo" id="photo" />
            </div>
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            <Link to="/case-manager/products">Quay lại</Link>
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPro;
