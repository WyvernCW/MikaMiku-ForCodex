# Responsive Design Patterns — MikaMiku

## Pattern Catalog

### The Holy Grail Layout
A classic three-column layout with header and footer. The center column
contains the primary content. The left column contains navigation. The
right column contains supplementary information. On mobile, all three
columns stack vertically with the primary content first.

Use this for documentation sites, news portals, and content management
systems.

### The Sidebar Reveal
A sidebar that is hidden off-canvas on mobile and revealed through a
toggle button. On tablet, the sidebar may be partially visible as a narrow
strip that expands on hover or tap. On desktop, the sidebar is fully visible.

Use this for dashboards, admin panels, and email clients.

### The Card Grid
A grid of equal-sized cards that reflow based on viewport width. On mobile,
cards are full width with vertical stacking. On tablet, two cards per row.
On desktop, three or four cards per row. On ultra-wide, five or six cards
per row with increased gutters.

Use this for product listings, portfolio grids, and social media feeds.

### The Split Screen
A viewport divided into two equal or unequal halves. On mobile, the halves
stack vertically. On desktop, they sit side by side. The split can use the
golden ratio: 61.8 percent for primary content and 38.2 percent for
supporting imagery or text.

Use this for landing pages, product showcases, and hero sections.

### The Magazine Spread
An editorial layout with asymmetric column widths, large imagery, pull
quotes, and varied text sizes. On mobile, the asymmetry collapses to a
single column with imagery above text. On tablet, a two-column asymmetric
layout emerges. On desktop, the full magazine spread is visible.

Use this for blogs, editorial sites, and luxury brand pages.

### The Dashboard
A dense grid of widgets, charts, and data panels. On mobile, widgets stack
vertically in priority order. On tablet, a two-column grid appears. On
desktop, a multi-column grid with resizable panels. On ultra-wide, side
panels for filters and navigation remain visible while the main dashboard
expands.

Use this for analytics platforms, control panels, and monitoring systems.

### The Focus Mode
A layout that removes all chrome and distractions, leaving only the primary
content and essential controls. On mobile, this is the default view. On
desktop, a toggle switches between full chrome and focus mode.

Use this for reading applications, writing tools, and meditation apps.

### The Bottom Sheet
A panel that slides up from the bottom of the screen on mobile, covering
60 to 80 percent of the viewport. On tablet, it may appear as a modal in
the center. On desktop, it may appear as a side panel or inline section.

Use this for filters, settings, details, and secondary actions.

### The Sticky Header with Scroll Transform
A header that starts large and prominent at the top of the page. As the
user scrolls, the header shrinks, reduces padding, and may change
background opacity. On mobile, the header may transform into a bottom
navigation bar for thumb reachability.

Use this for single-page applications, long-form content, and social feeds.

### The Horizontal Scroll Section
A section that overflows horizontally on all viewports, with items
arranged in a row. Scroll snapping ensures items align to the viewport
edges. On desktop, this may be supplemented with arrow buttons. On mobile,
swipe gestures are natural.

Use this for product carousels, testimonial strips, and timeline displays.

---

## Responsive Image Strategies

### Art Direction
Use different images for different viewports. A mobile image might be a
tight crop focusing on a face. A desktop image might be a wide shot showing
the full scene. The picture element with source media attributes enables
this.

### Resolution Switching
Serve the same image at different resolutions. The browser selects the
appropriate resolution based on device pixel density and viewport size.
Use the srcset attribute with width descriptors or density descriptors.

### Format Switching
Serve modern formats like WebP and AVIF with fallback to JPEG or PNG.
The browser selects the first format it supports. This reduces file size
without sacrificing quality.

### Lazy Loading
Defer loading of images below the fold until they approach the viewport.
Use the loading lazy attribute for native lazy loading. Use an
Intersection Observer for more control over the threshold and root margin.

### Aspect Ratio Preservation
Use the aspect-ratio CSS property to reserve space for images before they
load. This prevents layout shift, which is a Core Web Vital metric. Combine
with object-fit cover or contain for consistent image presentation.

---

## Touch Interface Patterns

### Thumb Zone Mapping
On mobile, the bottom third of the screen is the natural thumb zone for
right-handed users. Place primary actions in this zone. Place destructive
actions in the top corners where they are harder to reach accidentally.

### Swipe Actions
List items can reveal actions when swiped left or right. The primary
action should be on the side that matches the swipe direction. Use haptic
feedback to confirm the action. Provide undo for destructive swipes.

### Pull to Refresh
A downward pull beyond the content edge triggers a refresh. Use a visual
indicator that transforms from a static icon to an animated spinner. Release
the refresh when the user lets go past the threshold.

### Peek and Pop
A light press previews content without navigating. A deeper press commits
to the navigation. On devices without pressure sensitivity, use long press
for peek and tap for pop.

### Floating Action Button
A circular button anchored to the bottom-right corner, containing the
primary action for the current screen. On mobile, it floats above content.
On tablet, it may be integrated into a bottom app bar. On desktop, it may
become a standard button in the toolbar.
