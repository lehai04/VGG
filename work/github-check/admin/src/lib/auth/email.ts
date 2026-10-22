interface SendResetEmailOptions {
  to: string;
  adminName: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail({
  to,
  adminName,
  resetUrl,
}: SendResetEmailOptions): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || "no-reply@vlu.edu.vn";

  if (!smtpHost || !smtpUser || !smtpPass) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[AUTH] SMTP chưa cấu hình. Link reset cho ${to}: ${resetUrl}`);
    } else {
      console.warn(`[AUTH] SMTP chưa cấu hình. Không thể gửi email reset tới ${to}`);
    }
    return false;
  }

  try {
    const nodemailer = await import("nodemailer").catch(() => null);
    if (!nodemailer) {
      console.warn("[AUTH] Thư viện nodemailer chưa được cài đặt để gửi email.");
      return false;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpFrom,
      to,
      subject: "[VGG Admin Portal] Hướng dẫn đặt lại mật khẩu quản trị",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #18181b;">
          <h2 style="color: #b91c1c; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">VGG Platform - Khôi phục mật khẩu</h2>
          <p>Xin chào <strong>${adminName}</strong>,</p>
          <p>Hệ thống nhận được yêu cầu đặt lại mật khẩu cho tài khoản quản trị của bạn.</p>
          <p>Vui lòng nhấn vào liên kết bên dưới để tiến hành đặt lại mật khẩu (liên kết có hiệu lực trong <strong>15 phút</strong> và chỉ sử dụng được 1 lần):</p>
          <div style="margin: 24px 0;">
            <a href="${resetUrl}" style="background-color: #b91c1c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Đặt lại mật khẩu</a>
          </div>
          <p style="font-size: 0.85rem; color: #71717a;">Nếu bạn không yêu cầu hành động này, vui lòng bỏ qua email hoặc liên hệ Super Admin ngay lập tức.</p>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="font-size: 0.75rem; color: #a1a1aa;">Email này được gửi tự động từ Cổng Quản trị VGG Platform (Đại học Văn Lang).</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("[AUTH] Lỗi khi gửi email đặt lại mật khẩu:", error);
    return false;
  }
}
