import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Orders from "./Page/Orders";
import LayoutWeb from "./Page/LayoutWeb";
import ListCate from "./Manage/Categoris/ListCate";
import LayoutAdmin from "./Manage/LayoutAdmin";
import ListPro from "./Manage/Products/ListPro";
import ListOder from "./Manage/ListOder";
import Account from "./Manage/Account/Account";
import Signin from "./Login/Signin";
import PicturesWall from "./Login/Signup";
import AddCate from "./Manage/Categoris/AddCate";
import EditCate from "./Manage/Categoris/EditCate";
import AddPro from "./Manage/Products/AddPro";

import ListTablee from "./Manage/Table/ListTable";

import AddTable from "./Manage/Table/AddTable";
import EditTable from "./Manage/Table/EditTable";
import EditPro from "./Manage/Products/EditPro";
import ListStatistical from "./Manage/Statistical/ListStatistical";

import "./App.css";
import Introduce from "./Introduce";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getProductAll } from "./features/ProductsSlice/ProductSlice";
import { getCategori } from "./features/Categoris/CategoriSlice";
import { getAllTable } from "./features/TableSlice/TableSlice";
import Setting from "./Manage/Setting";
import { getUser } from "./features/User/UserSlice";
function App() {
  const user = useSelector((data) => data.user.value);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const dispatch = useDispatch();
  const products = useSelector((data) => data.product.value);
  const tables = useSelector((data) => data.table.value);
  const categoris = useSelector((data) => data.categori.value);
  useEffect(() => {
    dispatch(getProductAll());
    dispatch(getCategori());
    dispatch(getAllTable());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            Object.keys(user).length !== 0 ? (
              user.loginWeb == 0 ? (
                <Navigate to="/intro" />
              ) : (
                <Navigate to="/tables" />
              )
            ) : (
              <Signin />
            )
          }
        />
        <Route path="/intro" element={<Introduce />} />
        <Route
          path="/signin"
          element={user !== null ? <Navigate to="/tables" /> : <Signin />}
        />
        <Route
          path="/signup"
          element={user !== null ? <Navigate to="/tables" /> : <PicturesWall />}
        />

        <Route
          path="/tables/"
          element={
            user == null && user?.loginWeb !== 0 ? (
              <Navigate to="/signin" />
            ) : (
              <LayoutWeb />
            )
          }
        ></Route>

        <Route
          path="/order/table-name=:name&&:id"
          element={
            user == null && user?.loginWeb !== 0 ? (
              <Navigate to="/signin" />
            ) : (
              <Orders />
            )
          }
        />

        <Route
          path="/manager/"
          element={user == null ? <Navigate to="/signin" /> : <LayoutAdmin />}
        >
          {/* cate */}
          <React.Fragment>
            <Route
              path="categoris/"
              element={user == null ? <Navigate to="/signin" /> : <ListCate />}
            ></Route>
            <Route
              path="categoris/add"
              element={user == null ? <Navigate to="/signin" /> : <AddCate />}
            />
            <Route
              path="categoris/edit=:id"
              element={user == null ? <Navigate to="/signin" /> : <EditCate />}
            />
            {/* pro */}
            <Route
              path="products"
              element={user == null ? <Navigate to="/signin" /> : <ListPro />}
            />
            <Route
              path="products/add"
              element={user == null ? <Navigate to="/signin" /> : <AddPro />}
            />
            <Route
              path="products/edit=:id"
              element={user == null ? <Navigate to="/signin" /> : <EditPro />}
            />

            {/* bàn */}
            <Route
              path="table"
              element={
                user == null ? <Navigate to="/signin" /> : <ListTablee />
              }
            />
            <Route
              path="table/add"
              element={user == null ? <Navigate to="/signin" /> : <AddTable />}
            />
            <Route
              path="table/edit=:id"
              element={user == null ? <Navigate to="/signin" /> : <EditTable />}
            />
            {/* thống kê */}
            {(user?.loginWeb !== 0 ||
              products?.length > 0 ||
              categoris?.length > 0 ||
              tables?.length > 0) && (
              <Route
                path="statistical"
                element={
                  user == null ? <Navigate to="/signin" /> : <ListStatistical />
                }
              />
            )}

            <Route
              path="account"
              element={
                user == null && user?.loginWeb !== 0 ? (
                  <Navigate to="/signin" />
                ) : (
                  <Account />
                )
              }
            />

            <Route
              path="order"
              element={
                user == null && user?.loginWeb !== 0 ? (
                  <Navigate to="/signin" />
                ) : (
                  <ListOder />
                )
              }
            />
          </React.Fragment>
          <Route
            path="setting"
            element={
              user == null && user?.loginWeb !== 0 ? (
                <Navigate to="/signin" />
              ) : (
                <Setting />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
