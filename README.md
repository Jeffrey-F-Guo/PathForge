PathForge
A comprehensive CS career roadmap platform specifically designed for Western Washington University students, featuring intelligent prerequisite validation and automated resource sequencing to create academically sound academic plans.
Project Overview
PathForge differentiates itself from generic platforms like roadmap.sh through deep integration with WWU-specific data. The platform prevents students from creating academically impossible plans through intelligent prerequisite validation and provides pre-scraped, up-to-date university resources for a seamless user experience.
Key Features

Interactive Roadmap Builder: Drag-and-drop course planning with react-flow
Real-time Prerequisite Validation: Python-based graph algorithms ensure academic feasibility
WWU-Specific Data Integration: Automated scraping of courses, research labs, and campus events
Career Path Explorer: Compare 12 different CS career paths with detailed progression timelines
Curated Learning Resources: Hand-picked courses, books, and tools vetted by successful students
Personalized Career Quiz: AI-powered recommendations based on student interests and goals


Backend Architecture
FastAPI Microservice (Python)
Handles all web scraping and data extraction:

Research Extractor: Scrapes faculty research information by department
Events Extractor: Crawls campus events with deep link following
Courses Extractor: Extracts course catalogs with prerequisites and descriptions
Tech Stack:

Crawl4AI with Chromium for web scraping
Pydantic for data validation
LangChain + Google Gemini for LLM-based extraction
BeautifulSoup for HTML parsing

Database: PostgreSQL via Supabase (hosted)
API Layer: RESTful endpoints for resource access
ETL Pipeline: Webhook-triggered processing of scraped data
Models: Research labs, courses, events

Deployment

Platform: AWS EC2 (t3.small/medium)
Containerization: Docker
Scheduled Crawling: Cron jobs for weekly data updates
Storage: Supabase for database and file storage

🚀 Getting Started
Prerequisites

Node.js 18+ (for frontend)
Python 3.11+ (for backend services)
PostgreSQL (or Supabase account)
Docker (optional, for deployment)

Frontend Setup
bashcd Frontend
npm install
npm run dev
The application will be available at http://localhost:3000
FastAPI Microservice Setup
bashcd fastapi_services
pip install -r crawl_requirements.txt
crawl4ai-setup

# Set up environment variables
cp .env.example .env
# Add your GOOGLE_API_KEY and SUPABASE credentials

# Run the service
uvicorn crawler_api:app --reload --port 8000
Django Backend Setup
bashcd college_planner
pip install -r requirements.txt

# Set up database
python manage.py migrate

# Run development server
python manage.py runserver 8001
```

## 📡 API Endpoints

### FastAPI Microservice (`http://localhost:8000`)

- `GET /health` - Health check
- `GET /extract/research/{department_code}` - Extract faculty research for a department
- `GET /extract/events` - Extract campus events
- `GET /extract/courses/{department_code}` - Extract course catalog
- `GET /extract/all` - Run all extractors (for scheduled jobs)

### Django API (`http://localhost:8001`)

- `GET /api/health/` - Health check (includes microservice status)
- `GET /api/research/{department}/` - Get research data
- `GET /api/course/{department}/` - Get course data
- `GET /api/events/` - Get events data

## 🗂️ Project Structure
```
pathforge/
├── Frontend/                    # Next.js frontend
│   ├── app/                    # App router pages
│   │   ├── landing.tsx        # Landing page
│   │   ├── paths/             # Career paths
│   │   ├── quiz/              # Career quiz
│   │   ├── resources/         # Resource browser
│   │   └── roadmap/           # Roadmap builder
│   ├── components/            # Reusable components
│   └── lib/                   # Data and utilities
│
├── fastapi_services/          # Web scraping microservice
│   ├── research_extractor/   # Faculty research scraper
│   ├── events_extractor/     # Campus events scraper
│   ├── courses_extractor/    # Course catalog scraper
│   ├── shared_utils/         # Common utilities
│   └── crawler_api.py        # FastAPI application
│
└── college_planner/          # Django backend
    ├── planner/              # Main app
    │   ├── models.py        # Database models
    │   ├── views.py         # API endpoints
    │   └── services/        # Business logic
    └── manage.py
🔧 Technology Stack
Frontend

Framework: Next.js 14 with App Router
Language: TypeScript
Styling: Tailwind CSS with custom design system
UI Components: shadcn/ui
Visualization: react-flow (for roadmaps)
Icons: Lucide React

Backend

Web Scraping: Crawl4AI, BeautifulSoup4
API Framework: FastAPI (microservice), Django (main backend)
Database: PostgreSQL (via Supabase)
LLM Integration: LangChain + Google Gemini 2.5 Flash
Validation: Pydantic
HTTP Client: httpx

DevOps

Deployment: AWS EC2 with Docker
Scheduling: Cron jobs for weekly crawls
Storage: Supabase Storage for scraped data
Environment: python-dotenv for configuration

🎨 Design Principles

User-Centric: Pre-scraped resources eliminate wait times
WWU-Specific: Deep integration with university data sources
Validated Paths: Graph-based prerequisite checking prevents impossible plans
Clean & Modern: Warm color palette with professional card-based layouts
Accessible: WCAG-compliant design with proper semantic HTML

📊 Data Sources

Course Catalogs: catalog.wwu.edu
Faculty Research: Department websites (CS, DS, M/CS)
Campus Events: win.wwu.edu/events
Career Data: Curated internal database


👨‍💻 Development
Built as both a practical tool for WWU students and a portfolio piece demonstrating full-stack development capabilities with:

Modern React patterns and Next.js best practices
Scalable microservice architecture
AI-powered data extraction
Real-world deployment experience with AWS

📝 License
This project is currently unlicensed. All rights reserved.
🙏 Acknowledgments

Western Washington University for providing public data sources
The CS department for inspiration and support
Fellow students for feedback and testing
