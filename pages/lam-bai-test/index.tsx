import { CLASS_LEVEL, ROLE, classLevelOption } from '@/const/app-const'
import { ProtectPage } from '@/middleware/ProtectPage'
import { Button, Col, Modal, Popconfirm, Row, Select, message } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { GetTestQuestionApi, getQuestionParamsProps } from '../api/question.api'
import { useLoading } from '@/hooks'
import queryString from 'query-string'
import { QuestionProps } from '@/entities/question.entites'
import { QuestionTest } from '@/components'

export interface QuestionResultProps extends QuestionProps {
  correct: Boolean
  answer: string | undefined
}
export default function TakeTheTest() {
  const [primaryQuestions, setPrimaryQuestions] = useState<QuestionProps[]>([])
  const [shuffleQuestion, setShuffleQuestion] = useState<QuestionResultProps[]>(
    []
  )
  const [mode, setMode] = useState<'test' | 'review'>('test')
  const [result, setResult] = useState('')

  const [testOptions, setTestOptions] = useState<getQuestionParamsProps>({
    quantity: 10
  })

  const { setIsLoading } = useLoading()

  const getQuestions = useMutation(
    ['getTestQuestions'],
    (params: string) => GetTestQuestionApi(params),
    {
      onMutate: () => setIsLoading(true),
      onSuccess: (data) => {
        setIsLoading(false)
        if (data.data) {
          setPrimaryQuestions(data.data)
          const shuffle: QuestionResultProps[] = data.data.map((item) => {
            let arr = [...item.answers]
            arr.sort(() => Math.random() - 0.5)

            return { ...item, answers: arr, answer: undefined, correct: false }
          })
          setShuffleQuestion(shuffle)
        }
      },
      onError: () => {
        setIsLoading(false)
        message.error('Đã có lỗi xảy ra!')
      }
    }
  )

  function startTest() {
    if (!testOptions.level) {
      return message.info('Vui lòng chọn level cho bài test')
    }
    const searchParamsString = queryString.stringify(testOptions)
    return getQuestions.mutate(searchParamsString)
    // if(params.trim().length)
  }
  const hanleCheckAnswer = useCallback(
    (index: number, answer: string) => {
      const correctAnswer = { ...primaryQuestions[index] }.answers[0]
      let isCorrect = false
      if (answer === correctAnswer) {
        isCorrect = true
      }
      return setShuffleQuestion((prev) =>
        prev.map((item, i) => {
          if (i === index) {
            return { ...item, answer, correct: isCorrect }
          }
          return item
        })
      )
    },
    [shuffleQuestion, primaryQuestions]
  )
  const [answerd, setAnswered] = useState(0)
  useEffect(() => {
    let total = 0
    shuffleQuestion.forEach((item) => {
      if (item.answer !== undefined) {
        total += 1
      }
    })
    return setAnswered(total)
  }, [shuffleQuestion])

  //console.log(shuffleQuestion)

  function handleAccept() {
    if (answerd < shuffleQuestion.length) {
      return message.warning(
        `Hãy hoàn thành bài của bạn trước khi kết thúc (${answerd} / ${shuffleQuestion.length})`
      )
    }
    let correct = 0
    shuffleQuestion.forEach((item) => {
      if (item.correct) {
        correct += 1
      }
    })
    setResult(`Số câu đúng: ${correct}/ ${shuffleQuestion.length}`)
    setMode('review')
    //console.log(shuffleQuestion)
  }
  return (
    <ProtectPage role={ROLE.USER}>
      <Row
        justify="center"
        style={{ padding: 8 }}
        gutter={[16, 0]}
        className="textTheme"
      >
        <Col xxl={4}>
          <Select
            onChange={(value) =>
              setTestOptions((prev) => ({ ...prev, level: value }))
            }
            style={{ width: '100%' }}
            options={classLevelOption}
            placeholder="Chọn level"
          />
        </Col>
        <Col>
          <Button
            disabled={shuffleQuestion.length > 0}
            onClick={startTest}
            type="primary"
          >
            Bắt đầu
          </Button>
        </Col>
      </Row>
      {shuffleQuestion.length > 0 && (
        <React.Fragment>
          <Row
            className="roundedBox"
            style={{
              position: 'fixed',
              marginLeft: 6,
              right: 1,
              color: 'white',
              zIndex: 2,
              opacity: 0.8,
              background: 'red'
            }}
          >
            Tiến độ : {`${answerd} / ${shuffleQuestion.length}`}
          </Row>

          <Row
            justify="center"
            gutter={[16, 0]}
            style={{ padding: '0 0.5rem 0 0.5rem' }}
          >
            <Col xxl={16} className="roundedBox textTheme">
              {shuffleQuestion.map((item, i) => (
                <QuestionTest
                  correctAnser={primaryQuestions[i].answers[0]}
                  type={mode}
                  key={`cau hoi so ${i}`}
                  data={item}
                  index={i}
                  handleCheck={hanleCheckAnswer}
                />
              ))}

              {mode === 'review' && (
                <Row
                  style={{
                    padding: 20,
                    fontSize: '1.3rem',
                    background: 'white',
                    borderRadius: '0.5rem',
                    marginTop: '1rem',
                    color: 'black'
                  }}
                >{`Kết Quả : ${result}`}</Row>
              )}

              <Popconfirm
                title="Bạn có chắc muốn kết thúc bài test"
                okText="Có"
                cancelText="Quay lại"
                onConfirm={() => {
                  if (mode === 'test') {
                    handleAccept()
                  } else {
                    setShuffleQuestion([])
                  }
                }}
              >
                <Button style={{ marginTop: 16 }} block type="primary">
                  {mode === 'test' ? 'Nộp bài' : 'Làm bài mới'}
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </ProtectPage>
  )
}
