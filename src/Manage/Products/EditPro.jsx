import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/LayoutAdmin.module.css";
import { Alert, Button, Checkbox, Form, Input, Select, Spin } from "antd";
import { openNotificationWithIcon } from "../../Notification";
import { getProduct } from "../../features/ProductsSlice/ProductSlice";
import { getCategori } from "../../features/Categoris/CategoriSlice";
import { uploadProduct } from "./../../features/ProductsSlice/ProductSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

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
const EditPro = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const product = useSelector((data) => data.product.value);
  const categoris = useSelector((data) => data.categori.value);

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getCategori());
  }, []);
  const uploadTable = (value) => {
    if (
      value.name == undefined &&
      value.cate_id == undefined &&
      value.price == undefined &&
      value.check == undefined
    ) {
      openNotificationWithIcon("warning", "Chưa có sự thay đổi ");
    } else {
      const photo = document.querySelector("#photo").files[0];
      if (photo == undefined) {
        setCheck(true);

        const newPro = {
          ...product,
          cate_id: value.cate_id == undefined ? product.cate_id : value.cate_id,
          name: value.name == undefined ? product.name : value.name,
          check: value.check == undefined ? product.check : value.check,
          price:
            value.price == undefined
              ? Number(product.price)
              : Number(value.price),
        };
        dispatch(uploadProduct(newPro));
        navigate("/case-manager/products");
        openNotificationWithIcon("success", "Sửa thành công ");
        setCheck(false);
      } else {
        setCheck(true);

        const imageRef = ref(storage, `images/${photo.name}`);
        uploadBytes(imageRef, photo).then(() => {
          getDownloadURL(imageRef).then((url) => {
            const newPro = {
              ...product,
              cate_id:
                value.cate_id == undefined ? product.cate_id : value.cate_id,
              name: value.name == undefined ? product.name : value.name,
              check: value.check == undefined ? product.check : value.check,
              price:
                value.price == undefined
                  ? Number(product.price)
                  : Number(value.price),
              photo: url,
            };
            dispatch(uploadProduct(newPro));
            navigate("/case-manager/products");
            openNotificationWithIcon("success", "Thêm thành công ");
            setCheck(false);
          });
        });
      }
    }
  };

  const list = () => {
    if (product.length > 0) {
      return "";
    } else if (Object.keys(product).length > 0) {
      return (
        <Form {...formItemLayout} onFinish={uploadTable}>
          <Form.Item name="name" label="Tên sản phẩm" labelAlign="left">
            <Input defaultValue={product.name} />
          </Form.Item>
          <Form.Item name="price" label="Giá" labelAlign="left">
            <Input defaultValue={product.price} />
          </Form.Item>
          <Form.Item name="cate_id" label="Danh mục" labelAlign="left">
            <Select
              defaultValue={
                categoris.length > 0 &&
                categoris.find((item) => item._id == product.cate_id).name
              }
              placeholder="Chọn danh mục"
            >
              {categoris.map((item) => (
                <Select.Option
                  value={item._id}
                  style={{ textTransform: "capitalize" }}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ display: "flex", justifycontent: "space-between" }}
          >
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
          </Form.Item>{" "}
          <Form.Item
            label="Sản phẩm theo cân "
            name="check"
            labelAlign="left"
            valuePropName="checked"
          >
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              <Link to="/case-manager/products">Quay lại</Link>
            </Button>
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form.Item>
        </Form>
      );
    }
  };
  return (
    <div>
      <h5 className={styles.title}>
        Sửa sản phẩm{" "}
        {check == true && (
          <Spin tip="Loading...">
            <Alert message="Đang sửa..." type="info" />
          </Spin>
        )}
      </h5>

      {list()}
    </div>
  );
};

export default EditPro;
