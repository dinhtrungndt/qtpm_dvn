# QTPM DVN

Frontend cho nền tảng giới thiệu, bán và quản lý các sản phẩm phần mềm của DVN Technology. Ứng dụng cung cấp một storefront cho khách truy cập, khu vực mua hàng cho người dùng đã đăng nhập và dashboard quản trị dành cho tài khoản có quyền `admin`.

> **Phạm vi repository:** repository này chỉ chứa frontend React. Backend/API (đang được cấu hình mặc định tại `https://qtpm.trung.codes`) phải được chạy hoặc cung cấp riêng.

## Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu môi trường](#yêu-cầu-môi-trường)
- [Cài đặt và chạy local](#cài-đặt-và-chạy-local)
- [Cấu hình biến môi trường](#cấu-hình-biến-môi-trường)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
- [Các route](#các-route)
- [Kiến trúc thư mục](#kiến-trúc-thư-mục)
- [Tích hợp backend](#tích-hợp-backend)
- [Build và triển khai](#build-và-triển-khai)
- [Kiểm thử](#kiểm-thử)
- [Lưu ý bảo mật](#lưu-ý-bảo-mật)
- [Đóng góp](#đóng-góp)

## Tính năng

### Trang công khai và storefront

- Trang chủ với banner carousel, liên kết tới các sản phẩm/dịch vụ nổi bật và khu vực giới thiệu DVN Technology.
- Danh sách sản phẩm nổi bật và sản phẩm mới thêm.
- Xem toàn bộ sản phẩm, tìm kiếm sản phẩm và xem chi tiết sản phẩm.
- Trang giới thiệu, trang liên hệ và biểu mẫu gửi yêu cầu hỗ trợ qua EmailJS.
- Liên kết mạng xã hội, bản đồ và các kênh liên hệ của doanh nghiệp.

### Tài khoản và xác thực

- Đăng ký tài khoản và đăng nhập bằng username/password.
- Hỗ trợ luồng callback cho đăng nhập xã hội tại `/auth/social/callback` (việc xác thực thực tế do backend xử lý).
- Lấy thông tin người dùng hiện tại sau khi tải ứng dụng.
- Token được lưu ở dạng mã hóa trong `localStorage` và tự động gắn vào các request API.
- Tự động đăng xuất khi token hết hạn, phiên bị thay thế bởi lần đăng nhập khác hoặc người dùng không hoạt động trong thời gian quy định.
- Cập nhật thông tin cá nhân, ảnh đại diện và mật khẩu.

### Mua hàng và thanh toán

- Thêm sản phẩm vào giỏ hàng, tăng/giảm số lượng, xóa từng sản phẩm hoặc xóa toàn bộ giỏ.
- Mua ngay một sản phẩm hoặc thanh toán toàn bộ giỏ hàng.
- Tạo thanh toán qua MoMo và chuyển người dùng tới URL thanh toán do backend trả về.
- Nhận trạng thái thanh toán qua WebSocket và hủy đơn đang chờ thanh toán.
- Xem lịch sử đơn hàng, tìm kiếm đơn hàng, xem chi tiết và xóa đơn hàng theo quyền backend.

### Dashboard và quản trị

- Ba biến thể dashboard (`v1`, `v2`, `v3`) với các widget, biểu đồ và thống kê.
- Tùy biến theme, sidebar, header/footer và các layout mẫu.
- Trang quản lý tài khoản, cài đặt, thông báo, FAQ và license.
- Quản trị viên:
  - Xem/cập nhật tài khoản quản trị.
  - Quản lý người dùng: tìm kiếm, thêm, sửa và xóa.
  - Quản lý sản phẩm: tìm kiếm, thêm, sửa, xóa và upload hình ảnh.
  - Chat với người dùng.
- Chat hỗ trợ theo thời gian thực bằng WebSocket.
- Phân quyền route: route quản trị chỉ cho tài khoản có `role = admin`; các route mua hàng và dashboard yêu cầu đăng nhập.

## Công nghệ sử dụng

| Nhóm | Công nghệ |
| --- | --- |
| UI | React 19, Tailwind CSS, Lucide React, Swiper |
| Routing | React Router DOM 7 |
| State management | Redux Toolkit, React Redux, Redux Thunk, Redux Persist |
| HTTP | Axios |
| Biểu đồ | Chart.js |
| Thanh toán/tiện ích | MoMo thông qua backend, QRCode React, CryptoJS |
| Liên hệ | EmailJS |
| Build | Create React App (`react-scripts`) |
| Triển khai | Vercel hoặc static hosting hỗ trợ SPA rewrite |

## Yêu cầu môi trường

- Node.js 18 trở lên (khuyến nghị bản LTS).
- npm 9 trở lên.
- Backend QTPM DVN đang hoạt động và cho phép CORS từ domain frontend.
- Tài khoản/cấu hình EmailJS nếu muốn sử dụng biểu mẫu liên hệ.
- Tài khoản MoMo và cấu hình callback ở backend nếu muốn kiểm thử thanh toán.

## Cài đặt và chạy local

```bash
git clone https://github.com/dinhtrungndt/qtpm_dvn.git
cd qtpm_dvn
npm install
```

Tạo file `.env` ở thư mục gốc. Có thể dùng các biến ở mục [Cấu hình biến môi trường](#cấu-hình-biến-môi-trường), sau đó chạy development server:

```bash
npm start
```

Ứng dụng mặc định chạy tại [http://localhost:3000](http://localhost:3000). Thay đổi `.env` cần khởi động lại development server.

## Cấu hình biến môi trường

Không commit secret thật vào Git. Tạo `.env` local hoặc cấu hình các biến tương ứng trong dashboard của nền tảng triển khai:

```dotenv
# URL REST API, không bắt buộc thêm dấu / ở cuối
REACT_APP_API_URL=https://your-api.example.com

# Host dùng cho WebSocket, không bao gồm ws:// hoặc wss://
REACT_APP_API_WEB_SOCKET=your-api.example.com

# Khóa dùng bởi frontend để mã hóa token lưu trong trình duyệt
REACT_APP_SECURE_KEY=change-me
REACT_APP_ENCRYPT_KEY=change-me

# EmailJS (cần khi dùng form liên hệ)
REACT_APP_EMAILJS_SERVICE_ID=your-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=your-template-id
REACT_APP_EMAILJS_PUBLIC_KEY=your-public-key
```

Quy ước WebSocket:

- Xác thực/phiên: `ws(s)://<REACT_APP_API_WEB_SOCKET>/auth/ws/<userId>`.
- Thông báo thanh toán: `ws(s)://<REACT_APP_API_WEB_SOCKET>/notifications/ws/<userId>`.
- Chat: được khởi tạo bởi Redux chat actions theo host WebSocket đã cấu hình.

## Hướng dẫn sử dụng

### Khách truy cập

1. Mở trang chủ để xem banner và danh sách sản phẩm.
2. Chọn **Xem thêm**, tìm kiếm hoặc mở một sản phẩm để xem thông tin chi tiết.
3. Chọn **Đăng ký** để tạo tài khoản hoặc **Đăng nhập** nếu đã có tài khoản.
4. Dùng trang **Liên hệ** để gửi yêu cầu tư vấn/hỗ trợ.

### Người dùng đã đăng nhập

1. Thêm sản phẩm vào giỏ hoặc chọn **Mua ngay**.
2. Mở **Giỏ hàng**, kiểm tra số lượng và chọn **Thanh toán**.
3. Chọn MoMo, hoàn tất thanh toán trên trang MoMo và quay lại ứng dụng.
4. Theo dõi trạng thái tại **Lịch sử đơn hàng**.
5. Mở **Tài khoản** hoặc **Cài đặt** để cập nhật thông tin và mật khẩu.
6. Sử dụng khu vực chat để trao đổi với bộ phận hỗ trợ khi backend đã bật WebSocket.

### Quản trị viên

1. Đăng nhập bằng tài khoản có `role` là `admin`.
2. Mở `/admin` để quản lý tài khoản quản trị.
3. Mở `/manage/users` để quản lý người dùng.
4. Mở `/manage/products` để quản lý sản phẩm và hình ảnh.
5. Mở `/chats_admin` để xem hội thoại và gửi tin nhắn.
6. Theo dõi dashboard và dữ liệu biểu đồ tại `/dashboard/v2` hoặc `/dashboard/v3`.

## Các route

### Route công khai

| Route | Chức năng |
| --- | --- |
| `/` | Trang chủ/storefront |
| `/detail/product/:id` | Chi tiết sản phẩm |
| `/seemore` | Danh sách sản phẩm |
| `/introduce` | Giới thiệu |
| `/contact-start` | Liên hệ công khai |
| `/login` | Đăng nhập |
| `/signup` | Đăng ký |
| `/auth/social/callback` | Callback xác thực xã hội |

### Route yêu cầu đăng nhập

| Route | Chức năng |
| --- | --- |
| `/cart` | Giỏ hàng |
| `/buynow/:id` | Mua ngay |
| `/checkout` | Thanh toán |
| `/history/orders` | Lịch sử đơn hàng |
| `/user` | Tài khoản người dùng |
| `/settings` | Cài đặt |
| `/dashboard/v1`, `/dashboard/v2`, `/dashboard/v3` | Dashboard |
| `/chats`, `/chats_admin` | Chat hỗ trợ |
| `/contact` | Trang liên hệ trong dashboard |
| `/theme-generate` | Tùy biến theme |
| `/widgets/*`, `/layout/*`, `/ui/*` | Các widget/layout/UI mẫu |
| `/docs/faq`, `/docs/license` | Tài liệu trong ứng dụng |

### Route chỉ dành cho admin

| Route | Chức năng |
| --- | --- |
| `/admin` | Tài khoản và tổng quan admin |
| `/manage/users` | CRUD người dùng |
| `/manage/products` | CRUD sản phẩm |

Route không tồn tại sẽ chuyển về `/`, hoặc `/login` nếu người dùng chưa xác thực.

## Kiến trúc thư mục

```text
.
├── public/                 # favicon, manifest và tài nguyên public
├── src/
│   ├── components/         # Header, footer, storefront, dashboard, admin, UI
│   ├── constants/          # Hình ảnh và thông báo dùng chung
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Trang home và xác thực
│   ├── routers/            # React Router, PrivateRoute, RoleRoute
│   ├── services/           # Axios service gọi REST API
│   ├── stores/redux/       # Actions, reducers, store và types
│   ├── utils/              # Token, session, loading, validate và format
│   ├── App.js              # Khởi tạo auth check và idle timer
│   └── index.js            # React entry point
├── documents/              # Tài liệu nội bộ frontend
├── package.json
├── tailwind.config.js
└── vercel.json             # SPA rewrite cho Vercel
```

## Tích hợp backend

Frontend gọi các nhóm endpoint chính sau thông qua `REACT_APP_API_URL`:

| Nhóm | Một số endpoint |
| --- | --- |
| Auth | `POST /auth/token`, `POST /users/register`, `GET /users/me` |
| Sản phẩm | `GET /products/`, `GET /products/all`, `GET /products/:id`, `GET /products/search`, CRUD sản phẩm |
| Người dùng | `GET /users`, CRUD người dùng, cập nhật profile |
| Giỏ hàng | CRUD `/cart/`, `DELETE /cart/clear` |
| Đơn hàng | CRUD `/orders`, `GET /orders/search` |
| Thanh toán | `/payments/buy-now-momo/:productId`, `/payments/buy-all-momo`, `/payments`, hủy đơn |
| Dashboard | `/dashboard/stats`, `/dashboard/charts/sales` |
| Chat | `/chat/history/:userId`, `/chat/conversations`, đánh dấu đã đọc |

Axios tự động đọc `access_token` từ `localStorage`, giải mã bằng các utility trong `src/utils` và gắn header `Authorization`. API upload sử dụng một Axios instance riêng với `multipart/form-data`.

## Build và triển khai

Tạo bản production:

```bash
npm run build
```

Kết quả nằm trong thư mục `build/`. Script `postbuild` sẽ obfuscate JavaScript production bằng `javascript-obfuscator`, vì vậy thời gian build có thể lâu hơn bình thường.

### Vercel

1. Import repository vào Vercel.
2. Chọn framework **Create React App**.
3. Đặt build command là `npm run build`, output directory là `build`.
4. Khai báo toàn bộ biến `REACT_APP_*` trong Project Settings.
5. Deploy lại sau khi thay đổi biến môi trường.

File `vercel.json` đã cấu hình rewrite mọi đường dẫn về `index.html` để các route React Router hoạt động khi refresh trực tiếp.

## Kiểm thử

Chạy test của Create React App:

```bash
npm test
```

Chạy một lần trong CI:

```bash
npm test -- --watchAll=false
```

Kiểm tra production build:

```bash
npm run build
```

## Lưu ý bảo mật

- Các biến `REACT_APP_*` được đưa vào bundle frontend; không đặt secret backend, private key hoặc credential thanh toán vào đây.
- Không commit file `.env` có khóa thật. Dùng `.env.example` không chứa giá trị nhạy cảm khi chia sẻ cấu hình.
- Mã hóa token ở frontend chỉ giúp hạn chế việc đọc trực tiếp trong `localStorage`, không thay thế HTTPS, CORS đúng cấu hình, kiểm tra JWT và phân quyền ở backend.
- Backend phải kiểm tra quyền `admin` cho mọi endpoint quản trị; không được chỉ dựa vào `RoleRoute` của frontend.
- Production nên dùng HTTPS để WebSocket tự động sử dụng `wss`.
- Cấu hình CORS backend cho đúng domain local/deployment và giới hạn origin cần thiết.

## Đóng góp

1. Tạo branch từ branch chính.
2. Cài dependency bằng `npm install`.
3. Thực hiện thay đổi theo cấu trúc hiện có.
4. Chạy `npm test -- --watchAll=false` và `npm run build`.
5. Tạo pull request, mô tả rõ thay đổi và cách kiểm thử.

## License

License hiển thị trong ứng dụng tại route `/docs/license`. Khi phát hành cho khách hàng hoặc tái sử dụng bên ngoài tổ chức, hãy xác nhận điều khoản license với chủ sở hữu dự án.
