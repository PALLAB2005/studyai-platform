import { Module, Lesson } from '../types/lesson';

export const webDevCurriculum: Module[] = [
  {
    id: 'mod-1',
    title: 'Module 1 — HTML Fundamentals',
    description: 'Learn HTML structure, document markup, semantic tags, forms, and modern accessibility best practices.',
    duration: '3.5 Hours',
    order: 1,
    lessons: [
      {
        id: 'html-intro',
        title: 'Introduction to HTML',
        description: 'Understand how HTML powers the web, doctypes, and core document architecture.',
        duration: '15 min',
        contentType: 'video',
        order: 1,
        whatYouWillLearn: [
          'The core architecture of the World Wide Web and client-server model',
          'Document structure: <!DOCTYPE html>, <html>, <head>, and <body>',
          'Configuring page metadata, viewport tags, and character encodings',
          'Best practices for nesting and document hierarchy',
        ],
        sections: [
          {
            heading: 'Understanding HTML & Document Foundations',
            body: 'HTML (HyperText Markup Language) is the standard markup language used to structure web pages. It defines elements using tags enclosed in angle brackets. Browsers parse this markup into the Document Object Model (DOM) tree.',
            codeSnippet: {
              language: 'html',
              filename: 'index.html',
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StudyAI Web Application</title>
</head>
<body>
  <header>
    <h1>Welcome to StudyAI</h1>
  </header>
  <main>
    <p>Empowering self-driven software engineering mastery.</p>
  </main>
</body>
</html>`,
              output: 'Renders a clean accessible web document with header and body text.',
            },
          },
          {
            heading: 'Attributes & Syntax Standards',
            body: 'HTML elements accept key-value attributes that modify their behavior or accessibility. Standard attributes include class, id, src, href, and aria labels.',
            callout: {
              type: 'tip',
              text: 'Always include the lang attribute on <html> and the viewport meta tag in <head> for responsive rendering and screen readers.',
            },
          },
        ],
        keyTakeaways: [
          'HTML forms the raw structural skeleton of all web interfaces.',
          'Always use valid <!DOCTYPE html> to prevent quirks mode in modern browsers.',
          'Keep structural elements properly nested and indented.',
        ],
      },
      {
        id: 'html-elements',
        title: 'HTML Elements & Text Formatting',
        description: 'Master headings, paragraphs, lists, anchor links, and multimedia elements.',
        duration: '22 min',
        contentType: 'video',
        order: 2,
        whatYouWillLearn: [
          'Heading hierarchy from <h1> to <h6> without skipping levels',
          'Ordered (<ol>), unordered (<ul>), and definition (<dl>) lists',
          'Anchor navigation with relative vs. absolute URLs and target="_blank" security',
          'Embedding responsive images with alt text and lazy loading',
        ],
        sections: [
          {
            heading: 'Text Formatting & Structural Content',
            body: 'Every content type on the web has an appropriate semantic element. Headings structure page outlines for search engines and assistive tools.',
            codeSnippet: {
              language: 'html',
              filename: 'elements.html',
              code: `<section>
  <h2>Core Web Technologies</h2>
  <ul>
    <li><strong>HTML:</strong> Structural markup and content semantics</li>
    <li><strong>CSS:</strong> Visual design, responsive layout, and typography</li>
    <li><strong>JavaScript:</strong> Interactive behaviors and state management</li>
  </ul>
  <a href="/courses" class="btn">Explore All Courses</a>
</section>`,
            },
          },
        ],
        keyTakeaways: [
          'Never use <h1> more than once per page layout.',
          'Always supply meaningful alt descriptions for all <img> elements.',
        ],
      },
      {
        id: 'semantic-html',
        title: 'Semantic HTML & Accessibility (a11y)',
        description: 'Build accessible, SEO-friendly page structures with semantic landmarks.',
        duration: '25 min',
        contentType: 'article',
        order: 3,
        whatYouWillLearn: [
          'Semantic container tags: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>',
          'Web Content Accessibility Guidelines (WCAG) 2.1 principles',
          'ARIA roles, states, and keyboard navigation support',
        ],
        sections: [
          {
            heading: 'Why Semantic HTML Matters',
            body: 'Semantic HTML tags describe their purpose and meaning to both the browser and developer, improving accessibility, developer ergonomics, and SEO rankings.',
            codeSnippet: {
              language: 'html',
              filename: 'semantic-layout.html',
              code: `<header>
  <nav aria-label="Main Navigation">
    <a href="/">Home</a>
    <a href="/my-learning">My Learning</a>
  </nav>
</header>
<main id="main-content">
  <article>
    <h2>Semantic HTML Deep Dive</h2>
    <p>Semantic markup provides landmarks that screen readers use for quick navigation.</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 StudyAI Education. All rights reserved.</p>
</footer>`,
            },
          },
        ],
        keyTakeaways: [
          'Semantic tags replace generic <div> tag soup with meaningful content structure.',
          'Proper landmarks ensure natural keyboard and screen reader accessibility.',
        ],
      },
      {
        id: 'html-forms',
        title: 'HTML Forms & User Input',
        description: 'Create interactive form controls, inputs, validation, and submission handlers.',
        duration: '30 min',
        contentType: 'code',
        order: 4,
        whatYouWillLearn: [
          'Form containers and method/action configuration',
          'Input types: text, email, password, number, checkbox, radio, file',
          'Native HTML5 form validation with required, minlength, and regex pattern',
          'Associating <label for=""> with input IDs for accessibility',
        ],
        sections: [
          {
            heading: 'Form Architecture & Native Validation',
            body: 'Forms are the primary interactive tool for capturing user data. Pairing explicit labels with input controls is required for accessible UX.',
            codeSnippet: {
              language: 'html',
              filename: 'signup-form.html',
              code: `<form action="/api/register" method="POST" class="auth-form">
  <div class="field">
    <label for="user-email">Email Address</label>
    <input type="email" id="user-email" name="email" required placeholder="you@example.com">
  </div>
  <div class="field">
    <label for="user-password">Password</label>
    <input type="password" id="user-password" name="password" minlength="8" required>
  </div>
  <button type="submit">Create Account</button>
</form>`,
            },
          },
        ],
        keyTakeaways: [
          'Always link <label> to <input> using matching for and id attributes.',
          'Leverage native HTML5 input types before creating custom JavaScript validators.',
        ],
      },
      {
        id: 'html-tables',
        title: 'HTML Tables & Tabular Data',
        description: 'Structure complex data grids with table headers, bodies, captions, and scope attributes.',
        duration: '20 min',
        contentType: 'video',
        order: 5,
        whatYouWillLearn: [
          'Structuring tables with <table>, <thead>, <tbody>, and <tfoot>',
          'Header cells (<th>) and the scope="col" / scope="row" attributes',
          'Spanning cells with colspan and rowspan',
        ],
        sections: [
          {
            heading: 'Accessible Tabular Layouts',
            body: 'Tables are designed strictly for tabular datasets—never for general layout positioning.',
            codeSnippet: {
              language: 'html',
              filename: 'grades.html',
              code: `<table>
  <caption>Student Course Progress</caption>
  <thead>
    <tr>
      <th scope="col">Course Title</th>
      <th scope="col">Completed</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Web Development Bootcamp</td>
      <td>26 / 40</td>
      <td>94%</td>
    </tr>
  </tbody>
</table>`,
            },
          },
        ],
        keyTakeaways: [
          'Use <th> with scope attributes for screen reader clarity.',
          'Never use HTML tables for page layout; use modern CSS Flexbox and Grid instead.',
        ],
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'Module 2 — CSS Fundamentals',
    description: 'Master CSS selectors, cascade, specificity, Box Model, Flexbox, Grid, and responsive styling.',
    duration: '4.5 Hours',
    order: 2,
    lessons: [
      {
        id: 'css-basics',
        title: 'CSS Basics & The Box Model',
        description: 'Understand selectors, specificity, margins, borders, padding, and content boxes.',
        duration: '25 min',
        contentType: 'video',
        order: 1,
        whatYouWillLearn: [
          'The anatomy of a CSS rule: selector, property, and value',
          'CSS Box Model: content, padding, border, and margin',
          'box-sizing: border-box for predictable layout calculation',
          'Specificity hierarchy: inline styles > IDs > classes > elements',
        ],
        sections: [
          {
            heading: 'Box Model Mechanics',
            body: 'Every element rendered in the browser is a rectangular box. By default, padding and borders increase total box width. Setting box-sizing: border-box ensures width and height properties calculate the entire visible box.',
            codeSnippet: {
              language: 'css',
              filename: 'box-model.css',
              code: `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.card {
  width: 320px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #ffffff;
}`,
            },
          },
        ],
        keyTakeaways: [
          'Always use a modern CSS reset with box-sizing: border-box.',
          'Understand the difference between margin collapsing and padding spacing.',
        ],
      },
      {
        id: 'css-selectors',
        title: 'CSS Selectors, Cascade & Specificity',
        description: 'Write maintainable CSS with combinators, pseudo-classes, and pseudo-elements.',
        duration: '28 min',
        contentType: 'article',
        order: 2,
        whatYouWillLearn: [
          'Class, ID, attribute, and descendant selectors',
          'Interactive pseudo-classes: :hover, :focus-visible, :active, :disabled',
          'Structural pseudo-classes: :nth-child(), :first-of-type, :not()',
          'Pseudo-elements: ::before and ::after for decorative UI enhancements',
        ],
        sections: [
          {
            heading: 'Writing Clean, Low-Specificity CSS',
            body: 'Keep selector specificity low and consistent by relying on utility classes or component-level class naming.',
            codeSnippet: {
              language: 'css',
              filename: 'selectors.css',
              code: `/* Interactive button states with accessible focus outline */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-primary:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}`,
            },
          },
        ],
        keyTakeaways: [
          'Avoid using !important; fix specificity hierarchy instead.',
          'Always supply visible :focus-visible styles for keyboard users.',
        ],
      },
      {
        id: 'css-flexbox',
        title: 'Flexbox Layout Masterclass',
        description: 'Build flexible one-dimensional layouts with main/cross axes, alignment, and wrapping.',
        duration: '35 min',
        contentType: 'video',
        order: 3,
        whatYouWillLearn: [
          'Flex container vs. flex item properties',
          'Main axis (justify-content) and cross axis (align-items, align-content)',
          'flex-direction: row | column | row-reverse',
          'Flex item growth math: flex-grow, flex-shrink, and flex-basis',
        ],
        sections: [
          {
            heading: 'One-Dimensional Alignment with Flexbox',
            body: 'Flexbox provides optimal space distribution and item alignment along a single axis (horizontal or vertical).',
            codeSnippet: {
              language: 'css',
              filename: 'flex-navbar.css',
              code: `.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
}`,
            },
          },
        ],
        keyTakeaways: [
          'Use Flexbox for component-level items like navigation bars, toolbars, and card headers.',
          'Use the gap property instead of margin overrides on flex children.',
        ],
      },
      {
        id: 'css-grid',
        title: 'CSS Grid Layout Architecture',
        description: 'Design complex two-dimensional dashboards, card grids, and magazine layouts with CSS Grid.',
        duration: '40 min',
        contentType: 'video',
        order: 4,
        whatYouWillLearn: [
          'Defining rows and columns with grid-template-columns and grid-template-rows',
          'The flexible fraction unit (1fr) and repeat() function',
          'Responsive auto-fit and minmax() formulas without media queries',
          'grid-template-areas for visual layout mapping',
        ],
        sections: [
          {
            heading: 'Modern Responsive Card Grids with CSS Grid',
            body: 'CSS Grid handles both rows and columns simultaneously. The minmax + auto-fit pattern creates fully responsive card grids without media queries.',
            codeSnippet: {
              language: 'css',
              filename: 'grid-dashboard.css',
              code: `.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
}`,
            },
          },
        ],
        keyTakeaways: [
          'Use CSS Grid for major page-level layouts and multi-column card displays.',
          'Combine repeat(auto-fit, minmax(minSize, 1fr)) for automatic responsiveness.',
        ],
      },
      {
        id: 'css-responsive',
        title: 'Responsive Design & Media Queries',
        description: 'Adopt mobile-first CSS architecture with responsive typography, fluid units, and breakpoints.',
        duration: '32 min',
        contentType: 'code',
        order: 5,
        whatYouWillLearn: [
          'Mobile-first vs. desktop-first development paradigms',
          'Defining breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)',
          'Fluid typography with clamp() and viewport units',
          'Responsive image techniques with <picture> and srcset',
        ],
        sections: [
          {
            heading: 'Mobile-First Media Query Patterns',
            body: 'Always write base styles for mobile screens first, using min-width media queries to progressively enhance the experience as screen width increases.',
            codeSnippet: {
              language: 'css',
              filename: 'responsive.css',
              code: `/* Mobile base style (default) */
.dashboard-layout {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

/* Tablet & Desktop breakpoint */
@media (min-width: 768px) {
  .dashboard-layout {
    flex-direction: row;
    padding: 32px;
  }
}`,
            },
          },
        ],
        keyTakeaways: [
          'Design mobile-first with min-width media queries.',
          'Test touch target sizes (at least 44x44px) across all viewports.',
        ],
      },
      {
        id: 'css-animations',
        title: 'CSS Animations, Transitions & Transforms',
        description: 'Craft smooth UI transitions, keyframe animations, and 60fps hardware-accelerated transforms.',
        duration: '26 min',
        contentType: 'video',
        order: 6,
        whatYouWillLearn: [
          'CSS Transitions: property, duration, timing-function, delay',
          'Transform matrix: translate, scale, rotate, and skew',
          'GPU-accelerated properties (transform and opacity) for smooth 60fps animations',
          'Keyframe animations (@keyframes) and animation-fill-mode',
        ],
        sections: [
          {
            heading: 'Hardware-Accelerated UI Polish',
            body: 'Always animate transform and opacity instead of properties like top, left, width, or height to prevent browser layout reflows.',
            codeSnippet: {
              language: 'css',
              filename: 'animations.css',
              code: `@keyframes pulseGlow {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
  }
  70% {
    transform: scale(1.03);
    box-shadow: 0 0 0 12px rgba(37, 99, 235, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
}

.active-pulse-badge {
  animation: pulseGlow 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
}`,
            },
          },
        ],
        keyTakeaways: [
          'Only animate transform and opacity for buttery-smooth performance.',
          'Honor prefers-reduced-motion media query for accessibility.',
        ],
      },
    ],
  },
  {
    id: 'mod-3',
    title: 'Module 3 — JavaScript Fundamentals',
    description: 'Learn variables, primitives, functions, objects, arrays, DOM manipulation, and event handling.',
    duration: '6.0 Hours',
    order: 3,
    lessons: [
      {
        id: 'js-intro',
        title: 'Introduction to JavaScript & V8 Engine',
        description: 'Understand the ECMAScript standard, JS runtime, and browser developer console.',
        duration: '20 min',
        contentType: 'video',
        order: 1,
        whatYouWillLearn: [
          'The role of JavaScript in web development',
          'The V8 engine, Just-In-Time (JIT) compilation, and Call Stack',
          'Running scripts via <script defer> in HTML',
          'Using the browser DevTools Console and debugger',
        ],
        sections: [
          {
            heading: 'The Modern JavaScript Runtime',
            body: 'JavaScript is a lightweight, interpreted or JIT-compiled, single-threaded programming language with first-class functions.',
            codeSnippet: {
              language: 'javascript',
              filename: 'app.js',
              code: `console.log("Welcome to StudyAI JavaScript Core!");

const platform = "StudyAI";
const version = 2026;
console.log(\`Running \${platform} v\${version}\`);`,
            },
          },
        ],
        keyTakeaways: [
          'JavaScript runs on a single main thread with an asynchronous event loop.',
          'Always place scripts with the defer attribute to prevent render-blocking.',
        ],
      },
      {
        id: 'js-variables',
        title: 'Variables and Data Types',
        description: 'Master const, let, var, primitive types, type coercion, and memory allocation.',
        duration: '28 min',
        contentType: 'code',
        order: 2,
        whatYouWillLearn: [
          'Why var is obsolete: let vs const block scoping and TDZ (Temporal Dead Zone)',
          'The 7 Primitives: string, number, bigint, boolean, undefined, symbol, null',
          'Reference Types: objects, arrays, and functions in heap memory',
          'Strict equality (===) vs loose equality (==)',
        ],
        sections: [
          {
            heading: 'Variable Declaration Standards',
            body: 'By default, declare all variables with const. Only use let when you explicitly need variable reassignment.',
            codeSnippet: {
              language: 'javascript',
              filename: 'variables.js',
              code: `// Primitive values (stored on Stack)
const studentName = "Alex Rivera";
const courseCredits = 4.0;
let isEnrolled = true;

// Reference types (stored on Heap)
const progressRecord = {
  courseId: "web-dev-bootcamp",
  completedLessons: 26,
  totalLessons: 40,
  get percentage() {
    return Math.round((this.completedLessons / this.totalLessons) * 100);
  }
};

console.log(\`\${studentName} has reached \${progressRecord.percentage}% completion!\`);`,
            },
          },
        ],
        keyTakeaways: [
          'Never use var in modern code.',
          'Always use strict equality (===) to prevent accidental type coercion bugs.',
        ],
      },
      {
        id: 'js-operators',
        title: 'Operators, Expressions & Control Flow',
        description: 'Explore arithmetic, comparison, logical, nullish coalescing, and ternary operators with switch and loops.',
        duration: '30 min',
        contentType: 'video',
        order: 3,
        whatYouWillLearn: [
          'Arithmetic, logical (&&, ||, !), and short-circuit evaluation',
          'Nullish coalescing (??) vs. logical OR (||)',
          'Optional chaining (?.) for safe deeply nested property reads',
          'Control flow: if/else, switch case, for...of, and while loops',
        ],
        sections: [
          {
            heading: 'Modern JavaScript Operator Patterns',
            body: 'Nullish coalescing (??) only falls back on null or undefined, preserving valid falsy values like 0 or empty strings.',
            codeSnippet: {
              language: 'javascript',
              filename: 'operators.js',
              code: `const userSettings = {
  theme: "dark",
  volume: 0 // 0 is falsy, but a valid volume setting!
};

// Logical OR wrongly overwrites 0 with default
const badVolume = userSettings.volume || 50; // 50 (BUG!)

// Nullish coalescing correctly preserves 0
const goodVolume = userSettings.volume ?? 50; // 0 (CORRECT)

console.log({ badVolume, goodVolume });`,
            },
          },
        ],
        keyTakeaways: [
          'Use ?? when handling numerical 0 or boolean false fallback values.',
          'Use optional chaining (?.) to avoid "Cannot read properties of undefined" runtime errors.',
        ],
      },
      {
        id: 'javascript-functions',
        title: 'JavaScript Functions',
        description: 'Learn how functions allow you to organize, modularize, and reuse JavaScript code.',
        duration: '35 min',
        contentType: 'code',
        order: 4,
        whatYouWillLearn: [
          'Function declarations vs. function expressions',
          'Arrow functions syntax and lexical this binding',
          'Default parameters and rest parameter (...args) syntax',
          'Return values and pure functions with no side effects',
          'First-class functions and higher-order function patterns',
        ],
        sections: [
          {
            heading: 'Function Declarations vs. Arrow Functions',
            body: 'Functions in JavaScript are first-class citizens. They can be stored in variables, passed into other functions as arguments, and returned from functions.',
            codeSnippet: {
              language: 'javascript',
              filename: 'functions.js',
              code: `// Traditional function declaration (hoisted)
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function with implicit return and default parameter
const calculateScore = (score = 0, total = 100) => Math.round((score / total) * 100);

// Higher-order function receiving a callback
const processScores = (scores, transformer) => scores.map(transformer);

const rawScores = [18, 20, 15, 25];
const percentages = processScores(rawScores, (s) => calculateScore(s, 25));

console.log(percentages); // [72, 80, 60, 100]`,
              output: 'Scores converted to dynamic percentage array.',
            },
          },
          {
            heading: 'Scope & Pure Function Principles',
            body: 'Pure functions produce identical output given identical input parameters and have zero observable side effects on external state.',
            callout: {
              type: 'tip',
              text: 'Favor pure functions whenever writing application business logic, utility calculations, or state transformers.',
            },
          },
        ],
        keyTakeaways: [
          'Arrow functions inherit this lexically from their surrounding enclosing scope.',
          'Keep functions small, single-purpose, and pure whenever possible.',
          'Use default parameters to prevent undefined arguments.',
        ],
      },
      {
        id: 'js-arrays',
        title: 'Arrays & Functional Iteration',
        description: 'Master map, filter, reduce, find, some, every, sort, and immutability patterns.',
        duration: '38 min',
        contentType: 'code',
        order: 5,
        whatYouWillLearn: [
          'Array creation, indexing, and destructuring syntax',
          'Transforming data with map() and filter()',
          'Data aggregation and reduction with reduce()',
          'Immutable array manipulation with spread syntax ([...arr]) and toSorted()',
        ],
        sections: [
          {
            heading: 'Declarative Array Transformations',
            body: 'Modern JavaScript favors declarative functional array methods over imperative for loops.',
            codeSnippet: {
              language: 'javascript',
              filename: 'arrays.js',
              code: `const lessons = [
  { id: 'l-1', title: 'HTML Basics', durationMin: 20, completed: true },
  { id: 'l-2', title: 'CSS Grid', durationMin: 35, completed: true },
  { id: 'l-3', title: 'JS Functions', durationMin: 45, completed: false },
];

// 1. Filter completed lessons
const completed = lessons.filter(l => l.completed);

// 2. Sum total study minutes using reduce
const totalMinutes = completed.reduce((acc, curr) => acc + curr.durationMin, 0);

console.log(\`Total finished study time: \${totalMinutes} minutes\`);`,
            },
          },
        ],
        keyTakeaways: [
          'map, filter, and reduce never mutate the original array.',
          'Use the spread operator [...array] when copying or prepending new items.',
        ],
      },
      {
        id: 'js-objects',
        title: 'Objects, JSON & Prototypal Methods',
        description: 'Deep dive into object literals, Object.entries, Object.keys, Object.freeze, and JSON serialization.',
        duration: '32 min',
        contentType: 'video',
        order: 6,
        whatYouWillLearn: [
          'Object properties, shorthand notation, and computed property names',
          'Object destructuring with default values and renaming',
          'JSON.stringify and JSON.parse serialization rules',
          'Prototypal inheritance and Object.assign vs structuredClone',
        ],
        sections: [
          {
            heading: 'Object Modeling and Serialization',
            body: 'Objects represent structured domain entities. Use Object destructuring to extract values cleanly.',
            codeSnippet: {
              language: 'javascript',
              filename: 'objects.js',
              code: `const userProfile = {
  id: "usr_99",
  name: "Sarah Chen",
  stats: {
    streak: 14,
    points: 1850
  }
};

// Nested destructuring with aliases
const { name: studentName, stats: { streak, points } } = userProfile;

console.log(\`\${studentName} has a \${streak}-day streak with \${points} XP!\`);`,
            },
          },
        ],
        keyTakeaways: [
          'Use structuredClone() for true deep copying of objects.',
          'JSON cannot serialize functions, Symbol keys, or cyclic references.',
        ],
      },
      {
        id: 'js-dom',
        title: 'DOM Querying & Manipulation',
        description: 'Manipulate HTML elements, styles, classes, and attributes dynamically using the browser DOM API.',
        duration: '40 min',
        contentType: 'code',
        order: 7,
        whatYouWillLearn: [
          'The DOM tree structure and window / document objects',
          'Selecting elements with querySelector and querySelectorAll',
          'Modifying classes with classList.add, remove, and toggle',
          'Creating and inserting elements with createElement and appendChild',
        ],
        sections: [
          {
            heading: 'Safe DOM Modification',
            body: 'Avoid innerHTML with untrusted user input to prevent XSS vulnerabilities. Use textContent and createElement instead.',
            codeSnippet: {
              language: 'javascript',
              filename: 'dom.js',
              code: `// Safe element creation
const container = document.querySelector("#notification-tray");

function createNotification(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message success";
  toast.textContent = message; // Safe from HTML injection!
  
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}`,
            },
          },
        ],
        keyTakeaways: [
          'Never use innerHTML with dynamic user input without sanitization.',
          'Use classList instead of className string manipulation.',
        ],
      },
      {
        id: 'js-events',
        title: 'Event Listeners & Event Delegation',
        description: 'Master addEventListener, event bubbling, capturing, preventDefault, and efficient delegation.',
        duration: '36 min',
        contentType: 'video',
        order: 8,
        whatYouWillLearn: [
          'Attaching event listeners with addEventListener',
          'Event propagation: Capturing vs. Bubbling phases',
          'event.preventDefault() and event.stopPropagation()',
          'High performance event delegation on parent containers',
        ],
        sections: [
          {
            heading: 'Event Delegation for Dynamic Lists',
            body: 'Instead of binding listeners to 100 individual buttons, bind a single listener to the parent container and inspect event.target.',
            codeSnippet: {
              language: 'javascript',
              filename: 'events.js',
              code: `const syllabusList = document.querySelector("#syllabus-container");

syllabusList.addEventListener("click", (event) => {
  const lessonBtn = event.target.closest(".lesson-item-btn");
  if (!lessonBtn) return;

  const lessonId = lessonBtn.dataset.lessonId;
  console.log("Navigating to lesson:", lessonId);
});`,
            },
          },
        ],
        keyTakeaways: [
          'Always use event delegation for dynamic or long lists of interactive items.',
          'Remember to remove event listeners if elements are retained in long-lived memory.',
        ],
      },
    ],
  },
  {
    id: 'mod-4',
    title: 'Module 4 — Advanced JavaScript',
    description: 'Master ES6+ syntax, asynchronous programming, Promises, Async/Await, and Fetch API.',
    duration: '4.0 Hours',
    order: 4,
    lessons: [
      {
        id: 'js-es6',
        title: 'ES6+ Modern Syntax & Modules',
        description: 'Explore template literals, destructuring, spread/rest, ES Modules (import/export), and Maps/Sets.',
        duration: '30 min',
        contentType: 'code',
        order: 1,
        whatYouWillLearn: [
          'Named and default ES module imports and exports',
          'Set for unique collections and Map for keyed lookups',
          'Tagged template literals for custom string parsing',
        ],
        sections: [
          {
            heading: 'Modern Modular JavaScript',
            body: 'ES Modules provide clean code splitting, tree shaking, and encapsulation across files.',
            codeSnippet: {
              language: 'javascript',
              filename: 'mathUtils.js',
              code: `export const add = (a, b) => a + b;
export const calculateProgress = (done, total) => Math.round((done / total) * 100);

export default class CourseTracker {
  constructor(courseId) {
    this.courseId = courseId;
  }
}`,
            },
          },
        ],
        keyTakeaways: [
          'Use ES Modules across modern front-end and Node.js applications.',
          'Leverage Set to deduplicate array values in one line: [...new Set(arr)].',
        ],
      },
      {
        id: 'js-promises',
        title: 'Promises & Asynchronous Programming',
        description: 'Master asynchronous callbacks, Promise states (pending, fulfilled, rejected), and chaining.',
        duration: '35 min',
        contentType: 'video',
        order: 2,
        whatYouWillLearn: [
          'Why asynchronous programming is required for non-blocking I/O',
          'Creating promises with new Promise((resolve, reject) => ...)',
          'Handling results with .then(), .catch(), and .finally()',
          'Promise combinators: Promise.all, Promise.allSettled, Promise.race',
        ],
        sections: [
          {
            heading: 'Promise State Lifecycle',
            body: 'A Promise represents an asynchronous operation that starts in a pending state and settles into fulfilled or rejected.',
            codeSnippet: {
              language: 'javascript',
              filename: 'promises.js',
              code: `function fetchCourseData(courseId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (courseId) {
        resolve({ id: courseId, title: "Web Development Bootcamp", status: "ready" });
      } else {
        reject(new Error("Invalid Course ID"));
      }
    }, 1000);
  });
}

fetchCourseData("web-dev-bootcamp")
  .then((course) => console.log("Loaded course:", course.title))
  .catch((err) => console.error("Failed to load:", err.message));`,
            },
          },
        ],
        keyTakeaways: [
          'Promise.all rejects immediately if any single promise fails.',
          'Promise.allSettled waits for all promises to settle, returning their individual status and values.',
        ],
      },
      {
        id: 'js-async-await',
        title: 'Async / Await Architecture',
        description: 'Write clean, synchronous-looking asynchronous code with async functions and try/catch blocks.',
        duration: '32 min',
        contentType: 'code',
        order: 3,
        whatYouWillLearn: [
          'The async keyword and implicit Promise returns',
          'Using await to pause execution inside async functions',
          'Comprehensive error handling with try/catch/finally',
          'Parallel execution using await Promise.all()',
        ],
        sections: [
          {
            heading: 'Writing Clean Asynchronous Code',
            body: 'Async/await is syntactic sugar built on top of native Promises that eliminates callback nesting.',
            codeSnippet: {
              language: 'javascript',
              filename: 'asyncService.js',
              code: `async function loadStudentDashboard(studentId) {
  try {
    // Run independent network requests in parallel
    const [profile, enrolledCourses, notifications] = await Promise.all([
      fetch(\`/api/students/\${studentId}\`).then(r => r.json()),
      fetch(\`/api/students/\${studentId}/courses\`).then(r => r.json()),
      fetch(\`/api/students/\${studentId}/notifications\`).then(r => r.json())
    ]);

    return { profile, enrolledCourses, notifications };
  } catch (error) {
    console.error("Dashboard loading error:", error);
    throw error;
  }
}`,
            },
          },
        ],
        keyTakeaways: [
          'Always wrap await calls in try...catch blocks to handle potential network exceptions.',
          'Do not await consecutive independent requests sequentially; use Promise.all for parallel speed.',
        ],
      },
      {
        id: 'js-fetch-api',
        title: 'Fetch API & HTTP Communication',
        description: 'Perform GET, POST, PUT, DELETE requests, inspect HTTP status codes, headers, and CORS.',
        duration: '38 min',
        contentType: 'article',
        order: 4,
        whatYouWillLearn: [
          'The Fetch API request/response cycle',
          'HTTP methods: GET, POST, PUT, PATCH, DELETE',
          'Setting headers (Content-Type: application/json, Authorization: Bearer)',
          'Understanding CORS (Cross-Origin Resource Sharing)',
        ],
        sections: [
          {
            heading: 'Full-Stack HTTP Communication',
            body: 'Fetch provides a modern interface for fetching resources asynchronously across the network.',
            codeSnippet: {
              language: 'javascript',
              filename: 'apiClient.js',
              code: `async function saveLessonProgress(courseId, lessonId) {
  const response = await fetch('/api/progress/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      courseId,
      lessonId,
      timestamp: Date.now()
    }),
  });

  if (!response.ok) {
    throw new Error(\`HTTP Error: \${response.status}\`);
  }

  return await response.json();
}`,
            },
          },
        ],
        keyTakeaways: [
          'fetch() only rejects on network errors, not on 404 or 500 HTTP status codes.',
          'Always verify response.ok before parsing response.json().',
        ],
      },
    ],
  },
  {
    id: 'mod-5',
    title: 'Module 5 — React Fundamentals',
    description: 'Learn modern React with JSX, components, props, state, hooks, and routing.',
    duration: '5.5 Hours',
    order: 5,
    lessons: [
      {
        id: 'react-components',
        title: 'React Components & JSX',
        description: 'Understand Virtual DOM, declarative UI, functional components, and JSX syntax rules.',
        duration: '30 min',
        contentType: 'video',
        order: 1,
        whatYouWillLearn: [
          'Declarative UI vs. imperative DOM manipulation',
          'JSX syntax rules: single root element, className, self-closing tags',
          'Component composition and creating reusable UI primitives',
        ],
        sections: [
          {
            heading: 'Component-Based Architecture',
            body: 'React components are JavaScript functions that accept props and return JSX describing what should appear on screen.',
            codeSnippet: {
              language: 'tsx',
              filename: 'LessonCard.tsx',
              code: `interface LessonCardProps {
  title: string;
  duration: string;
  isCompleted: boolean;
  onSelect: () => void;
}

export function LessonCard({ title, duration, isCompleted, onSelect }: LessonCardProps) {
  return (
    <div 
      onClick={onSelect}
      className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 cursor-pointer flex justify-between items-center"
    >
      <div>
        <h4 className="font-semibold text-sm">{title}</h4>
        <span className="text-xs text-slate-500">{duration}</span>
      </div>
      {isCompleted && <span className="text-emerald-600 text-xs font-bold">✓ Completed</span>}
    </div>
  );
}`,
            },
          },
        ],
        keyTakeaways: [
          'Components must be pure functions with respect to their props.',
          'Always return a single enclosing element or React Fragment (<>...</>).',
        ],
      },
      {
        id: 'react-props',
        title: 'Props & Unidirectional Data Flow',
        description: 'Pass data and callbacks down component trees with props, children, and destructuring.',
        duration: '28 min',
        contentType: 'code',
        order: 2,
        whatYouWillLearn: [
          'Passing primitive and complex data via props',
          'Children prop composition pattern',
          'Prop drilling vs. state lifting',
        ],
        sections: [
          {
            heading: 'Unidirectional Flow',
            body: 'Data always flows downwards in React from parent to child components via props.',
            codeSnippet: {
              language: 'tsx',
              filename: 'Badge.tsx',
              code: `export function Badge({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'success' }) {
  const styles = variant === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-brand-100 text-brand-700';
  return <span className={\`px-2.5 py-1 rounded-full text-xs font-bold \${styles}\`}>{children}</span>;
}`,
            },
          },
        ],
        keyTakeaways: [
          'Props are strictly read-only and immutable in child components.',
          'Pass callback functions to let children communicate events back to parents.',
        ],
      },
      {
        id: 'react-state',
        title: 'State Management with useState',
        description: 'Manage component-local reactive state, updates, and batched renders.',
        duration: '35 min',
        contentType: 'video',
        order: 3,
        whatYouWillLearn: [
          'Declaring state with const [state, setState] = useState(initial)',
          'Functional state updates: setState(prev => prev + 1)',
          'Managing complex object and array states immutably',
        ],
        sections: [
          {
            heading: 'State Mechanics & Immutability',
            body: 'Never mutate state directly. Always provide a new object or array copy when updating state.',
            codeSnippet: {
              language: 'tsx',
              filename: 'BookmarkToggle.tsx',
              code: `import { useState } from 'react';

export function BookmarkToggle({ initialSaved = false }: { initialSaved?: boolean }) {
  const [saved, setSaved] = useState(initialSaved);

  const toggle = () => {
    setSaved(prev => !prev);
  };

  return (
    <button onClick={toggle} className="btn">
      {saved ? '★ Bookmarked' : '☆ Bookmark'}
    </button>
  );
}`,
            },
          },
        ],
        keyTakeaways: [
          'State updates trigger component re-renders.',
          'Always use updater functions (prev => ...) when the new state depends on previous state.',
        ],
      },
      {
        id: 'react-hooks',
        title: 'Mastering useEffect & Custom Hooks',
        description: 'Handle side effects, cleanup subscriptions, avoid infinite loops, and extract custom hooks.',
        duration: '45 min',
        contentType: 'code',
        order: 4,
        whatYouWillLearn: [
          'useEffect lifecycle: mounting, updating, and cleanup on unmount',
          'Managing dependency arrays accurately',
          'Extracting reusable logic into custom hooks (e.g., useLocalStorage)',
        ],
        sections: [
          {
            heading: 'Custom Hook Design',
            body: 'Custom hooks allow you to encapsulate and share stateful business logic between multiple components cleanly.',
            codeSnippet: {
              language: 'tsx',
              filename: 'useLocalStorage.ts',
              code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (e) {
      console.error(e);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}`,
            },
          },
        ],
        keyTakeaways: [
          'Always specify all referenced reactive values in useEffect dependency arrays.',
          'Return cleanup functions to unsubscribe from listeners or cancel pending timers.',
        ],
      },
      {
        id: 'react-routing',
        title: 'Client-Side Routing & SPA Architecture',
        description: 'Implement dynamic route navigation, URL parameters, query parameters, and protected routes.',
        duration: '35 min',
        contentType: 'video',
        order: 5,
        whatYouWillLearn: [
          'How Single Page Application (SPA) routing works with the browser History API',
          'Matching dynamic route parameters (e.g. /courses/:courseId/lessons/:lessonId)',
          'Protecting authenticated routes and managing navigation state',
        ],
        sections: [
          {
            heading: 'SPA Dynamic Navigation',
            body: 'Client-side routing intercept URLs, updating UI components immediately without triggering full page reloads.',
            codeSnippet: {
              language: 'tsx',
              filename: 'Router.tsx',
              code: `// Matching dynamic paths
const lessonMatch = currentPath.match(/^\\/courses\\/([^/]+)\\/lessons\\/([^/]+)$/);
if (lessonMatch) {
  const [_, courseId, lessonId] = lessonMatch;
  return <LessonViewerPage courseIdentifier={courseId} lessonId={lessonId} />;
}`,
            },
          },
        ],
        keyTakeaways: [
          'Client-side routing gives users instantaneous navigation feedback.',
          'Ensure 404 fallbacks and proper URL synchronization for bookmarks.',
        ],
      },
    ],
  },
];

/**
 * Generate fallback dynamic syllabus and lesson content for any other course
 */
export function getCourseCurriculum(courseId: string): Module[] {
  if (courseId === 'web-dev-bootcamp' || courseId === 'web-development-bootcamp') {
    return webDevCurriculum;
  }

  // Generate a realistic 4-module curriculum for other courses
  return [
    {
      id: `${courseId}-m1`,
      title: 'Module 1 — Foundations & Core Principles',
      description: 'Understand the primary domain mental models, tooling setup, and initial architectural patterns.',
      duration: '3.0 Hours',
      order: 1,
      lessons: [
        {
          id: `${courseId}-l101`,
          title: '1. Domain Introduction & Environment Setup',
          description: 'Set up development tooling, linters, packages, and workspace configuration.',
          duration: '18 min',
          contentType: 'video',
          order: 1,
          whatYouWillLearn: [
            'Configuring local runtime and workspace dependencies',
            'Understanding foundational architectural principles',
            'Exploring best practices for scalable project directories',
          ],
          sections: [
            {
              heading: 'Setting the Engineering Foundation',
              body: 'In this introductory lesson, we examine the fundamental concepts, toolchains, and mental models required for mastery.',
              codeSnippet: {
                language: 'typescript',
                code: `// Initializing project configuration
export interface CoreConfig {
  environment: 'development' | 'production';
  version: string;
  enableTelemetry: boolean;
}

export const defaultConfig: CoreConfig = {
  environment: 'development',
  version: '1.0.0',
  enableTelemetry: false,
};`,
              },
            },
          ],
          keyTakeaways: [
            'A solid environment setup eliminates downstream build and runtime friction.',
            'Always inspect dependencies and lockfiles for version stability.',
          ],
        },
        {
          id: `${courseId}-l102`,
          title: '2. Core Syntax, Types & First Implementations',
          description: 'Dive into core data structures, type constraints, and algorithmic routines.',
          duration: '24 min',
          contentType: 'code',
          order: 2,
          whatYouWillLearn: [
            'Writing type-safe routines and modular functions',
            'Avoiding common anti-patterns in data management',
          ],
          sections: [
            {
              heading: 'Writing Idiomatic Code',
              body: 'Follow clean code conventions, consistent casing, and descriptive naming patterns.',
              codeSnippet: {
                language: 'typescript',
                code: `export function processDataPipeline<T, R>(items: T[], transformer: (item: T) => R): R[] {
  return items.map(transformer);
}`,
              },
            },
          ],
          keyTakeaways: [
            'Prioritize readability and explicit type safety over clever single-line abbreviations.',
          ],
        },
      ],
    },
    {
      id: `${courseId}-m2`,
      title: 'Module 2 — Intermediate Techniques & State',
      description: 'Manage state flows, asynchronous pipelines, and error boundaries.',
      duration: '4.5 Hours',
      order: 2,
      lessons: [
        {
          id: `${courseId}-l201`,
          title: '3. State Transitions & Async Operations',
          description: 'Implement robust async handlers with error recovery and retry strategies.',
          duration: '30 min',
          contentType: 'video',
          order: 1,
          whatYouWillLearn: [
            'Handling race conditions in asynchronous code',
            'Building defensive error handling and fallbacks',
          ],
          sections: [
            {
              heading: 'Resilient Asynchronous Pipelines',
              body: 'Network requests and background jobs require explicit status indicators (idle, pending, success, error).',
              codeSnippet: {
                language: 'typescript',
                code: `type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };`,
              },
            },
          ],
          keyTakeaways: [
            'Model loading states explicitly using discriminated unions.',
          ],
        },
        {
          id: `${courseId}-l202`,
          title: '4. Optimizing Performance & Data Structures',
          description: 'Profile execution bottlenecks and implement caching strategies.',
          duration: '35 min',
          contentType: 'article',
          order: 2,
          whatYouWillLearn: [
            'Algorithmic time and space complexity evaluation',
            'Memory management and garbage collection awareness',
          ],
          sections: [
            {
              heading: 'Performance Optimization Techniques',
              body: 'Measure before optimizing. Use browser profilers and benchmarks to locate actual bottlenecks.',
            },
          ],
          keyTakeaways: [
            'Avoid premature optimization; focus on algorithmic complexity first.',
          ],
        },
      ],
    },
    {
      id: `${courseId}-m3`,
      title: 'Module 3 — Real-World Capstone Integration',
      description: 'Build a production-grade full project applying all module concepts.',
      duration: '5.0 Hours',
      order: 3,
      lessons: [
        {
          id: `${courseId}-l301`,
          title: '5. Capstone Architecture & System Design',
          description: 'Architect modular services, APIs, and responsive UI components.',
          duration: '40 min',
          contentType: 'code',
          order: 1,
          whatYouWillLearn: [
            'System architecture planning and module breakdown',
            'Designing robust public interfaces and clean data contracts',
          ],
          sections: [
            {
              heading: 'Modular Architecture Blueprint',
              body: 'Separate business logic, presentation components, and network services into distinct layers.',
            },
          ],
          keyTakeaways: [
            'High cohesion and low coupling ensure long-term codebase maintainability.',
          ],
        },
        {
          id: `${courseId}-l302`,
          title: '6. End-to-End Testing & Deployment',
          description: 'Automate testing, build optimization, and cloud deployment pipelines.',
          duration: '45 min',
          contentType: 'video',
          order: 2,
          whatYouWillLearn: [
            'Unit testing core logic and end-to-end integration flows',
            'Deploying with continuous integration workflows',
          ],
          sections: [
            {
              heading: 'Testing and CI/CD Automation',
              body: 'Automate validation before deploying to production environments.',
            },
          ],
          keyTakeaways: [
            'Automated tests give confidence for rapid iteration and refactoring.',
          ],
        },
      ],
    },
  ];
}

/**
 * Fetch a specific lesson by course and lesson id
 */
export function getLessonDetails(courseId: string, lessonId: string): { module: Module; lesson: Lesson; allLessons: Lesson[]; lessonIndex: number } | null {
  const curriculum = getCourseCurriculum(courseId);
  const allLessons: Lesson[] = [];

  curriculum.forEach((mod) => {
    mod.lessons.forEach((l) => allLessons.push(l));
  });

  let foundLesson: Lesson | null = null;
  let foundModule: Module | null = null;
  let lessonIndex = -1;

  for (let i = 0; i < curriculum.length; i++) {
    const mod = curriculum[i];
    const lIdx = mod.lessons.findIndex((l) => l.id === lessonId);
    if (lIdx !== -1) {
      foundLesson = mod.lessons[lIdx];
      foundModule = mod;
      lessonIndex = allLessons.findIndex((l) => l.id === lessonId);
      break;
    }
  }

  if (!foundLesson || !foundModule) {
    // Fallback to first lesson
    if (allLessons.length > 0) {
      return {
        module: curriculum[0],
        lesson: allLessons[0],
        allLessons,
        lessonIndex: 0,
      };
    }
    return null;
  }

  return {
    module: foundModule,
    lesson: foundLesson,
    allLessons,
    lessonIndex,
  };
}
