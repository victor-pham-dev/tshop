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

export default function ListNewsAndEvents() {
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 8,
    status: POST_STATUS.APPROVED,
    type: POST_TYPE.NEWS
  })
  const [params, setParams] = useState<string>(
    'page=1&pageSize=8&type=news&status=1'
  )

  useEffect(() => {
    const searchParamsString = queryString.stringify(filter)
    setParams(searchParamsString)
  }, [filter])

  const { isLoading, data } = useQuery(['getListNews', params], () =>
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
                  href={`/tin-tuc-&-su-kien/${removeMark(item.title)}&pid${
                    item._id
                  }`}
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
