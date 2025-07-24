# 🎓 Task & Course Management API

A RESTful backend API built using **NestJS**, **TypeScript**, and **PostgreSQL** for managing tasks and student course registrations. The application supports **role-based access control**, secure **JWT authentication**, and follows best practices in structure and validation.

---

## 📌 Project Overview

This system allows:

- **Students** to:
  - Register themselves
  - Authenticate with JWT
  - Manage personal tasks
  - Register for available courses

- **Admins** to:
  - Create new courses
  - Manage platform-level content

All user-related data is stored in a single `users` table with role management via a `role` field (`admin` or `student`).

---

## 🔧 Technologies Used

- **NestJS** (TypeScript-based framework)
- **PostgreSQL** with **TypeORM**
- **JWT** (for authentication)
- **bcrypt** (for password hashing)
- **class-validator** (for input validation)
- **Swagger/OpenAPI** (for API documentation)

---
