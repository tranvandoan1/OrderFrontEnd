import "../css/Home.css"
import "../css/Group.css"
import { Link, NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTable } from '../features/TableSlice/TableSlice'
import { TeamOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd';
import React from 'react';
import { getSaveOrder } from "../features/saveorderSlice/saveOrderSlice"
import IconTable from '../images/Group.png'
const style = { padding: '10px 0', textAlign: "center", fontSize: "1.5rem", borderRadius: "40% 10% 40% 10%", cursor: 'pointer', color: "black" }

const ListTable = () => {
    const dispatch = useDispatch()
    const { name, floor_id } = useParams()
    const tables = useSelector(data => data.table.value)
    const saveorders = useSelector(data => data.saveorder.value)
    const tablesOfFloor = tables.filter(item => item.floor_id == floor_id)

    useEffect(() => {
        dispatch(getTable())
        dispatch(getSaveOrder())

    }, [])

    return (
        <div className="group_home">
            <Row >
                <>
                    {tablesOfFloor.map((item, index) =>

                        <Col key={index} className="gutter-row" style={{ padding: "10px" }} xs={12} sm={6} md={6} lg={4} xl={3}>
                            <NavLink to={`/floor/floor_id=${floor_id}/table_id=${item._id}/order`}>
                                <div style={style} className="box-table">
                                   <img src={IconTable} alt="" style={{width:'40%'}} />
                                    {
                                        saveorders.map((itemOrder, index) => (item._id == itemOrder.id_table && <div key={index} className="node" style={{ backgroundColor: "yellowgreen" }} ></div>))
                                    }
                                  <span style={{fontSize:"1.2rem"}}>{item.name}</span>  
                                </div>
                            </NavLink>

                        </Col>
                    )}
                    {/* <div className="list-add-table ">
                        <div className="table">
                            <div className="input-add">tên bàn : <input type="text" onChange={(e) => setNameTable(e.target.value)} value={nameTable} placeholder="Nhập tên bàn ..." /></div>
                            <button onClick={() => buttonAddTable()}>Thêm</button>
                        </div>
                    </div>
                    <Col className="gutter-row" style={{ padding: "10px",marginTop:"0px" }} span={2}>
                        <Button type="primary" onClick={showModal} style={{ width: 100, height: 80,borderRadius:"10%", textAlign: "center" }}>
                            <PlusCircleOutlined style={{ fontSize: "1.5rem" ,marginLeft:"8px"}} /> <br /><span>Thêm</span>
                        </Button>
                        <Modal title="Thêm bàn" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Input value={nameTable} onChange={(e) => setNameTable(e.target.value)} placeholder="Nhập tên bàn..." />
                            <br />
                            <br />
                            <Button type="primary" onClick={handleOk}>Thêm</Button>
                        </Modal>
                    </Col> */}
                </>
            </Row>

        </div>
    )
}

export default ListTable