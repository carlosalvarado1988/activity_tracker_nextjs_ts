This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# About Development

#### VSCode libraries

- ES7
- Typescript
- Tailwind

#### jsonplaceholder

- Fake backend to get json objects [link](https://jsonplaceholder.typicode.com/)

#### Data Cache in NextJS, fetch from server components

- By default you get cache in server side components using the built in fetch library.
- data can be get from memory (data structures), file system (cache) or network (live). fetch uses file system built in.
- you add a second param to the fetch call, usually its enabled, you can disable it using { cache: 'no-store' }, for data that changes frequently.
- you can also set a deterministic time, like {nex: {revalidate: 10}} --> being 10 seconds
- other libraries like axios do not bring this cache functionality out of the box and need more custom configuration

## Rendering with nextjS

![Rendering](readme_img/rendering.png)

#### Static Rendering

- rendering pages and data from the cache file system.
- the data is placed in the cache during the build
- we can see this distinction when compiling the build bundle, during dev mode you don't see the effect. (npm run build, npm start)

#### Dynamic Rendering

- this happens at request time
- ƒ (Dynamic) server-rendered on demand
- this happen when we add { cache: 'no-store' } to a ssr component which is fetching data.

#### Styling, global, css modules and Tailwind

- css module is a css file scoped to a component or page.
  - it solves the problem that overrides styles with the same name when imported (the order for importing them matters because of its precedence)
  - Because this are imported as properties in JSX, they are declared in camelCase
- Tailwing - callenges in separation of concerns, but thinking in modular styling, the component can
  have the styles and do not care about the implementation details
- Tailwing is good when refactoring, if we remove the styles from one file, this css styles wont be imported in the production bundle, so its better to clean up code. the oppositve with modular css, we need to remember to clear the declaration isnstances.

#### DaysiUI

- This needs Node and Tailwind to be installed.
- npm i -D daisyui@latest
