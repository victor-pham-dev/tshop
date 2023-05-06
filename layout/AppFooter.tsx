import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import React, { useState } from 'react'
import Image from 'next/image'
import { Col, Divider, Row } from 'antd'

export const AppFooter: React.FC = () => {
  const thisYear = new Date().getFullYear()
  const [branch, setBranch] = useState<string>(
    'https://maps.google.com/maps?q=Trung Tâm Tiếng Nhật Mina, 19 Ngõ 33 Chùa Láng, Láng Thượng, Đống Đa, Hà Nội, Việt Nam&t=&z=10&ie=UTF8&iwloc=&output=embed'
  )
  function changeBranch(newBranch: string) {
    return setBranch(newBranch)
  }
  return (
    <div style={{ lineHeight: 2 }}>
      <Row>
        <Col span={12}>
          <h1>Thông tin liên hệ</h1>
          <h3>Nhật Ngữ Mina</h3>
          <p
            onClick={() =>
              changeBranch(
                'https://maps.google.com/maps?q=Trung Tâm Tiếng Nhật Mina, 19 Ngõ 33 Chùa Láng, Láng Thượng, Đống Đa, Hà Nội, Việt Nam&t=&z=10&ie=UTF8&iwloc=&output=embed'
              )
            }
            className="branchFooter"
          >
            <EnvironmentOutlined />
            &nbsp;&nbsp;CS1: Số 19 Ngõ 33 - Chùa Láng - Hà Nội
          </p>
          <p
            onClick={() =>
              changeBranch(
                'https://maps.google.com/maps?q=30 Ngõ 165 Dương Quảng Hàm, Quan Hoa, Cầu Giấy, Hà Nội, Việt Nam&t=&z=10&ie=UTF8&iwloc=&output=embed'
              )
            }
            className="branchFooter"
          >
            <EnvironmentOutlined />
            &nbsp;&nbsp;CS2: Số 30 Ngõ 165 Dương Quảng Hàm - Quan Hoa- Cầu Giấy
            - Hà Nội
          </p>
          <p>
            <ClockCircleOutlined />
            &nbsp;&nbsp;7h00 - 22h00&nbsp;&#40;Thứ 2 - Chủ Nhật&#41;{' '}
          </p>
          <p>
            <PhoneOutlined rotate={90} />
            &nbsp;&nbsp;+24 3775 7264
          </p>
          <p>
            <MailOutlined />
            &nbsp;&nbsp;contact@mina.edu.vn
          </p>
        </Col>
        <Col span={12}>
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                width="100%"
                height="100%"
                id="gmap_canvas"
                src={branch}
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
              ></iframe>
              <a href="https://2yu.co">2yu</a>
              <br />
              <a href="https://embedgooglemap.2yu.co">html embed google map</a>
            </div>
          </div>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'white' }} />
      <Row>
        <Col>
          <Image
            src="/favicon.svg"
            alt="mina"
            width={80}
            height={80}
            style={{ margin: '-1rem -0.8rem 0 0' }}
          ></Image>
        </Col>
        <Col>
          {/* <p>
            Website được bảo vệ nội dung by Trương đẹp trai | Mọi hành vi sao
            chép nội dung có thể làm hại đến Website của bạn
          </p> */}
          <p>&#169;&nbsp;Copyright by Mina Center - {thisYear}</p>
        </Col>
      </Row>
    </div>
  )
}
