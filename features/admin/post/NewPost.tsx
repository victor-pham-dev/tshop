import { RichTextEditor } from '@/components/richTexteditor/RichTextEditor'
import { CropImageUploader } from '@/components/upload-files/CropImageUploader'
import { useLoading, useUser } from '@/hooks'
import { Button, Checkbox, Col, Form, Input, Row, Select, message } from 'antd'
import 'react-quill/dist/quill.snow.css'
import { CreatePostApi } from '@/pages/api/post.api'
import { checkRes } from '@/network/services/api-handler'
import { POST_STATUS, POST_TYPE } from '@/const/app-const'
import { PostProps } from '@/entities/post.entities'

export function NewPost(): JSX.Element {
  const { user } = useUser()
  const { setIsLoading } = useLoading()
  async function createNewPost(values: PostProps) {
    setIsLoading(true)
    const result = await CreatePostApi({
      ...values,
      status: POST_STATUS.APPROVED,
      author: {
        id: user._id ?? '',
        name: user.name ?? ''
      }
    })
    checkRes(
      result,
      () => {
        message.success('Đã lưu bài viết!')
      },
      () => {
        message.error('Đã có lỗi xảy ra!')
      },
      () => {
        setIsLoading(false)
      }
    )
  }
  const [form] = Form.useForm()
  return (
    <Row justify="center">
      <Col xxl={18}>
        <Form
          form={form}
          name="newPost"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={createNewPost}
          //  onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<label className="textTheme">Tiêu đề bài đăng</label>}
            name="title"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề cho bài viết!'
              },
              { min: 20, message: 'Tiêu đề cần dài hơn 20 ký tự' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label={<label className="textTheme">Phân loại bài đăng</label>}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn phân loại bài viết!'
              }
            ]}
          >
            <Select
              placeholder="Loại bài đăng"
              allowClear
              options={[
                { value: POST_TYPE.NEWS, label: 'Tin tức - Sự kiện' },
                { value: POST_TYPE.STUDY, label: 'Góc học tập' }
              ]}
            />
          </Form.Item>
          <Form.Item
            name="cardImg"
            label={
              <label className="textTheme">Ảnh đại diện cho bài đăng</label>
            }
            rules={[
              {
                required: true,
                message: 'Cần tải lên ít nhất 1 ảnh'
              }
            ]}
          >
            <CropImageUploader
              maxLength={1}
              setValue={(value: string[]) =>
                form.setFieldValue('cardImg', value[0])
              }
            />
          </Form.Item>
          <Form.Item
            name="content"
            label={<label className="textTheme">Nội dung</label>}
            rules={[
              {
                required: true,
                message: 'Nội dung không được để trống!'
              },
              { min: 8, message: 'Nội dung không được để trống!' }
            ]}
          >
            <RichTextEditor />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Đăng bài
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
