eduflow-api/
├── config/             # Database and Third-party configurations
│   ├── db.js           # MongoDB connection logic
│   └── gemini.js       # Gemini API setup (optional, but cleaner)
├── controllers/        # The "Brain" - Logic for each route
│   ├── authController.js    # Registration, Login, Refresh Token
│   └── aiController.js      # Prompt engineering & Gemini calls
├── middleware/         # Security and Validation layers
│   ├── authMiddleware.js    # JWT verification (Protects routes)
│   └── rateLimiter.js       # Limits AI calls per user
├── models/             # Database Blueprints (Schemas)
│   ├── User.js              # User info & Auth data
│   └── StudyMaterial.js     # Saved AI notes & Questions
├── routes/             # URL Endpoints
│   ├── authRoutes.js        # /api/auth/...
│   └── aiRoutes.js          # /api/ai/...
├── utils/              # Reusable helper functions
│   └── promptTemplates.js   # Stores the "Instructions" for Gemini
├── .env                # Sensitive API keys (Gitignored)
├── .gitignore          # Tells Git to ignore node_modules and .env
├── package.json        # Dependencies and scripts
└── server.js           # Entry Point (The heart of the API)