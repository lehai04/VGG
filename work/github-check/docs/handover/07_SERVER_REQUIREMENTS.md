# 07. YÊU CẦU HẠ TẦNG VÀ MÁY CHỦ (SERVER REQUIREMENTS)

## 1. Môi Trường Thực Thi (Runtime & Environment)

* **Node.js:** `v22.13.0` trở lên (Khuyến nghị bản Node.js 22 LTS mới nhất).
* **Package Manager:** `npm >= 10.0.0` (Hỗ trợ NPM Workspaces).
* **Database Engine:** PostgreSQL 17.
* **In-memory Cache (Tùy chọn):** Redis 7.
* **Operating System:** Linux (Ubuntu Server 22.04 LTS / 24.04 LTS hoặc Debian 12 khuyến nghị).

---

## 2. Thông Số Cấu Hình Phần Cứng Khuyến Nghị (Hardware Sizing)

### A. Cấu Hình Tối Thiểu (Minimum Configuration)
Phù hợp cho môi trường Staging / UAT hoặc môi trường Production giai đoạn đầu:
* **CPU:** 2 vCPU
* **RAM:** 4 GB
* **Ổ Cứng:** 40 GB SSD (NVMe khuyến nghị)
* **Băng thông mạng:** 100 Mbps

### B. Cấu Hình Khuyến Nghị Cho Production (Recommended Configuration)
Phù hợp cho môi trường Production phục vụ đồng thời các đợt cao điểm tuyển sinh và vận hành nội dung:
* **CPU:** 4 vCPU
* **RAM:** 8 GB
* **Ổ Cứng:** 80 GB SSD NVMe
* **Băng thông mạng:** 1 Gbps

> ℹ️ **LƯU Ý KỸ THUẬT:**
> Thông số trên là khuyến nghị triển khai thực tế dựa trên footprint bộ nhớ của Next.js SSR, Fastify API và PostgreSQL. Đây là ước tính sizing an toàn và chưa phải kết quả load test nếu hệ thống chưa trải qua đợt benchmark tải trọng cực đại (stress test).

---

## 3. Danh Mục Cổng Mạng Cần Mở (Firewall & Network Ports)

| Cổng (Port) | Giao thức | Phạm vi truy cập | Mục đích sử dụng |
| :--- | :---: | :--- | :--- |
| `80` | TCP | Công khai (Public Internet) | HTTP (Redirect tự động sang HTTPS) |
| `443` | TCP | Công khai (Public Internet) | HTTPS (Truy cập bảo mật người dùng & admin) |
| `22` | TCP | Hạn chế (IT VPN / Bastion IP) | Quản trị máy chủ qua SSH |
| `3000` | TCP | Nội bộ (`127.0.0.1`) | Frontend Next.js Public Server |
| `3001` | TCP | Nội bộ (`127.0.0.1`) | Admin Next.js Portal |
| `4000` | TCP | Nội bộ (`127.0.0.1`) | Backend Fastify API Server |
| `5433` (hoặc `5432`) | TCP | Nội bộ (`127.0.0.1`) | PostgreSQL 17 Database |
| `6379` | TCP | Nội bộ (`127.0.0.1`) | Redis Cache Server |

> 🔒 **QUY TẮC AN TOÀN:** Tuyệt đối không mở các cổng `3000`, `3001`, `4000`, `5433`, `6379` ra ngoài Internet công khai. Mọi truy cập từ người dùng và admin đều phải đi qua Nginx Reverse Proxy tại cổng `443` (HTTPS).
