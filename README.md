# PrepWise - AI-Powered Mock Interview Platform

![PrepWise Logo](public/logo.svg)

## 🎯 Overview

PrepWise is a comprehensive AI-powered mock interview platform designed for business school students. This project represents a complete implementation of 15 pages from Figma designs to production-ready React code.

## 🚀 Features

### For Students
- **AI-Powered Interview Simulation** - Practice with realistic interview scenarios
- **Document Upload & Review** - Get AI feedback on CVs and cover letters
- **Performance Analytics** - Track progress with detailed score breakdowns
- **Job Role Selection** - Choose from various career paths
- **Real-time Video Interface** - Simulate actual interview conditions

### For Administrators
- **Student Management** - Monitor and manage student accounts
- **Analytics Dashboard** - View platform usage statistics
- **Performance Tracking** - Monitor student progress and engagement

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Inline styles (no CSS frameworks)
- **Icons**: Custom SVG icons
- **Animations**: Native React hooks and SVG animations

## 📁 Project Structure

```
prepwise/
├── public/
│   ├── logo.svg
│   ├── hero-bg.jpg
│   └── icons/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── landing/
│   │   ├── login/
│   │   └── upload/
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── AdminDashboardPage.tsx
│   │   └── ... (15 total pages)
│   └── App.tsx
└── Documentation/
    ├── CLAUDE.md
    ├── Figma_to_code_best_practices.md
    └── prepwise_claude_dev_journey.md
```

## 🎨 Pages Implemented

1. **Landing Page** - Marketing page with hero section
2. **Login/Register** - Authentication flow
3. **User Dashboard** - Logged-in landing page
4. **Document Upload** - Multi-file upload interface
5. **Interview Sessions** - History and tracking
6. **CV Review** - AI-powered document analysis
7. **Job Role Selection** - Career path selection
8. **Interview Simulation** - Live interview interface
9. **Interview Complete** - Success confirmation
10. **Score Breakdown** - Performance analytics
11. **Detailed Suggestions** - AI feedback
12. **Admin Dashboard** - Platform statistics
13. **Student Management** - User administration

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adamzetos/prepwise.git

# Navigate to project directory
cd prepwise

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📚 Documentation

- **[Development Journey](prepwise_claude_dev_journey.md)** - Complete development process documentation
- **[Figma to Code Best Practices](Figma_to_code_best_practices.md)** - Guidelines for design implementation (EN/CN)
- **[Project Guidelines](CLAUDE.md)** - Technical specifications and patterns

## 🎯 Design Philosophy

This project demonstrates:
- **Pixel-Perfect Implementation** - Exact match to Figma designs
- **Component Reusability** - Efficient code structure
- **Performance Optimization** - Smooth animations and transitions
- **Clean Code Practices** - Maintainable and scalable architecture

## 🤝 Contributing

This project was built as a demonstration of Figma-to-code implementation. For contributions:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- Built with Claude Code (Anthropic)
- Designed for business school students
- Inspired by the need for better interview preparation tools

---

**Classification**: ADAMCHINS-CONFIDENTIAL ▲  
**Status**: Complete Implementation - Ready for Next Phase