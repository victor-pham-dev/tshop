import { Tabs, TabsProps } from 'antd'
import { Course } from './Course'
import { useState } from 'react'
import { CourseList } from './CourseList'
import { CourseProps } from '@/entities/course.entities'

export function CourseManager(): JSX.Element {
  const [activeTab, setActiveTab] = useState('courses')
  const [itemAction, setItemAction] = useState<'add' | 'edit'>('add')
  const [itemEditData, setItemEditData] = useState<CourseProps>()

  function changeTab(key: string) {
    setActiveTab(key)
  }

  const items: TabsProps['items'] = [
    {
      key: 'courses',
      label: <span className="textTheme">Khoá học</span>,
      children: (
        <CourseList
          setItemEditData={setItemEditData}
          changeTab={changeTab}
          setItemAction={setItemAction}
        />
      )
    },
    {
      key: 'course',
      label: (
        <span className="textTheme">
          {itemAction === 'add' ? 'Tạo mới' : 'Chỉnh sửa'}
        </span>
      ),
      children: (
        <Course
          itemEditData={itemEditData}
          itemAction={itemAction}
          changeTab={changeTab}
          setItemAction={setItemAction}
        />
      )
    }
  ]

  return (
    <Tabs
      activeKey={activeTab}
      items={items}
      onChange={(key) => {
        changeTab(key)
        setItemAction('add')
        if (key === 'courses') {
          setItemEditData(undefined)
        }
      }}
    />
  )
}
