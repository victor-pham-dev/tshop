import { Tabs, TabsProps } from 'antd'
import { Posted } from './Posted'
import { NewPost } from './NewPost'

export function PostManager(): JSX.Element {
  const items: TabsProps['items'] = [
    {
      key: 'posted',
      label: <span className="textTheme">Bài viết đã đăng</span>,
      children: <Posted />
    },
    {
      key: 'new post',
      label: <span className="textTheme">Tạo bài viết mới</span>,
      children: <NewPost />
    }
  ]
  const onChange = (key: string) => {
    //console.log(key)
  }

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}
