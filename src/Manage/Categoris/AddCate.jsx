import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import styles from '../../css/LayoutAdmin.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCategori } from '../../features/Categoris/CategoriSlice';
import { openNotificationWithIcon } from '../../Notification';
const AddCate = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const addCate = (values) => {
            dispatch(addCategori(values))
            openNotificationWithIcon('success','Thêm thành công ')
            navigate("/case-manager/categoris")
    };

   
    return (
        <div>
            <h5 className={styles.title}>Thêm danh mục</h5>
            <Form
                name="basic"
               
                initialValues={{
                    remember: true,
                }}
                onFinish={addCate}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên danh mục"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Chưa nhập tên danh mục!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                >
                    <Button type="primary" htmlType="submit" style={{marginRight:10}}>
                        <Link to='/case-manager/categoris'>Quay lại</Link>
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                    
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddCate