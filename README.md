## 🧰 Prerequisites
Make sure you have the following installed:
- Node.js (latest LTS version)
- Git

### Verify installation
```
node -v
npm -v
git -v
```

## 📦 Install pnpm
```
npm install -g pnpm
```

### Verify installation
```
pnpm -v
```

## ⚙️ Running the App Locally
### 1. Clone the repository:
```
git clone git@github.com:ZA-Piso-System/za-admin.git
cd za-admin
```

### 2. Install dependencies:
```
pnpm install
```

## 🌐 Environment Setup
### 3. Create .env.local file
Copy the example below and create a `.env.local` file in the root directory:
```
cp .env.local.example .env.local
```

### 4. Configure environment variables
```
NEXT_PUBLIC_APP_NAME=ZA Piso System
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_API_URL_COIN_SLOT=http://localhost:5001/api/v1

ALLOWED_ORIGINS=localhost
```

## 🚀 Start the App
### 5. Start the development server:
```
pnpm run dev
```
