import { METHOD } from "@/const/app-const";

const chatId = "-1001763461346";
const now = new Date().toLocaleString();

export function sendText(msg: string) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chat_id: chatId, text: `${now}: ${msg}` }),
  }).then((result) => console.log(result));
}

export function sendPhoto(img: string) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`;
  fetch(url, {
    method: METHOD.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chat_id: chatId, photo: img }),
  }).then((result) => console.log(result));
}

export const TeleBOT = {
  sendText,
  sendPhoto,
};
