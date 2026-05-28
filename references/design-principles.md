# Design Principles Reference — MikaMiku

## The Philosophy of Visual Order

Design is not decoration. Design is communication. Every spatial decision
conveys meaning. Every color choice triggers emotion. Every animation guides
attention. The goal is not to make things pretty. The goal is to make things
understood.

---

## Layout Systems

### The 8-Point Grid
The fundamental rhythm of digital space. The base unit is 8 pixels. All
spacing, padding, margins, gaps, and component dimensions must be multiples
of 8. This eliminates arbitrary decisions and creates subconscious visual
harmony.

The scale: 8, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 256.

When a design feels chaotic, it is usually because spacing values were chosen
by eye rather than by grid. Return to the 8-point grid and the chaos resolves.

### The 12-Column Grid
The canonical grid for responsive design. Twelve is divisible by 2, 3, 4, and
6, offering maximum compositional flexibility.

Column spans and their meanings:
- 12 columns: Full width. Use for hero sections, full-bleed imagery, and
  primary content containers.
- 8 + 4 columns: Two-thirds with sidebar. Use for documentation pages,
  dashboards with a side panel, or article layouts with a table of contents.
- 6 + 6 columns: Equal split. Use for feature comparisons, pricing tables,
  or two-column article layouts.
- 4 + 4 + 4 columns: Three equal columns. Use for feature cards, team
  profiles, or product showcases.
- 3 + 3 + 3 + 3 columns: Four equal columns. Use for icon grids, stat
  counters, or thumbnail galleries.

On mobile viewports (less than 768 pixels), all columns should collapse to
full width (12 columns) unless the content is explicitly designed for
side-by-side mobile presentation.

Gutter widths:
- Desktop (1024 pixels and above): 24 pixels
- Tablet (768 to 1023 pixels): 16 pixels
- Mobile (below 768 pixels): 12 pixels

### Baseline Grid
A secondary grid that governs vertical alignment. The baseline is typically
4 pixels or 8 pixels. All line heights, paragraph spacing, and vertical
margins should align to this baseline.

When text from two different columns or sections aligns perfectly at the
baseline, the page feels professionally crafted. When text lines drift,
 the page feels amateur.

---

## The Golden Ratio in Spatial Design

The golden ratio, phi, approximately 1.618, is not a magic number. It is a
proportion that the human eye finds naturally balanced because it appears
frequently in nature.

### Aspect Ratios
Use 1 to 1.618 for primary containers, hero images, and featured cards. Use
1 to 1.414 (the silver ratio, derived from A-series paper) for secondary
containers and supporting imagery.

### Spacing Scale
Apply phi as a multiplier to create a spacing scale: 8, 13, 21, 34, 55, 89,
144. Use these values for section padding, component gaps, and typography
steps. The irregular spacing creates organic rhythm compared to the rigid
8-point grid.

### Layout Splits
Divide a container into 61.8 percent and 38.2 percent zones. Place primary
content in the larger zone. Place supporting content, metadata, or calls to
action in the smaller zone. This split feels more dynamic than a 50-50
 division.

### Typography Scale
Use phi as the multiplier between heading levels. Starting from a 16 pixel
body size: 16, 26, 42, 68, 110. Round to practical values: 16, 26, 42, 68,
96. The size jumps feel dramatic and intentional rather than incremental.

---

## Composition Principles

### Rule of Thirds
Divide the frame into a 3 by 3 grid. Place focal points at the intersection
of the grid lines. The top-left intersection is the strongest focal point in
left-to-right reading cultures. The bottom-right intersection is the natural
conclusion.

Never place the most important element dead-center unless intentional symmetry
is the design goal. Off-center placement creates visual tension and guides
the eye through the composition.

### Golden Spiral
Derived from nested golden rectangles. The spiral originates at a corner and
flows inward toward the center. Use the spiral path to guide the viewer's
eye through a hero section. The eye should enter at the spiral origin and
follow the curve toward the center, where the primary message resides.

### F-Pattern
Users scan text-heavy pages in an F shape: across the top, down the left
side, across again at mid-page. Place the most important headline at the top.
Place subheadings and bullet points along the left edge. Put supporting
details to the right of each bullet. The right side of the page receives the
least attention — reserve it for secondary or decorative content.

### Z-Pattern
Users scan sparse pages in a Z: top-left to top-right, diagonal down to
bottom-left, across to bottom-right. Place the logo or brand mark top-left.
Place primary navigation top-right. Place the key message or value proposition
in the center. Place the primary call-to-action bottom-right. This pattern
works best for landing pages with minimal text.

### Asymmetrical Balance
Place one visually heavy element on one side. Balance it with multiple
lighter elements on the opposite side. Visual weight is determined by size,
color saturation, detail complexity, and texture density. A single large
image on the left can be balanced by a headline, subhead, and button on the
right.

Asymmetry creates dynamism and visual interest. It prevents the static,
boring feeling of perfect symmetry.

### Symmetrical Balance
Use only when the design goal is formality, stability, trust, or tradition.
Centered layouts work for confirmations, medical interfaces, legal documents,
memorial pages, and profile cards. Overuse of symmetry makes a design feel
generic and unmemorable.

### Visual Hierarchy
Establish clear reading order through five tools:

Size: The largest element is read first. Use dramatic size differences
between hierarchy levels. A 96 pixel headline above 16 pixel body text creates
strong contrast. A 20 pixel headline above 16 pixel body text creates confusion.

Weight: Bold text draws attention. Use bold sparingly. Only one or two
phrases per section should be bold. If everything is bold, nothing is bold.

Color: High contrast draws the eye first. The accent color should be reserved
for the primary action. If the accent color appears on ten elements, the user
cannot identify what matters most.

Spacing: More whitespace around an element signals higher importance. A
headline with 96 pixels of space above it feels monumental. A headline with
8 pixels of space above it feels like an afterthought.

Position: In left-to-right languages, the top-left is the natural starting
point. The bottom-right is the natural conclusion. Place entry points at the
top-left and calls-to-action at the bottom-right.

---

## Responsive Design Architecture

### Mobile-First Philosophy
Design for the smallest viewport first. Then add complexity as the viewport
widens. This ensures core functionality works everywhere and prevents
desktop-only bloat that breaks on mobile.

The mobile-first mindset: start with a single column, stacked layout, large
touch targets, and essential content only. At each breakpoint, ask: what
additional complexity does this viewport deserve? Add it incrementally.

### Breakpoint System
Design for the ranges between breakpoints, not the exact pixel values.

Extra small (below 576 pixels): Single column, stacked layout, touch targets
at least 44 pixels, hamburger or bottom navigation, minimal chrome.

Small (576 to 767 pixels): Two-column grids become possible, slightly larger
typography, side navigation may appear for tablets.

Medium (768 to 1023 pixels): Full navigation visible, multi-column layouts,
tablet-optimized spacing, hover states begin to matter.

Large (1024 to 1279 pixels): Desktop layout, sidebar plus main content, hover
states active, precision mouse targets, generous whitespace.

Extra large (1280 to 1535 pixels): Wide desktop, large imagery, max-width
containers become relevant, cinematic layouts possible.

Extra extra large (1536 pixels and above): Ultra-wide, centered content with
massive side margins, multi-panel dashboards, immersive experiences.

### Responsive Typography
Use a fluid type scale. Headings should scale down proportionally on mobile.
Body text must remain at least 16 pixels on mobile to prevent automatic zoom
on iOS Safari. Line height should increase slightly on mobile for touch
readability.

A safe fluid formula: minimum size plus viewport width multiplier, clamped
between mobile and desktop extremes.

### Touch versus Mouse
Touch interfaces require different design decisions than mouse interfaces:
- Touch targets must be at least 44 by 44 pixels.
- Hover effects must have tap equivalents on touch devices.
- Right-click context menus need long-press alternatives.
- Drag and drop needs explicit touch handles or dedicated buttons.
- Precision inputs like sliders and color pickers need magnification or step
  controls on mobile.
- Swipe gestures should have visual affordances or tutorial hints.

### Container Queries
When a component lives inside a sidebar, card, or modal, its responsive
behavior should respond to its container width, not the viewport width. A
card inside a narrow sidebar should adapt independently of the main page.
Use container queries for component-level responsiveness.

### Responsive Images
Serve appropriately sized images for each viewport. Use the picture element
with srcset for art direction. Serve WebP format with JPEG or PNG fallback.
Lazy load images below the fold. Use the aspect-ratio CSS property to prevent
layout shift during image loading.

---

## Typography Mastery

### Type Scale: Major Third
Base size 16 pixels. Multiplier 1.25. Scale: 16, 20, 25, 31, 39, 49, 61, 76,
95. Round to practical values: 16, 20, 24, 32, 40, 48, 60, 76, 96. This
scale feels friendly and approachable.

### Type Scale: Perfect Fourth
Base size 16 pixels. Multiplier 1.414. Scale: 16, 23, 32, 45, 64, 91, 128.
This scale feels dramatic and editorial. Use for portfolios, magazines, and
luxury brands.

### Line Heights
Display headings: 1.1 to 1.2. Tight line height creates solid blocks of color
that read as graphic elements.

Section headings: 1.2 to 1.3. Slightly looser than display text for
readability.

Body text: 1.5 to 1.7. The sweet spot is 1.6. Too tight and text feels
cramped. Too loose and text feels disconnected.

Captions, footnotes, metadata: 1.4. Small text needs slightly tighter line
height to maintain paragraph cohesion.

Code blocks: 1.5 with monospace font. Code needs breathing room for character
recognition.

### Letter Spacing
Large headings: tighten by 0.02em to 0.05em. Negative tracking makes large
text feel refined and premium.

Body text: default tracking or very slight positive tracking for small sizes.
All-caps text: increase by 0.05em to 0.1em. All-caps is inherently harder to
read. Extra spacing compensates.

Code: slight negative tracking for density. Monospace fonts are naturally
wide. Tightening creates more characters per line.

### Font Pairing
Maximum two font families per project. Pair a serif with a sans-serif for
editorial contrast. Or use a single family with weight variation for minimal
purity. Never use more than one display font. The system font stack is
acceptable for performance-critical applications.

### Reading Experience
Optimal line length for body text: 45 to 75 characters, averaging 65. Shorter
lines feel choppy. Longer lines are hard to track.

Paragraph spacing: 1em to 1.5em between paragraphs. Use spacing for web
layouts. Use indentation for print layouts.

Hanging punctuation for quotes and lists creates cleaner left edges and
improves perceived alignment.

---

## Color Science

### The 60-30-10 Rule
Sixty percent of the interface should be the dominant color — backgrounds,
main surfaces, the canvas. Thirty percent should be the secondary color —
cards, sidebars, alternating sections, secondary containers. Ten percent
should be the accent color — primary call-to-action buttons, notifications,
active states, key highlights.

The accent color must be used sparingly. If the accent appears on twenty
elements, the user cannot identify what matters most. Reserve the accent for
the single most important action per view.

### Dark Mode First
Design for dark mode as the default. Dark backgrounds reduce eye strain in
low-light environments and respect modern operating system preferences. Then
adapt to light mode as a variant.

Dark palette guidelines:
- Never use pure black. Use deep charcoal: 10 percent lightness or 12
  percent lightness. Pure black creates harsh contrast and screen door effects
  on OLED displays.
- Never use pure white for text on dark. Use warm off-white: 96 percent
  lightness with slight warmth. Pure white causes glare and eye fatigue.
- Use elevated surfaces. Cards should be slightly lighter than the background
to create depth through elevation, not through drop shadows.

Light palette guidelines:
- Never use pure white for backgrounds. Use warm white: 98 percent lightness
  with slight warmth. Pure white feels sterile and clinical.
- Text should be near-black: 10 to 15 percent lightness. Pure black is too
  harsh for long reading.
- Shadows should be subtle and warm-tinted. Gray shadows feel dirty. Warm
  shadows feel natural.

### Accessible Contrast
Normal text below 18 pixels: minimum 4.5 to 1 contrast ratio. Ideal 7 to 1.

Large text at least 18 pixels bold or 24 pixels regular: minimum 3 to 1.
Ideal 4.5 to 1.

User interface components and graphical elements: minimum 3 to 1.

Test with both light and dark mode variants. A color that passes in light mode
may fail in dark mode.

### Color Psychology
Blue conveys trust, stability, and corporate professionalism. It is the safest
default for technology products.

Green conveys growth, health, success, and permission. Use for positive
states, confirmations, and success messages.

Red conveys urgency, danger, error, and passion. Use sparingly for destructive
actions, errors, and critical warnings.

Yellow conveys optimism, caution, and energy. Use for warnings that require
attention but are not critical errors.

Purple conveys luxury, creativity, and wisdom. Use for premium brands,
creative tools, and educational platforms.

Orange conveys friendliness, energy, and affordability. Use for calls-to-action
that need warmth without the urgency of red.

Black conveys sophistication, power, and luxury. Use for high-end editorial
designs and luxury goods.

White conveys cleanliness, minimalism, and medical precision. Use for spacious,
breathable layouts and healthcare applications.

---

## Motion and Interaction Design

### Easing Functions
Standard easing: starts quickly, slows to a gentle stop. Use for most
transitions, entrances, exits, and state changes.

Decelerate easing: starts fast and settles gently. Use for elements entering
the screen. The fast start feels responsive. The gentle stop feels polished.

Accelerate easing: starts slow and accelerates away. Use for elements exiting
the screen. The slow start maintains context. The acceleration signals
completion.

Sharp easing: snappy with minimal settle. Use for toggles, switches, and
quick state flips. Avoid for large movements.

Never use linear easing for user interface motion. Linear feels mechanical,
robotic, and lifeless.

### Duration Scale
Instant: zero milliseconds. For state changes where motion adds no value.

Micro: 50 to 150 milliseconds. Button presses, checkbox toggles, icon morphs,
small state changes.

Standard: 200 to 300 milliseconds. Hover states, dropdowns, tooltips, tab
switches, small panel slides.

Complex: 300 to 500 milliseconds. Page transitions, dialog entrances, drawer
slides, modal appearances.

Emphasis: 500 to 800 milliseconds. Hero animations, onboarding sequences,
celebratory micro-interactions, large structural changes.

Ambient: 8 to 20 seconds. Subtle background animations, breathing effects,
loading indicators, idle states.

### Stagger Patterns
When animating lists, grids, or sequences, introduce each element with a
delay.

List items: 50 to 80 milliseconds delay per item. Direction: top to bottom.
Grid items: 80 to 120 milliseconds delay per item. Direction: row-major or
radial from center.

Cards: 100 to 150 milliseconds delay per card.

Text lines: 30 to 50 milliseconds delay per line.

Never stagger faster than 30 milliseconds. It becomes perceived as simultaneous.
Never stagger slower than 200 milliseconds. It feels broken or disconnected.

### Scroll Behavior
Smooth scrolling for anchor links and programmatic scrolls. Parallax should
be subtle: 5 to 15 percent speed difference between layers. Excessive parallax
causes motion sickness and nausea.

Scroll-triggered animations should use intersection observation for
performance. Do not listen to scroll events on the main thread.

Sticky headers should have a subtle shadow or background transition when
sticking to indicate the state change.

### Micro-Interactions
Buttons must have a pressed state visually distinct from hover. The pressed
state should feel physical: slightly darker, slightly inset, or slightly
scaled down.

Form inputs must have a focused state with a ring or border color change.
The focus state must be highly visible for keyboard navigation.

Loading states should replace the action button content, not disable the
button invisibly. A disabled button with no loading indicator looks broken.

Success states should provide immediate visual feedback: a checkmark
animation, a brief color flash, or a toast notification.

Error states should shake gently or pulse with the error color, accompanied
by clear error text explaining what went wrong and how to fix it.

### Reduced Motion
Always respect the user's preference for reduced motion. When reduced motion
is requested:
- Disable all non-essential animations.
- Replace motion with instant state changes.
- Keep functional motion but make it static or pulsing rather than moving.
- Never ignore this accessibility setting. Motion sensitivity is a real
  medical condition.

---

## The Anti-AI-Slop Design Charter

These patterns are forbidden. They signal low-quality, generated content and
destroy user trust.

Never use generic neon gradients on dark backgrounds unless the brand
explicitly demands a cyberpunk aesthetic. One gradient is acceptable. Five
gradients is excessive.

Never use random floating geometric shapes that serve no purpose and have no
relation to the brand or content.

Never use excessive glassmorphism. Maximum one or two frosted panels per
page. Frosted panels over busy backgrounds are illegible.

Never use placeholder lorem ipsum text in final deliverables. Use realistic
content or ask the user for actual copy.

Never use cookie-cutter hero sections with meaningless headlines like
"Revolutionize Your Workflow" or "Unlock Your Potential." Write specific,
concrete headlines that describe actual value.

Never use generic stock photo aesthetics: perfectly diverse group pointing
at a laptop, handshakes in suits, person staring at a mountain.

Never use excessive border radius. Not every element needs rounded corners.
Sharp corners convey precision, professionalism, and authority.

Never use drop shadows on everything. Shadows should indicate elevation, not
decoration. A flat card with no shadow is better than a card with an
unjustified shadow.

Never center-align body text for long passages. Center alignment is for short
headlines, poetry, and ceremonial text only.

Always design with purpose, restraint, and craft. Every visual element must
earn its place through function or meaning. Use whitespace as an active
design element, not as leftover space. Align everything to a grid. Nothing
should be eyeballed. Choose colors with intention. Write real copy.
