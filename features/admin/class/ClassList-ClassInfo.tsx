import { CLASS_STATUS } from '@/const/app-const'
import { ClassProps } from '@/entities/class.entities'
import { RegisClassProps } from '@/entities/regisClass.entities'
import { SearchStudentApi } from '@/pages/api/student.api'
import { Button, Col, Divider, Row, Select, Space, Tabs, TabsProps } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

export function ClassInfo(detail: ClassProps): JSX.Element {
  const [saveAble, setSaveAble] = useState(false)
  const items: TabsProps['items'] = [
    {
      key: 'classes',
      label: <span className="textTheme">Thông tin lớp</span>,
      children: <Info {...detail} />
    },
    {
      key: 'newclass',
      label: <span className="textTheme">Học viên</span>,
      children: <Students classId={detail._id} />
    }
  ]
  return <Tabs items={items} />
}

function Info(detail: ClassProps) {
  return (
    <React.Fragment>
      <Divider className="textTheme">Thông tin lớp học</Divider>
      <Row>
        {!detail._id ? (
          <p
            className="textTheme"
            style={{ textAlign: 'center', width: '100%' }}
          >
            Click vào lớp để xem thông tin chi tiết
          </p>
        ) : (
          <Col span={24}>
            <ul style={{ margin: '0 0 4rem 1.4rem' }}>
              <li className="textTheme">Level: {detail.classLevel ?? ''}</li>
              <li className="textTheme">Người tạo: {detail.creatorId ?? ''}</li>
              <li className="textTheme">
                Ngày tạo:{' '}
                {new Date(detail.createdAt).toLocaleDateString() ?? ''}
              </li>
              <li className="textTheme">
                <h3>Số học viên: {detail.numberOfStudents ?? ''}</h3>
              </li>
              <li className="textTheme">
                Giáo viên:{' '}
                <Select
                  placeholder="Giáo viên"
                  id="teacherId"
                  options={[]}
                  style={{ width: '100%', marginTop: '0.4rem' }}
                  defaultValue={detail.teacher}
                />
              </li>
            </ul>
            <Row justify="center" align="middle" gutter={[30, 0]}>
              <Col>
                <Button type="primary">Lưu thay đổi</Button>
              </Col>
              <Col>
                {detail.status === CLASS_STATUS.OPEN && (
                  <Button type="dashed" danger>
                    Xoá
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </React.Fragment>
  )
}

function Students({ classId }: { classId: string | undefined }) {
  const { data } = useQuery(['getListStudent', classId], () => {
    if (classId !== undefined) {
      return SearchStudentApi(`classId=${classId}&page=1&pageSize=200`)
    }
  })
  if (data) {
    //console.log(data.data?.dataTable)
  }

  return (
    <Row>
      {data !== undefined &&
        data !== null &&
        data.data?.dataTable !== undefined &&
        data.data?.dataTable.map((item, i) => {
          if (item.regisInfo !== undefined) {
            return (
              <Col className="textTheme" key={`student ${i} ${classId}`}>{`${
                i + 1
              }:  ${item.regisInfo[0].name}-${item.regisInfo[0].phone}-${
                item.regisInfo[0].email
              }`}</Col>
            )
          }
        })}
    </Row>
  )
}
