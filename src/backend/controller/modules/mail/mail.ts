import nodemailer from "nodemailer";

export class mailService {
  static generateVerificationEmail(code: string) {
    return `
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;color:#111827;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:12px;padding:40px 32px;">
            
            <!-- Logo / Brand -->
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <div style="font-size:24px;font-weight:700;color:#111827;">
                  Outwave
                </div>
              </td>
            </tr>

            <!-- Heading -->
            <tr>
              <td align="center" style="padding-bottom:16px;">
                <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">
                  Confirm your email
                </h1>
              </td>
            </tr>

            <!-- Text -->
            <tr>
              <td align="center" style="padding-bottom:32px;">
                <p style="margin:0;font-size:15px;line-height:24px;color:#6b7280;">
                  Use the verification code below to continue.
                  This code will expire in 60 minutes.
                </p>
              </td>
            </tr>

            <!-- Code -->
            <tr>
              <td align="center" style="padding-bottom:32px;">
                <div style="
                  display:inline-block;
                  padding:16px 32px;
                  font-size:32px;
                  font-weight:700;
                  letter-spacing:8px;
                  background:#f3f4f6;
                  border-radius:10px;
                  color:#111827;
                ">
                  ${code}
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center">
                <p style="margin:0;font-size:13px;line-height:22px;color:#9ca3af;">
                  If you didn't request this email, you can safely ignore it.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>`;
  }

  static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  static async send(config: { to: string; html: string; subject: string }) {
    return this.transporter.sendMail({
      from: `Outwave <${process.env.GMAIL_USER}>`,
      ...config,
    });
  }
}
