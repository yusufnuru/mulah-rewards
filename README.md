# Loyalty Points Checker

A mobile-optimized loyalty points checking application built as part of a Full Stack Developer Assessment.

## Project Overview

This application consists of three main pages:
- **Page 1**: Phone number input and loyalty points verification
- **Page 2**: User information collection (name, birthday, email)
- **Page 3**: Data display and confirmation

## Features

### Page 1 - Phone Number Verification
- Accepts only numerical inputs
- Validates specific phone number format (+60173527250)
- Mobile-optimized design (640x1136px)
- Navigates to Page 2 upon successful verification

### Page 2 - User Information Collection
- Form inputs for:
  - Full name
  - Birthday
  - Email address
- Input validation and error handling
- Consistent styling with Page 1

### Page 3 - Data Display
- Displays all collected information:
  - Phone number (from Page 1)
  - Name, email, birthday (from Page 2)
- Summary view with aesthetic presentation
- Consistent design language throughout

## Technical Specifications

- **Dimensions**: 640px (width) × 1136px (height)
- **Mobile-first responsive design**
- **Technologies**: HTML5, CSS3, JavaScript
- **Framework**: Vue 3 with Vite
- **Styling**: Custom CSS with mobile optimization

## Design Requirements

- Visually aesthetic and professional appearance
- Consistent styling across all three pages
- Mobile-optimized interface
- Smooth navigation between pages
- Form validation and user feedback

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- pnpm package manager

### Installation

```sh
pnpm install
```

### Development Server

```sh
pnpm dev
```

### Build for Production

```sh
pnpm build
```

### Type Checking

```sh
pnpm type-check
```

## Project Structure

```
src/
├── components/
│   ├── Page1PhoneInput.vue
│   ├── Page2UserInfo.vue
│   └── Page3DataDisplay.vue
├── views/
├── router/
├── assets/
└── App.vue
```

## Assessment Criteria

This project will be evaluated based on:
- **Detail Replication**: Accuracy in implementing the provided designs
- **Aesthetic Enhancement**: Visual improvements and polish
- **Code Quality**: Clean, maintainable code structure
- **Functionality**: Proper form validation and navigation
- **Mobile Optimization**: Responsive design implementation

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Configuration

See [Vite Configuration Reference](https://vite.dev/config/) for customization options.
