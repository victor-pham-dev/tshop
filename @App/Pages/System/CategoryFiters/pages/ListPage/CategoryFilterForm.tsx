import { Form, Input, Switch, Button, message } from 'antd'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { useRequest, useUpdateEffect } from 'ahooks'
import {FormControl,InputLabel,Select,MenuItem} from '@mui/material';
import { useCallback } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const CategoryForm = (props: any) => {
	const { data } = props


	return (
		<Form
	
		name="newPost"
		labelCol={{ span: 24 }}
		wrapperCol={{ span: 24 }}
		
		autoComplete="off"
		initialValues={{
			id: data?.id ?? null,
			label: data?.label ?? '',
			alias: data?.alias ?? '',
			icon: data?.icon ?? '',
			description: data?.description ?? '',
			active: data?.active ?? true,
			parentId: data?.parentId ?? 0
		}}
	>
		<Form.Item name="id" className="hidden"></Form.Item>
		<Form.Item name="parentId" className="hidden"></Form.Item>
		<Form.Item
			name="label"
			label={<label className="textTheme">Tên Bộ Lọc</label>}
			rules={[
				{
					required: true,
					message: 'Vui lòng điền!'
				}
			]}
		>
			<Input />
		</Form.Item>

		
		<Form.Item name="description" label={<label className="textTheme">Mô tả</label>}>
			<Input.TextArea />
		</Form.Item> 

	   <Form.List
        name="names"
       
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
              
                label={index === 0 ? 'Filters' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="label" style={{ width: '60%' }} />
				  <Input placeholder="valueType" style={{ width: '60%', marginTop:'10px'  }} />
				  <FormControl style={{ width: '60%' , marginTop:'10px' }}>
                  <InputLabel id="demo-simple-select-label">options</InputLabel>
                   <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
               
                    label="Age"
               
                    >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                   </Select>
                   </FormControl>
			       
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button" 
                    onClick={() => remove(field.name)} 
					style={{marginLeft: '5px'}}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
      
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

		<Form.Item wrapperCol={{ span: 24 }}>
			<Button  block type="primary" htmlType="submit">
				Xác nhận
			</Button>
		</Form.Item>
	</Form>
		
	)
}

export default CategoryForm
