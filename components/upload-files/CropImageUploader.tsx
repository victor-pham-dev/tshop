import React, { useState, useEffect, useMemo } from 'react'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import ImgCrop from 'antd-img-crop'
import { message, Upload } from 'antd'
import { ACCEPT_FILE } from '../../const/app-const'
import { uploadFileApiURL } from '../../pages/api/file-api'
import { useUser } from '../../hooks'
import { API } from '../../const/app-const'

// types
interface Props {
  setValue: (value: string[]) => void
  maxLength: number
  initFileList?: string[]
}

//

export const CropImageUploader: React.FC<Props> = ({
  maxLength,
  setValue,
  initFileList
}) => {
  const token = useUser().user.token
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [fileUploadedUrls, setFileUploadedUrls] = useState<string[]>([])
  const urlsMemo = useMemo(() => fileUploadedUrls, [fileUploadedUrls])

  useEffect(() => {
    if (initFileList !== undefined && initFileList?.length > 0) {
      const convertToFileList: UploadFile[] = initFileList.map((item) => ({
        uid: Math.random().toString(),
        name: item.split(`${API}/file/`)[1],
        status: 'done',
        url: item
      }))
      setFileList(convertToFileList)
    }
  }, [initFileList])

  //for reuturn new field Values
  useEffect(() => {
    setValue(urlsMemo)
  }, [urlsMemo, setValue])

  //set urls file uploaded
  useEffect(() => {
    const newUrlList = [] as string[]
    fileList.forEach((file) => {
      if (file.status === 'done') {
        let url: string = ''
        if (file.response?.data !== undefined) {
          url = file.response.data
        } else if (file.url) {
          url = file.url
        }
        // console.log(url)
        newUrlList.push(url)
      }
    })
    setFileUploadedUrls(newUrlList)
  }, [fileList])
  //

  //onChange file
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  //
  // onPreview file
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  //

  const beforeUpload = (file: File) => {
    const isValidType = ACCEPT_FILE.includes(file.type)
    if (!isValidType) {
      message.error(` Chỉ chấp nhận các file ${ACCEPT_FILE.toString()}`)
    }
    return isValidType
  }

  return (
    <ImgCrop>
      <Upload
        name="file"
        action={uploadFileApiURL}
        headers={{ 'x-access-token': token ?? '' }}
        listType="picture-card"
        beforeUpload={beforeUpload}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < maxLength && <p className="textTheme"> +Tải lên</p>}
      </Upload>
    </ImgCrop>
  )
}
