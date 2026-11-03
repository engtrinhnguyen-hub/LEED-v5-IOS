# LEED GA GitHub Pages + iOS + Cloud Sync

## Cập nhật trong bản này
- Tích hợp History Review từ v10.0.18.4: xem lại chi tiết lượt làm đã lưu.
- Đăng ký/đăng nhập email bằng Supabase.
- Đồng bộ progress, history và dữ liệu localStorage của ứng dụng giữa các thiết bị.
- Giữ local-first: vẫn làm bài khi mất mạng, tự đồng bộ lại khi online.
- Tương thích GitHub Pages và iOS PWA.

## Triển khai
1. Mở Supabase > SQL Editor, chạy toàn bộ file `SUPABASE_SETUP.sql`.
2. Trong Supabase > Authentication > URL Configuration:
   - Site URL: URL GitHub Pages của bạn.
   - Redirect URLs: thêm URL GitHub Pages, có thể dùng dạng `https://TEN_GITHUB.github.io/TEN_REPO/**`.
3. Upload toàn bộ nội dung folder này vào root repository GitHub, chọn ghi đè file cũ.
4. GitHub > Settings > Pages > Deploy from a branch > `main` / `(root)`.
5. Sau khi deploy, mở web, đăng ký/đăng nhập rồi bấm `Đồng bộ` lần đầu.

## Lưu ý
- `assets/js/supabase-config.js` chỉ chứa Project URL và publishable key dùng phía trình duyệt. Không đặt service_role key vào website.
- Nếu Safari vẫn hiện bản cũ, đóng tab, mở lại URL và refresh; service worker đã được đổi cache version.
- Lịch sử cũ chỉ có điểm sẽ hiện “Bản cũ”; lượt làm mới sẽ có nút “Xem lại”.
