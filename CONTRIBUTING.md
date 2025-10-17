# 🤝 Contributing to Enshitification Portal

Thank you for your interest in contributing! This guide will help you get started.

## Quick Start for Contributors

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Git
- A code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork:
     ```bash
     git clone https://github.com/YOUR-USERNAME/Enshitification-V2.git
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
   - Open http://localhost:5173
   - Changes auto-reload!

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Making Changes

1. **Edit files** in the `src/` directory
2. **See changes live** in your browser (hot reload enabled)
3. **Test your changes** thoroughly

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic

### Project Structure

```
src/
├── enshitification-portal.tsx  # Main component with all UI
├── main.tsx                    # App entry point
└── index.css                   # Global styles (Tailwind)
```

### Testing Your Changes

Before committing:

1. **Build the project**
   ```bash
   npm run build
   ```
   - Ensure no errors

2. **Preview production build**
   ```bash
   npm run preview
   ```
   - Test at http://localhost:4173

3. **Check for issues**
   - Test search functionality
   - Verify responsive design (resize browser)
   - Check all interactive elements

## Submitting Changes

### Commit Guidelines

- Use clear, descriptive commit messages
- Format: `Add feature X` or `Fix bug in Y` or `Update Z`
- Keep commits focused and atomic

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template:
     - What changes did you make?
     - Why are these changes needed?
     - How did you test them?
     - Screenshots (if UI changes)

3. **Wait for review**
   - Address any feedback
   - Update your PR if requested

## Types of Contributions

### 🐛 Bug Fixes
- Found a bug? Open an issue first
- Then submit a PR with the fix

### ✨ New Features
- Discuss in an issue before starting
- Ensure it aligns with project goals
- Update documentation if needed

### 📚 Documentation
- Improve README
- Add code comments
- Fix typos
- Create guides

### 🎨 Design Improvements
- UI/UX enhancements
- Accessibility improvements
- Responsive design fixes

### 🔧 Performance Optimizations
- Faster load times
- Better data handling
- Code efficiency

## Code of Conduct

### Be Respectful
- Be kind and courteous
- Accept constructive criticism
- Focus on what's best for the community

### Be Collaborative
- Help others learn
- Share knowledge
- Give credit where due

## Need Help?

- 💬 Ask questions in issues
- 📧 Contact maintainers
- 📖 Read the documentation

## Recognition

Contributors will be:
- Listed in the repository contributors
- Credited in release notes
- Appreciated by the community! 🎉

---

**Thank you for contributing to transparency and civic empowerment!** 🇺🇸
