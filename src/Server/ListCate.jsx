import React from 'react'
import { Table, Tag, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import 'antd/dist/antd.css'
import { useEffect } from 'react';
import { getCategori } from '../features/Categoris/CategoriSlice';
import {DeleteOutlined} from '@ant-design/icons'
const ListCate = () => {
    const categoris = useSelector(data => data.categori.value)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCategori())
    },[])
    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Thao tác',
            key: '_id',
            render: (text, record) => (
                <Space size="middle">
                    <a><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];
    return (
        <Table columns={columns} style={{textAlign:'center'}} dataSource={categoris} />
    )
}

export default ListCate