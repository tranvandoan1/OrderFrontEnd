import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "../../css/LayoutAdmin.module.css";
import { getFloor } from "../../features/FloorSlice/FloorSlice";

const EditFloor = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const floor = useSelector((data) => data.floor.value);
  console.log(floor);
  useEffect(() => {
    dispatch(getFloor());
  }, []);

  const editCate = (values) => {
    console.log(values);
  };
  const { register, handleSubmit, formState: { errors }, reset} = useForm();

  const onSumbit = (data) => {
console.log(data)
}
  return (
    <div>
      <h5 className={styles.title}>Sửa danh mục</h5>
      <form onSubmit={handleSubmit(onSumbit)}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={1} {...register('name')} />
            </div>
            <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" className="form-control"  {...register('price')} />
            </div>
            <button className="btn btn-primary">Thêm sản phẩm</button>
        </form>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={editCate}
        autoComplete="off"
      >
        <Form.Item
          label="Tên tầng"
          name="name"
          rules={[
            {
              required: true,
              message: "Chưa nhập tên tầng!",
            },
          ]}
        >
          <Input defaultValue={floor.name} value={floor.name} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            <Link to="/case-manager/categoris">Quay lại</Link>
          </Button>
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditFloor;
