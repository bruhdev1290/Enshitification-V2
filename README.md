# 🛡️ The Enshitification Portal

> **"They don't do it like they used to..."**
>
> Open-source government transparency platform tracking quality decline and consumer protection issues across industries using real-time federal data and AI-powered analysis.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

![Enshitification Portal Screenshot](https://github.com/user-attachments/assets/a662a37d-3620-4e4a-ab77-824be228c162)

## 🎯 Open Source Hackfest 2024

This project is built for **Open Source Hackfest**, competing in:
- 🏆 **Code for Good** - Using open source tools for consumer protection and social impact
- 🤖 **Best Use of Gemini API** - AI-powered complaint analysis and trend prediction
- 📚 **Best Documentation** - Comprehensive docs following government design standards

## 🔍 What Problem Does This Solve?

- **Consumers lack centralized access** to government complaint data across agencies
- **Quality decline goes unnoticed** until it's too late
- **No AI-powered tools** to predict emerging consumer issues and fraud patterns
- **Fraud and scams are hard to track** across multiple federal databases

## ✨ Features

### Core Platform
- 📊 **Live Data Dashboard** - Real-time statistics from 4 major federal agencies (CFPB, NHTSA, CPSC, FTC)
- 🔍 **Enhanced Smart Search** - Advanced search with filtering, sorting, and live API integration
- 📈 **Sector Analysis** - Visual charts showing complaint trends by industry
- 🏢 **Company Rankings** - Grade-based rankings with detailed metrics
- ⚠️ **Recent Alerts** - Latest complaints and recalls with severity indicators

### Enhanced Search Capabilities
- 🎯 **Advanced Filters** - Filter by sector (Financial, Automotive, Consumer Products, Technology, Healthcare)
- 📊 **Dynamic Sorting** - Sort results by Most Complaints, Most Recalls, or Company Name
- 🔄 **Real-Time Search** - Instant results as you type with result counters
- ⌨️ **Keyboard Navigation** - Press Enter to search quickly
- 📡 **Live API Integration** - Fetches real-time data from CFPB, NHTSA, FTC, and CPSC federal databases
- 🎨 **Collapsible Filters** - Toggle advanced filters panel for cleaner interface
- ⚡ **Loading States** - Visual feedback during API calls and processing

### AI-Powered Features (Google Gemini API)
- 🤖 **AI Complaint Analyzer** - Analyzes trends and identifies recurring issues
- 💬 **Natural Language Search** - Ask questions in plain English like "Which financial companies have the most complaints?"
- 🚨 **Fraud Pattern Detection** - Identifies emerging scam types and vulnerable demographics
- 🤝 **Consumer Protection Chatbot** - Personalized advice based on complaint data
- ✨ **AI Search Toggle** - Enable/disable AI-powered search with visual indicator
- 🧠 **Smart Intent Detection** - AI understands search context and provides relevant results

### Design & Accessibility
- 🎨 **Government Design Systems** - Follows USWDS, GOV.UK, and California DS standards
- ♿ **WCAG 2.1 AA Compliant** - Fully accessible interface
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- **Google Gemini API Key** - [Get it here](https://makersuite.google.com/app/apikey)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/bruhdev1290/Enshitification-V2.git
   cd Enshitification-V2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_FTC_API_KEY=DEMO_KEY  # Optional
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deploy to Netlify

### One-Click Deploy

Click the button below to deploy this project to Netlify instantly:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bruhdev1290/Enshitification-V2)

### Manual Deployment

1. **Fork this repository** to your GitHub account

2. **Sign up/Login to [Netlify](https://www.netlify.com/)**

3. **Create a new site from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your forked repository

4. **Configure build settings** (these are already set in `netlify.toml`):
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Node version: `18`

5. **Deploy!**
   - Click "Deploy site"
   - Your site will be live in minutes with a unique URL
   - You can customize the domain in site settings

### Continuous Deployment

Once connected to Netlify, every push to the main branch automatically triggers a new deployment. No manual intervention needed!

## 🔍 Enhanced Search Features

### Overview
The search functionality has been completely overhauled with advanced features, live API integration, and AI-powered natural language processing.

### Key Features

#### 1. Advanced Filtering & Sorting
- **Sector Filter**: Filter results by Financial, Automotive, Consumer Products, Technology, or Healthcare sectors
- **Dynamic Sorting**: Sort by Most Complaints, Most Recalls, or Company Name (A-Z)
- **Collapsible Panel**: Toggle advanced filters to keep the interface clean
- **Real-time Updates**: Filters apply instantly as you change selections

#### 2. Live API Integration
The search now queries real federal databases:
- **CFPB API** (`src/services/cfpbAPI.ts`): Fetches live consumer complaint data
- **NHTSA API** (`src/services/nhtsaAPI.ts`): Retrieves current vehicle recall information
- **Automatic Fetching**: APIs are called automatically when you search
- **Error Handling**: Graceful fallbacks if APIs are unavailable

#### 3. AI-Powered Natural Language Search
When enabled (requires Gemini API key):
- **Conversational Queries**: Ask questions like "show me automotive recalls"
- **Intent Detection**: AI understands what you're looking for
- **Smart Results**: Get contextually relevant data
- **Visual Feedback**: See AI's interpretation of your search

#### 4. User Experience Enhancements
- **Keyboard Support**: Press Enter to trigger search
- **Loading States**: Visual spinner during API calls
- **Result Counters**: See how many companies, events, and sectors match
- **Empty States**: Clear messaging when no results found
- **Responsive Design**: Works perfectly on mobile devices

### Search Interface Screenshots

**Enhanced Search with Advanced Filters**

![Enhanced Search Interface](https://github.com/user-attachments/assets/bd9866f5-0732-4b79-a893-7e3ce5ac11a5)

*Toggle filters to refine your search by sector and sort results dynamically*

**Live Search Results**

![Search Results for Wells Fargo](https://github.com/user-attachments/assets/62b124af-fc1b-41e8-bdbc-d45ddbe8b198)

*Real-time filtering showing companies, events, and sectors matching your query*

### How to Use the Search

1. **Basic Search**: Type a company name or sector in the search box
2. **Advanced Filters**: Click the "Filters" button to show filtering options
3. **AI Search**: Click the sparkles ✨ button to enable natural language queries
4. **Sort Results**: Use the "Sort Results By" dropdown to organize data
5. **View Results**: See filtered companies, events, and sectors below

### Example Queries

**Standard Search:**
- `Wells Fargo` - Find all data related to Wells Fargo
- `Financial` - Show all financial sector companies
- `NHTSA recalls` - Filter by NHTSA recall events

**AI-Powered Search** (requires Gemini API key):
- `Which financial companies have the most complaints?`
- `Show me automotive recalls`
- `What are recent fraud reports?`

## 📁 Project Structure

```
Enshitification-V2/
├── src/
│   ├── enshitification-portal.tsx  # Main application component with enhanced search
│   ├── services/
│   │   ├── geminiAI.ts            # Google Gemini AI integration
│   │   ├── cfpbAPI.ts             # CFPB API service (live data)
│   │   ├── nhtsaAPI.ts            # NHTSA API service (live data)
│   │   ├── ftcAPI.ts              # FTC API service (live data)
│   │   ├── cpscAPI.ts             # CPSC Recall Retrieval API service (NEW!)
│   │   └── cpscAPI.demo.ts        # CPSC API usage examples
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles
├── docs/
│   ├── API_INTEGRATION.md          # Complete API integration guide
│   ├── CPSC_API_INTEGRATION.md     # CPSC API documentation (NEW!)
│   └── CPSC_INTEGRATION_EXAMPLE.md # CPSC integration examples (NEW!)
├── dist/                           # Production build (generated)
├── index.html                      # HTML template
├── netlify.toml                    # Netlify configuration
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite bundler configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── .env.example                    # Environment variables template
├── CODE_OF_CONDUCT.md              # Community standards
├── CONTRIBUTING.md                 # Contribution guidelines
├── DEPLOYMENT.md                   # Deployment guide
└── README.md                       # You are here!
```

## 🔧 Technology Stack

- **Framework**: React 18 with TypeScript
- **AI Integration**: Google Gemini API for intelligent analysis
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **APIs**: CFPB, NHTSA, CPSC, FTC federal databases
- **Deployment**: Netlify (optimized configuration included)
- **Design Systems**: USWDS, GOV.UK, California DS, Massachusetts Mayflower

## 📊 Data Sources

This platform aggregates data from four major U.S. federal agencies:

### 1. CFPB - Consumer Financial Protection Bureau
- **API**: [CFPB Consumer Complaint Database API](https://cfpb.github.io/api/ccdb/)
- **Data**: Financial complaints, company responses, resolution rates
- **Stats**: 1.8M+ complaints tracked
- **No API key required**

### 2. NHTSA - National Highway Traffic Safety Administration
- **API**: [NHTSA Datasets and APIs](https://www.nhtsa.gov/nhtsa-datasets-and-apis)
- **Data**: Vehicle safety recalls, defect investigations
- **Stats**: 14K+ recalls tracked
- **No API key required**

### 3. CPSC - Consumer Product Safety Commission
- **API**: [CPSC Recall Retrieval API](https://www.saferproducts.gov/RestWebServices/)
- **Data**: Product recalls, hazards, injuries, manufacturer information
- **Implementation**: Full TypeScript support with XML/JSON formats in `src/services/cpscAPI.ts`
- **Stats**: 8K+ violations tracked
- **No API key required**
- **Documentation**: See [CPSC API Integration Guide](docs/CPSC_API_INTEGRATION.md)

### 4. FTC - Federal Trade Commission
- **API**: [FTC Consumer Sentinel API](https://api.ftc.gov/)
- **Data**: Fraud reports, robocall complaints, identity theft
- **Stats**: 5.8M+ fraud/scam complaints
- **DEMO_KEY available for testing**

## 🤖 AI Features Powered by Google Gemini

### Implementation Status
All AI features are fully implemented in `src/services/geminiAI.ts` with complete error handling and graceful fallbacks.

### 1. AI Complaint Analyzer
Analyzes consumer complaints to identify:
- Top 3 recurring issues for any company
- Severity assessment (Low/Medium/High/Critical)
- Trend analysis (Improving/Stable/Worsening)
- Personalized consumer recommendations

**Usage**: Enable AI search toggle and query company complaint data

### 2. Natural Language Search (Implemented)
Ask questions in plain English and get intelligent results:
- "What are the most common complaints about Wells Fargo?"
- "Show me recent recalls in the automotive sector"
- "Which companies have the worst fraud records?"
- "Which financial companies have the most complaints?"

**How it works**: AI parses your natural language query, detects intent, and filters results accordingly

### 3. Fraud Pattern Detection
AI-powered analysis of FTC data to identify:
- Emerging scam types
- Geographic hotspots
- Most vulnerable demographics
- Preventive recommendations

**Usage**: Query fraud-related data from FTC database

### 4. Consumer Protection Chatbot
Get personalized advice based on real complaint data:
- Risk assessments for specific companies
- Guidance on filing complaints
- Understanding your consumer rights

**Usage**: Ask questions about specific companies or consumer protection topics

### Using AI Features

To enable AI-powered features:

1. **Get API Key**: Sign up for [Google Gemini API](https://makersuite.google.com/app/apikey)
2. **Add to .env**: Set `VITE_GEMINI_API_KEY=your_key_here`
3. **Toggle AI Search**: Click the sparkles ✨ icon in the search interface
4. **Ask Questions**: Use natural language queries

**Note**: The app works without AI features but provides enhanced intelligence when configured.

## 🎨 Design Philosophy

Built following government design system principles inspired by:
- U.S. Web Design System (USWDS)
- GOV.UK Design System
- California Design System
- Massachusetts Mayflower Design System

### Design Highlights
- **Color Palette**: Unit-Connect green gradient hero, CFPB professional tables, Massachusetts bay blue accents
- **Typography**: Public Sans (California DS standard)
- **Accessibility**: WCAG 2.1 AA compliance
- **Components**: UK GOV.UK beta banner, left-bordered cards, government-style data tables

Focus on:
- ✅ Accessibility (WCAG 2.1 AA compliance)
- ✅ Usability and clarity
- ✅ Trust and transparency
- ✅ Mobile-first responsive design

## 🏆 Why This Project Matters

### Code for Good Impact
- **Real consumer protection** - Helps vulnerable populations avoid fraud and unsafe products
- **Open source tools** - Built entirely with open source technologies
- **Social impact** - Empowers millions of consumers with government data
- **Community driven** - Welcomes contributors and scales to additional data sources

### Innovation with AI
- **First of its kind** - Only platform combining 4 federal agencies with AI analysis
- **Predictive insights** - Gemini AI identifies emerging issues before they escalate
- **Natural language** - Makes complex government data accessible to everyone
- **Personalized advice** - Tailored recommendations based on real complaint patterns

## 🔒 Security & Privacy

- No user data collection
- No tracking or analytics
- All data sourced from public government databases
- Open source and transparent

## 🤝 Contributing

Contributions are welcome! We're building a platform to empower consumers through transparency.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas We Need Help
- 🔌 Additional data source integrations (FDA, EPA, etc.)
- 🤖 AI model improvements and new Gemini features
- ♿ Accessibility enhancements
- 🌍 Translation/internationalization
- 📊 Data visualization improvements
- 🧪 Test coverage expansion

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📋 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data provided by U.S. federal agencies (CFPB, NHTSA, CPSC, FTC)
- AI powered by [Google Gemini API](https://ai.google.dev/)
- Design inspired by government design systems (USWDS, GOV.UK, California DS, Massachusetts Mayflower)
- Built for [Open Source Hackfest 2024](https://hackfest.dev/)
- Built for transparency and citizen empowerment

## 📺 Demo Video

Watch our 2-minute demo showcasing the platform's features and AI capabilities: [Coming Soon]

## 🎯 Project Goals

This project was created for **Open Source Hackfest 2024** with these goals:

1. **Empower Consumers** - Provide free access to critical government safety and complaint data
2. **Democratize AI** - Make advanced AI analysis accessible for consumer protection
3. **Open Source Impact** - Build a scalable, community-driven platform for social good
4. **Government Transparency** - Aggregate and visualize data from multiple federal agencies
5. **Prevent Harm** - Help consumers avoid fraud, recalls, and unsafe products

## 📧 Support

If you have questions or need help:
- 💬 Open an issue on GitHub
- 📖 Check our [documentation](DEPLOYMENT.md)
- 🤝 Read our [contributing guidelines](CONTRIBUTING.md)

---

**Made for government transparency and citizen empowerment** 🇺🇸

*Built for Open Source Hackfest 2024 | Version 2.0.0*
