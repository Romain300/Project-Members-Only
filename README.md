# Project-Members-Only

## Description

This is a Node.js and Express web application featuring user authentication, authorization, and a message board system. Users can sign up, log in, post messages, and update membership status. Admin users have special privileges like deleting messages and promoting users to admins.

The app uses:

- **Express** as the web framework
- **Passport.js** for authentication (local strategy)
- **PostgreSQL** as the database
- **EJS** templating engine
- **bcryptjs** for password hashing
- **express-session** for session management

---

## Features

- User registration and login with email and password
- Session management with Passport.js
- Role-based access control: Members and Admins
- Post new messages with title and content
- Admins can delete messages and grant admin rights to users
- Secure routes protected with middleware
- Database schema includes users, memberships, and messages tables

---

## Project Structure

.
├── controllers/
│ ├── updateAdminController.js
│ ├── deleteMessageController.js
│ ├── joinController.js
│ ├── logInController.js
│ ├── newMessageController.js
│ ├── signInController.js
│ └── indexController.js
├── db/
│ └── queries.js
├── middleware/
│ └── authMiddleware.js
├── public/
│ └── (static assets)
├── routes/
│ ├── adminRouter.js
│ ├── deleteMessageRouter.js
│ ├── indexRouter.js
│ ├── joinRouter.js
│ ├── logInRouter.js
│ ├── newMessageRouter.js
│ └── signInRouter.js
├── views/
│ └── (EJS templates)
├── .env
├── app.js
└── package.json

---

## Usage

- Sign up via `/signIn`
- Log in via `/logIn`
- Post messages via `/newMessage` (members only)
- Join membership via `/join` (authenticated users)
- Admin panel `/admin` for managing admin rights (members only)
- Delete messages via `/deleteMessage` (admins only)
- Log out via `/logOut`

---

## Dependencies

- express
- ejs
- pg
- passport
- passport-local
- express-session
- bcryptjs
- dotenv

---

## Notes

- Passwords are hashed with bcryptjs for security.
- User roles are managed via the memberships table