import { RichTextEditor } from '@/components/richTexteditor/RichTextEditor'
import { CropImageUploader } from '@/components/upload-files/CropImageUploader'
import { useLoading, useUser } from '@/hooks'
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message
} from 'antd'
import 'react-quill/dist/quill.snow.css'
import { CreatePostApi } from '@/pages/api/post.api'
import { checkRes } from '@/network/services/api-handler'
import { POST_STATUS, POST_TYPE, classLevelOption } from '@/const/app-const'
import { PostProps } from '@/entities/post.entities'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  CreateCourseApi,
  EditCourseApi,
  GetCourseByIdApi
} from '@/pages/api/course.api'
import { CourseProps } from '@/entities/course.entities'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

interface Props {
  itemAction: 'add' | 'edit'
  changeTab: (key: string) => void
  setItemAction: Dispatch<SetStateAction<'add' | 'edit'>>
  itemEditData: CourseProps | undefined
}

export function Course({
  itemAction,
  itemEditData,
  changeTab,
  setItemAction
}: Props): JSX.Element {
  const [form] = Form.useForm()
  const { setIsLoading } = useLoading()
  console.log(itemEditData)
  const queryClient = useQueryClient()

  const courseData = useQuery(['getCourse', itemEditData?._id], () => {
    if (itemEditData?._id !== undefined) {
      return GetCourseByIdApi(itemEditData._id)
    }
  })

  const editData = useMemo(() => courseData.data?.data, [courseData])

  useEffect(() => {
    if (itemAction === 'add') {
      form.resetFields()
    }
  }, [itemEditData, itemAction])

  const createCourse = useMutation(
    'createQuestion',
    (data: CourseProps) => CreateCourseApi(data),
    {
      onMutate: () => {
        setIsLoading(true)
      },
      onSuccess: (data) => {
        if (data.code < 202) {
          message.success('Đã tạo')
          form.resetFields()
          queryClient.invalidateQueries('getListRegis')
        } else {
          message.error('Đã có lỗi xảy ra')
        }
        setIsLoading(false)
      },
      onError: () => {
        setIsLoading(false)
        message.error('Đã có lỗi xảy ra')
      }
    }
  )

  const editCourse = useMutation(
    'createQuestion',
    (data: CourseProps) => EditCourseApi(data),
    {
      onMutate: () => {
        setIsLoading(true)
      },
      onSuccess: (data) => {
        if (data.code < 202) {
          message.success('Đã tạo')
          form.resetFields()
        } else {
          message.error('Đã có lỗi xảy ra')
        }
        setIsLoading(false)
      },
      onError: () => {
        setIsLoading(false)
        message.error('Đã có lỗi xảy ra')
      }
    }
  )

  function handleSubmit(values: CourseProps) {
    if (itemAction === 'add') {
      return createCourse.mutate(values)
    } else if (itemAction === 'edit') {
      return editCourse.mutate(values)
    }
  }

  return (
    <Row justify="center">
      <Col xxl={18}>
        <Form
          form={form}
          name="newPost"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={editData}
          onFinish={(values) => handleSubmit(values)}
          //  onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="level"
            label={<label className="textTheme">Level</label>}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn level cho lớp!'
              }
            ]}
          >
            <Select
              placeholder="Level giảng dạy"
              allowClear
              options={classLevelOption}
            />
          </Form.Item>

          <Form.Item
            label={<label className="textTheme">Số buổi học</label>}
            name="numberOfLessons"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền đầy đủ thông tin!'
              }
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              placeholder="Số buổi học"
            />
          </Form.Item>
          <Form.Item
            name="cardImg"
            label={<label className="textTheme">Ảnh thẻ cho bài đăng</label>}
            rules={[
              {
                required: true,
                message: 'Cần tải lên ít nhất 1 ảnh'
              }
            ]}
          >
            <CropImageUploader
              initFileList={
                itemAction === 'edit' && itemEditData?.cardImg !== undefined
                  ? [itemEditData?.cardImg]
                  : []
              }
              maxLength={1}
              setValue={(value: string[]) =>
                form.setFieldValue('cardImg', value[0])
              }
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={<label className="textTheme">Nôi dung mô tả khoá học</label>}
            rules={[
              {
                required: true,
                message: 'Nội dung không được để trống!'
              },
              { min: 8, message: 'Nội dung không được để trống!' }
            ]}
          >
            <RichTextEditor
              defaultValue={editData?.description}
              value={form.getFieldValue('description')}
              onChange={(value) => form.setFieldValue('description', value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Tạo khoá học
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
