import { FacebookOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";

function Facebook() {
  const router = useRouter();
  //   const dispatch = useDispatch();
  const [state, setState] = useState("");

  const responseFacebook = (res: any) => {
    console.log(res);

    if (res.id !== null && res.id !== undefined) {
      const value = {
        facebookId: res.id,
        email: res.email,
        name: res.name,
        avatar: res.picture.data.url,
      };
      console.log(value);
    } else {
      message.error("Đăng nhập không thành công !!!");
    }
  };

  return (
    <div>
      {
        <FacebookLogin
          appId={"666516681113279"}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          icon={<FacebookOutlined />}
          isMobile={true}
          disableMobileRedirect={true}
          textButton=" Facebook"
          size="small"
        />
      }
    </div>
  );
}

export default Facebook;
