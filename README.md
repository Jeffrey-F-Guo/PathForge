# University Resource Crawler & Extractor

A fullstack web application designed to crawl and extract structured information from university websites. The system combines a modern Next.js frontend with FastAPI-based backend microservices to provide a comprehensive platform for discovering and exploring university resources including research data, course information, and campus events.

## Features

### Frontend
- **Modern Next.js Application**
  - Built with Next.js 16 and React 19
  - Responsive UI with Tailwind CSS
  - Component library using Radix UI
  - Form handling with React Hook Form
  - Type-safe with TypeScript
  - Dark mode support

### Backend
- **Multi-Source Data Extraction**
  - Faculty research information by department
  - Course catalogs and descriptions
  - University events and schedules
  - Customizable extraction patterns

- **FastAPI Microservices Architecture**
  - RESTful API endpoints for each data type
  - Asynchronous processing for efficient crawling
  - CORS-enabled for frontend integration
  - Health monitoring and logging

- **Data Processing Pipeline**
  - CSV export functionality
  - JSON storage capabilities
  - Batch processing support
  - Data validation and cleaning

## Project Structure

```
crawler_scripts/
├── Frontend/                # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   └── public/              # Static assets
├── fastapi_services/        # FastAPI backend microservices
│   ├── crawler_api.py       # Main API server
│   ├── research_extractor/  # Faculty research crawler
│   ├── courses_extractor/   # Course information crawler
│   ├── events_extractor/    # Events crawler
│   └── shared_utils/        # Shared utilities and helpers
├── database_comm/           # Database communication layer
```

## Setup

### Prerequisites

- Python 3.8+
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd crawler_scripts
```

2. **Backend Setup**

Create and activate virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

Install Python dependencies:
```bash
pip install -r fastapi_services/crawl_requirements.txt
pip install -r database_comm/data_requirements.txt
```

Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Frontend Setup**

Navigate to frontend directory and install dependencies:
```bash
cd Frontend
npm install
```

## Usage

### Running the Full Application

For the complete fullstack experience, you need to run both the frontend and backend:

**Terminal 1 - Start the Backend API:**
```bash
cd fastapi_services
uvicorn crawler_api:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

**Terminal 2 - Start the Frontend:**
```bash
cd Frontend
npm run dev
```

The application will be available at `http://localhost:3000`

### API Endpoints (Backend Only)

The backend provides the following REST API endpoints:

#### Health Check
```bash
GET /health
```

#### Extract Research by Department
```bash
GET /extract/research/{department_code}
# Example: GET /extract/research/CSCI
```

#### Extract Courses by Department
```bash
GET /extract/courses/{department_code}
# Example: GET /extract/courses/MATH
```

#### Extract Events
```bash
GET /extract/events
```

#### Extract All Data
```bash
GET /extract/all
```

**Note:** These endpoints are primarily used by the frontend application, but can also be accessed directly for API integration or testing.


## Development

### Project Dependencies

**Frontend:**
- `Next.js 16` - React framework with App Router
- `React 19` - UI library
- `TypeScript` - Type safety
- `Tailwind CSS` - Utility-first CSS framework
- `Radix UI` - Accessible component primitives
- `React Hook Form` - Form management


**Backend:**
- `crawl4ai` - Web crawling framework
- `fastapi` - Web framework for APIs
- `beautifulsoup4` - HTML parsing
- `pydantic` - Data validation
- `langchain` - LLM orchestration

### Adding New Features

**Backend - Adding New Extractors:**
1. Create a new extractor module in `fastapi_services/`
2. Implement the extraction logic
3. Add endpoint in `crawler_api.py`
4. Update configuration if needed

**Frontend - Adding New Components:**
1. Create components in `Frontend/components/`
2. Add pages in `Frontend/app/`
3. Update API calls to connect to backend endpoints
4. Follow the existing component patterns using Radix UI and Tailwind

## Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Component library

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework
- [Crawl4AI](https://github.com/unclecode/crawl4ai) - Web crawling

## Acknowledgments

- Built with [Crawl4AI](https://github.com/unclecode/crawl4ai)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)
- Frontend powered by [Next.js](https://nextjs.org/)
