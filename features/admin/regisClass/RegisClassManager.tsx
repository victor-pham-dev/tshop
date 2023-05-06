import { ContentLoading } from '@/components'
import { CLASS_STATUS, REGIS_STATUS } from '@/const/app-const'
import { RegisClassProps } from '@/entities/regisClass.entities'
import { StudentProps } from '@/entities/student.entities'
import { useLoading } from '@/hooks'
import { GetClassByIdApi } from '@/pages/api/class.api'
import {
  DeleteRegisClassApi,
  SearchRegisClassApi,
  SearchRegisClassParamsProps,
  UpdateStatusRegisClassApi,
  updateStatusProps
} from '@/pages/api/regis-clas.api'
import { CreateStudentApi } from '@/pages/api/student.api'
import { formatDate } from '@/ultis/dataConvert'
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Typography,
  message
} from 'antd'
import Link from 'next/link'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
const { Text } = Typography
export function RegisClassManager(): JSX.Element {
  const [filter, setFilter] = useState<SearchRegisClassParamsProps>({
    status: REGIS_STATUS.INIT,
    page: 1,
    pageSize: 10
  })
  const [params, setParams] = useState<string>('page=1&pageSize=10&status=0')

  const { isLoading, error, data } = useQuery(['getListRegis', params], () =>
    SearchRegisClassApi(params)
  )

  //handle filter change
  function handleFilterChange(
    name: keyof SearchRegisClassParamsProps,
    value: REGIS_STATUS | Boolean | undefined
  ) {
    if (value === undefined) {
      let cloneFilter = { ...filter }
      delete cloneFilter[name]
      setFilter(cloneFilter)
    } else {
      setFilter((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleSearch() {
    const searchParamsString = queryString.stringify(filter)
    setParams(searchParamsString)
  }

  const [detail, setDetail] = useState<RegisClassProps>({} as RegisClassProps)
  function handleViewDetail(i: number) {
    setDetail(data?.data?.dataTable[i] ?? ({} as RegisClassProps))
  }

  useEffect(() => {
    setDetail({} as RegisClassProps)
  }, [data])
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row className="roundedBox" gutter={[16, 0]}>
          <Col>
            <label className="textTheme">Trạng thái đơn: </label>
            <Select
              placeholder="Trạng thái lớp"
              style={{ width: 160 }}
              defaultValue={REGIS_STATUS.INIT}
              allowClear
              onChange={(value) => handleFilterChange('status', value)}
              options={[
                { value: REGIS_STATUS.INIT, label: 'Chờ duyệt' },
                { value: REGIS_STATUS.CHECKED, label: 'Đã xử lý' },
                { value: REGIS_STATUS.CONFIRMED, label: 'Đã xác nhận' },
                { value: REGIS_STATUS.CANCELED, label: 'Đã huỷ' }
              ]}
            />
          </Col>
          {/* <Col>
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
        </Col> */}
          {/* <Col>
          <label className="textTheme">Level: </label>
          <Select
            placeholder="Level"
            style={{ width: 180 }}
            onChange={(value) => handleFilterChange('classLevel', value)}
            allowClear
            options={classLevelOption}
          />
        </Col> */}
          <Col>
            <Button onClick={handleSearch} type="primary">
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Col>

      <Col xxl={16}>
        {isLoading ? (
          <ContentLoading />
        ) : (
          <Row className="roundedBox textTheme boxShadow" gutter={[16, 16]}>
            <Col
              style={{
                borderBottom: '1px solid #30fddd',
                paddingBottom: '0.5rem'
              }}
              span={24}
            >
              <Row className="textTheme">
                <Col xxl={3}>Tạo lúc</Col>
                <Col xxl={6}>Tên học viên</Col>
                <Col xxl={3}>SDT</Col>
                <Col xxl={7}>Email</Col>
                <Col style={{ textAlign: 'end' }} xxl={5}>
                  Trạng thái
                </Col>
              </Row>
            </Col>
            {data?.data?.dataTable?.length === 0 && (
              <p className="textTheme">Không còn đơn</p>
            )}
            {data?.data?.dataTable?.map((item, i) => (
              <Col
                span={24}
                onClick={() => handleViewDetail(i)}
                className="cardBox"
                key={`class regus card ${i}`}
              >
                <RegisDataCard {...item} />
              </Col>
            ))}
            <Col span={24}>
              <Row justify="center">
                <Pagination
                  className="roundedBox"
                  pageSize={data?.data?.paging?.pageSize ?? 10}
                  showQuickJumper={
                    data?.data?.totalCount !== undefined &&
                    data?.data?.totalCount > 100
                  }
                  defaultCurrent={1}
                  total={data?.data?.totalCount ?? 0}
                  onChange={(page) => handleFilterChange('page', page)}
                />
              </Row>
            </Col>
          </Row>
        )}
      </Col>
      <Col xxl={8}>
        <Row className="roundedBox textTheme boxShadow">
          {detail?._id == undefined ||
            (!detail?._id && (
              <p style={{ textAlign: 'center' }}>
                Click vào đơn để xem chi tiết
              </p>
            ))}

          <DetailRegistration {...detail} />
        </Row>
      </Col>
    </Row>
  )
}

export type RegisDataCardProps = Partial<RegisClassProps>

export function RegisDataCard(data: RegisDataCardProps) {
  return (
    <Row className="roundedBox textTheme hoverEffect" gutter={[6, 6]}>
      <Col xxl={3}>{formatDate(data.createdAt ?? '')}</Col>
      <Col xxl={6}>{data.name}</Col>
      <Col xxl={3}>{data.phone}</Col>
      <Col xxl={7}>{data.email}</Col>
      <Col style={{ textAlign: 'end' }} xxl={5}>
        {data.status === REGIS_STATUS.INIT ? (
          <span style={{ color: 'gray' }}> Chờ duyệt</span>
        ) : data.status === REGIS_STATUS.CHECKED ? (
          <span style={{ color: 'blue' }}> Đã xử lý</span>
        ) : data.status === REGIS_STATUS.CONFIRMED ? (
          <span style={{ color: 'green' }}> Đã duyệt</span>
        ) : (
          <span style={{ color: 'red' }}> Đã huỷ</span>
        )}
      </Col>
    </Row>
  )
}

export function DetailRegistration(detail: RegisClassProps) {
  const { setIsLoading } = useLoading()
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery(
    ['getListRegis', detail.classId],
    () => {
      if (detail._id !== undefined) return GetClassByIdApi(detail.classId)
    }
  )

  const changeStatus = useMutation(
    (data: updateStatusProps) => UpdateStatusRegisClassApi(data),
    {
      onMutate: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
        message.success('Đã cập nhật')
        queryClient.invalidateQueries('getListRegis')
      },
      onError: () => {
        setIsLoading(false)
        message.error('Đã có lỗi xảy ra')
      }
    }
  )

  const createStudent = useMutation(
    (data: StudentProps) => CreateStudentApi(data),
    {
      onError: () => {
        setIsLoading(false)
        message.error('Đã có lỗi xảy ra')
      }
    }
  )

  function updateStatus(data: updateStatusProps) {
    changeStatus.mutate(data)
  }

  interface acceptStudentProps {
    classId: string
    regisId: string
  }
  function acceptStudent(data: acceptStudentProps) {
    changeStatus.mutate({ _id: data.regisId, status: REGIS_STATUS.CONFIRMED })
    createStudent.mutate(data)
  }
  //console.log(detail._id)
  return (
    <React.Fragment>
      {!detail._id ? (
        <p className="textTheme" style={{ textAlign: 'center' }}>
          Click vào đơn để xem chi tiết
        </p>
      ) : (
        <div className="textTheme">
          <h5>
            {' '}
            {detail.status === REGIS_STATUS.INIT ? (
              <span style={{ color: 'gray' }}> Chờ duyệt</span>
            ) : detail.status === REGIS_STATUS.CHECKED ? (
              <span style={{ color: 'blue' }}> Đã xử lý</span>
            ) : detail.status === REGIS_STATUS.CONFIRMED ? (
              <span style={{ color: 'green' }}> Đã duyệt</span>
            ) : (
              <span style={{ color: 'red' }}> Đã huỷ</span>
            )}
          </h5>

          <Space direction="horizontal">
            {detail.status === REGIS_STATUS.INIT ? (
              <Popconfirm
                title="Đánh đấu là đã xử lý"
                description="Đánh dấu đơn này?"
                okText="Có"
                cancelText="Quay lại"
                onConfirm={() =>
                  updateStatus({
                    _id: detail._id ?? '',
                    status: REGIS_STATUS.CHECKED
                  })
                }
                icon={<InfoCircleOutlined style={{ color: '#1677ff' }} />}
              >
                <Button>Đánh dấu là đã xử lý</Button>
              </Popconfirm>
            ) : null}

            {detail.status === REGIS_STATUS.CHECKED && (
              <Popconfirm
                title="Xác nhận học viên"
                description="Xác nhận học viên?"
                okText="Xác nhận"
                cancelText="Quay lại"
                onConfirm={() => {
                  if (
                    detail._id !== undefined &&
                    data?.data?._id !== undefined
                  ) {
                    acceptStudent({
                      classId: data.data._id,
                      regisId: detail._id
                    })
                  } else {
                    message.warning('Vui lòng thử lại')
                  }
                }}
                icon={<InfoCircleOutlined style={{ color: '#1677ff' }} />}
              >
                <Button type="primary">Xác nhận</Button>
              </Popconfirm>
            )}
            <Popconfirm
              title="Huỷ đơn đăng ký"
              description="Bạn có chắc muốn huỷ đơn này?"
              okText="Huỷ"
              cancelText="Quay lại"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() =>
                updateStatus({
                  _id: detail._id ?? '',
                  status: REGIS_STATUS.CANCELED
                })
              }
            >
              <Button
                disabled={data?.data?.status === CLASS_STATUS.END}
                danger
                type="primary"
              >
                Huỷ
              </Button>
            </Popconfirm>
          </Space>

          <h5>Họ tên: {detail.name}</h5>
          <h5>
            Số điện thoại:{' '}
            <Text className="textTheme" copyable>
              {' '}
              {detail.phone}
            </Text>
          </h5>
          <h5>
            Email:{' '}
            <Text className="textTheme" copyable>
              {' '}
              {detail.email}
            </Text>
          </h5>
          <h5>
            Facebook:{' '}
            <Text className="textTheme">
              <Link href={detail.facebookLink ?? ''} target="_blank">
                {detail.facebookLink}
              </Link>
            </Text>
          </h5>
          <h5>Địa chỉ: {detail.address}</h5>
          <h5>Đã từng học: {detail.everStudied ? 'Đã từng' : 'Chưa'}</h5>
          <h5>Biết đến Mina từ: {detail.knowFrom}</h5>
          <h5>Học để: {detail.leanTo}</h5>
          <h5>Ghi chú: {detail.note}</h5>
          <div style={{ margin: 6 }} className="roundedBox">
            {isLoading && <ContentLoading />}
            <Divider className="textTheme">Lớp đăng ký</Divider>
            <p>Level: {data?.data?.classLevel}</p>
            <p>Ngày khai giảng: {formatDate(data?.data?.startDate ?? '')}</p>
            <p>Số học sinh: {data?.data?.numberOfStudents}</p>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
