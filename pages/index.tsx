import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Button, Col, Divider, Rate, Row } from 'antd'
import { API, POST_TYPE } from '@/const/app-const'
import { ClassCard } from '@/components'
import { ClassProps } from '@/entities/class.entities'
import { ResponseProps, checkRes } from '@/network/services/api-handler'
import { PagingResponseProps } from '@/network/services/api-handler'
import Link from 'next/link'
import { PATH } from '@/const/app-const'
import { useEffect, useState } from 'react'
import { SearchClassApi } from './api/class.api'
import { useLoading } from '@/hooks'
import { SearchPostApi } from './api/post.api'
import { PostProps } from '@/entities/post.entities'
import { Carousel } from '@/components/carousel/Carousel'
import { NewsAndEventCard } from '@/components/card/NewsAndEventCard'
import { removeMark } from '@/ultis/dataConvert'
import { RightCircleFilled } from '@ant-design/icons'

const inter = Inter({ subsets: ['latin'] })
interface HomeProps {
  classes: ClassProps[]
  news: PostProps[]
  study: PostProps[]
}
function Home({ classes, news, study }: HomeProps) {
  //console.log(classes)
  return (
    <>
      <Head>
        <title>Trung tâm tiếng nhật Mina</title>
        <meta name="description" content="Trung tâm tiếng nhật Mina - Hà Nội" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" style={{ fontSize: '4rem' }} />
      </Head>
      <main>
        {/* banner and effect, regis form */}
        <div style={{ width: '100%', position: 'relative' }}>
          <img
            src="/banner.jpeg"
            alt="mina - tieng nhat cho moi nguoi"
            width="100%"
          />
        </div>

        {/* news and envents and  Studiy Space */}
        <Row style={{ marginTop: '1rem' }}>
          <div className="titleSection">Tin tức và sự kiện</div>

          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              <Carousel>
                {news.map((item, i) => (
                  <Col key={`event ${i}`}>
                    <Link
                      href={`/tin-tuc-&-su-kien/${removeMark(item.title)}&pid${
                        item._id
                      }`}
                    >
                      <NewsAndEventCard {...item} />
                    </Link>
                  </Col>
                ))}
              </Carousel>
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Link href={`/tin-tuc-&-su-kien`}>
              <h3 className="seeMore">Xem thêm {'> >'}</h3>
            </Link>
          </Col>
        </Row>

        <Row style={{ marginTop: '1rem' }}>
          <div className="titleSection">Lớp học đang tuyển sinh</div>

          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              {classes &&
                classes.map((item, i) => (
                  <Col xxl={5} xs={21} key={`class mina ${i}`}>
                    <Link href={`/${PATH.CLASS}/${item._id}`}>
                      <ClassCard
                        type="student"
                        cardImg={item.cardImg}
                        daysOfWeek={item.daysOfWeek}
                        createdAt={item.createdAt}
                        classLevel={item.classLevel}
                        numberOfStudents={item.numberOfStudents}
                        numberOfLessons={item.numberOfLessons}
                        recruiting={item.recruiting}
                        startDate={item.startDate}
                        status={item.status}
                        time={item.time}
                      />
                    </Link>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
        {/* {classes.length > 8 && ( */}
        <Row justify="center">
          <Col span={24}>
            <h3 className="seeMore">Xem thêm {'> >'}</h3>
          </Col>
        </Row>
        {/* )} */}

        <Row style={{ marginTop: '1rem' }}>
          <div className="titleSection">Góc học tập</div>
          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              {study.map((item, i) => (
                <Col xxl={5} xs={22} key={`card study ${i}`}>
                  <Link
                    href={`/goc-hoc-tap/${removeMark(item.title)}&pid${
                      item._id
                    }`}
                  >
                    <NewsAndEventCard {...item} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Link href={`/goc-hoc-tap`}>
              <h3 className="seeMore">Xem thêm {'> >'}</h3>
            </Link>
          </Col>
        </Row>
        <Row justify="center">
          <div className="titleSection">Dịch vụ</div>
          <Col span={24}>
            <Row
              style={{ padding: '1rem 6rem' }}
              gutter={[30, 0]}
              justify="center"
              align="middle"
            >
              <Col span={12}>
                <Row
                  justify="center"
                  style={{ lineHeight: 2, textAlign: 'center' }}
                >
                  <h3>Luyện thi JLPT</h3>
                  <p>
                    Tại Mina, luyện thi năng lực Tiếng Nhật là một bước không
                    thể thiếu để kiểm tra khả năng học tập của học viên và chất
                    lượng giảng dạy của giảng viên. Khai giảng chủ yếu trước 2
                    đợt thi JLPT hàng năm và tập trung vào luyện đề, cường độ
                    học tập khá vất vả. Ngoài ra, các buổi chia sẻ kinh nghiệm
                    thi JLPT của các giảng viên hay các bạn đã vượt qua sẽ giúp
                    bạn tự tin hơn trước khi thi.
                  </p>
                </Row>
                <Row justify="center">
                  <Rate disabled defaultValue={5} />
                </Row>
                <Row justify="center">
                  <Link href={`/khoa-hoc`}>
                    <Button
                      type="primary"
                      size="small"
                      style={{ margin: '1rem 0' }}
                    >
                      <RightCircleFilled />
                      &nbsp;Chi tiết
                    </Button>
                  </Link>
                </Row>
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <img
                  src="/images/luyen-thi-jlpt.jpg"
                  alt="mina"
                  style={{ borderRadius: '10px' }}
                />
              </Col>
            </Row>
            <Row
              style={{ padding: '1rem 6rem' }}
              gutter={[30, 0]}
              justify="center"
              align="middle"
            >
              <Col span={12} style={{ textAlign: 'center' }}>
                <img
                  src="/images/tieng-nhat-so-cap.jpg"
                  alt="mina"
                  style={{ borderRadius: '10px' }}
                />
              </Col>
              <Col span={12}>
                <Row
                  justify="center"
                  style={{ lineHeight: 2, textAlign: 'center' }}
                >
                  <h3>Tiếng Nhật cho người mới bắt đầu</h3>
                  <p>
                    Đây là khóa học dành riêng cho những bạn bắt đầu làm quen
                    với Tiếng Nhật, muốn yêu lại Tiếng Nhật từ đầu hoặc đang ôn
                    luyện cho kì thi năng lực Tiếng Nhật mức độ N5 và N4. Trong
                    khóa học này các bạn sẽ hoàn thành 50 bài giáo trình Minna
                    no Nihongo &#10088;Có đủ kiến thức để thi được N4&#10089;.
                  </p>
                </Row>
                <Row justify="center">
                  <Rate disabled allowHalf defaultValue={4.5} />
                </Row>
                <Row justify="center">
                  <Link href={`/khoa-hoc`}>
                    <Button
                      type="primary"
                      size="small"
                      style={{ margin: '1rem 0' }}
                    >
                      <RightCircleFilled />
                      &nbsp;Chi tiết
                    </Button>
                  </Link>
                </Row>
              </Col>
            </Row>
            <Row
              style={{ padding: '1rem 6rem' }}
              gutter={[30, 0]}
              justify="center"
              align="middle"
            >
              <Col span={12}>
                <Row
                  justify="center"
                  style={{ lineHeight: 2, textAlign: 'center' }}
                >
                  <h3>Tiếng Nhật giao tiếp</h3>
                  <p>
                    Khóa học này dành vào các bạn có nhu cầu giao tiếp Tiếng
                    Nhật ngay và luôn. Chú trọng vào phát âm chuẩn, giao tiếp
                    nhiều với các tình huống hội thoại mang tính thực tế. Yêu
                    cầu của khóa học là nhanh và hiệu quả nên học viên cần tham
                    gia các hoạt động bổ trợ miễn phí như: Dã ngoại cùng người
                    Nhật hoặc Kaiwa Mina hàng tháng để đạt được kết quả mong
                    muốn.
                  </p>
                </Row>
                <Row justify="center">
                  <Rate disabled allowHalf defaultValue={4.5} />
                </Row>
                <Row justify="center">
                  <Link href={`/khoa-hoc`}>
                    <Button
                      type="primary"
                      size="small"
                      style={{ margin: '1rem 0' }}
                    >
                      <RightCircleFilled />
                      &nbsp;Chi tiết
                    </Button>
                  </Link>
                </Row>
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <img
                  src="/images/tieng-nhat-giao-tiep.jpg"
                  alt="mina"
                  style={{ borderRadius: '10px' }}
                />
              </Col>
            </Row>
            <Row
              style={{ padding: '1rem 6rem' }}
              gutter={[30, 0]}
              justify="center"
              align="middle"
            >
              <Col span={12} style={{ textAlign: 'center' }}>
                <img
                  src="/images/tieng-nhat-doanh-nghiep.jpg"
                  alt="mina"
                  style={{ borderRadius: '10px' }}
                />
              </Col>
              <Col span={12}>
                <Row
                  justify="center"
                  style={{ lineHeight: 2, textAlign: 'center' }}
                >
                  <h3>Tiếng Nhật doanh nghiệp</h3>
                  <p>
                    Bạn đã bao giờ làm việc trong các doanh nghiệp Nhật Bản
                    chưa? Hay bạn đang có mong muốn làm trong các công ty Nhật.
                    Nếu thế thì khóa học này sẽ phù với bạn. Với giáo trình hoàn
                    toàn do các công ty Nhật Bản biên soạn và giáo viên là các
                    doanh nhân Nhật Bản trực tiếp giảng dạy, bạn sẽ nhanh chóng
                    thích nghi với môi trường làm việc của Nhật Bản.
                  </p>
                </Row>
                <Row justify="center">
                  <Rate disabled allowHalf defaultValue={4.5} />
                </Row>
                <Row justify="center">
                  <Link href={`/khoa-hoc`}>
                    <Button
                      type="primary"
                      size="small"
                      style={{ margin: '1rem 0' }}
                    >
                      <RightCircleFilled />
                      &nbsp;Chi tiết
                    </Button>
                  </Link>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const getClassRecruiting = await SearchClassApi(
      `page=1&pageSize=20&recruiting=true`
    )
    const getStudyPost = await SearchPostApi(
      `page=1&pageSize=8&status=1&type=${POST_TYPE.STUDY}`
    )
    const getNewsPost = await SearchPostApi(
      `page=1&pageSize=8&status=1&type=${POST_TYPE.NEWS}`
    )

    return {
      props: {
        classes: getClassRecruiting.data?.dataTable ?? [],
        study: getStudyPost.data?.dataTable ?? [],
        news: getNewsPost.data?.dataTable ?? []
      }
    }
  } catch (error) {
    //console.log(error)
    return {
      props: {
        classes: [],
        study: [],
        news: []
      }
    }
  }
}

export default Home
