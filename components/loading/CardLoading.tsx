import { Col, Row, Skeleton, Space } from 'antd'

export function CardLoading() {
  return (
    <Row gutter={[20, 20]}>
      <Col xxl={8}>
        <Space direction="vertical">
          <Skeleton.Input active={true} />

          <Skeleton.Input active={true} />
          <Skeleton.Input active={true} block />

          <Skeleton.Input active={true} block />
        </Space>
      </Col>
    </Row>
  )
}
