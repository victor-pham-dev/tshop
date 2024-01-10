import { useRequest } from 'ahooks'
import { systemCategoryService } from '../../services/systemCategoryService'
import { Children, useCallback, useEffect, useState } from 'react'
import { Button, Spin, Tree, Typography, message } from 'antd'
import { TbCategoryPlus } from 'react-icons/tb'
import { AddAction, DeleteAction, EditAction } from '@/@App/Core/components/action'
import CategoryForm from './CategoryForm'
import { title } from 'process'
import { DownOutlined } from '@ant-design/icons'
interface Props {
	id: number
}
export default function CategoryDetail(props: any) {
	const { id } = props

	const [formType, setFormType] = useState('')
	const [formData, setFormData] = useState<any>(null)
	const [selected, setSelected] = useState<any>(null)

	const [root, setRoot] = useState<any>(null)
	const [children, setChildren] = useState<any[]>([])
   console.log('children:', children) 
	const { loading: loadingGetDetail, run: getDetailCategory } = useRequest(
		systemCategoryService.getDetailAndSubCategory,
		{
			manual: true,
			onSuccess: data => {
				setRoot(data?.data?.root)
				// setChildren(data?.data?.children)
				console.log('abcbc' ,  data?.data?.children)
				const convertDataToTree = (array: any[]) : any[] => {
					const result = array.map ((item:any) => {
						return {
						title: item?.label , 
						key: item.id ,  
						origindata: item,
						children:convertDataToTree(item?.children ?? [])
						}
					})
					return result
				}
				const convertedData = convertDataToTree(data?.data?.children) 
				setChildren(convertedData)
			},
			

			onError: error => {
				message.error(error?.message)
			}
		}
	)

	const handleDelete = async (id: string) => {
		try {
			const result = await systemCategoryService.remove(id)
			message.success(result?.message)
			getDetailCategory(id)
		} catch (error: any) {
			message.error(error?.message)
		}
	}

	useEffect(() => {
		getDetailCategory(id)
	}, [])

	const refreshData = useCallback(() => {
		getDetailCategory(id)
		setFormType('')
		setFormData(null)
	}, [])
	return ( 
	
		<div className="flex gap-2">
				
			<div className="relative w-2/3">
				
				{loadingGetDetail ? (
					<div className="absolute w-full h-full z-[2] flex items-center justify-center">
						<Spin />
					</div>
				) : (
					<div className="flex items-center justify-between gap-2 p-2 bg-blue-50">
						<TbCategoryPlus className="text-blue-500" />
						<Typography.Text>{root?.label}</Typography.Text>
						<div className="flex gap-2">
							<AddAction
								action={() => {
									setFormType('add')
									setFormData({ parentId: root?.id })
									setSelected(root)
								}}
							/>
							<EditAction
								action={() => {
									setFormType('edit')
									setFormData(root)
									setSelected(root)
								}}
							/>
							<DeleteAction action={() => handleDelete(root?.id)} />
							
						</div>
						
					</div> 
					
				)}
				<Tree
	            showLine
		        switcherIcon={<DownOutlined />}
				treeData={children || []}
		        titleRender={(data:any) =>{
			    return (
				<div className='flex items-center gap-2 p-2 rounded-md shadow-lg bg-blue-50 my-[4px]'>
				     <p className='font-500 text-[1rem] md:min-w-[300px]'>{data?.title}</p>
					 <AddAction
								action={() => {
									setFormType('add')
									setFormData({ parentId: data?.origindata?.id })
									setSelected(data?.origindata)
								}}
							/>
							<EditAction
								action={() => {
									setFormType('edit')
									setFormData(data?.origindata)
									setSelected(data?.origindata)
								}}
							/>
							<DeleteAction action={()=> handleDelete(data?.origindata.id)} />
					 </div>
				)
		        }}
	            />
			</div>
			
			{formType === 'add' || formType === 'edit' ? (
				<div className="w-full p-4 rounded-md md:w-1/3 bg-gray-50">
					<div className="flex items-center justify-between gap-2">
						<h3 className="text-blue-500 font-[1.2rem]">
							{formType === 'add'
								? `Thêm danh mục con cho: ${selected?.label}`
								: `Chỉnh sửa danh mục: ${selected?.label}`}
						</h3>
						<Button danger onClick={() => setFormType('')}>
							Huỷ
						</Button>
					</div>

					<FormDetailOne formData={formData} type={formType} refreshData={refreshData} />
				</div>
			) : null}
			
		</div>
		
	)
}

interface FormDetailOneProps {
	formData?: any
	type: 'add' | 'edit'
	refreshData: () => void
}
export function FormDetailOne(props: FormDetailOneProps) {
	const { type, formData, refreshData } = props

	if (type === 'add') {
		return <CategoryForm data={formData} actionAfterSubmit={refreshData} />
	}

	if (type === 'edit' && formData) {
		return <CategoryForm data={formData} actionAfterSubmit={refreshData} />
	}

	return null
	
}
