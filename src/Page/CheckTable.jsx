import React, { useEffect, useState } from 'react'
const { Option } = Select;
import { Button, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTable } from '../features/TableSlice/TableSlice';
import { deleteSaveOrders, getSaveOrder, uploadSaveOrders } from '../features/saveorderSlice/saveOrderSlice';
import { getFloor } from '../features/FloorSlice/FloorSlice';

const CheckTable = () => {
    const dispatch = useDispatch()
    const floors = useSelector(data => data.floor.value)
    const tables = useSelector(data => data.table.value)
    const saveorders = useSelector(data => data.saveorder.value)
    const [idFloor, setIdFloor] = useState()
    const [idTable, setIdTable] = useState()
    useEffect(() => {
        dispatch(getTable())
        dispatch(getSaveOrder())
        dispatch(getFloor())
    }, [])

    const [cancelTableStatus, setCancelTableStatus] = useState(false);

    const showCancel = () => {
        setIdTable(), setIdTable()

        setCancelTableStatus(true);
    };
    const handleCancel = () => {
        setIdTable(), setIdTable()
        setCancelTableStatus(false);
    };
    const cancelTable = () => {
        // if (confirm('Bạn có muốn hủy bàn này không ?')) {
        setIdTable()
        setIdTable()
        setCancelTableStatus(false);

        const deleteSaveOrder = saveorders.filter(item => item.id_table == idTable)
        dispatch(deleteSaveOrders(deleteSaveOrder))
        console.log(deleteSaveOrder)
        let newData = []
            saveorders.filter(item => {
                deleteSaveOrder.map(itemData => {
                if (item._id !== itemData._id) {
                    console.log(itemData._id)
                    // newData.push(item)
                }
            })
        })
        console.log(newData)
        console.log(saveorders)
        // alert("Hủy thành thành công")
        // }

    }

    // chuyển bàn
    const [idMoveFloor, setIdMoveFloor] = useState()
    const [idMoveTable, setIdMoveTable] = useState()
    const [moveTable, setMoveTable] = useState(false);

    const showMoveTable = () => {
        setIdTable()
        setIdTable()
        setIdMoveFloor()
        setIdMoveTable()
        setMoveTable(true);
    };
    const handleMoveTable = () => {
        setIdTable()
        setIdTable()
        setIdMoveFloor()
        setIdMoveTable()
        setMoveTable(false);
    };
    const onclickMoveTable = () => {

        if (confirm('Bạn có muốn chuyển qua bàn này không ?')) {
            const newSaveOrder = saveorders.filter(item => item.floor_id == idFloor && item.id_table == idTable)
            console.log(newSaveOrder)
            dispatch(uploadSaveOrders(
                {
                    saveorders: newSaveOrder,
                    selectId: { floor_id: idMoveFloor, id_table: idMoveTable }
                }))
            setIdTable()
            setIdTable()
            setIdMoveFloor()
            setIdMoveTable()
            setMoveTable(false);
        }
    }

    return (
        <div>
            <Button type='primary' style={{ marginRight: 10 }} onClick={() => showMoveTable()}>Chuyển bàn</Button>
            <Button type='primary' style={{ marginRight: 10, background: "red", border: 0 }} onClick={showCancel}>Hủy bàn</Button>

            <Modal title="Hủy bàn" visible={cancelTableStatus} onCancel={handleCancel}>
                <Select style={{ width: '100%' }} placeholder="Chọn tầng" onChange={(id) => (setIdTable(), setIdTable(), setIdFloor(id))}>
                    {
                        floors.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                    }
                </Select>

                {
                    idFloor !== undefined &&
                    <Select style={{ width: '100%', marginTop: 10 }} placeholder="Chọn bàn" onChange={(id) =>
                        (setIdTable(), setIdTable(), setIdTable(id))}>
                        {
                            tables.map(item => item.floor_id == idFloor &&
                                <Option value={item._id} key={item._id}>{item.name}
                                    {
                                        saveorders.map((itemOrder, index) => (item._id == itemOrder.id_table && <div key={index} className="node" style={{ backgroundColor: "yellowgreen", top: "10px" }} ></div>))

                                    }
                                </Option>
                            )
                        }
                    </Select>
                }

                {
                    (idFloor && idTable) && <Button type='primary' style={{ marginTop: 10, background: "red", border: 0 }} onClick={() => cancelTable()}>Hủy bàn</Button>
                }


            </Modal>

            <Modal title="Chuyển bàn" visible={moveTable} style={{ width: "70%" }} onCancel={handleMoveTable}>
                <h5 style={{ fontSize: ".9rem" }}>Chuyển từ</h5>
                <Select style={{ width: '100%' }} placeholder="Chọn tầng" onChange={(id) => setIdFloor(id)}>
                    {
                        floors.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                    }
                </Select>

                <Select style={{ width: '100%', marginTop: 10 }} placeholder="Chọn bàn" onChange={(id) =>
                    setIdTable(id)}>
                    {
                        tables.map(item => item.floor_id == idFloor &&
                            <Option value={item._id} key={item._id}>{item.name}
                                {
                                    saveorders.map((itemOrder, index) => (item._id == itemOrder.id_table && <div key={index} className="node" style={{ backgroundColor: "yellowgreen", top: "10px" }} ></div>))

                                }
                            </Option>
                        )
                    }
                </Select>

                <h5 style={{ fontSize: ".9rem", margin: "10px 0" }}>Sang</h5>


                <Select style={{ width: '100%' }} placeholder="Chọn tầng" onChange={(id) => setIdMoveFloor(id)}>
                    {
                        floors.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                    }
                </Select>


                <Select style={{ width: '100%', marginTop: 10 }} placeholder="Chọn bàn" onChange={(id) =>
                    setIdMoveTable(id)}>
                    {
                        tables.map(item => item.floor_id == idMoveFloor &&
                            <Option value={item._id} key={item._id}>{item.name}
                                {
                                    saveorders.map((itemOrder, index) => (item._id == itemOrder.id_table && <div key={index} className="node" style={{ backgroundColor: "yellowgreen", top: "10px" }} ></div>))

                                }
                            </Option>
                        )
                    }
                </Select>

                <Button type='primary' style={{ marginTop: 10, border: 0 }} onClick={() => onclickMoveTable()}>Chuyển bàn</Button>

            </Modal>

            {/* <Select style={{ width: 120 }}>
                <Option value="1">Tầng 1</Option>
                <Option value="2">Tầng 2</Option>
            </Select>

            <Select style={{ width: 120 }} >
                <Option value="huy1">Hủy bàn</Option>
                <Option value="doi1">Đổi bàn</Option>
            </Select> */}
        </div>
    )
}

export default CheckTable