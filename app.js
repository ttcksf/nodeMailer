// npm init --y
// npm i nodemailer
// 設定→Googleの設定、Googleアカウントの管理→セキュリティ→２段階認証→アプリパスワード

const nodeMailer = require('nodemailer');

const html = `
  <h1>こんにちは</h1>
  <p>こちらはテストメールです。</p>
  <img src="cid:unique@gmail.com" width="400">
`;

const emails = ['送信先１', '送信先２'];

async function mailFn() {
  const transport = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: '自分のGmailアドレス',
      pass: 'SMTPアプリパスワード',
    },
  });

  const info = await transport.sendMail({
    from: 'CodeTips<自分のGmailアドレス>',
    // to: '送信先のアドレス',
    to: emails,
    subject: 'テストです。',
    html: html,
    attachments: [
      {
        filename: 'csv',
        path: './images/file_icon_text_csv.png',
        cid: 'unique@gmail.com',
      },
      {
        filename: 'jpg',
        path: './images/file_icon_text_jpg.png',
        cid: 'unique@gmail.com',
      },
      {
        filename: 'txt',
        path: './images/file_icon_text_txt.png',
        cid: 'unique@gmail.com',
      },
    ],
  });
  console.log(info.messageId);
  console.log(info.rejected);
}
mailFn().catch((error) => console.log(error));
