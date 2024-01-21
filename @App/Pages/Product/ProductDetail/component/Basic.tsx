import { CoreCard } from "@/@App/Core/components"
import React from "react"
import { productCategoryOptions, productStatusOptions } from "@/const/app-const"

import { Form, Input, InputNumber, Select } from "antd"
import TextArea from "antd/es/input/TextArea"


const BasicInfo = () => {


    return(
        <>
            <CoreCard>
                <p 
                    style={{ width: '100%'}}
                    className="text-[16px] py-4 font-600 text-blue-500"
                >
                    Thông tin cơ bản
                </p>

                <div className="p-4 bg-gray-100">
                    <Form.Item className="hidden" name='id'></Form.Item>
                    <Form.Item
                        name='name'
                        label={<label className="textTheme">Tên sản phẩm</label>}
                        rules={[
                            {
                                required:true,
                                message:'Vui lòng điền'
                            }
                        ]}
                    >
                        <Input placeholder="Tên sản phẩm"/>
                    </Form.Item>
                    
                    <Form.Item
                        name='status'
                        label={<label className="textTheme">Tình trạng sản phẩm</label>}
                        rules={[
                            {
                                required:true,
                                message:'Vui lòng chọn tình trạng'
                            }
                        ]}
                    >
                        <Select placeholder='Tình trạng sản phẩm' allowClear options={productCategoryOptions}/>
                    </Form.Item>
                    
                    <Form.Item
                        name='salePrice'
                        label='Giá sản phẩm'
                        rules={[
                            {
                                required:true,
                                message:'Giá đã giảm'
                            }
                        ]}
                    >
                        <InputNumber 
                            style={{ width:'100%'}}
                            placeholder="Giá sau giảm"
                            formatter={value => `${value}.replace(/\B(?=(\d{3})+(?!\d))/g, ',')`}
                        />
                    </Form.Item>

                    <Form.Item
                        name='seo'
                        label='Nội dung Seo'
                        rules={[
                            {
                                required:true,
                                message:'Vui lòng điền'
                            },
                            {
                                max:120,
                                message:"Tối đa 120 ký tự"
                            }
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>
                    <Form.Item
                        name='keyword'
                        label="Từ khoá SEO"
                        rules={[
                            {
                                required:true,
                                message:'Vui lòng điền'
                            },
                            {
                                max:120,
                                message:'Tối đa 120 ký tự'
                            }
                        ]}
                    >
                        <TextArea placeholder="Từ khoá SEO, cách nhau bởi dấu phẩy"/>
                    </Form.Item>
                </div>
            </CoreCard>
        </>
    )

}

export default BasicInfo