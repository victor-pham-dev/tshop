import { PATH, ROLE, menuitemsList } from '@/const/app-const'
import { useTheme, useUser } from '@/hooks'
import { CrownTwoTone, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Col, Drawer, Row, Switch } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { theme, changeTheme } = useTheme()
  const { user } = useUser()
  const [activeSwitch, setActiveSwitch] = useState(false)
  useEffect(() => {
    let active = false
    const header = document.getElementById('header')
    if (theme.section === 'lightSection') {
      header?.classList.add('lightSection')
      header?.classList.remove('darkSection')
      active = true
    } else {
      header?.classList.add('darkSection')
      header?.classList.remove('lightSection')
    }
    return setActiveSwitch(active)
  }, [theme])

  return (
    <React.Fragment>
      <Button
        danger
        onClick={() => setOpen(true)}
        style={{ position: 'fixed', zIndex: 4, top: 70, left: 0 }}
      >
        <MenuUnfoldOutlined style={{ color: '#820014' }} />
      </Button>
      <Drawer
        closeIcon={null}
        title={
          user._id !== undefined ? (
            <Row
              gutter={[8, 0]}
              align="middle"
              style={{ marginRight: 1, borderRadius: '0.5rem' }}
              className="lightSection"
            >
              <Col>
                <Badge
                  count={
                    user.role === ROLE.ADMIN ? (
                      <CrownTwoTone twoToneColor={'green'} />
                    ) : user.role === ROLE.STAFF ? (
                      <CrownTwoTone />
                    ) : null
                  }
                >
                  <Avatar
                    src={
                      user.avatar ??
                      'https://xsgames.co/randomusers/avatar.php?g=pixel'
                    }
                  />
                </Badge>
              </Col>
              <Col style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user.name}
              </Col>
            </Row>
          ) : (
            <Link href={`/${PATH.LOGIN}`}>
              <Button onClick={() => setOpen(false)} type="primary">
                Đăng nhập
              </Button>
            </Link>
          )
        }
        placement="left"
        width={280}
        open={open}
        onClose={() => setOpen(false)}
        extra={
          <Button danger onClick={() => setOpen(false)} type="primary">
            X
          </Button>
        }
      >
        <Row gutter={[0, 8]}>
          {menuitemsList.map((item, i) => (
            <Col className="textBox " key={`' mobiuMenu item ${i}`} span={23}>
              <Link
                style={{ width: '100%', color: 'black' }}
                href={`/${item.path}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </Col>
          ))}
          <Switch
            style={{ marginLeft: '0.5rem' }}
            checked={activeSwitch}
            onChange={(checked: Boolean) =>
              checked ? changeTheme('light') : changeTheme('dark')
            }
            checkedChildren="Sáng"
            unCheckedChildren="Tối"
          />
        </Row>
      </Drawer>
    </React.Fragment>
  )
}
