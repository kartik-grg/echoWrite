# echoWrite Theme System

echoWrite comes with a built-in theme system that makes it easy to customize the look and feel of the application. The theme system is based on CSS variables and Tailwind CSS classes.

## Color Variables

Here are the color variables you can use throughout the application:

### Light Theme

```css
--color-primary: #ffffff;
--color-secondary: #f5f5f5;
--color-accent: #7c3aed; /* violet-600 */
--color-text-primary: #1a1a1a;
--color-text-secondary: #4b5563; /* gray-600 */
--color-bg-primary: #ffffff;
--color-bg-secondary: #f9fafb; /* gray-50 */
--color-accent-hover: #6d28d9; /* violet-700 */
--color-border: #e5e7eb; /* gray-200 */
--color-card-bg: #ffffff;
--color-button-primary: #7c3aed; /* violet-600 */
--color-button-secondary: #4b5563; /* gray-600 */
```

### Dark Theme

```css
--color-primary: #1a1a1a;
--color-secondary: #2D2D2D;
--color-accent: #8b5cf6; /* violet-500 */
--color-text-primary: #f3f4f6; /* gray-100 */
--color-text-secondary: #9ca3af; /* gray-400 */
--color-bg-primary: #1a1a1a;
--color-bg-secondary: #2D2D2D;
--color-accent-hover: #7c3aed; /* violet-600 */
--color-border: #374151; /* gray-700 */
--color-card-bg: #2D2D2D;
--color-button-primary: #8b5cf6; /* violet-500 */
--color-button-secondary: #6b7280; /* gray-500 */
```

## Tailwind Classes

Instead of using hardcoded hex values, use the Tailwind classes that reference the CSS variables:

### Background Colors
- `bg-primary` - Main background color
- `bg-secondary` - Secondary background color (for cards, sections)
- `bg-accent` - Accent color (buttons, highlights)

### Text Colors
- `text-primary-text` - Main text color
- `text-secondary-text` - Secondary text color (captions, less important text)

### Borders
- `border-border-color` - Border color

### Buttons
- `bg-button-primary` - Primary button background
- `bg-button-secondary` - Secondary button background

## How to Use

When styling components, always use the theme variables instead of hardcoded colors:

```jsx
// Instead of this:
<div className="bg-[#2D2D2D] text-gray-200">

// Do this:
<div className="bg-secondary text-primary-text">
```

This ensures consistency and makes it easy to switch between light and dark themes.

## Customizing the Theme

To customize the theme, edit the color variables in `/src/styles/theme.css`.