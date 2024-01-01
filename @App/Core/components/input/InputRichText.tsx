import ClassicEditor from '@/CKEditor/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Form, FormInstance } from 'antd'

interface InputRichTextProps {
	form: FormInstance<any>
	name: string
}

const InputRichText: React.FC<InputRichTextProps> = ({ form, name }) => {
	const value = Form.useWatch(name)
	const { setFieldValue } = form
	return (
		<div className="flex flex-col gap-[2px]">
			<CKEditor
				editor={ClassicEditor}
				data={value}
				onReady={editor => {
					// You can store the "editor" and use when it is needed.
					console.log('Editor is ready to use!', editor)
				}}
				onChange={(event, editor) => {
					const data = editor.getData()
					setFieldValue(name, data)
				}}
			/>
		</div>
	)
}

export default InputRichText
