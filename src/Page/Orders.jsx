import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addSaveOrder, uploadSaveOrder, updateSaveorder } from '../features/saveorderSlice/saveOrderSlice'
import { Menu, Input, Button, Modal, Row, Col } from 'antd';
import { Link } from "react-router-dom"
import { DoubleLeftOutlined } from "@ant-design/icons"
import SelectedProduct from './SelectedProduct'
import SaveorderAPI, { remove } from '../API/SaveOrder';
const { SubMenu } = Menu;

const Orders = () => {
    const [productOrderWeight, setProductOrderWeight] = useState([])//lấy sản phẩm có kg
    const [valueWeight, setValueWeight] = useState(0) //lấy số lượng kg
    const [proSelect, setProSelect] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))

    const { floor_id, table_id } = useParams()

    const dispatch = useDispatch()

    const saveorders = useSelector(data => data.saveorder.value)
    const products = useSelector(data => data.product.value)
    const categoris = useSelector(data => data.categori.value)

    const apply = () => {
        const newOrder = {
            id_user: user._id,
            amount: `1`,
            id_table: table_id,
            id_pro: productOrderWeight._id,
            floor_id: floor_id,
            name: productOrderWeight.name,
            photo: productOrderWeight.photo,
            price: productOrderWeight.price,
            weight: Number(valueWeight),

        };
        setSelectWeight(false);
        dispatch(addSaveOrder(newOrder))
    }

    const selectProduct = async (id_pro) => {
        // lấy ra được sản phẩm vừa chọn
        const proOrder = products.find(item => item._id == id_pro)
        // kiểm tra xem sp lựa chọn đã tồn lại ở bàn này hay chưa
        const newSaveOrder = saveorders.find(item => item.id_pro == proOrder._id && item.id_table == table_id)
        // th1 nếu mà sp order mà cần có kg
        if (proOrder.cate_id == '6243388f9663d735808220ab') {
            if (newSaveOrder == undefined) {
                // nếu sp là sp theo cân thì hiện input nhập cân nặng
                setSelectWeight(true);
                setProductOrderWeight(proOrder)
            } else {
                setSelectWeight(true);

                if (newSaveOrder.weight === valueWeight) {
                    const upSaveOrder = {
                        ...newSaveOrder,
                        "amount": +newSaveOrder.amount + +1
                    }
                    // dispatch(uploadSaveOrder(upSaveOrder))
                    console.log(upSaveOrder)
                } else {
                    // setProductOrderWeight(proOrder)
                }

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
                    floor_id:floor_id
                };
                dispatch(addSaveOrder(newOrder))
            } else {
                const upSaveOrder = {
                    ...newSaveOrder,
                    "amount": +newSaveOrder.amount + +1
                }
                dispatch(uploadSaveOrder(upSaveOrder))
            }

        }

    }
    const listCate = (id) => {
        const cates = categoris.filter(item => item._id == id)
        const pro = []
        products.filter(item => {
            cates.map(cate => {
                if (item.cate_id == cate._id) {
                    pro.push(item)
                }
            })
        })

        setProSelect(pro)
    }
    const All = () => {
        setProSelect([])
    }

    // hiện input nhập cân nặng
    const [selectWeight, setSelectWeight] = useState(false);
    const weightCancel = () => {
        setSelectWeight(false);
    };
    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-md-2">
                    <div className="box">
                        <div className="prev"><Link to={`/floor/floor_id=${floor_id}`}> <DoubleLeftOutlined /> Quay lại </Link></div>
                        <div className="hiuy">
                            <div className="cate">

                                <Menu style={{ fontSize: "1.1rem" }}>
                                    <Menu.Item key="00" onClick={() => All()}>
                                        Tất cả
                                    </Menu.Item>
                                    {categoris.map((item, index) => {
                                        return (
                                            <Menu.Item key={index} onClick={() => listCate(item._id)} >
                                                {item.name}
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="products">

                        <Row>
                            {(proSelect.length >= 1 ? proSelect : products).map(item_pro => {
                                return (
                                    <Col xs={12} sm={4} md={12} lg={8} xl={6} key={item_pro._id} onClick={() => selectProduct(item_pro._id)}>
                                        <div className="list_pro" >
                                            <div className="img"><img src={item_pro.photo} alt="" />
                                                <div className="name-price">
                                                    <div className="name">{item_pro.name}</div>
                                                    <div className="price">{item_pro.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </div>

                <SelectedProduct />
            </div>

            <Modal title="Cân nặng" visible={selectWeight} onCancel={weightCancel}>
                <Input placeholder='Nhập cân nặng' onChange={(e) => setValueWeight(e.target.value)} />
                <Button onClick={() => apply()} style={{ background: 'blue', color: "#fff", marginTop: 10 }}>Áp dụng</Button>
            </Modal>
        </div>
    )
}

export default Orders