import { Col, Row, Skeleton, Space } from 'antd'
import React from 'react'

export const TagsLoading: React.FC = () => {
  return (
    <Space direction="vertical">
      <Row gutter={[8, 8]}>
        <Col lg={6}>
          <Skeleton.Button active={true} size="default" />
        </Col>
        <Col lg={6}>
          <Skeleton.Button active={true} size="default" />
        </Col>
        <Col lg={6}>
          <Skeleton.Button active={true} size="default" />
        </Col>
        <Col lg={6}>
          <Skeleton.Button active={true} size="default" />
        </Col>
        <Col lg={6}>
          <Skeleton.Button active={true} size="default" />
        </Col>
        <Col lg={6}>
          <Skeleton.Button active={true} size="default" />
        </Col>
        <Col lg={6}>
          <Skeleton.Button active={true} size="default" />
        </Col>
      </Row>
    </Space>
  )
}
