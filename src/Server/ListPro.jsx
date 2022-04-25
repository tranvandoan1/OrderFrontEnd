import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProduct, getProduct, uploadProduct } from '../features/ProductsSlice/ProductSlice'
import { getCategori } from '../features/Categoris/CategoriSlice'
import 'antd/dist/antd.css'
import { Table, Space, Button, Modal, Form, Input, Select } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import '../css/Home.css'
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const { Option } = Select;
const ListPro = () => {
    const products = useSelector(data => data.product.value)
    const categoris = useSelector(data => data.categori.value)
    const [upProduct, setUpProduct] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct())
        dispatch(getCategori())
    }, [])
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Ảnh ',
            dataIndex: 'photo',
            render: (photo) => <img src={photo} style={{ width: "80px" }} alt="" />,
            key: 'phoro',
        },
        {
            title: 'Giá tiền ',
            dataIndex: 'price',
            render: (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            key: 'phoro',
        },

        {
            title: 'Thao tác',
            dataIndex: '_id',
            key: '_id',
            render: (_id, product) => (
                <Space size="middle">
                    <EditOutlined style={{ cursor: 'pointer' }} onClick={() => editProduct(product)} />
                    <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => removeProduct(_id)} />
                </Space>
            ),
        },
    ];
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const photo = document.querySelector("#photo").files[0]
        const imageRef = ref(storage, "images")
        console.log(photo)
        console.log(imageRef)
        uploadBytes(imageRef, photo).then(() => {
            getDownloadURL(imageRef).then((url) => {
                const product = {
                    cate_id: data.cate_id,
                    photo: url,
                    name: data.name,
                    price: data.price
                }
                setIsModalVisible(false);
                dispatch(addProduct(product))
                alert("Thêm thành công")
            })
        })

    };

    const editProduct = (product) => {
        setIsModalVisible(true);
        setUpProduct(product)
    }
    const onSubmitEdit = (data) => {
        const photo = document.querySelector("#photo").files[0]
        if (photo) {
            const imageRef = ref(storage, "images")
            uploadBytes(imageRef, photo).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    const product = {
                        cate_id: data.cate_id,
                        photo: url,
                        name: data.name,
                        price: data.price
                    }
                    setIsModalVisible(false);
                    dispatch(uploadProduct([upProduct._id,product]))
                    alert("Sửa thành công")
                    console.log(product)

                })
            })
        } else {
            const imageRef = ref(storage, "images")
            uploadBytes(imageRef, photo).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    const product = {
                        cate_id: data.cate_id,
                        photo: upProduct.photo,
                        name: data.name,
                        price: data.price
                    }
                    setIsModalVisible(false);
                    dispatch(uploadProduct([upProduct._id,product]))
                    alert("Sửa thành công")
                })
            })
        }
    };
    const removeProduct = (id) => {
        if (confirm("Bạn có muốn xóa không ?")) {
            dispatch(deleteProduct(id))
        }
    }
    return (
        <>
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Sản phẩm</h3>
                <>
                    <Button type="primary" onClick={showModal}>
                        Thêm sản phẩm
                    </Button>
                    <Modal title="Thêm sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            Tên sản phẩm : <input {...register('name')} className="input" style={{ width: "350px" }} /> <br /><br />

                            Giá sản phẩm : <input {...register('price', { required: true })} className="input" style={{ width: "350px" }} /><br /><br />

                            Ảnh sản phẩm : <input type="file" name="" id="photo" /><br /><br />

                            Danh mục  :  <select style={{ width: "350px", height: "30px", marginLeft: '20px' }} {...register('cate_id', { required: true })}>
                                {
                                    categoris.map(item => <option value={item._id}>{item.name}</option>)
                                }

                            </select><br /><br />
                            <input style={{ marginTop: "30px", background: "blue", border: "0", color: "#fff", padding: "5px 15px" }} type="submit" />
                        </form>
                    </Modal>
                    {
                        Object.keys(upProduct).length >= 1 &&
                        <Modal title="Sửa sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <form onSubmit={handleSubmit(onSubmitEdit)}>
                                Tên sản phẩm : <input {...register('name', upProduct.name)} placeholder={upProduct.name} className="input" style={{ width: "350px" }} /> <br /><br />

                                Giá sản phẩm : <input {...register('price', { required: true }, upProduct.price)} className="input" placeholder={upProduct.price} style={{ width: "350px" }} /><br /><br />

                                Ảnh sản phẩm : <input type="file" name="" id="photo" /><br /><br />

                                Danh mục  :  <select style={{ width: "350px", height: "30px", marginLeft: '20px' }} {...register('cate_id', { required: true }, upProduct.cate_id)}>
                                    {
                                        categoris.map(item => <option value={item._id}>{item.name}</option>)
                                    }

                                </select><br /><br />
                                <input style={{ marginTop: "30px", background: "blue", border: "0", color: "#fff", padding: "5px 15px" }} type="submit" />
                            </form>
                        </Modal>
                    }

                </>
            </div>
            <Table columns={columns} style={{ textAlign: 'center' }} dataSource={products} />
        </>

    )
}

export default ListPro