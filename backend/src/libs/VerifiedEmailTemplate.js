export const verified_Email_Template = () => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Email Verified</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
              <td style="background:#111827;padding:20px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;">Krira</h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:40px;text-align:center;">

                <div style="font-size:60px;">✅</div>

                <h2 style="color:#111827;margin-top:20px;">
                  Email Verified Successfully!
                </h2>

                <p style="font-size:16px;color:#555;line-height:1.6;">
                  Congratulations! Your email address has been successfully verified.
                </p>

                <p style="font-size:16px;color:#555;line-height:1.6;">
                  Your account is now ready to use. You can continue shopping and enjoy all the features available on <strong>Krira</strong>.
                </p>

                <div style="margin:35px 0;">
                  <a href="http://localhost:5173/login"
                    style="
                      display:inline-block;
                      padding:14px 30px;
                      background:#16a34a;
                      color:#ffffff;
                      text-decoration:none;
                      border-radius:6px;
                      font-size:16px;
                      font-weight:bold;">
                    Login to Your Account
                  </a>
                </div>

                <p style="font-size:15px;color:#555;">
                  If you did not verify this email, please contact our support team immediately.
                </p>

                <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">

                <p style="font-size:13px;color:#888;">
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