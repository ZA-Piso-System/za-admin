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

### 3. Start the development server:
```
pnpm run dev
```

## 🌐 Environment Variables
Make sure to set the following environment variables in your `.env.local` file:
```
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
ALLOWED_ORIGINS=localhost
```
