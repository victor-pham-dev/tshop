import { ROLE } from '@/const/app-const'
import { ClassManager, SidebarAdmin } from '@/features/admin'
import { ProtectPage } from '@/middleware/ProtectPage'
import { Col, Row, Tabs, TabsProps } from 'antd'
import { ReactElement, useCallback, useState } from 'react'

export default function AdminPage() {
  const [feature, setFeature] = useState(<ClassManager />)
  const changeFeature = useCallback(
    function changeFeature(newFt: ReactElement) {
      setFeature(newFt)
    },
    [setFeature]
  )
  return (
    <ProtectPage role={ROLE.ADMIN}>
      <Row style={{ minHeight: '80vh' }}>
        <Col xxl={4}>
          <SidebarAdmin changeFeature={changeFeature} />
        </Col>
        <Col xxl={20} style={{ padding: 16 }}>
          {feature}
        </Col>
      </Row>
    </ProtectPage>
  )
}
