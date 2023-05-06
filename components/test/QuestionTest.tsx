import { QuestionProps } from '@/entities/question.entites'
import { QuestionResultProps } from '@/pages/lam-bai-test'
import { Radio, Row, Space, Typography } from 'antd'

const { Text, Title } = Typography

export interface QuestionTestProps {
  correctAnser: string
  type: 'test' | 'review'
  data: QuestionResultProps
  index: number
  handleCheck: (index: number, answer: string) => void
}
export function QuestionTest({
  correctAnser,
  type,
  data,
  index,
  handleCheck
}: QuestionTestProps) {
  return (
    <Row>
      <Title
        style={
          type === 'review' && !data.correct ? { color: 'red' } : undefined
        }
        level={5}
        className="textTheme"
      >
        {index + 1}. {data.question}
      </Title>

      <Radio.Group
        style={{ width: '100%' }}
        onChange={(e) => handleCheck(index, e.target.value)}
        value={data.answer}
      >
        <Space direction="vertical">
          {data.answers.map((item, i) => (
            <Radio
              style={
                type === 'review' && correctAnser === item
                  ? { color: 'green' }
                  : undefined
              }
              key={`option ${i}`}
              className="textTheme"
              value={item}
            >
              {item}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Row>
  )
}
