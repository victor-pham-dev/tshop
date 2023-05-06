import React from 'react'
import { SettingOutlined, EditOutlined } from '@ant-design/icons'
import { Badge, Card, Row } from 'antd'
import Image from 'next/image'
import { CLASS_STATUS } from '@/const/app-const'
import { formatDate } from '@/ultis/dataConvert'
const { Meta } = Card

interface ClassCardProps {
  type: 'admin' | 'student'
  _id?: string
  status?: number
  time?: string[]
  startDate?: string
  recruiting?: Boolean
  daysOfWeek: string[]
  numberOfStudents?: number
  numberOfLessons?: number
  createdAt?: string
  classLevel?: string
  cardImg?: string
}

export function ClassCard({
  type,
  startDate,
  status,
  time,
  daysOfWeek,
  recruiting,
  numberOfStudents,
  numberOfLessons,
  cardImg,
  classLevel,
  createdAt
}: ClassCardProps): JSX.Element {
  const imageUrl = cardImg ?? 'https://picsum.photos/200/300'
  //console.log(imageUrl)
  let title: string = ''
  if (classLevel !== undefined) {
    title += `Cấp độ: ${classLevel}`
  }
  if (type === 'admin' && numberOfStudents !== undefined) {
    title += ` - ${numberOfStudents} học viên`
  }

  let scheduleText: string = ''
  if (time !== undefined) {
    //console.log(time)
    const startTime =
      new Date(time[0]).getHours().toString().padStart(2, '0') +
      ':' +
      new Date(time[0]).getMinutes().toString().padStart(2, '0')
    const endTime =
      new Date(time[1]).getHours().toString().padStart(2, '0') +
      ':' +
      new Date(time[1]).getMinutes().toString().padStart(2, '0')
    scheduleText += `${startTime} - ${endTime}`
  }

  let days: string = ''
  if (daysOfWeek !== undefined) {
    //console.log(schedule)
    // const startDate
  }

  return (
    <Badge.Ribbon
      color={
        status === CLASS_STATUS.OPEN
          ? '#c72e2e'
          : status === CLASS_STATUS.PROCESSING
          ? '#425ae3'
          : '#179b19'
      }
      text={
        status === CLASS_STATUS.OPEN
          ? 'Đang tuyển sinh'
          : status === CLASS_STATUS.PROCESSING
          ? 'Đang hoạt động'
          : 'Đã kết thúc'
      }
    >
      <Card
        className="hoverEffect"
        style={{ width: '100%', margin: '1rem 0' }}
        cover={
          <img className="imgCard" src={imageUrl} alt="mina" width="100%" />
        }
      >
        <div className="cardTitle">{title}</div>
        <div className="cardDescription">{scheduleText}</div>
        {daysOfWeek !== undefined && (
          <div className="cardDescription">{daysOfWeek.toString()}</div>
        )}
        {numberOfLessons !== undefined && (
          <div className="cardDescription">
            {`${numberOfLessons} buổi học`} - Khai giảng:{' '}
            {formatDate(startDate ?? '')}
          </div>
        )}
      </Card>
    </Badge.Ribbon>
  )
}
