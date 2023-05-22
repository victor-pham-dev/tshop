import * as sgMail from "@sendgrid/mail";

export interface MailSendProps {
  to: string;
  from: string;
  subject: string;
  text: any;
}
const KEY = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(KEY);

export const sendgrid = sgMail;
