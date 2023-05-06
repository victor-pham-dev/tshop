import { menuitemsList } from '@/const/app-const'
import { Row, Col } from 'antd'
import Link from 'next/link'

export default function MenuTop() {
  return (
    <Row align="middle" justify="center">
      {menuitemsList.map((item, i) => (
        <Col key={`'Menu item ${i}`} style={{ margin: '0 1rem' }}>
          <Link className="highlightText" href={`/${item.path}`}>
            {item.label}
          </Link>
        </Col>
      ))}
    </Row>
  )
}
