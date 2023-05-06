import { PATH, POST_TYPE } from '@/const/app-const'
import { Col, Divider, Row } from 'antd'

import React from 'react'
import { GetPostByIdApi, GetRelatedPostApi } from '../api/post.api'
import { PostProps } from '@/entities/post.entities'
import { BreadCrumb, RelatedPostCard } from '@/components'
import { CrumbProps } from '@/components/breadCrumb/BreadCrumb'
import Link from 'next/link'

interface PostDetailProps {
  data: PostProps
  relatedPost: PostProps[]
}

export default function StudyDetail({ data, relatedPost }: PostDetailProps) {
  const breads: CrumbProps[] = [
    {
      label: 'Tin tức & Sự kiện',
      link: `/${PATH.STUDIES_SPACE}`
    },
    {
      label: data.title
    }
  ]
  return (
    <Row justify="center">
      <Col xxl={16}>
        <BreadCrumb list={breads} />

        <Row gutter={[16, 16]}>
          <Col xxl={16}>
            <Row
              className="textTheme boxShadow roundedBox"
              style={{ padding: '0.5rem' }}
            >
              <h3>{data.title}</h3>
              <Col
                span={24}
                style={{ width: '100%', padding: '1.5rem' }}
                className="roundedBox textTheme richTextBox"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </Row>
          </Col>
          <Col xxl={8}>
            <Row className="boxShadow roundedBox">
              <Divider className="textTheme">Bài viết liên quan</Divider>
              {relatedPost.map((item, i) => (
                <Link
                  key={`related post ${i}`}
                  href={`tin-tuc-&-su-kien/${item.title}&pid${item._id}`}
                >
                  <RelatedPostCard
                    author={item.author}
                    title={item.title}
                    createdAt={item.createdAt ?? ''}
                  />
                </Link>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const id = context.params.slug[0].split('&pid')[1] as string
    const relatedPost = await GetRelatedPostApi(id, POST_TYPE.STUDY)
    const result = await GetPostByIdApi(id ?? '')
    return {
      props: {
        data: result.data ?? {},
        relatedPost: relatedPost.data ?? []
      }
    }
  } catch (error) {
    return {
      props: {
        data: {},
        relatedPost: []
      }
    }
  }
}
