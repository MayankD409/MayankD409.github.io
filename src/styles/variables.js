// VISITED BUT PLAY AROUND WITH THIS
import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #020c1b;
    --navy: #eae1dc; //Initially it was #0a192f;
    --light-navy: #f0eae7; //#112240;
    --lightest-navy: #f7f3f1; //#233554;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670;
    --slate: #8e8d8a; //#8892b0;
    --light-slate: #72716e; //#a8b2d1;
    --lightest-slate: #474745; //#ccd6f6;
    --white: #e6f1ff;
    --green: #e85a4f; //#64ffda;
    --green-tint-dark: #8b362f; //Lynn added this line extra
    --green-tint: #f6bdb9; //rgba(100, 255, 218, 0.1);
    // --pink: #f57dff; //Lynn removed these
    // --blue: #57cbff; //Lynn removed these

    --font-sans: 'Calibre', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif; // Lynn removed 'Inter',
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 8px; // Default it was 4px
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
