import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Input, Button, Result, Modal, Row, Col, notification } from 'antd';
import { deleteSaveOrder, getSaveOrder, removeSaveorder, uploadSaveOrder } from '../features/saveorderSlice/saveOrderSlice';
import { getProduct } from '../features/ProductsSlice/ProductSlice';
import { getCategori } from '../features/Categoris/CategoriSlice';
import OrderAPI from '../API/Order';
import OrderDetailAPI from '../API/Orderdetail';
import { remove } from '../API/TableAPI';

const SelectedProduct = () => {
    const { table_id } = useParams()
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const saveorders = useSelector(data => data.saveorder.value)
    const saveOrders = saveorders.filter(item => item.id_table == table_id)

    const [value, setValue] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sumPrice, setSumPrice] = useState(0)
    const [customerName, setCustomerName] = useState('')

    // call dữ liệu
    useEffect(() => {
        dispatch(getSaveOrder())
        dispatch(getProduct())
        dispatch(getCategori())
    }, [])

    // tính tổng tiền
    const prices = saveOrders.map((item) => {
        if (item.weight) {
            return Math.ceil(+item.price * item.weight * +item.amount);
        } else {
            return Math.ceil(+item.price * +item.amount);
        }
    })
    let sum = 0;
    for (var i = 0; i < prices.length; i++) {
        sum += +prices[i]
    }



    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // thanh toán thành cộng về trang chính
    const [success, setSuccess] = useState(false);
    const Oke = () => {
        setSuccess(false);
        navigate('/order')
    };

    // tăng số lượng
    const increasingSaveOrder = (id_saveOrder) => {
        const findSaveOrder = saveorders.find(item => item._id == id_saveOrder)
        if (findSaveOrder) {
            const upSaveOrder = {
                ...findSaveOrder,
                "amount": +findSaveOrder.amount + +1
            }
            dispatch(uploadSaveOrder(upSaveOrder))
        }
    }

    // giảm số lượng
    const reduceSaveOrder = (id_saveOrder) => {
        const findSaveOrder = saveorders.find(item => item._id == id_saveOrder)
        if (findSaveOrder) {
            if (findSaveOrder.amount <= 1) {
                dispatch(deleteSaveOrder(findSaveOrder._id))
                dispatch(removeSaveorder(saveorders.filter(item => item._id !== findSaveOrder._id)))//bắn lên store 1 mảng mới đã xóa thằng đucợ chọn
            } else {
                const upSaveOrder = {
                    ...findSaveOrder,
                    "amount": +findSaveOrder.amount - +1
                }
                dispatch(uploadSaveOrder(upSaveOrder))
            }

        }
    }

    // thêm sp vào giỏ
    const comfirm = () => {
        const newIdOder = Math.random();
        const newOder = {
            bill: newIdOder,
            customer_name: customerName,
            id_table: id,
            sale: Number(`${value}`),
            sum_price: Number(`${sumPrice == 0 ? sum : sumPrice}`),
        };
        OrderAPI.add(newOder);

        if (saveorders.weight) {
            saveorders.forEach((item) => {
                if (item.id_table == id) {
                    const newOderDetail = {
                        bill: newOder.bill,
                        namePro: item.name,
                        price: item.price,
                        quantity: item.amount,
                    };
                    OrderDetailAPI.add({ ...newOderDetail });
                }
            });
        } else {
            saveorders.forEach((item) => {
                if (item.id_table == id) {
                    const newOderDetail = {
                        bill: newOder.bill,
                        namePro: item.name,
                        price: item.price,
                        quantity: item.amount,
                        weight: item.weight,
                    };
                    OrderDetailAPI.add({ ...newOderDetail });
                }
            });
        }

        // xóa
        saveorders.map((item) => {
            if (item.id_table == id) {
                remove(item._id);
            }
        });
        setSuccess(true);
        setIsModalVisible(false);

    }

    // áp mã
    const applySale = () => {
        if (value > 0) {
            const sumPriceSale = Math.ceil(sum * ((100 - value) / 100))
            setSumPrice(sumPriceSale)
        } else {
            openNotificationWithIcon('warning', 'Bạn chưa nhập mã !')
        }
    }
    // hủy mã
    const cancel = () => {
        setSumPrice(sum)
        setValue(0)
    }

    // Thông báo
    const openNotificationWithIcon = (type, content) => {
        notification[type]({
            message: `${content}`,
        });
    }
    return (
        <div className="col-md-3">
            <div className="order">
                <div className="order_pro">Sản phẩm đã chọn</div>
                <div className="box-order">
                    {saveOrders.map((item, index) => {
                        return (
                            <Row key={index} className='row-order'>
                                <Col xs={12} sm={4} md={12} lg={3} xl={3}>
                                    <span className="stt">{index + 1}</span>
                                </Col>
                                <Col xs={12} sm={4} md={12} lg={13} xl={13}>
                                    <span className="name_ode">{item.name}</span>
                                    <span>{item.weight && item.weight+'kg'}</span>
                                </Col>
                                <Col xs={12} sm={4} md={12} lg={8} xl={8}>
                                    <span className="quantity buttons_added">
                                        <input type="button" value='-' onClick={() => reduceSaveOrder(item._id)} className="minus button is-form" />
                                        <input type="number" className="input-text qty text" value={item.amount} min="1" max="9999" name="quantity" />
                                        <input type="button" value="+" onClick={() => increasingSaveOrder(item._id)} className="plus button is-form" />
                                    </span>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
                <div className="discount">
                    <div className="inpkk ">chiết khấu :

                        <Input style={{ width: 40 }} placeholder='......' value={value > 1 ? value : ""} onChange={(e) => setValue(e.target.value)} />

                        <Button style={{ textAlign: "right" }} onClick={() => applySale()} type="primary">Áp dụng</Button>

                        {value > 0 && <Button style={{ textAlign: "right", background: "red", border: "0", marginLeft: 10 }} onClick={() => cancel()} type="primary">Hủy</Button>
                        }
                    </div>
                    <div className="display_ap">{value > 0 && `Giảm giá đã chọn: ${value}%`}</div>

                    <div className="payy" >
                        <div className="sum">Tổng Tiền : <span className="sum_price">
                            {(sumPrice == 0 ? sum : sumPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</span>
                        </div>
                        <Button className="pay" style={{ background: "blue", width: "100%", height: "100%", fontSize: "1.3rem" }} type="primary" onClick={showModal}>
                            Thanh toán
                        </Button>
                    </div>

                    {/* <!-- xác nhận thanh toán--> */}
                    <Modal title="Xác nhận thanh toán" width={"80%"} visible={isModalVisible} onCancel={handleCancel}>
                        <div className="row">
                            <div className="col-4">
                                <div className="jidrr">
                                    <div className="buyer_information">Thông tin người mua</div>
                                    <div className="user_name">Khách hàng : <Input id="user" placeholder="Nhập tên khách hàng..." onChange={(e) => setCustomerName(e.target.value)} /></div>
                                    <br />
                                    <Button type="primary" onClick={() => comfirm()}>Xác nhận</Button>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="tablee_xn">
                                    <div className="information">sản phẩm đã thêm</div>
                                    <table className="table table-bordered pl-3">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên món ăn</th>
                                                <th>Số Lượng</th>
                                                <th>Đơn vị(kg)</th>
                                                <th>đơn giá</th>
                                                <th>thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {saveOrders.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td className="text-center">{item.amount
                                                        }</td>
                                                        <td>{item.weight ? item.weight : "X"}</td>
                                                        <td className="text-center">{item.price
                                                            .toString()
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )}</td>
                                                        <td className="text-center">
                                                            {(item.weight ? (+item.price * +item.weight * +item.amount) : (+item.price * +item.amount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td colSpan="4" className="ck">Chiết khấu</td>
                                                <td colSpan="2" className="text-center ckk">{value > 1 ? `${value}%` : "0%"}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="text-center sumtt">tổng thanh toán</td>
                                                <td colSpan="2" className="text-right summ">{(sumPrice == 0 ? sum : sumPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </Modal>

                    {/* <!--// thah toán--> */}

                    <Modal visible={success} onBack={Oke} >
                        <Result
                            status="success"
                            title="Thanh toán thành công"
                            extra={[
                                <Link to="/order">Quay lại</Link>,
                            ]}
                        />
                    </Modal>
                </div>

            </div>
        </div>
    )
}

export default SelectedProduct