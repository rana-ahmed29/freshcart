# FreshCart

A modern e-commerce web app built with **Next.js**. Browse products by category, search, save favorites, compare items, manage a cart and place orders.

**Live demo:** https://freshcart-rana.vercel.app

## Features

- Home page with a hero slider, trust badges and shop-by-category section
- Products page with category filtering, ratings and discount badges
- Categories and subcategories pages
- Brands page
- Cart, wishlist and product comparison
- Checkout and order history
- Authentication: sign in, register and forgot password (reset code sent by email)
- Profile with addresses and account settings
- Contact page with a validated form
- Loading screens, error pages and a custom 404 page
- Responsive design for mobile, tablet and desktop

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query) for data fetching
- [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/) for forms and validation
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Redux Toolkit](https://redux-toolkit.js.org/) for client state
- [Motion](https://motion.dev/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) and [React Toastify](https://fkhadra.github.io/react-toastify/)
- Data from the Route E-commerce API (`https://ecommerce.routemisr.com`)

## Getting Started

### 1. Clone the project

```bash
git clone https://github.com/rana-ahmed29/freshcart.git
cd freshcart
```

### 2. Install the packages

```bash
npm install
```

### 3. Add the environment variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=https://ecommerce.routemisr.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

To make a secret, run:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

| Command         | What it does                   |
| --------------- | ------------------------------ |
| `npm run dev`   | Starts the development server  |
| `npm run build` | Creates a production build     |
| `npm run start` | Runs the production build      |
| `npm run lint`  | Checks the code with ESLint    |

## Project Structure

```
src/
  actions/      Server actions
  app/          Pages and layouts (App Router)
  assets/       Images
  components/   UI and feature components
  context/      Providers (session, query)
  hooks/        Custom hooks
  lib/          Helpers and Zod schemas
  redux/        Store and slices
  services/     API request functions
  types/        TypeScript types
```

## Deployment

The app is deployed on [Vercel](https://vercel.com/). Every push to the `master` branch deploys automatically.

When you deploy your own copy, add the same environment variables in **Project Settings > Environment Variables**, and set `NEXTAUTH_URL` to your live link.

## Author

**Rana Ahmed** - [@rana-ahmed29](https://github.com/rana-ahmed29)
