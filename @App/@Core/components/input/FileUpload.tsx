import React, { useEffect, useMemo, useState } from 'react'
import { List, Button, Upload, message, FormInstance, Form, Row, Col, Select, Spin, Image } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import { removeSpecial } from '@/ultis/dataConvert'

import { supabase } from '@/services/supabase'

interface Props {
	form: FormInstance<any>
	maxItem: number
	initValue: string[]
	formName: string
	label: string
}
const FileUpload: React.FC<Props> = ({ form, maxItem, initValue, label, formName }) => {
	console.log('🚀 ~ file: FileUpload.tsx:17 ~ initValue:', initValue)
	const { getFieldError } = form
	// const isError
	const [uploading, setUploading] = useState(false)
	const [deleting, setDeleting] = useState(false)
	const [fileList, setFileList] = useState<string[]>(() => {
		const init: string[] = initValue?.map(item => {
			const splitStr = item.split(
				'https://esvelufzuzhhmsqjiior.supabase.co/storage/v1/object/public/file/public/'
			)
			return splitStr[1]
		})
		return init
	})

	useEffect(() => {
		let arr: undefined | string[] = undefined
		if (fileList.length > 0) {
			arr = fileList.map(
				item => `https://esvelufzuzhhmsqjiior.supabase.co/storage/v1/object/public/file/public/${item}`
			)
		}
		form.setFieldValue(formName, arr)
	}, [fileList, form, formName])

	useEffect(() => {
		const a = form.getFieldValue(formName)
		if (a === undefined) {
			setFileList([])
		}
	}, [form.getFieldValue(formName), form, formName])

	async function handleUpload(file: File) {
		setUploading(true)
		const now = new Date()
		const fileName = removeSpecial(file.name + now.getTime())
		const { data, error } = await supabase.storage.from('file').upload(`public/${fileName}`, file, {
			cacheControl: '3600',
			upsert: false
		})
		if (error === null) {
			message.success('Đã tải lên thành công')
			setFileList(prevFileList => [...prevFileList, removeSpecial(fileName)])
		} else {
			message.error('Thất bại, tên file đã tồn tại hoặc kích thước quá lớn (chỉ chấp nhận file nhỏ hơn 3MB) ')
		}
		setUploading(false)
	}

	const handleDelete = async (fileName: string) => {
		setDeleting(true)
		const { data, error } = await supabase.storage.from('file').remove([`public/${fileName}`])
		if (error === null) {
			setFileList(prevFileList => prevFileList.filter(item => item !== fileName))
			message.success('Đã xoá')
		} else {
			message.error('Xoá thất bại')
		}
		setDeleting(false)
	}

	const renderUploadList = (fileList: string[]) => {
		return fileList.map((file, i) => (
			<div key={file + i} className="flex flex-col items-center gap-2 p-2 bg-white rounded-md shadow-2xl">
				<Image
					loading="lazy"
					height={160}
					src={`https://esvelufzuzhhmsqjiior.supabase.co/storage/v1/object/public/file/public/${file}`}
					alt="vui ve thoi"
				/>
				<Button
					htmlType="button"
					loading={deleting}
					type="primary"
					danger
					icon={<DeleteOutlined />}
					onClick={() => handleDelete(file)}
				>
					Xoá
				</Button>
			</div>
		))
	}

	return (
		<div className="flex flex-col gap-1 bg-white">
			<label className="my-4">
				{label}(Tối đa {`${fileList.length}/${maxItem}`})
			</label>
			<div className="flex gap-4 flex-wrap w-full rounded-md bg-gray-100 p-4 max-h-[448px] overflow-y-scroll">
				{fileList.length === 0 && <p>Chưa có ảnh nào</p>}
				{renderUploadList(fileList)}

				{uploading && (
					<div className="flex w-[240px] h-[200px]  rounded-md bg-white shadow-2xl items-center justify-center">
						<Spin />
					</div>
				)}
			</div>
			<div className="flex flex-col">
				{fileList.length < maxItem ? (
					<Upload beforeUpload={handleUpload} showUploadList={false}>
						<Button htmlType="button" className="w-[200px]" type="primary" icon={<UploadOutlined />}>
							Tải lên
						</Button>
					</Upload>
				) : null}
				<Form.Item
					name={formName}
					rules={[
						{
							required: true,
							message: 'Chưa có file nào được tải lên!'
						}
					]}
				>
					<Select value={fileList} mode="multiple" style={{ display: 'none' }} />
				</Form.Item>
			</div>
		</div>
	)
}

export default FileUpload
