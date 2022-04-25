import React from 'react'
import { Collapse, Descriptions, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrder } from '../features/Order/Order';
import { getOrderDetail } from '../features/OrderDetail/OrderDetail';
import { getTable } from '../features/TableSlice/TableSlice';

const { Panel } = Collapse;


const ListOder = () => {
    const dispatch = useDispatch()
    const order = useSelector(data => data.order.value)
    const orderdetail = useSelector(data => data.orderdetail.value)
    const tables = useSelector(data => data.table.value)
    useEffect(() => {
        dispatch(getOrder())
        dispatch(getOrderDetail())
        dispatch(getTable())
    }, [])
    return (
        <>
            <Collapse accordion>
                {
                    order.map((item, index) => {
                        return (

                            <Panel header={`#${item._id}${" ----------- "}${item.createdAt}`} key={index}>
                                <div className="header-order" style={{ textAlign: "left" }}>
                                    <span>Tên khác hàng : {item.customer_name}</span>
                                    <br />
                                    {
                                        tables.map(table => table._id == item.id_table && <span>Tên bàn : {table.name}</span>)
                                    }
                                    <br />
                                    {
                                        item.sale && <>Chiếu khấu : {item.sale} %</>
                                    }
                                </div>
                                <br />
                                <Descriptions >
                                    {
                                        orderdetail.map(itemDetail => {
                                            if (itemDetail.bill == item.bill) {
                                                return (
                                                    <>

                                                        <Descriptions.Item label="Sản phẩm">{itemDetail.namePro} {itemDetail.weight && <>/ Cân nặng : {itemDetail.weight} KG</>}</Descriptions.Item>
                                                        <Descriptions.Item label="Gía tiền">{itemDetail.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Descriptions.Item>
                                                        <Descriptions.Item label="Số lượng">{itemDetail.quantity}</Descriptions.Item>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </Descriptions>
                                <br></br>
                                <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>Tổng : {item.sum_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
                            </Panel>
                        )
                    })
                }

            </Collapse>
        </>
    )
}

export default ListOder