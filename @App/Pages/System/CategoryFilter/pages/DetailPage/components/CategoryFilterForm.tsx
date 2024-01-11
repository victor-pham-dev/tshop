import React, {memo} from "react";
import { CoreCard } from "@/@App/Core/components";
import { SYSTEM_ROUTER } from "@/@App/Pages/System/configs/router";
import { CategoryFilterEntity } from "../../ListPage/components/TableListCategoryFilter";
import { systemDetailCategoryFilterService } from "@/@App/Pages/System/services/systemCategoryFilterService";


import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import { PlusOutlined, PropertySafetyFilled } from "@ant-design/icons";
import { NamePath } from "antd/es/form/interface";
import { FaTrash } from 'react-icons/fa'

interface CategoryFormProps{
    initData: CategoryFilterEntity
}

const CategoryFilterForm: React.FC<CategoryFormProps> = (props) => {
    const { initData } = props
    const router = useRouter()
    const { id } = router.query
    const [form] = Form.useForm()
    

    const handleSubmitCategoryFilterForm = async (values: any) => {
        try {
            await systemDetailCategoryFilterService.save(values)
            message.success(id === 'new' ? 'Tạo thành công' : ' Cập nhật thành công')
            router.push(SYSTEM_ROUTER.CATEGORY_FILTER)
        } catch (error:any) {
            message.error(error?.message)
        }
    }

    const currentFiltersValue = Form.useWatch('filters', form) ?? []

    return(
        <Form
            form={form}
            layout="vertical"
            className="w-full p-4 bg-gray-200"
            name="basic"
            onFinish={handleSubmitCategoryFilterForm}
            autoComplete="off"
            initialValues={{
                ...initData
            }}
        >

            <Form.Item name="id" hidden></Form.Item>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-s">
                    <CoreCard className="">
                        <Form.Item
                            label="Name Filter"
                            name="name"
                            rules={[{
                                required: true,
                                message: "Please enter filter name"
                            }]}
                        >
                            <Input size="large"/>        
                        </Form.Item>  
                        <Form.Item label="Mô tả" name="description">
                            <Input.TextArea placeholder="Nhập mô tả cho bộ lọc này"/>
                        </Form.Item>
                        <Button htmlType="submit" type="primary" className="w-full mt-3">
                            Xác nhận
                        </Button>
                    </CoreCard>

                    <CoreCard className="">
                        <p className="font-600 text-[1rem] my-4">Các thuộc tính của bộ lọc: </p>
                        <Form.List name="filters">
                            {(fields, {add, remove}) => (
                                <div className="flex flex-col gap-4 max-h-[560px] overflow-y-scroll">
                                    {
                                        fields.map(({key, name, ...restField}) => {
                                            const selectedValueType = currentFiltersValue[name ?? 0]?.valueType

                                            return(
                                                    <div key={key} className="flex items-center gap-4">
                                                        <CoreCard className="!bg-gray-200 w-4/5">
                                                            <Form.Item
                                                            {...restField}
                                                            label="Tên phân loại"
                                                            name={[name, 'label']}
                                                            rules={[{
                                                                required:true,
                                                                message:"Vui lòng điền tên phân loại"
                                                            }]}
                                                            >
                                                                <Input size="large" placeholder="Nhập tên phân loại"/>
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'valueType']}
                                                                label="Kiểu dữ liệu"
                                                                rules={[{ 
                                                                    required: true, 
                                                                    message: 'Vui lòng chọn kiểu dữ liệu'
                                                                    }]}
                                                                >
                                                                    <Select
                                                                    placeholder="Vui lòng chon"
                                                                    size="large"
                                                                    options={[
                                                                        {
                                                                            value:'STRING',
                                                                            label: 'Nhập chữ'
                                                                        },
                                                                        {
                                                                            value:'NUMBER',
                                                                            label: 'Nhập số'
                                                                        },
                                                                        {
                                                                            value:'DATETIME',
                                                                            label: 'Chọn/ nhập thời gian'
                                                                        },
                                                                        {
                                                                            value:'SELECT',
                                                                            label: 'Lựa chọn'
                                                                        },
                                                                    ]}
                                                                    >
                                                                    </Select>
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                valuePropName="checked"
                                                                name={[name, 'required']}
                                                            >
                                                                <Checkbox>
                                                                    Bắt buộc điền:
                                                                </Checkbox>
                                                            </Form.Item>
                                                            <DynamicOptionForSelect
                                                                valueType={selectedValueType}
                                                                name={[name, 'options']}
                                                            />
                                                        </CoreCard>
                                                        <div>
                                                            <Button onClick={() => remove(name)} danger type="primary">
                                                                <FaTrash/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                            )
                                        })
                                    }

                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add({
                                                label:'',
                                                valueType: 'STRING',
                                                required:true,
                                                options:[]
                                            })}        
                                            block
                                            icon={<PlusOutlined/>}
                                        >
                                            Thêm phân loại: 
                                        </Button>
                                    </Form.Item>
                                </div>
                            )}

                        </Form.List>
                    </CoreCard>
                </div>
        </Form>
    )
}
export default CategoryFilterForm


interface DynamicOptionForSelectProps{
    valueType: string
    name: NamePath
}

export const DynamicOptionForSelect: React.FC<DynamicOptionForSelectProps> = React.memo(props => {
    const { valueType, name } = props

	console.log('tesssscon')
	if (valueType !== 'SELECT') {
		return null
	}

	return (
		<Form.List name={name}>
			{(fields, { add, remove }) => (
				<CoreCard className="flex flex-col gap-4 ">
					{fields.map(({ key, name, ...restField }) => {
						return (
							<div key={key + 1} className="flex items-center gap-4">
								<Form.Item
									{...restField}
									label={`Lựa chọn ${key + 1}`}
									name={[name, 'value']}
									className="w-4/5"
									rules={[{ required: true, message: 'Vui lòng điền giá trị' }]}
								>
									<Input size="large" placeholder="Điền giá trị" />
								</Form.Item>

								<div>
									<Button onClick={() => remove(name)} danger type="primary">
										<FaTrash />
									</Button>
								</div>
							</div>
						)
					})}
					<Form.Item>
						<Button
							type="dashed"
							onClick={() =>
								add({
									value: ''
								})
							}
							block
							icon={<PlusOutlined />}
						>
							Thêm lựa chọn
						</Button>
					</Form.Item>
				</CoreCard>
			)}
		</Form.List>
	)
})