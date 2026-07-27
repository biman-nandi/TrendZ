export const Verification_Email_Template = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Your OTP Code</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

            <tr>
              <td style="background:#111827;padding:20px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;">Krira</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:40px;">
                <h2 style="margin-top:0;color:#111827;">Verify Your Email</h2>

                <p style="font-size:16px;color:#555;">
                  Use the following One-Time Password (OTP) to complete your sign in.
                </p>

                <div style="margin:30px 0;text-align:center;">
                  <span style="
                    display:inline-block;
                    padding:18px 35px;
                    background:#111827;
                    color:#ffffff;
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:8px;
                    border-radius:8px;">
                    ${otp}
                  </span>
                </div>

                <p style="font-size:15px;color:#555;">
                  This OTP is valid for
                  <strong>5 minutes</strong>.
                </p>

                <p style="font-size:15px;color:#555;">
                  If you didn't request this OTP, you can safely ignore this email.
                </p>

                <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">

                <p style="font-size:13px;color:#888;text-align:center;">
                  © 2026 Krira. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};