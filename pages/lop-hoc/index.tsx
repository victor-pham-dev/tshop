import { NewsAndEventCard } from '@/components/card/NewsAndEventCard'
import React, { useEffect, useState } from 'react'
import { HomeOutlined, SearchOutlined } from '@ant-design/icons'
import { Breadcrumb, Col, Row, Input, Pagination } from 'antd'
import { PostProps } from '@/entities/post.entities'
import queryString from 'query-string'
import { useQuery } from 'react-query'
import { SearchPostApi } from '../api/post.api'
import { ContentLoading } from '@/components'
import Link from 'next/link'
import { POST_STATUS, POST_TYPE } from '@/const/app-const'
import { removeMark } from '@/ultis/dataConvert'

export default function StudySpace() {
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 8,
    status: POST_STATUS.APPROVED,
    type: POST_TYPE.STUDY
  })
  const [params, setParams] = useState<string>(
    'page=1&pageSize=8&type=study&status=1'
  )

  useEffect(() => {
    const searchParamsString = queryString.stringify(filter)
    setParams(searchParamsString)
  }, [filter])

  const { isLoading, data } = useQuery(['getListStudy', params], () =>
    SearchPostApi(params)
  )

  if (
    data !== null &&
    data !== undefined &&
    data.data?.dataTable !== undefined
  ) {
    //console.log('co ne')
  }

  return (
    <div style={{ margin: 0, padding: '10px 20px' }}>
      {/* <Row justify="space-between">
        <Col>
          <Breadcrumb
            items={[
              {
                href: '',
                title: <HomeOutlined style={{ color: 'black' }} />
              },
              {
                href: '',
                title: (
                  <span style={{ color: 'black' }}>Tin tức và sự kiện</span>
                )
              }
            ]}
            style={{ margin: '0 0 20px 0' }}
          />
        </Col>
        <Col>
          <Input
            placeholder="Tìm kiếm"
            suffix={<SearchOutlined style={{ color: '#1677ff' }} />}
            allowClear
            size="small"
            style={{ border: '1px solid #1677ff' }}
          />
        </Col>
      </Row> */}
      {isLoading ? (
        <ContentLoading />
      ) : (
        <Row
          gutter={[16, 16]}
          justify="center"
          style={{ marginBottom: '40px' }}
        >
          {data !== null &&
            data !== undefined &&
            data.data?.dataTable !== undefined &&
            data.data?.dataTable.map((item, i) => (
              <Col key={`su kien mina ${i}`} xxl={5}>
                <Link
                  href={`/goc-hoc-tap/${removeMark(item.title)}&pid${item._id}`}
                >
                  <NewsAndEventCard {...item} />
                </Link>
              </Col>
            ))}

          <Col span={24}>
            <Row justify="center">
              <Pagination
                className="roundedBox"
                pageSize={data?.data?.paging.pageSize ?? 10}
                showQuickJumper={
                  data?.data?.totalCount !== undefined &&
                  data?.data?.totalCount > 100
                }
                defaultCurrent={1}
                total={data?.data?.totalCount ?? 0}
                onChange={(page) => setFilter((prev) => ({ ...prev, page }))}
              />
            </Row>
          </Col>
        </Row>
      )}
    </div>
  )
}
