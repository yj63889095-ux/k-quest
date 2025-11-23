# K-Quest Implementation Plan (Responsive Web App Optimization)

## Goal Description
Ensure K-Quest delivers a "Modern Luxury" experience across ALL devices, from mobile phones to large desktop monitors. The goal is a seamless "One App, Everywhere" experience that adapts its layout and interactions intelligently.

## User Review Required
> [!IMPORTANT]
> **Responsive Strategy**:
> - **Mobile**: Stacked layouts, larger touch targets, simplified navigation (Hamburger), bottom-sheet style interactions.
> - **Desktop**: Multi-column layouts, hover effects, cursor-based interactions, immersive full-screen visuals.
> - **Web Compatibility**: Ensure standard web behavior (scrolling, back button, link sharing) works perfectly.

## Proposed Changes

### 1. Responsive Layout Engine
#### [MODIFY] [app/globals.css](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/globals.css)
-   Refine container max-widths and padding for different breakpoints (`sm`, `md`, `lg`, `xl`).
-   Add utility classes for `desktop-only` and `mobile-only` visibility.

#### [MODIFY] [components/Header.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/components/Header.tsx)
-   **Desktop**: Transparent fixed header with full navigation links and hover states.
-   **Mobile**: Solid background on scroll, hamburger menu opening a full-screen overlay.

### 2. Page-Specific Optimizations
#### [MODIFY] [app/page.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/page.tsx) (Landing)
-   **Hero**: Use `clamp()` for font sizes to ensure titles look grand on desktop but fit on mobile.
-   **Grid**: Switch from 1 column (mobile) to 3 columns (desktop) seamlessly.

#### [MODIFY] [app/quests/[id]/page.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/quests/[id]/page.tsx) (Detail)
-   **Desktop**: Split screen (Left: Fixed Visual, Right: Scrollable Content).
-   **Mobile**: Stacked layout (Top: Visual, Bottom: Content). Remove `fixed` positioning on mobile.

#### [MODIFY] [components/AIConcierge.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/components/AIConcierge.tsx)
-   **Mobile**: Full-width bottom sheet chat window.
-   **Desktop**: Floating widget at bottom-right.

### 4. Mobile App Deployment (PWA)
#### [NEW] [public/manifest.json](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/public/manifest.json)
-   Define app name, icons, and theme colors for mobile installation.

#### [MODIFY] [app/layout.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/layout.tsx)
-   Add PWA meta tags (viewport, theme-color, apple-mobile-web-app-capable).

## Verification Plan
### Manual Verification
1.  **Device Lab**: Test on simulated iPhone SE (Small), iPhone 14 Pro (Medium), iPad (Tablet), and 1920x1080 Desktop.
2.  **Interaction Test**:
    -   Mouse hover on cards (Desktop).
    -   Touch tap on buttons (Mobile).
    -   Resize window to see layout adapt in real-time.
3.  **PWA Test**:
    -   Verify "Add to Home Screen" prompt appears (or is manually accessible).
    -   Launch app from home screen and verify it opens in standalone mode (no browser bar).
