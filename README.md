DevLink – Connect with Fellow Developers

DevLink is a connection-based social app designed to help developers discover, connect, and collaborate with other like-minded individuals in the tech community — similar to a Tinder-style experience for devs.

🚀 Features

🔐 Authentication (Signup/Login/Logout via JWT + Cookies)

👤 Profile Management (View, Edit, Update Password)

🤝 Request System (Like, Pass, Accept, Reject)

📥 View Received Requests

🧑‍🤝‍🧑 View All Connections

🧾 Feed (Filtered to hide requests/connections/blocked)

🚫 Block Users

📜 View Blocked Users

🔒 Control Profile Visibility (enhancement)

📄 Paginated Feed (enhancement)

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT (stored in cookies)

Validation: Validator.js

Environment: Postman (for testing)

## 📁 API Endpoints

### 🔑 Auth APIs
| Method | Endpoint  | Description              |
| :----: | --------- | ------------------------ |
| POST   | `/signup` | Register a new user      |
| POST   | `/login`  | Login & receive JWT      |
| POST   | `/logout` | Logout and clear cookie  |

### 👤 Profile APIs
| Method | Endpoint              | Description                 |
| :----: | --------------------- | --------------------------- |
| GET    | `/profile/view`       | View logged‑in user data    |
| PATCH  | `/profile/edit`       | Edit user details           |
| PATCH  | `/profile/password`   | Update password             |

### 🤝 Request APIs
| Method | Endpoint                                         | Description                     |
| :----: | ------------------------------------------------ | ------------------------------- |
| POST   | `/request/send/:status/:userId`                  | Send a request (`like` / `pass`)|
| PATCH  | `/request/review/:status/:requestId`             | Accept or reject a request      |
| GET    | `/requests/received`                             | View received “like” requests   |

### 🧑‍🤝‍🧑 Connection APIs
| Method | Endpoint               | Description                     |
| :----: | ---------------------- | ------------------------------- |
| GET    | `/user/connections`    | View all accepted connections   |

### 🧭 Feed APIs
| Method | Endpoint      | Description                                                      |
| :----: | ------------- | ---------------------------------------------------------------- |
| GET    | `/user/feed`  | Show discoverable users (excludes self, liked/passed, matched, blocked) |

### 🚫 Block APIs
| Method | Endpoint                 | Description           |
| :----: | ------------------------ | --------------------- |
| PATCH  | `/user/block/:userId`    | Block a user          |
| GET    | `/user/blocked`          | View blocked‑users list|

---

## 🔐 Authentication Strategy

- JWT tokens are stored in **HTTP‑only cookies**.  
- All protected routes use a custom `auth` middleware to verify the token and attach `req.user`.



📄 Project Structure

/models
  - userSchema.js
  - connectionSchema.js

/routes
  - authRouter.js
  - userRouter.js
  - requestRouter.js

/middleware
  - auth.js

index.js

.env


README.md

🧪 Testing

All routes tested using Postman.

Error handling and duplicate request prevention included.

Schema validations via Mongoose + Validator.js.

🌱 Future Enhancements (optional)
🧭 In-app messaging

🧠 AI-based recommendations

🌐 OAuth login (Google/GitHub)

🧑‍💻 Author
Made with ❤️ by Rohit

