// import { CartDataProps } from "@/contexts/CartContext";

// function sigupTemplate(name: string) {
//   const content = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Xác nhận đăng ký ITX Gear</title>
// </head>
// <body>
//     <div style="background: #1e1d1d;min-height: 400px;max-width: 800px;padding: 20px;color: whitesmoke;background-image: url(https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/bg.jpeg);background-size: cover;">

//         <div style="background-color: darkslategrey; opacity: 0.95;padding: 16px;border-radius: 16px;">
//              <h3>Cảm ơn quý khách: ${name}  đã đăng ký tài khoản !</h3>
//             <h4>Rất mong ITX Gear sẽ mang tới trải nghiệm tuyệt vời cho bạn</h4>
//         </div>

//         <a style="color: whitesmoke;padding: 16px;" href="https://itxgear.com/dang-nhap">Ghé thăm ngay</a>
//         <img width="100%" src="https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/banner.png?t=2023-05-28T06%3A03%3A14.073Z" alt="itx gear" />
//     </div>

// </body>
// </html>

// `;
//   return content;
// }

// function resetPassword(token: string) {
//   const content = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Reset Password</title>
// </head>
// <body>
//     <div style="background: #1e1d1d;min-height: 400px;max-width: 800px;padding: 20px;color: whitesmoke;background-image: url(https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/bg.jpeg);background-size: cover;">

//         <div style="background-color: darkslategrey; opacity: 0.95;padding: 16px;border-radius: 16px;">

//             <h4>Để thay đổi mật khẩu, vui lòng click vào đường dẫn sau: <a href="https://itxgear.com/xac-nhan-tai-khoan/info?token=${token}&type=recovery" target="_blank">Link đặt lại mật khẩu</a></h4>

//             <p style="color: rgb(249, 71, 71);">Nếu không phải bạn, vui lòng không nhấn vào đường dẫn, liên hệ: support@itxgear.com để được hỗ trợ, Xin chân thành cảm ơn !</p>
//         </div>

//         <img width="100%" src="https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/banner.png?t=2023-05-28T06%3A03%3A14.073Z" alt="itx gear" />
//     </div>

// </body>
// </html>

// `;
//   return content;
// }

// function orderInfo(
//   id: string,
//   paymentStatus: string,
//   status: string,
//   receiverName: string,
//   total: number,
//   items: CartDataProps[],
//   shipInfo: string,
//   note: string
// ) {
//   const itemsHTML = items
//     .map((item) => {
//       const classify = item.Product.classifications.find(
//         (cls) => cls.id === item.classificationId
//       );
//       return `
//     <tr>
//       <td><img src="${item.image}" alt="${item.Product.name}" width="50" /></td>
//       <td>${item.Product.name}</td>
//       <td>${classify?.name}</td>
//       <td>${item.quantity}</td>
//       <td>${item.quantity * (classify?.price ?? 0)}</td>
//     </tr>
//   `;
//     })
//     .join("");
//   const content = `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Reset Password</title>
//   </head>
//   <body>
//     <div
//       style="
//         background: #1e1d1d;
//         min-height: 400px;
//         max-width: 800px;
//         padding: 20px;
//         color: whitesmoke;
//         background-image: url(https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/bg.jpeg);
//         background-size: cover;
//       "
//     >
//       <div
//         style="
//           background-color: darkslategrey;
//           opacity: 0.95;
//           padding: 16px;
//           border-top-right-radius: 16px;
//           border-top-left-radius: 16px;
//         "
//       >
//       <h3>${note}</h3>
//         <h3>Đơn hàng: ${id} - ${paymentStatus} - ${status} </h3>
//         <p style="padding: 10px">Với phương thức thanh toán là Online: quý khách vui lòng xem trong phần đơn hàng và tiến hành thanh toán theo hướng dẫn, nếu là COD quý khách vui lòng chờ xác nhận !</p>
//         <p>Thông tin vận chuyển: ${shipInfo}</p>
//         <h4>Thông tin sản phẩm mua</h4>
//         <table>
//           <tr>
//             <th>Ảnh</th>
//             <th>Tên</th>
//             <th>Phân loại</th>
//             <th>Số lượng</th>
//             <th>Thành tiền</th>
//           </tr>
//           ${itemsHTML}

//         </table>
//         <h4>Tổng tiền: ${total}</h4>
//         <div>
//           <p>Người nhận: ${receiverName}</p>
//         </div>
//         <p style="color: white">
//           Nếu có thắc mắc,vui lòng liên hệ: support@itxgear.com hoặc 0343241299
//           để được hỗ trợ, Xin chân thành cảm ơn !
//         </p>
//       </div>

//       <img
//         width="100%"
//         src="https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/banner.png?t=2023-05-28T06%3A03%3A14.073Z"
//         alt="itx gear"
//       />
//     </div>
//   </body>
// </html>

// `;
//   return content;
// }

// function orderCancel(
//   id: string,
//   receiverName: string,
//   total: number,
//   items: CartDataProps[],
//   reason: string
// ) {
//   const itemsHTML = items
//     .map((item) => {
//       const classify = item.Product.classifications.find(
//         (cls) => cls.id === item.classificationId
//       );
//       return `
//     <tr>
//       <td><img src="${item.image}" alt="${item.Product.name}" width="50" /></td>
//       <td>${item.Product.name}</td>
//       <td>${classify?.name}</td>
//       <td>${item.quantity}</td>
//       <td>${item.quantity * (classify?.price ?? 0)}</td>
//     </tr>
//   `;
//     })
//     .join("");
//   const content = `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Reset Password</title>
//   </head>
//   <body>
//     <div
//       style="
//         background: #1e1d1d;
//         min-height: 400px;
//         max-width: 800px;
//         padding: 20px;
//         color: whitesmoke;
//         background-image: url(https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/bg.jpeg);
//         background-size: cover;
//       "
//     >
//       <div
//         style="
//           background-color: darkslategrey;
//           opacity: 0.95;
//           padding: 16px;
//           border-top-right-radius: 16px;
//           border-top-left-radius: 16px;
//         "
//       >
//         <h3>Thông tin Huỷ đơn hàng: ${id} - lý do: ${reason} </h3>
//        <p>Chúng tôi rất tiếc không thể hoàn thành được đơn hàng của bạn, rất mong được quý khách thông cảm !</p>
//         <h4>Thông tin sản phẩm mua</h4>
//         <table>
//           <tr>
//             <th>Ảnh</th>
//             <th>Tên</th>
//             <th>Phân loại</th>
//             <th>Số lượng</th>
//             <th>Thành tiền</th>
//           </tr>
//           ${itemsHTML}

//         </table>
//         <h4>Tổng tiền: ${total}</h4>
//         <div>
//           <p>Người nhận: ${receiverName}</p>
//         </div>
//         <p style="color: white">
//           Nếu có thắc mắc,vui lòng liên hệ: support@itxgear.com hoặc 0343241299
//           để được hỗ trợ, Xin chân thành cảm ơn !
//         </p>
//       </div>

//       <img
//         width="100%"
//         src="https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/banner.png?t=2023-05-28T06%3A03%3A14.073Z"
//         alt="itx gear"
//       />
//     </div>
//   </body>
// </html>

// `;
//   return content;
// }

// export const templates = {
//   sigupTemplate,
//   resetPassword,
//   orderInfo,
//   orderCancel,
// };
