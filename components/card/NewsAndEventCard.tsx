import React from 'react'
import { PostProps } from '@/entities/post.entities'
import { formatDate } from '@/ultis/dataConvert'
import { Card } from 'antd'

export function NewsAndEventCard({
  type,
  title,
  status,
  author,
  cardImg,
  createdAt
}: PostProps): JSX.Element {
  const imageUrl = cardImg ?? 'https://picsum.photos/200'
  const date = `Ngày đăng: ${formatDate(createdAt ?? '')}`

  return (
    <>
      <Card
        className="hoverEffect"
        style={{ width: '100%', margin: '1rem 0' }}
        cover={
          <div
            style={{
              width: '100%',
              backgroundColor: 'pink',
              borderTopLeftRadius: '0.5rem',
              borderTopRightRadius: '0.5rem'
            }}
            className="imgCard"
          >
            <img className="imgCard" src={imageUrl} alt="mina" width="100%" />
          </div>
        }
      >
        <div className="cardTitle">{title}</div>
        <div className="cardDescription">{date}</div>
      </Card>
    </>
  )
}
