import { useRequest } from "ahooks"
import { Button, Form, Switch, message } from "antd"


import React from "react"
import { systemCategoryService } from "../../services/systemCategoryService"
import { CoreSelectWithApi } from "@/@App/Core/components"

interface Component {
    actionAfterSubmit: () => void
    data: any
}

const UpdateFilterForCategory: React.FC<Component> = (props) => {

    const {actionAfterSubmit, data } = props
    console.log(props?.data)

    const [form] = Form.useForm()

    const {
        data: dataSubmit,
        loading: loadingSubmit,
        run: handleSubmit,
    } = useRequest(systemCategoryService.updateFilterForCategory, {
        manual:true,
        onSuccess: (data:any) => {
            message.success(data?.message)
            actionAfterSubmit()
        },

        onError: (error:any) => {
            message.error(error?.message)
        }
    })

    return(
        <>
            <Form
                className="p-4 my-4 bg-white rounded-lg shadow-xl"
                form={form}
                initialValues={{
                    categoryId: data?.id,
                    categoryFilterId: data?.categoryFilterId,
                    applyForChildren: true
                }}
                labelCol={{span:24}}
                wrapperCol={{span:24}}
                onFinish={handleSubmit}
            >
                <Form.Item name="categoryId" hidden></Form.Item>
                <Form.Item
                    label="Filter"
                    name="categoryFilterId"
                    required
                    rules={[{
                        required:true,
                        message: "Vui long chon"
                    }]}
                >
                    <CoreSelectWithApi
                        size='large'
                        apiService={systemCategoryService.search}
                        customRender={(option:any) => option?.name}
                    />
                </Form.Item>
                <Form.Item 
                    label="Ap dung cho tat ca cac muc con"
                    name="applyForChildren"
                    valuePropName="checked"
                >
                    <Switch/>
                </Form.Item>
                <Form.Item wrapperCol={{span:24}}>
                    <Button
                        loading={loadingSubmit}
                        block
                        type="primary"
                        htmlType="submit"
                    >
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}

export default UpdateFilterForCategory