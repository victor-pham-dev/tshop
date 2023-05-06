import { Row, Tabs, TabsProps } from 'antd'
import { NewClass } from './NewClass'
import { ClassList } from './ClassList'

export function ClassManager(): JSX.Element {
  const items: TabsProps['items'] = [
    {
      key: 'classes',
      label: <span className="textTheme">Quản lý lớp học</span>,
      children: <ClassList />
    },
    {
      key: 'newclass',
      label: <span className="textTheme">Tạo lớp mới</span>,
      children: <NewClass />
    }
  ]
  const onChange = (key: string) => {
    //console.log(key)
  }

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}
