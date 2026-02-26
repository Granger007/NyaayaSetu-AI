# Installation and Setup Guide

Follow these instructions to get the **NyayaSetu AI** project running locally.

## Prerequisites

### 1. System Requirements
- **Node.js**: v20.0.0 or higher (required for `@types/node ^25.3.0`)
- **Python**: v3.9 or higher (v3.11+ recommended)
- **npm**: v9.0.0 or higher

### 2. Required Tools
- **Git**: For cloning the repository.
- **Virtual Environment**: `venv` or `conda` for Python dependency isolation.

---

## Complete Tech Stack

### Frontend (User Interface)
- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **API Client**: Axios
- **Web Native APIs**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) for multilingual voice-bot support.

### Middle Tier (API Orchestration)
- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Tools**: `ts-node`, `cors`

### Core AI Backend (Logic & Processing)
- **Language**: Python 3.9+
- **API Framework**: FastAPI
- **Web Server**: Uvicorn
- **AI Models**: Google Generative AI (Gemini 2.5 Flash via `google-generativeai` for Multi-language Chat capability, Scheme Mapping, and native PDF parsing)
- **RAG & NLP Frameworks**: Langchain, Boto3 (AWS Bedrock integrations)
- **Vector Database & Embeddings**: FAISS (CPU), `sentence-transformers`
- **Data Validation & Parsing**: Pydantic, `python-multipart` (For handling File & Form payloads)

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd nyayasetu-ai
```

### 2. Backend Setup

The project uses a dual-backend architecture:
1. **Python (FastAPI)**: Handles AI and Legal logic.
2. **Node.js (TypeScript/Express)**: Handles API orchestration.

#### A. Python Backend
1. **Create and Activate Virtual Environment**:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install Python Dependencies**:
   - `boto3 >= 1.34.0`
   - `langchain >= 0.1.0`
   - `fastapi >= 0.109.0`
   - `uvicorn >= 0.27.0`
   - `faiss-cpu >= 1.7.4`
   
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the Python Server**:
   ```bash
   cd backend
   python main.py
   ```
   *Runs at [http://localhost:8000](http://localhost:8000)*

#### B. Node.js Backend
1. **Navigate to Backend Folder**:
   ```bash
   cd backend
   ```
2. **Install Node Dependencies**:
   - `express: ^5.2.1`
   - `cors: ^2.8.6`
   - `typescript: ^5.0.0`
   - `ts-node: ^10.9.2`
   
   ```bash
   npm install
   ```
3. **Start the Node Server**:
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Standard start
   npm start
   ```
   *Runs at [http://localhost:5000](http://localhost:5000)*

---

## 3. Frontend Setup (Next.js)

The UI is built with Next.js and Tailwind CSS.

1. **Navigate to Frontend Folder**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   - `next: ^16.1.6`
   - `react: ^19.2.4`
   - `react-dom: ^19.2.4`
   - `tailwindcss: ^4.2.1`
   - `axios: ^1.13.5`
   - `typescript: ^5.9.3`
   
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *Runs at [http://localhost:3000](http://localhost:3000)*

---

## Running with Automated Scripts
### Windows (Recommended)
Simply double-click `start.bat` in the root directory. 
- It will automatically create a Python virtual environment.
- It will install all backend and frontend dependencies.
- It will open two separate windows for the Python and Node backends.
- It will start the frontend in the original window.

### macOS/Linux
Use the provided shell script:
```bash
chmod +x start.sh && ./start.sh
```

## Environment Variables
Create a `.env` file in the `backend/` directory with:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

## Troubleshooting
- **Node Version**: Ensure Node.js is 20+ to support the latest TypeScript types.
- **Python Command**: Use `python3` and `pip3` if `python` refers to Python 2.x on your system.
- **Error: Cannot find module '@tailwindcss/postcss'**: 
  This happens if dependencies are corrupted or partially installed. Fix it by running:
  ```bash
  cd frontend
  rm -rf node_modules package-lock.json
  npm install
  ```
  (On Windows, manually delete `node_modules` folder and `package-lock.json`, then run `npm install`)
