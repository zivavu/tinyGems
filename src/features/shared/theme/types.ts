/**
 * Theme type definitions
 *
 * These types serve as documentation for the semantic design tokens
 * in our theme. In CSS, you'll use these as class names like:
 * - bg-primary-500
 * - text-text-muted
 * - border-border-strong
 */

// Colors
export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

/**
 * Primary colors (amber-based)
 * Usage: bg-primary-500, text-primary-600, etc.
 */
export type PrimaryColor = ColorScale;

/**
 * Neutral colors (gray-based)
 * Usage: bg-neutral-100, text-neutral-800, etc.
 */
export type NeutralColor = ColorScale;

/**
 * Destructive colors (red-based)
 * Usage: bg-destructive-500, text-destructive-700, etc.
 */
export type DestructiveColor = ColorScale;

/**
 * Accent colors (indigo-based)
 * Usage: bg-accent-300, text-accent-600, etc.
 */
export type AccentColor = ColorScale;

/**
 * Text colors
 * Usage: text-text, text-text-muted, text-text-subtle, text-text-inverted
 */
export type TextColor = 'text' | 'text-muted' | 'text-subtle' | 'text-inverted';

/**
 * Background colors
 * Usage: bg-background, bg-background-subtle, bg-background-muted
 */
export type BackgroundColor = 'background' | 'background-subtle' | 'background-muted';

/**
 * Border colors
 * Usage: border-border, border-border-strong
 */
export type BorderColor = 'border' | 'border-strong';

/**
 * Font families
 * Usage: font-sans, font-serif, font-mono
 */
export type FontFamily = 'sans' | 'serif' | 'mono';

/**
 * Font sizes
 * Usage: text-xs, text-base, text-2xl, etc.
 */
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

/**
 * Font weights
 * Usage: font-normal, font-medium, font-semibold, font-bold
 */
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Border radius
 * Usage: rounded-sm, rounded, rounded-md, rounded-lg, etc.
 */
export type BorderRadius = 'sm' | 'DEFAULT' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/**
 * Spacing
 * Usage: p-4, m-8, gap-2, etc.
 */
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;

/**
 * Transition timing functions
 * Usage: ease-default, ease-in, ease-out, ease-in-out
 */
export type TransitionTiming = 'default' | 'in' | 'out' | 'in-out';

/**
 * Shadows
 * Usage: shadow-sm, shadow, shadow-md, etc.
 */
export type Shadow = 'sm' | 'DEFAULT' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Z-index values
 * Usage: z-10, z-20, z-auto, etc.
 */
export type ZIndex = 0 | 10 | 20 | 30 | 40 | 50 | 'auto';
