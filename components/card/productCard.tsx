import React from "react";
import { Card } from "antd";
import Image from "next/image";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "../../styles/Home.module.css";

interface CardProps {
  product?: string;
  _id?: string;
  status?: number;
  cardImg?: string;
  price?: number;
  discount?: number;
}

export function CardProduct({
  product,
  _id,
  status,
  cardImg,
  price,
  discount,
}: CardProps): JSX.Element {
  let imgUrl = cardImg ?? "https://picsum.photos/180/200";
  if (price != undefined && discount != undefined) {
    let salePrice = price - (price * discount) / 100;
  }

  return (
    <Card
      style={{
        width: 200,
        backgroundColor: "#ffc107",
        overflow: "hidden",
      }}
      cover={
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "6px",
              backgroundColor: "#8dcbe6",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#ff3b30",
                margin: "0 2px 0 0",
              }}
            ></div>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#ffc107",
                margin: "0 2px 0 0",
              }}
            ></div>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#4cd964",
              }}
            ></div>
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <Image
              src={imgUrl}
              alt="ngoc"
              width={180}
              height={200}
              style={{ borderRadius: "8px" }}
              priority={true}
            />
          </div>
        </div>
      }
      hoverable
      bodyStyle={{
        padding: "0 9px 9px 9px",
        margin: 0,
      }}
    >
      <div
        style={{
          padding: "8px",
          margin: 0,
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <blockquote
          style={{
            width: "100%",
            height: "48px",
            fontSize: "14px",
            lineHeight: "16px",
            textTransform: "uppercase",
            padding: 0,
            margin: 0,
            overflow: "hidden",
          }}
        >
          Banana
        </blockquote>
        <del
          style={{
            fontSize: "14px",
            padding: 0,
            margin: 0,
            lineHeight: "14px",
          }}
        >
          $100
        </del>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              color: "red",
              fontSize: "20px",
              padding: 0,
              margin: 0,
              lineHeight: "20px",
            }}
          >
            $10
          </p>
          <ShoppingCartOutlined
            className={styles.iconCart}
            style={{
              fontSize: "20px",
              lineHeight: "20px",
              color: "red",
              margin: "0 8px",
            }}
          />
        </div>
      </div>
    </Card>
  );
}
