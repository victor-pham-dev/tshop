import { Row } from 'antd'
import Link from 'next/link'
import { ReactElement } from 'react'

export interface CrumbProps {
  icons?: ReactElement
  label?: string
  link?: string
}

export interface BreadCrumbProps {
  list: CrumbProps[]
}

export function BreadCrumb({ list }: BreadCrumbProps) {
  return (
    <Row
      className="textTheme roundedBox"
      style={{ padding: '0.5rem', marginTop: '0.5rem' }}
    >
      <Link href={'/'} style={{ fontWeight: 400 }}>
        Trang chủ {`> `}
      </Link>
      {list.map((item, i) => {
        if (i < list.length - 1) {
          return (
            <Link
              key={`crumb ${i}`}
              href={item.link ?? '#'}
              style={{ fontWeight: 400, padding: '0 16 0 16' }}
            >
              {item.icons} {item.label} {'>'}
            </Link>
          )
        } else {
          return <label key={`crumb ${i}`}>{item.label}</label>
        }
      })}
    </Row>
  )
}
