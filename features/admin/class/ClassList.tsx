import { CardLoading, ClassCard, ContentLoading } from '@/components'
import { CLASS_STATUS, classLevelOption } from '@/const/app-const'
import { ClassProps } from '@/entities/class.entities'
import { checkRes } from '@/network/services/api-handler'
import { Button, Col, Divider, Pagination, Row, Select, message } from 'antd'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { ClassInfo } from './ClassList-ClassInfo'
import { SearchClassApi } from '@/pages/api/class.api'
import { useQuery } from 'react-query'

interface FilterProps {
  status?: CLASS_STATUS
  recruiting?: Boolean
  classLevel?: string
  pageSize: number
  page: number
}
export function ClassList() {
  const [filter, setFilter] = useState<FilterProps>({
    status: CLASS_STATUS.OPEN,
    page: 1,
    pageSize: 6
  })
  const [params, setParams] = useState<string>('page=1&pageSize=6')

  const [detail, setDetail] = useState<ClassProps>({} as ClassProps)

  const searchClass = useQuery(['searchClass', params], () =>
    SearchClassApi(params)
  )

  //handle filter change
  function handleFilterChange(
    name: keyof FilterProps,
    value: CLASS_STATUS | Boolean | undefined
  ) {
    if (name !== 'page') {
      setFilter((prev) => ({ ...prev, page: 1 }))
    }
    if (value === undefined) {
      let cloneFilter = { ...filter }
      delete cloneFilter[name]
      setFilter(cloneFilter)
    } else {
      setFilter((prev) => ({ ...prev, [name]: value }))
    }
  }

  useEffect(() => {
    const searchParamsString = queryString.stringify(filter)
    return setParams(searchParamsString)
  }, [filter])

  function handleViewDetail(i: number) {
    if (searchClass.data?.data?.dataTable[i]) {
      setDetail(searchClass.data?.data?.dataTable[i])
    }
  }

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Row className="roundedBox" gutter={[16, 0]}>
          <Col>
            <label className="textTheme">Trạng thái lớp: </label>
            <Select
              placeholder="Trạng thái lớp"
              style={{ width: 160 }}
              defaultValue={CLASS_STATUS.OPEN}
              allowClear
              onChange={(value) => handleFilterChange('status', value)}
              options={[
                { value: CLASS_STATUS.OPEN, label: 'Đang tuyển' },
                { value: CLASS_STATUS.PROCESSING, label: 'Đang hoạt động' },
                { value: CLASS_STATUS.END, label: 'Đã kết thúc' }
              ]}
            />
          </Col>
          <Col>
            <label className="textTheme">Trạng thái tuyển sinh: </label>
            <Select
              placeholder="Trạng thái tuyển sinh"
              style={{ width: 180 }}
              onChange={(value) => handleFilterChange('recruiting', value)}
              allowClear
              options={[
                { value: true, label: 'Đang tuyển' },
                { value: false, label: 'Ngừng tuyển' }
              ]}
            />
          </Col>
          <Col>
            <label className="textTheme">Level: </label>
            <Select
              placeholder="Level"
              style={{ width: 180 }}
              onChange={(value) => handleFilterChange('classLevel', value)}
              allowClear
              options={classLevelOption}
            />
          </Col>
        </Row>
      </Col>

      <Col xxl={16}>
        {searchClass.isLoading ? (
          <ContentLoading />
        ) : (
          <Row gutter={[16, 16]}>
            {searchClass.data?.data?.dataTable.map((item, i) => (
              <Col
                onClick={() => handleViewDetail(i)}
                className="cardBox"
                xxl={8}
                key={`class card ${i}`}
              >
                <ClassCard
                  type="admin"
                  daysOfWeek={item.daysOfWeek}
                  createdAt={item.createdAt}
                  classLevel={item.classLevel}
                  numberOfLessons={item.numberOfLessons}
                  numberOfStudents={item.numberOfStudents}
                  recruiting={item.recruiting}
                  startDate={item.startDate}
                  status={item.status}
                  time={item.time}
                />
              </Col>
            ))}
            <Col span={24}>
              <Row justify="center">
                <Pagination
                  className="roundedBox"
                  pageSize={filter.pageSize}
                  showQuickJumper={
                    searchClass.data?.data?.totalCount !== undefined &&
                    searchClass.data?.data?.totalCount > 100
                  }
                  defaultCurrent={1}
                  total={searchClass.data?.data?.totalCount}
                  onChange={(page) => handleFilterChange('page', page)}
                />
              </Row>
            </Col>
          </Row>
        )}
      </Col>
      <Col className="roundedBox boxclass" xxl={8}>
        <ClassInfo {...detail} />
      </Col>
    </Row>
  )
}
