import { useRequest } from 'ahooks'

import { systemCategoryService } from '../../services/systemCategoryService'
import { AddAction, DeleteAction, EditAction, ViewAction} from '@/@App/Core/components/action'
import CategoryForm from './CategoryForm'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import UpdateFilterForCategory from './UpdateFilterForCategory'

import React , { useCallback, useEffect, useState } from 'react'


import { Button, Spin, Typography, message, Tree, Tooltip} from 'antd'
import { DownOutlined} from '@ant-design/icons'
import { TbCategoryPlus } from 'react-icons/tb'


interface Props {
	id: number
}

const { DirectoryTree } = Tree;

export default function CategoryDetail(props: any) {
	const { handleOpenDetailFilterModal } = useCorePageContext()
	const { id } = props

	const [formType, setFormType] = useState('')
	const [formData, setFormData] = useState<any>(null)
	const [selected, setSelected] = useState<any>(null)

	const [root, setRoot] = useState<any>(null)
	const [children, setChildren] = useState<any[]>([])

	const { loading: loadingGetDetail, run: getDetailCategory } = useRequest(
		systemCategoryService.getDetailAndSubCategory,
		{
			manual: true,
			onSuccess: data => {
				setRoot(data?.data?.root)
				setChildren(data?.data?.children)
				console.log("data33", data)

				const convertDataToTree = (array: any[]): any[] => {
					const result = array.map((item: any) => {
						console.log('item35', item?.children)

						return {
							title: item?.label,
							key: item.id,
							children: convertDataToTree(item?.children ?? []),
							originData: item,
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
					<div>
						<div className="flex items-center justify-between gap-2 p-2 bg-blue-50">
							<TbCategoryPlus className="text-blue-500" />
							<Typography.Text>{root?.label}</Typography.Text>
							<div className="flex gap-2">
								{
									root?.CategoryFilters ? 
									( 
										<ViewAction
										tooltipTitle={'Xem chi tiết bộ lọc'}
										action={() => handleOpenDetailFilterModal(root?.CategoryFilters?.filters ?? [])}
										/>
									) : null
								}

								<Tooltip placement='topLeft' title={"Cập nhập bộ lộc"}>
									<Button
										onClick={() => {
											setFormData(root)
											setSelected(root)
											setFormType('updateFilter')
										}}
										type='dashed'
										className='w-max'
									>
										<TbCategoryPlus className='text-green-500'/>
									</Button>
								</Tooltip>

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

						<DirectoryTree
							showLine
							switcherIcon={<DownOutlined />}
							treeData={children || []}
							defaultExpandedKeys={['0-0-0']}
							titleRender={(data: any) => {
								console.log('🚀 ~ file: CategoryDetail.tsx:144 ~ CategoryDetail ~ dataHientai:', data)
								return (
									<div className="flex items-center gap-2 p-2 rounded-md shadow-lg bg-blue-50 my-[4px]">
										<p className="font-500 text-[1rem] md:min-w-[300px]">{data?.title}</p>
											{
												data?.originData?.CategoryFilters ? (
													<ViewAction
														tooltipTitle={"Xem chi tiết bộ lọc"}
														action={() => {
															handleOpenDetailFilterModal(
																data?.originData?.CategoryFilters?.filters ?? []
															)
														}}
													/>
												) : null
											}

											<Tooltip placement='topLeft' title={'Cập nhập bộ lọc'}>
												<Button 
													onClick={() => {
														setFormType('updateFilter')
														setFormData(data?.originData)
														setSelected(data?.originData)
													}}
													type='dashed'
													className='w-max'
												>
													<TbCategoryPlus className='text-green-500'/>
												</Button>
											</Tooltip>
										<AddAction
											action={() => {
												setFormType('add')
												setFormData({ parentId: data?.originData?.id })
												setSelected(data?.originData)
											}}
										/>
										<EditAction
											action={() => {
												setFormType('edit')
												setFormData(data?.originData)
												setSelected(data?.originData)
											}}
										/>
										<DeleteAction action={() => handleDelete(data?.id)} />
									</div>
								)
							}}
						/>

					</div>
				)}
			</div>
			{['add', 'edit', 'updateFilter'].includes(formType) ? (
				<div className="w-full p-4 rounded-md md:w-1/3 bg-gray-50">
					<div className="flex items-center justify-between gap-2">
						<h3 className="text-blue-500 font-[1.2rem]">
							{formType === 'add'
								? `Thêm danh mục con cho: ${selected?.label}`
								: formType === 'edit'
								? `Chỉnh sửa danh mục: ${selected?.label}`
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
	type: 'add' | 'edit' | 'updateFilter'|''
	refreshData: () => void
}
export function FormDetailOne(props: FormDetailOneProps) {
	const { type, formData, refreshData } = props
	console.log("type228", type)

	if (type === 'add') {
		return <CategoryForm data={formData} actionAfterSubmit={refreshData} />
	}

	if (type === 'edit' && formData) {
		return <CategoryForm data={formData} actionAfterSubmit={refreshData} />
	}

	if ( type === 'updateFilter') {
		return <UpdateFilterForCategory data={formData} actionAfterSubmit={refreshData}/>
	}

	return null
}
