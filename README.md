# 🛡️ Enshitification Portal

> A comprehensive consumer protection transparency platform that enables citizens to access complaint data, track safety recalls, monitor fraud reports, and analyze quality decline across industries.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

![Enshitification Portal Screenshot](https://github.com/user-attachments/assets/a662a37d-3620-4e4a-ab77-824be228c162)

## ✨ Features

- 📊 **Live Data Dashboard** - Real-time statistics from 4 major federal agencies
- 🔍 **Smart Search** - Find companies, sectors, and issues instantly
- 📈 **Sector Analysis** - Visual charts showing complaint trends by industry
- 🏢 **Company Rankings** - Grade-based rankings with detailed metrics
- ⚠️ **Recent Alerts** - Latest complaints and recalls with severity indicators
- 🎨 **Modern UI** - Built with government design system principles for accessibility
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

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

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
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
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Netlify (optimized configuration included)

## 📊 Data Sources

This platform aggregates data from four major U.S. federal agencies:

- **CFPB** (Consumer Financial Protection Bureau) - Financial complaints
- **NHTSA** (National Highway Traffic Safety Administration) - Vehicle recalls
- **CPSC** (Consumer Product Safety Commission) - Product safety violations
- **FTC** (Federal Trade Commission) - Fraud and scam reports

## 🎨 Design Philosophy

Built following government design system principles inspired by:
- U.S. Web Design System (USWDS)
- GOV.UK Design System
- California Design System

Focus on:
- ✅ Accessibility (WCAG 2.1 AA compliance)
- ✅ Usability and clarity
- ✅ Trust and transparency
- ✅ Mobile-first responsive design

## 🔒 Security & Privacy

- No user data collection
- No tracking or analytics
- All data sourced from public government databases
- Open source and transparent

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data provided by U.S. federal agencies (CFPB, NHTSA, CPSC, FTC)
- Design inspired by government design systems
- Built for transparency and citizen empowerment

## 📧 Support

If you have questions or need help deploying, please open an issue on GitHub.

---

**Made for government transparency and citizen empowerment** 🇺🇸

*Version 2.0.0 - October 2024*
