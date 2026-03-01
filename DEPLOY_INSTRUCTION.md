# Hướng Dẫn Đưa Website Lên Internet (Phiên Bản 3D Solar Background)

## 📌 Cập nhật ngày 21/02/2026 (18:55)
Giao diện đã được nâng cấp lên phiên bản **3D Solar System Background** (Dựa trên phong cách JulianGarnier) với các cải tiến quan trọng:

### 🌟 Tính năng mới:
- **Hệ Mặt Trời 3D Toàn Cảnh**: Tích hợp mô hình 3D thực tế thay thế cho phông nền cũ.
- **Tối ưu hóa UI Sạch**: Đã loại bỏ hoàn toàn các bảng điều khiển, nhãn tên và tiêu đề phụ để tập trung hoàn toàn vào vẻ đẹp của vũ trụ.
- **Bố cục Hero Mới**: Chữ tiêu đề được căn chỉnh lại và tăng độ trong suốt (`Glassmorphism`) để không che khuất các hành tinh đang quay.
- **Góc nhìn 3D chuẩn**: Thiết lập góc nghiêng 75 độ và chế độ zoom lớn mặc định để tạo cảm giác không gian sâu.

### 🛠 Cấu trúc tệp mới:
- `src/styles/solar-system.css`: Chứa toàn bộ logic giao diện 3D.
- `src/scripts/solar-system.js`: Chứa mã điều khiển quỹ đạo và tương tác.
- `index.html`: Đã được dọn dẹp các thành phần UI thừa và tích hợp jQuery cho hiệu ứng mượt mà.

## ✅ Cách Triển Khai (Deployment)

### Lựa chọn 1: Triển khai tự động (Khuyến nghị)
Website đã được đẩy lên GitHub tại: [https://github.com/nguyentuananh512005/AstronomyParkCamp.git](https://github.com/nguyentuananh512005/AstronomyParkCamp.git)

Nếu bạn đã kết nối GitHub với Netlify:
1. Mọi thay đổi sẽ tự động được cập nhật lên trang web chính thức: **[https://jolly-praline-63d345.netlify.app/](https://jolly-praline-63d345.netlify.app/)**
2. Bạn chỉ cần chờ Netlify build xong (thường mất khoảng 1 phút).

---
**Trạng thái hiện tại:** Website đã được đồng bộ hóa hoàn toàn với hệ mặt trời 3D và các phần Chỗ nghỉ/Giảng viên đã được tối ưu hóa mượt mà.

## 💾 Kí ức & Lưu ý quan trọng (Cập nhật 28/02/2026)

### ⚠️ QUY TRÌNH ĐẨY CODE (CRITICAL)
- **TUYỆT ĐỐI CHƯA ĐẨY CODE LÊN GITHUB** (Git Push) nếu chưa nhận được lệnh trực tiếp từ người dùng. Mọi thay đổi hiện tại chỉ được lưu và chạy ở môi trường local.

### 🚀 Cập nhật quan trọng (Ngày 01/03/2026 - 00:05)

**Những thay đổi lớn vừa thực hiện:**
- **TikTok & Trải Nghiệm**: Loại bỏ lưới thẻ cũ, nhúng trực tiếp video TikTok làm điểm nhấn. Đã xóa các dòng mô tả phụ để tập trung vào video.
- **Bộ đếm ngược & Zalo**: Thay thế form đăng ký phức tạp bằng ảnh minh họa (`8_jpeg.jpg`) và **nút Đăng Ký Zalo**. Tích hợp bộ đếm ngược 24h; khi hết giờ nút sẽ tự động bị vô hiệu hóa và đổi màu.
- **Tối ưu hóa Hero (Cực Sạch)**:
    - Loại bỏ hoàn toàn khung nền chữ, chỉ giữ lại tiêu đề trên nền sao.
    - Đẩy tiêu đề lên cao và sang trái, thu nhỏ hệ mặt trời (`45%`) để **tuyệt đối không có thành phần nào che khuất hệ mặt trời**.
    - Xóa nút "Khám phá" và mô tả phụ để mang lại cảm giác điện ảnh (Cinematic).
- **Thu gọn Menu**: Xóa mục "Đài Quan Sát" để menu tinh gọn hơn.
- **Tính năng UI**: Giảm cường độ hiệu ứng nghiêng (Tilt) ở phần Contact để người dùng không bị "chóng mặt".
- **Features Carousel**: Chuyển sang dạng cuộn dọc (Vertical Scroll) thay vì trượt ngang.
