import { Col, Row } from "antd";

export function FacebookFrame() {
  return (
    <Row style={{ background: "white", padding: 8, borderRadius: 16 }}>
      <Col span={24}>
        <div
          className="fb-page"
          data-href="https://www.facebook.com/mixtech666/"
          data-tabs="timeline"
          data-width=""
          data-height="130"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="false"
          style={{ width: "100%" }}
        >
          <blockquote
            cite="https://www.facebook.com/mixtech666/"
            className="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/mixtech666/">ITX Gear</a>
          </blockquote>
        </div>
      </Col>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0&appId=1040428757362806&autoLogAppEvents=1"
        nonce="Fw1Q6i7a"
      ></script>
    </Row>
  );
}
