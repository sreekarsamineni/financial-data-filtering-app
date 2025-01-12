# Financial Data Filtering App

A React application for filtering and visualizing financial data with features including sorting, filtering, and pagination.

## 🚀 Live Demo

Check out the live application: [Financial Data Filtering App](https://sreekarsamineni.github.io/financial-data-filtering-app/)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Financial Modeling Prep API key

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/sreekarsamineni/financial-data-filtering-app.git
   cd financial-data-filtering-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API Key**

   - Sign up for a free API key at [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs/)
   - Create a `.env` file in the project root
   - Add your API key:
     ```
     REACT_APP_FPI_KEY=your_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app

## 🚀 Deployment

### Building for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

### Deploying to GitHub Pages

1. Update the `homepage` field in `package.json`:

   ```json
   {
     "homepage": "https://sreekarsamineni.github.io/financial-data-filtering-app"
   }
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

## 🔧 Technologies Used

- **Frontend Framework**: React
- **Build Tool**: Create React App
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **Data Source**: Financial Modeling Prep API
