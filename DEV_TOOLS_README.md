# Dev Tools

A simple development navigation tool to help you quickly jump between different pages during development and debugging.

## Features

### 🚀 Quick Navigation
- **Login** - Main login page
- **Sign Up** - User registration
- **OTP** - OTP verification page
- **Forgot Password** - Password reset flow
- **Profile Setup** - User profile creation
- **Interests** - Interest selection page
- **Profession** - Profession selection page

### ⚡ Quick Actions
- **Reset All** - Clears all form data and returns to login page

### ⌨️ Keyboard Shortcuts
- **Ctrl/Cmd + D** - Toggle dev tools panel

## Usage

### Opening Dev Tools
1. **Click the 🛠️ button** in the top-right corner
2. **Use keyboard shortcut** Ctrl/Cmd + D

### Navigation
1. Open the dev tools panel
2. Click on any page button to navigate directly
3. The current page is highlighted in blue

### Reset Data
1. Open the dev tools panel
2. Click "Reset All" to clear all form data and return to login

## Auto-populated Data

When navigating to certain pages, the dev tools automatically populate some test data:

- **OTP/Password pages**: Sets email to `test@example.com`
- **Setup pages**: Sets email and username for testing
- **Profession page**: Pre-selects some interests

## Development Only

The dev tools only appear in development mode (`NODE_ENV !== 'production'`) and will be automatically hidden in production builds.

## Styling

The dev tools use a blue theme with:
- Fixed positioning in top-right corner
- Smooth animations and hover effects
- Mobile-responsive design
- High contrast and reduced motion support

## Technical Details

- Built with React and TypeScript
- Uses CSS animations for smooth interactions
- Keyboard event handling for shortcuts
- Conditional rendering based on environment
- Integrates with existing page state management