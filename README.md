News Aggregator API
A RESTful API that aggregates news articles based on user preferences, built with Node.js, Express, and MongoDB.
---

Tech Stack

Runtime: Node.js
Framework: Express.js
Database: MongoDB (Atlas) + Mongoose
Authentication: JWT (jsonwebtoken)
Password Hashing: bcrypt
Validation: express-validator
HTTP Client: axios
News Source: NewsAPI
---
Getting Started
Prerequisites
Node.js v16+
MongoDB Atlas account
NewsAPI key (get one free at newsapi.org)
Installation
```bash
git clone <your-repo-url>
cd news-aggregator-api
npm install
```
Environment Variables
Create a `.env` file in the root of your project:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
NEWS_API_KEY=your_newsapi_key
PORT=3000
```
Run the Server
```bash
node app.js
```
Server will start at `http://localhost:3000`
---
API Endpoints
Auth Routes — `/users`
Method	Endpoint	Description	Auth Required
POST	`/users/register`	Register a new user	No
POST	`/users/login`	Login and get JWT token	No
Register — `POST /users/register`
Request Body:
```json
{
  "name": "Chaithanya",
  "email": "chai@example.com",
  "password": "123456",
  "preferences": ["technology", "sports"]
}
```
Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "abc123",
    "name": "Chaithanya",
    "email": "chai@example.com",
    "preferences": ["technology", "sports"]
  }
}
```
Login — `POST /users/login`
Request Body:
```json
{
  "email": "chai@example.com",
  "password": "123456"
}
```
Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
---
Preference Routes — `/users/preferences`
> All routes require `Authorization: Bearer <token>` header.
Method	Endpoint	Description	Auth Required
GET	`/users/preferences`	Get user's preferences	Yes
PUT	`/users/preferences`	Update user's preferences	Yes
Get Preferences — `GET /users/preferences`
Response:
```json
{
  "preferences": ["technology", "sports"]
}
```
Update Preferences — `PUT /users/preferences`
Request Body:
```json
{
  "preferences": ["technology", "health", "science"]
}
```
Response:
```json
{
  "message": "Preferences updated successfully",
  "preferences": ["technology", "health", "science"]
}
```
---
News Routes — `/news`
> All routes require `Authorization: Bearer <token>` header.
Method	Endpoint	Description	Auth Required
GET	`/news`	Fetch news based on user preferences	Yes
GET	`/news/search`	Search news articles by keyword	Yes
Get News — `GET /news`
Fetches top headlines based on the user's saved preferences.
Query Parameters (optional):
Param	Default	Description
`category`	user preference	News category
`language`	`en`	Language code
`pageSize`	`10`	Number of articles
`page`	`1`	Page number
Example: `GET /news?category=technology&pageSize=5`
Response:
```json
{
  "totalResults": 38,
  "news": [
    {
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://example.com/article",
      "source": "TechCrunch",
      "publishedAt": "2024-06-04T10:00:00Z",
      "urlToImage": "https://example.com/image.jpg"
    }
  ]
}
```
Search News — `GET /news/search`
Query Parameters:
Param	Description
`q`	Search keyword
`language`	Language code
`pageSize`	Number of articles
`page`	Page number
Example: `GET /news/search?q=artificial+intelligence`
---
Project Structure
```
news-aggregator-api/
├── app.js                    # Entry point
├── db.js                     # MongoDB connection
├── .env                      # Environment variables
├── package.json
├── Controllers/
│   ├── authController.js     # Register & Login logic
│   ├── preferenceController.js
│   └── newController.js      # News fetching logic
├── Models/
│   └── UserModel.js          # Mongoose User schema
├── Middleware/
│   ├── authMiddleware.js     # JWT protect middleware
│   └── validateMiddleware.js # express-validator rules
└── routes/
    ├── authRoutes.js
    ├── preferenceRoutes.js
    └── newsRoutes.js
```
---
Error Handling
The API returns consistent error responses:
```json
{
  "error": "Error message here"
}
```
Status Code	Meaning
200	Success
201	Resource created
400	Bad request / Validation error
401	Unauthorized / Invalid token
404	Route not found
500	Internal server error
---
Testing with Thunder Client / Postman
Register a user via `POST /users/register`
Login via `POST /users/login` — copy the returned `token`
For protected routes, add header:
```
   Authorization: Bearer <your_token>
   ```
Call `/news` or `/users/preferences`
