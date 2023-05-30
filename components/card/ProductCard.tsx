import React, { useMemo } from "react";
import { Card } from "antd";
// import { ShoppingCartOutlined } from "@ant-design/icons";
import { ProductWithClassifyProps } from "@/contexts/CartContext";
import Image from "next/image";

export function ProductCard(product: ProductWithClassifyProps): JSX.Element {
  const avatar = product.images[0];

  const price = useMemo(() => {
    const sort = product.classifications?.sort((a, b) => a.price - b.price);
    let result: string = "";
    if (sort !== undefined && sort.length === 1) {
      result = `${sort[0].price.toLocaleString()} đ`;
    } else if (sort !== undefined && sort.length > 1) {
      if (sort[0].price === sort[sort.length - 1].price) {
        result = `${sort[0].price.toLocaleString()} đ`;
      } else {
        result = `${sort[0].price.toLocaleString()}-${sort[
          sort.length - 1
        ].price.toLocaleString()}  đ`;
      }
    }
    return result;
  }, [product]);

  return (
    <Card
      bordered={false}
      className="hoverEffect"
      style={{
        width: "100%",
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
              marginBottom: 6,
              backgroundColor: "#55e6ff",
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
              padding: 8,
              width: "100%",
            }}
          >
            <div
              className="imageCard"
              style={{ margin: "auto", position: "relative", width: "100%" }}
            >
              <Image
                fill
                src={avatar}
                alt={product.name}
                quality={75}
                loading="lazy"
              />
            </div>
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
          {product.name}
        </blockquote>

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
              fontSize: "16px",
              padding: 0,
              margin: 0,
              lineHeight: "20px",
            }}
          >
            {price}
          </p>
          {/* <ShoppingCartOutlined
            className={styles.iconCart}
            style={{
              fontSize: "20px",
              lineHeight: "20px",
              color: "red",
              margin: "0 8px",
            }}
          /> */}
        </div>
      </div>
    </Card>
  );
}
