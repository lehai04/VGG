import { NextRequest, NextResponse } from "next/server";

/** API cùng origin cho form tư vấn. Chuyển tiếp sang backend nội bộ;
 * kiểm tra nghiệp vụ và lưu dữ liệu không được thực hiện tại lớp proxy này. */
export async function POST(request: NextRequest) {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return NextResponse.json({ message: "Backend chưa được cấu hình." }, { status: 503 });
  try {
    // Giữ nguyên body dạng text, chuyển metadata request cần thiết cho backend.
    // Giới hạn 8 giây để form không chờ vô hạn khi upstream không phản hồi.
    const response = await fetch(`${backend}/api/public/consultations`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": request.headers.get("x-forwarded-for") || "", "user-agent": request.headers.get("user-agent") || "" },
      body: await request.text(),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    // Backend/proxy upstream có thể trả trang HTML/text khi lỗi gateway. Đừng
    // biến lỗi HTTP thật đó thành 502 chỉ vì body không phải JSON.
    const body = await response.text();
    let message: string | undefined;
    try {
      const payload = JSON.parse(body) as { message?: unknown };
      if (typeof payload.message === "string") message = payload.message;
    } catch {
      // Không chuyển tiếp nội dung upstream thô vì có thể chứa chi tiết nội bộ.
    }
    return NextResponse.json({ message: message || (response.ok ? "Gửi yêu cầu thành công." : "Không thể gửi yêu cầu.") }, { status: response.status });
  // Chỉ lỗi kết nối/timeout mới thành 502.
  } catch {
    return NextResponse.json({ message: "Hệ thống đang bận. Vui lòng thử lại sau." }, { status: 502 });
  }
}
