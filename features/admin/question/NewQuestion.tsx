import { classLevelOption } from '@/const/app-const'
import { QuestionProps } from '@/entities/question.entites'
import { useLoading } from '@/hooks'
import { CreateQuestionApi } from '@/pages/api/question.api'
import { Button, Col, Form, Row, Select, message, Input } from 'antd'
import React from 'react'
import { useMutation } from 'react-query'

export function NewQuestion() {
  const { setIsLoading } = useLoading()
  const [form] = Form.useForm()

  const createQuestion = useMutation(
    'createQuestion',
    (data: QuestionProps) => CreateQuestionApi(data),
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

  return (
    <Row>
      <Col className="roundedBox" xxl={18}>
        <Form
          name="newQuestion"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => {
            const payload: QuestionProps = {
              question: values.question,
              level: values.level,
              answers: [values.a1, values.a2, values.a3, values.a4]
            }
            return createQuestion.mutate(payload)
          }}
          //  onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="level"
            label={<label className="textTheme">Level</label>}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn level!'
              }
            ]}
          >
            <Select options={classLevelOption} placeholder="Level câu hỏi" />
          </Form.Item>

          <Form.Item
            name="question"
            label={<label className="textTheme">Câu hỏi</label>}
            rules={[
              {
                required: true,
                message: 'Vui lòng điền câu hỏi!'
              }
            ]}
          >
            <Input style={{ width: '100%' }} placeholder="Câu hỏi" />
          </Form.Item>

          <Form.Item
            name="a1"
            label={<label className="textTheme">Câu trả lời đúng</label>}
            rules={[
              {
                required: true,
                message: 'Vui lòng điền câu trả lời đúng!'
              }
            ]}
          >
            <Input style={{ width: '100%' }} placeholder="Câu trả lời đúng" />
          </Form.Item>

          <Form.Item
            name="a2"
            label={<label className="textTheme">Câu trả lời sai 1</label>}
            rules={[
              {
                required: true,
                message: 'Vui lòng điền câu trả lời sai 1!'
              }
            ]}
          >
            <Input style={{ width: '100%' }} placeholder="Câu trả lời sai 1" />
          </Form.Item>

          <Form.Item
            name="a3"
            label={<label className="textTheme">Câu trả lời sai 2</label>}
            rules={[
              {
                required: true,
                message: 'Vui lòng điền câu trả lời sai 2!'
              }
            ]}
          >
            <Input style={{ width: '100%' }} placeholder="Câu trả lời sai 2" />
          </Form.Item>

          <Form.Item
            name="a4"
            label={<label className="textTheme">Câu trả lời sai 3</label>}
            rules={[
              {
                required: true,
                message: 'Vui lòng điền câu trả lời sai 3!'
              }
            ]}
          >
            <Input style={{ width: '100%' }} placeholder="Câu trả lời sai 1" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button block type="primary" htmlType="submit">
              Tạo câu hỏi
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
