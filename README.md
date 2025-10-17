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
- 🔍 **Smart Search** - Find companies, sectors, and issues instantly across all databases
- 📈 **Sector Analysis** - Visual charts showing complaint trends by industry
- 🏢 **Company Rankings** - Grade-based rankings with detailed metrics
- ⚠️ **Recent Alerts** - Latest complaints and recalls with severity indicators

### AI-Powered Features (Google Gemini API)
- 🤖 **AI Complaint Analyzer** - Analyzes trends and identifies recurring issues
- 💬 **Natural Language Search** - Ask questions in plain English about consumer data
- 🚨 **Fraud Pattern Detection** - Identifies emerging scam types and vulnerable demographics
- 🤝 **Consumer Protection Chatbot** - Personalized advice based on complaint data

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

## 📁 Project Structure

```
Enshitification-V2/
├── src/
│   ├── enshitification-portal.tsx  # Main application component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles
├── dist/                           # Production build (generated)
├── index.html                      # HTML template
├── netlify.toml                    # Netlify configuration
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite bundler configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
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
- **API**: [CPSC Recalls API](https://www.cpsc.gov/Recalls)
- **Data**: Product recalls, violations, penalties
- **Stats**: 8K+ violations tracked
- **No API key required**

### 4. FTC - Federal Trade Commission
- **API**: [FTC Consumer Sentinel API](https://api.ftc.gov/)
- **Data**: Fraud reports, robocall complaints, identity theft
- **Stats**: 5.8M+ fraud/scam complaints
- **DEMO_KEY available for testing**

## 🤖 AI Features Powered by Google Gemini

### 1. AI Complaint Analyzer
Analyzes consumer complaints to identify:
- Top 3 recurring issues for any company
- Severity assessment (Low/Medium/High/Critical)
- Trend analysis (Improving/Stable/Worsening)
- Personalized consumer recommendations

### 2. Natural Language Query
Ask questions like:
- "What are the most common complaints about Wells Fargo?"
- "Show me recent recalls in the automotive sector"
- "Which companies have the worst fraud records?"

### 3. Fraud Pattern Detection
AI-powered analysis of FTC data to identify:
- Emerging scam types
- Geographic hotspots
- Most vulnerable demographics
- Preventive recommendations

### 4. Consumer Protection Chatbot
Get personalized advice based on real complaint data:
- Risk assessments for specific companies
- Guidance on filing complaints
- Understanding your consumer rights

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
