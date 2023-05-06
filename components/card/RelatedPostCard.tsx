import React from 'react'
import { PostProps } from '@/entities/post.entities'
import { formatDate } from '@/ultis/dataConvert'
import { Row } from 'antd'

interface Props {
  title: string
  author: {
    id: string
    name: string
  }
  createdAt: string
}

export function RelatedPostCard({
  title,
  author,
  createdAt
}: Props): JSX.Element {
  const date = `Ngày đăng: ${formatDate(createdAt ?? '')}`

  return (
    <Row
      style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
      className="hoverEffect roundedBox textTheme deepBoxShadow"
    >
      <div className="cardTitle">{title}</div>
      <div className="cardDescription">{date}</div>
    </Row>
  )
}
