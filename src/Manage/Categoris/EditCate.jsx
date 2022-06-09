import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCategori } from "../../features/Categoris/CategoriSlice";
import styles from "../../css/AdminCate.module.css";
import { useForm } from "react-hook-form";

const EditCate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categoris = useSelector((data) => data.categori.value);
  console.log(categoris);
  useEffect(() => {
    dispatch(getCategori());
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(categoris.find((item) => item._id == id).name);
    console.log(data)
  };

  return (
    <>
      <h4 className={styles.h4}>Sửa danh mục</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name_cate}>
          <span className={styles.title}>Tên danh mục</span>
          <input
            className={styles.input}
            defaultValue={
              categoris.length > 0 &&
              categoris.find((item) => item._id == id).name
            }
            {...register("name")}
          />
          {errors.name && <span>Chưa nhập tên danh mục !</span>}
        </div>
        <button className={styles.button} type="submit">
          Thêm
        </button>
      </form>
    </>
  );
};

export default EditCate;
