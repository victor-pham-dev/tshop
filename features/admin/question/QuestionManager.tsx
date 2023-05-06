import { Tabs, TabsProps } from 'antd'
import { NewQuestion } from './NewQuestion'

export function QuestionManager(): JSX.Element {
  const items: TabsProps['items'] = [
    {
      key: 'classes',
      label: <span className="textTheme">Tạo câu hỏi</span>,
      children: <NewQuestion />
    }
    // {
    //   key: 'newclass',
    //   label: <span className="textTheme">Tạo lớp mới</span>,
    //   children: <NewClass />
    // }
  ]
  const onChange = (key: string) => {
    //console.log(key)
  }

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}
