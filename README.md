# NestJS Microservices Project

Đây là một hệ thống quản lý dự án gồm nhiều microservice được xây dựng với NestJS, giao tiếp qua TCP transport, và sử dụng PostgreSQL cho lưu trữ dữ liệu.

## Microservices hiện có

- API Gateway – Cổng giao tiếp chính với frontend
- User Service – Quản lý người dùng, xác thực JWT
- Project Service – Quản lý thông tin các project
- Task Service – Quản lý các task trong project

## Công nghệ sử dụng

- NestJS
- PostgreSQL
- Docker & Docker Compose
- Swagger (OpenAPI)
- JWT (Xác thực)

## Hướng dẫn chạy project bằng Docker (Development)

Yêu cầu: Đã cài đặt Docker & Docker Compose

### 1. Copy file `.env.docker` ở thư mục gốc vào `.env`
```bash
cp .env.docker .env
```

### 2. Chạy Docker Compose

```bash
docker compose up --build
```

## Truy cập Swagger

Sau khi các service khởi động thành công, truy cập tại:

```
http://localhost:3000/docs
```

## Troubleshooting

* Nếu gặp lỗi `ECONNREFUSED`, kiểm tra xem các service đã khởi động chưa
* Kiểm tra logs:

```bash
docker compose logs -f
```

* Nếu muốn reset lại volume dữ liệu PostgreSQL:

```bash
docker compose down -v
```


