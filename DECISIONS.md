# Decisions

## Framework

- Chose **React + Vite** for fast development, also working experience in react was the reason to choose this framework.

## UI Library

- Used **Chakra UI** for reusable components and for responsive UI design.
- Used **React Icons** for lightweight icon integration.

## Routing

- Implemented **React Router DOM** for client-side navigation between product listing and product details pages, giving smooth routing experience.

## State Management

- Used React's built-in **useState** for state management also used context api as global state for accessing the cart data

## Cart Functionality

- Prevented duplicate products from being added to the cart and handled size variants separately. Added toast notifications to inform users about stock availability and quantity limits.

## Responsive Design

- For making the app responsive using chakra UI in listing page and media query in product details page to showcase both methods to handle the respinsiveness of the app.

## Deployment

- Deployed on Vercel so that when i push code to the github repo code gets deployed automatically
- Added SPA route rewrites in `vercel.json` to prevent 404 errors on page refresh.
