# Cấu hình đăng nhập và đồng bộ Cloud miễn phí

## 1. Tạo project Supabase
- Vào https://supabase.com, tạo project mới.
- Trong **SQL Editor**, mở file `supabase_setup.sql`, dán toàn bộ nội dung và bấm **Run**.

## 2. Lấy URL và anon key
- Vào **Project Settings > API** (hoặc mục API Keys theo giao diện hiện tại).
- Sao chép **Project URL** và **anon/public key**.
- Mở `assets/js/supabase-config.js`, thay 2 dòng placeholder.
- Chỉ dùng anon/public key trong website. Không đưa service_role key lên GitHub.

## 3. Cấu hình Auth URL
Trong Supabase **Authentication > URL Configuration**:
- Site URL: `https://engtrinhnguyen-hub.github.io/LEED-v5-IOS/`
- Redirect URL: thêm `https://engtrinhnguyen-hub.github.io/LEED-v5-IOS/**`

## 4. Upload lên GitHub
Upload toàn bộ file trong thư mục này vào root repository, ghi đè bản cũ. Giữ `index.html` ở root.

## Cách hoạt động
- Người dùng tạo tài khoản email/mật khẩu, xác nhận email nếu Supabase yêu cầu.
- Mỗi tài khoản chỉ đọc/ghi dòng dữ liệu của chính mình nhờ Row Level Security.
- Tiến độ, bài đang làm và lịch sử vẫn lưu ở localStorage để dùng nhanh/offline.
- Khi có mạng và đã đăng nhập, thay đổi được tự động đồng bộ lên Supabase.
- Khi đăng nhập trên máy khác, ứng dụng tải dữ liệu cloud và khôi phục tiến độ.

## Lưu ý
- Lần mở đầu tiên cần internet để đăng nhập và đồng bộ.
- Không xóa bảng `leed_user_data` nếu muốn giữ dữ liệu.
- Nếu đổi `storagePrefix` trong config.js, dữ liệu cũ sẽ được xem như bộ dữ liệu khác.
