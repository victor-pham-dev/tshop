import { CoreCard, CoreTreeSelectWithApi } from "@/@App/Core/components"
import { systemCategoryService } from "@/@App/Pages/System/services/systemCategoryService"
import { useMap, useRequest, useUpdateEffect } from "ahooks"
import { DatePicker, Form, FormInstance, Input, InputNumber, Select, Spin } from "antd"
import React, {memo, useMemo} from "react"


interface ProductCategoryAndPropertiesProps {
    form: FormInstance<any>
}

const ProductCategoryAndProperties: React.FC<ProductCategoryAndPropertiesProps> = (props) => {

    const {form} = props
    console.log('form15', form)
    const categoryId = Form.useWatch('categoryId', form)

    const {
        data: detailCategory,
        loading: loadingDetailCategory,
        run: getDetailCategory
    } = useRequest(systemCategoryService.find,
        {
            manual:true
        })

    useUpdateEffect(() => {
        if(categoryId){
            getDetailCategory(categoryId)
            form.setFieldValue('properties',{})
        }
    },[categoryId])

    const filters = useMemo(() => {
        if(detailCategory){
            return detailCategory?.data?.CategoryFilters?.filters
        }
        return []
    }, [JSON.stringify(detailCategory)])

    const renderPropertiesInput = () => {
        if(loadingDetailCategory){
            return(
                <div className="flex justify-center items-center h-[120px]">
                    <Spin/>
                </div>
            )
        }
        if(filters?.length === 0){
            return null
        }

        return filters?.map((item:any) => (
            <Form.Item
                label={item?.label}
                name={['properties', item?.label]}
                rules={[
                    {
                        required:true,
                        message:'Vui lòng nhập/Chọn giá trị'
                    }
                ]}
            >
                {
                    item?.valueType === 'SELECT' ? (
                        <Select
                            size="large"
                            placeholder="Chọn"
                            options={item?.option?.map((item:any) => ({...item, label:item?.value}))}
                        />
                    ) : item?.valueType === 'NUMBER' ? (
                        <InputNumber
                            size="large"
                            className="min-w=[240px]"
                            placeholder="Nhập giá trj"
                            formatter={value =>`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    ): item?.valueType === 'STRING' ?(
                        <Input
                            size="large"
                            placeholder="Vui lòng điền"
                        />
                    ) : (
                        <DatePicker size="large" placeholder="Chọn thời gian"/>
                    )
                }
            </Form.Item>
        ))
    }

    return(
        <>
            <CoreCard>
                <h3 className="text-blue-500">
                    Danh mục & thuộc tính cấu hình sản phẩm
                </h3>

                <Form.Item label='Chọn danh mục cho sản phẩm' name='categoryId'>
                    <CoreTreeSelectWithApi
                        size="large"
                        valueField="id"
                        titleField="label"
                        childrenField="children"
                        dataPath="data"
                        apiService={systemCategoryService.getAllWithChildren}
                        customRender={(option:any) => option?.label}
            />
                </Form.Item>
                {renderPropertiesInput()}
            </CoreCard>
        </>
    )
}


export default ProductCategoryAndProperties