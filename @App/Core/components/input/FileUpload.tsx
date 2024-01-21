import { DeleteOutlined, UploadOutlined } from "@ant-design/icons"
import { FormInstance, Image, Button, message, Spin, Upload, Form, Select } from "antd"
import React, { useState, useEffect } from "react"
import { uploadService } from "../../service/uploadService"


interface Component {
	form: FormInstance<any>
	maxItem: number
	initValue: string[]
	formName: string
	label: string
}

const FileUpLoad: React.FC<Component> = ({
	form,
	maxItem,
	initValue,
	formName, 
	label
	}) => {
		console.log("initValue", initValue)
		const { getFieldError } = form
		console.log("getFieldError", getFieldError)

		const [uploading, setUploading] = useState(false)
		const [deleting, setDeleting] = useState(false)
		const [fileList, setFileList] = useState<string[]>(initValue)

		useEffect(() => {
			form.setFieldValue(formName, fileList)
		}, [fileList, form, formName])

		useEffect(() => {
			const a = form.getFieldValue(formName)
			if( a === undefined){
				setFileList([])
			}
		}, [form.getFieldValue(formName), form, formName])



		const renderUploadingList = (fileList: string[]) => {
			return fileList?.map((file, index) => (
				<div 
					key={file+index} 
					className="flex flex-col items-center gap-2 p-2 bg-white rounded-md shadow-2xl"
				>
					<Image loading="lazy" height={160} src={file} alt="haha"/>
					<Button
						htmlType="button"
						loading={deleting}
						type="primary"
						danger
						icon={<DeleteOutlined/>}
						onClick={() => handleDelete(file)}
					>
						Delete
					</Button>
				</div>
			))
		}

		const handleDelete = async (fileName : string) => {
			setDeleting(true)
			try {
				await uploadService.deleteImage('product', fileName)
				setFileList(precFileList => precFileList.filter(item => item !== fileName))
				message.success("delete success")
			} catch (error: any) {
				message.error(error?.message)
			}

		}


		async function handleUpLoad (file: File) {
			setUploading(true)

			const formData = new FormData()
			formData.append('image', file)

			try {
				const result = await uploadService.uploadImage(formData, 'product')

				message.success("upload file success")

				setFileList(prevFileList => [...prevFileList, result?.data])
			} catch (error) {
				console.log("error", error)
				message?.error("Fail")
			}

			setUploading(false)
		}

		return(
			<div className="flex flex-col gap-1 bg-white">
				<label className="my-4">
					{label}(Tối đa {`${fileList.length}/${maxItem}`})
				</label>

				<div className="flex gap-4 flex-wrap w-full rounded-md bg-gray-100 p-4 max-h[448px] overflow-y-scroll">
					{fileList.length === 0 && <p>Chưa có ảnh nào</p>}
					{renderUploadingList(fileList)}

					{uploading && (
						<div className="flex w-[240px] h-[240px] rounded-md bg-white shadow-2xl items-center justify-center">
							<Spin/>
						</div>
					) }
				</div>

				<div className="flex flex-col">
						{
							fileList.length < maxItem ? (
								<Upload 
									beforeUpload={handleUpLoad}
									showUploadList={false}
								>
									<Button
										htmlType="button"
										className="w-[200px]"
										type="primary"
										icon={<UploadOutlined/>}
									>
										Upload
									</Button>
								</Upload>
							) : null
						}

						<Form.Item
							name={formName}
							rules={[
								{
									required:true,
									message: "Chưa có file nào được tải lên "
								}
							]}
						>
							<Select 
								value={fileList}
								mode="multiple"
								style={{display:"none"}}
							/>
						</Form.Item>
				</div>
			</div>
		)
}

export default FileUpLoad
