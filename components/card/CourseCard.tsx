import React from 'react'
import { Card } from 'antd'
import { CourseProps } from '@/entities/course.entities'

export function CourseCard({
  level,
  numberOfLessons,
  cardImg
}: CourseProps): JSX.Element {
  const imageUrl = cardImg ?? 'https://picsum.photos/200'

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
              borderTopRightRadius: '0.5rem',
              backgroundImage: `url(${imageUrl})`
            }}
            className="imgCard"
          >
            {/* <img className="imgCard" src={imageUrl} alt="mina" width="100%" /> */}
          </div>
        }
      >
        <div className="cardTitle">{`Level: ${level}`}</div>
        <div className="cardDescription">{`Số buổi học: ${numberOfLessons}`}</div>
      </Card>
    </>
  )
}
