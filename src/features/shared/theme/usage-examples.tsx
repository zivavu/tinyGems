/**
 * This file shows examples of using semantic theme classes
 * directly with Tailwind CSS. No JavaScript needed!
 *
 * These components are meant to be examples and are not actually used in the app.
 * They are exported to avoid linter warnings, but you shouldn't import them in your application.
 */

import { Button } from '@headlessui/react';

// Button examples
export function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Primary button */}
      <Button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded">Primary Button</Button>

      {/* Destructive button */}
      <Button className="bg-destructive-500 hover:bg-destructive-600 text-white px-4 py-2 rounded">Delete</Button>

      {/* Secondary button */}
      <Button className="bg-neutral-100 hover:bg-neutral-200 text-text px-4 py-2 rounded">Cancel</Button>

      {/* Accent button */}
      <Button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded">Special Action</Button>
    </div>
  );
}

// Typography examples
export function TypographyExamples() {
  return (
    <div className="space-y-6">
      <h1 className="text-6xl font-bold text-text dark:text-text-inverted">This is a heading</h1>

      <p className="text-base text-text-muted dark:text-neutral-300">This is a paragraph with muted text</p>

      <p className="text-sm text-text-subtle">This is subtle small text</p>

      <div className="bg-primary-800 p-4 rounded">
        <p className="text-text-inverted">This is inverted text on a dark background</p>
      </div>
    </div>
  );
}

// Card examples
export function CardExamples() {
  return (
    <div className="space-y-6">
      <div className="bg-background p-6 rounded-lg border border-border shadow">
        <h3 className="text-xl font-semibold text-text">Basic Card</h3>
        <p className="text-text-muted mt-2">This is a basic card with default styling</p>
      </div>

      <div className="bg-background-subtle p-6 rounded-lg border border-border-strong shadow-md">
        <h3 className="text-xl font-semibold text-text">Featured Card</h3>
        <p className="text-text-muted mt-2">This card uses subtle background and stronger border</p>
      </div>

      <div className="bg-primary-50 p-6 rounded-lg border border-primary-200 shadow">
        <h3 className="text-xl font-semibold text-primary-800">Primary Card</h3>
        <p className="text-primary-700 mt-2">This card uses primary colors</p>
      </div>
    </div>
  );
}

// Alert examples
export function AlertExamples() {
  return (
    <div className="space-y-4">
      <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
        <p className="text-primary-700">Information alert using primary colors</p>
      </div>

      <div className="bg-destructive-50 border-l-4 border-destructive-500 p-4">
        <p className="text-destructive-700">Error alert using destructive colors</p>
      </div>

      <div className="bg-accent-50 border-l-4 border-accent-500 p-4">
        <p className="text-accent-700">Special alert using accent colors</p>
      </div>
    </div>
  );
}
