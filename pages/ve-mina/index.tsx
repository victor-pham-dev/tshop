import { Col, Row, Timeline } from 'antd'
import React from 'react'
import styles from '../../styles/aboutMina.module.css'

export default function AboutMina() {
  return (
    <div style={{ width: '100%', padding: '1rem 0 0 0' }} className="aboutmina">
      <div style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>
        <h1>CHÀO MỪNG ĐẾN NHẬT NGỮ MINA</h1>
        <h1>TIẾNG NHẬT CHO MỌI NGƯỜI</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        <img
          src="/images/khai-tam-khai-tri.jpg"
          alt="Mina"
          width="80%"
          height="auto"
        />
      </div>
      <div style={{ textAlign: 'center', padding: '1rem 2rem' }}>
        <h1>VỀ MINA</h1>
        <p style={{ textAlign: 'justify', marginTop: '1rem' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mina - chặng đường 10 năm kết nối
          tiếng Nhật - là một trong những trung tâm tiếng Nhật lâu đời nhất ở Hà
          Nội, Mina luôn tâm niệm chỉ có chất lượng mới tồn tại được. Xuất phát
          từ một câu lạc bộ tiếng Nhật miễn phí với 2 lớp học nhỏ, đến nay khi
          đã góp sức lan tỏa tình yêu tiếng Nhật và văn hóa Nhật tới hàng nghìn
          học viên mỗi năm, Mina vẫn kiên trì đi sâu vào cốt lõi “nhỏ và chất”
          thay vì quy mô hay những vẻ “hoành tráng” bề ngoài. Mina được thành
          lập với mục đích tạo dựng môi trường học tập và trao đổi tiếng nhật từ
          sơ cấp cho tới các khóa học luyện thi năng lực tiếng Nhật. Với tâm
          huyết của người đi trước, chúng tôi hi vọng các bạn học viên sau khi
          kết thúc các khóa học ở đây sẽ có đủ hành trang để đi du học Nhật hoặc
          làm việc trong các công ty, tổ chức Nhật Bản, mang lại cuộc sống tươi
          sáng hơn cho mọi người.
        </p>
      </div>
      <div style={{ padding: '1rem 2rem' }}>
        <h1 style={{ textAlign: 'center' }}>LỊCH SỬ HÌNH THÀNH</h1>
        <p style={{ textAlign: 'justify', marginTop: '1rem' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tiền thân là một câu lạc Tiếng
          Nhật, Mina đã và đang phát triển dưới sự hỗ trợ không ngừng nghỉ của
          các thầy, các cô và các bạn tình nguyện viên - những người luôn muốn
          truyền đạt những cái hay, cái đẹp của Tiếng Nhật nói riêng và văn hoá
          Nhật Bản nói chung. Có rất nhiều những kỉ niệm, những dấu mốc không
          thể nào quên mà Mina muốn chia sẻ với các bạn. Nhưng do yêu cầu của
          bài viết, Mina chỉ có thể chia sẻ những dấu mốc quan trọng nhất. Để có
          thể hiểu rõ hơn về Mina, các bạn có thể xem lại các video của Mina
          trên{' '}
          <a
            href="https://www.youtube.com/channel/UCEypAcOaTK_tpwvzhLBUpaA"
            style={{ textDecoration: 'none' }}
          >
            Youtube
          </a>
          .
        </p>
        <Timeline
          className="aboutmina"
          style={{ margin: '1rem 0 0 1rem' }}
          items={[
            {
              color: 'red',
              children: (
                <p>
                  Tháng 1, 2009: Blog{' '}
                  <a
                    href="https://tiengnhatchomoinguoi.wordpress.com/"
                    style={{ textDecoration: 'none' }}
                  >
                    Tiếng Nhật cho mọi người
                  </a>{' '}
                  trở thành nơi chia sẻ các kĩ năng, kinh nghiệm và tài liệu học
                  Tiếng Nhật.
                </p>
              )
            },
            {
              color: 'red',
              children: (
                <p>
                  Tháng 2, 2012: Fanpage{' '}
                  <a
                    href="https://www.facebook.com/Nhatngu.Mina"
                    style={{ textDecoration: 'none' }}
                  >
                    Tiếng Nhật cho mọi người
                  </a>{' '}
                  được tạo ra nhằm khắc phục những hạn chế của blog{' '}
                  <a
                    href="https://tiengnhatchomoinguoi.wordpress.com/"
                    style={{ textDecoration: 'none' }}
                  >
                    Tiếng Nhật cho mọi người
                  </a>
                  . Qua fanpage, các bạn có thể thảo luận, trao đổi và chia sẻ
                  mọi lúc, mọi nơi. Việc học trở nên khá dễ dàng và thuận tiện.
                </p>
              )
            },
            {
              color: 'red',
              children:
                'Tháng 6, 2012: Lớp học Tiếng Nhật miễn phí đầu tiên được mở ra tại 91 - Nguyễn Chí Thanh - Hà Nội với mục đích tạo ra môi trường giao tiếp thực tế với các chủ đề mang tính thực tiễn.'
            },
            {
              color: 'red',
              children:
                'Tháng 3, 2013: Do hạn chế về cả nhân lực và nội dung, việc duy trì các hoạt động miễn phí trở nên khó khăn hơn và không mang lại nhiều hiểu quả. Chính vì vậy, các thành viên của câu lạc bộ đã quyết định thành lập Trung Tâm Tiếng Nhật Mina tại số 8 - ngõ 84 - chùa Láng - Hà Nội nhằm nâng cao chất lượng và tính chuyên nghiệp trong việc học Tiếng Nhật.'
            },
            {
              color: 'red',
              children: (
                <p>
                  Tháng 10, 2013: Mina chính thức được cấp giấy phép đào tạo từ{' '}
                  <a
                    href="https://moet.gov.vn/Pages/home.aspx"
                    style={{ textDecoration: 'none' }}
                  >
                    Sở giáo dục và đào tạo Hà Nội
                  </a>
                  .
                </p>
              )
            },
            {
              color: 'red',
              children:
                'Đến tháng 3, 2014: Mina đã phối hợp thành công với công ty Softbridge trong việc đưa sinh viên Nhật Bản tới Mina thực tập. Đồng thời đưa nhân sự Mina tới Nhật Bản học tập và trải nghiệm.'
            }
          ]}
        />
      </div>
      <Row justify="center" style={{ padding: '1rem 2rem' }}>
        <Col>
          <Row justify="center">
            <h1>TẦM NHÌN, SỨ MỆNH VÀ GIÁ TRỊ CỐT LÕI</h1>
          </Row>
          <Row gutter={[30, 0]}>
            <Col span={8}>
              <img
                src="/images/tam-nhin.png"
                style={{ borderRadius: '10px' }}
                width="100%"
                height="auto"
              />
            </Col>
            <Col span={8}>
              <img
                src="/images/su-menh.png"
                style={{ borderRadius: '10px' }}
                width="100%"
                height="auto"
              />
            </Col>
            <Col span={8}>
              <img
                src="/images/gia-tri-cot-loi.png"
                style={{ borderRadius: '10px' }}
                width="100%"
                height="auto"
              />
            </Col>
          </Row>
          <Row gutter={[30, 0]}>
            <Col span={8}>
              <p style={{ textAlign: 'justify' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trung tâm tiếng Nhật Mina sẽ
                trở thành một Trung tâm đào tạo tiếng Nhật đi đầu về sự đổi mới,
                đa dạng hóa, hình thức học chất lượng. Cái mà Mina hướng tới đó
                là tư duy, tác phong, văn hóa ứng xử... của người Nhật. Chính vì
                vậy, Mina đã và đang cố gắng để thành lập một nơi đào tạo ra
                những con người có lối sống Nhật nhưng mang trong mình hoài bão,
                khát vọng Việt.
              </p>
            </Col>
            <Col span={8}>
              <p style={{ textAlign: 'justify' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Xuất phát từ một câu lạc bộ
                Tiếng Nhật, Mina vẫn luôn giữ trong mình một sứ mệnh:
                &quot;Tiếng Nhật cho mọi người!&quot;. Đúng vậy! Ai cũng có thể
                học Tiếng Nhật, ai cũng nên học Tiếng Nhật và ai cũng cần được
                học Tiếng Nhật. Mina đã, đang và sẽ tiếp tục đào tạo ra hàng
                triệu nhân lực phát triển toàn diện về trình độ và năng lực làm
                việc thực tế bằng tiếng Nhật.
              </p>
            </Col>
            <Col span={8}>
              <p style={{ textAlign: 'justify' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Không chỉ tạo ra môi trường
                học tập thiết thực và bổ ích, Mina còn hiểu rằng hoàn cảnh cũng
                ảnh hưởng rất nhiều đến việc học của học viên. Mina tôn trọng tư
                duy, phương pháp học và các yếu tố liên quan đến không gian và
                thời gian của học viên. Chính vì vậy, cùng với phương châm
                &quot;
                <strong>Nhanh - Thú vị - Hiệu quả</strong>&quot;, phương pháp
                giảng dạy &quot;<strong>Tin tưởng - Khơi dậy - Bùng nổ</strong>
                &quot; đã trở thành giá trị cốt lõi của Mina.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Row justify="center">
            <h1 style={{ margin: '1rem 0 2rem 0' }}>SẢN PHẨM - DỊCH VỤ</h1>
          </Row>
          <Row justify="center" gutter={[80, 0]}>
            <Col span={10}>
              <img
                src="/images/lop-mina3.jpg"
                alt="Mina"
                width="100%"
                height="auto"
                style={{ borderRadius: '10px' }}
              />
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                Lớp học luyện thi năng lực tiếng nhật từ N5 - N1
              </p>
            </Col>
            <Col span={10}>
              <img
                src="/images/lop-mina1.jpg"
                alt="Mina"
                width="100%"
                height="auto"
                style={{ borderRadius: '10px' }}
              />
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                Lớp học tiếng nhật giao tiếp với 100% giáo viên người Nhật
              </p>
            </Col>
          </Row>
          <Row justify="center" gutter={[80, 0]}>
            <Col span={10}>
              <img
                src="/images/lop-mina2.jpg"
                alt="Mina"
                width="100%"
                height="auto"
                style={{ borderRadius: '10px' }}
              />
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                Lớp học tiếng nhật theo yêu cầu tại doanh nghiệp
              </p>
            </Col>
            <Col span={10}>
              <img
                src="/images/lop-mina4.jpg"
                alt="Mina"
                width="100%"
                height="auto"
                style={{ borderRadius: '10px' }}
              />
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                Tư vấn du học, giới thiệu việc làm và các hoạt động ngoại khóa
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <h1 style={{ textAlign: 'center', margin: '1rem 2rem' }}>
        ĐỘI NGŨ NHÂN SỰ
      </h1>
      <div style={{ padding: '1rem 2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          NGOẠI KHÓA VÀ CÂU LẠC BỘ
        </h1>
        <p style={{ textAlign: 'justify' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tại Mina, do giới hạn về thời gian
          và không gian nên việc học Tiếng Nhật trên lớp chưa bao giờ là đủ để
          các bạn học viên có thể nắm bắt mọi thứ. Chính vì vậy việc đã và đang
          duy trì các câu lạc bộ, các hoạt động ngoại khoá bổ ích chính là một
          phần không thể thiếu trong chương trình đào tạo của Mina. Có rất nhiều
          hoạt động mà các bạn có thể tham gia nhé! Dưới đây là một trong số đó:
        </p>
        <ul style={{ marginLeft: '2rem' }}>
          <li>Trao đổi học cùng các bạn du học sinh.</li>
          <li>Dã ngoại cùng người Nhật.</li>
          <li>Chia sẻ kinh nghiệm luyện thi JLPT.</li>
          <li>Hội thảo về du học, việc làm Tiếng Nhật.</li>
          <li>Oishi - Học làm các món ăn Nhật Bản.</li>
        </ul>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Để biết thêm thông tin về các hoạt
          động ngoại khóa của Mina, bạn có thể xem và đăng ký tại{' '}
          <a
            href="https://www.youtube.com/channel/UCEypAcOaTK_tpwvzhLBUpaA"
            style={{ textDecoration: 'none' }}
          >
            kênh chính thức của MINA
          </a>
          . Ngoài ra, đừng bỏ lỡ bất kỳ sự kiện sắp tới tại Mina!
        </p>
        <Row justify="center" style={{ padding: '1rem 0' }}>
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/109313490?h=3b3b002041"
            width="640"
            height="360"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Row>
      </div>
      <Row style={{ margin: '2rem 7rem' }}>
        <Col>
          <Row justify="center">
            <h1 style={{ margin: '1rem 0 2rem 0' }}>
              HỌC VIÊN NÓI GÌ VỀ MINA?
            </h1>
          </Row>
          <Row gutter={[20, 0]} style={{ marginBottom: '20px' }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              <img
                src="/images/van-73.jpg"
                alt="van"
                width={73}
                height={73}
                style={{ borderRadius: '50%' }}
              />
            </Col>
            <Col span={20}>
              <div
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  padding: '0 0 0 10px'
                }}
              >
                <div className={styles.container}>
                  <blockquote
                    className="studentsaid"
                    style={{ padding: '1rem' }}
                  >
                    <em>
                      &quot;Thực ra ở đây em thật không biết dùng từ gì để diễn
                      ta sự yêu thích của em đối với Nhật vì em quá là thích,
                      thích hơn bất kỳ điều gì khác nên em quyết định học tiếng
                      Nhật và chọn 1 công việc liên quan đến tiếng Nhật. Em tham
                      gia 2 khóa học ở Mina, 1 khóa N3 và 1 khóa N2 cả 2 đều do
                      Dung sensei đứng lớp. Với sự nỗ lực của mình cộng thêm một
                      chút may mắn, em đã đỗ cả 2 kỳ thi năng lực vào các năm
                      2016 và 2017. Hiện em đang làm giáo viên tiếng Nhật cho 1
                      công ty TTS. Thực ra, trước đó em chưa hề nghĩ sẽ chọn cho
                      mình công việc là làm gv tiếng Nhật cho tới khi vào lớp
                      của Dung sensei lần đầu tiên vào 1 ngày tháng 5 năm 2016,
                      tức chưa đầy 2 tháng trước khi thi N3. Chính Dung sensei
                      đã cho em cảm hứng và thay đổi suy nghĩ của em, cũng như
                      cho động lực để em lựa chọn công việc này vì thế Dung
                      sensei là người em hết sức nể trọng. Lý do lựa chọn Mina
                      của em thật ra rất đơn giản: vì nhà trọ cũ của em ở gần
                      Mina, cùng ngõ. Nhưng sau khi kết thúc 1 khóa ở Mina, em
                      vẫn quyết quay lại Mina ôn N2 và học đúng lớp của Dung
                      sensei, dù lúc đó thì em đã chuyển nhà ra khá xa và di
                      chuyển tới lớp học hơi vất vả bởi Mina có phương pháp dạy
                      cấp tốc, cơ sở vật chất tốt hợp với cách học của em
                      &#40;em chỉ ôn N3 có 1 tháng rưỡi trước khi thi, N2 thì
                      là 4 tháng&#41;.
                    </em>
                    <br />
                    <em>
                      Em mong có 1 ngày gia nhập đại gia đình Mina, không phải
                      là 1 học viên nữa mà là 1 giáo viên.&quot;
                    </em>
                    <br />
                    <img
                      src="/images/anh-van-73.png"
                      alt="anh"
                      width="300px"
                      height="auto"
                      style={{ marginTop: '10px' }}
                    />
                  </blockquote>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={[20, 0]} style={{ marginBottom: '20px' }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              <img
                src="/images/hoc-vien-73.jpg"
                alt="trai"
                width={73}
                height={73}
                style={{ borderRadius: '50%' }}
              />
            </Col>
            <Col span={20}>
              <div
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  padding: '0 0 0 10px'
                }}
              >
                <div className={styles.container}>
                  <blockquote
                    className="studentsaid"
                    style={{ padding: '1rem' }}
                  >
                    <em>
                      &quot;Em đang rất đặt niềm tin vào Mina!?!:&#41;. Em hy
                      vọng rằng khả năng nói tiếng Nhật của mình sẽ lưu loát hơn
                      khi vào Mina :3&quot;
                    </em>
                  </blockquote>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={[20, 0]} style={{ marginBottom: '20px' }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              <img
                src="/images/moriya-73.jpg"
                alt="trai"
                width={73}
                height={73}
                style={{ borderRadius: '50%' }}
              />
            </Col>
            <Col span={20}>
              <div
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  padding: '0 0 0 10px'
                }}
              >
                <div className={styles.container}>
                  <blockquote
                    className="studentsaid"
                    style={{ padding: '1rem' }}
                  >
                    <em>
                      &quot;約一ヶ月の間、本当におせわになりました。私は.インターンシップといてミナセンターに来ましたが、逆&#40;ぎゃく&#41;にみなさんにいろいろなことを教えてもらうことの方がおおかったと思います.&quot;
                    </em>
                  </blockquote>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Row justify="center" style={{ margin: '0 0 20px 0' }}>
            <h1>ĐỐI TÁC DOANH NGHIỆP</h1>
          </Row>
          <Row
            justify="space-between"
            gutter={[10, 0]}
            style={{ backgroundColor: 'white', padding: '20px 20px' }}
          >
            <Col span={4}>
              <img src="/images/ycu-logo.jpg" alt="logo" width="100%" />
            </Col>
            <Col span={4}>
              <img src="/images/tuc-logo.png" alt="logo" width="100%" />
            </Col>
            <Col span={4}>
              <img src="/images/kiu-logo.png" alt="logo" width="100%" />
            </Col>
            <Col span={4}>
              <img src="/images/sb-logo.png" alt="logo" width="100%" />
            </Col>
            <Col span={4}>
              <img src="/images/ku-logo.gif" alt="logo" width="100%" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
