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

# Production site

[https://activity-tracker-nextjs-ts.vercel.app/](https://activity-tracker-nextjs-ts.vercel.app/)

# Development

#### Source

- https://github.com/mosh-hamedani/issue-tracker

#### VSCode libraries

- ES7
- Typescript
- Tailwind

#### Eslint bypass error temporary

- Eslint version 9 not working on current next version [github issue](https://github.com/vercel/next.js/issues/64409)
  - the version 9 is too recent, workaround is to downgrade eslint to stable version: `"eslint": "^8.41.0"`

#### jsonplaceholder

- Fake backend to get json objects [link](https://jsonplaceholder.typicode.com/)

#### Data Cache in NextJS, fetch from server components

- By default you get cache in server side components using the built in fetch library.
- data can be get from memory (data structures), file system (cache) or network (live). fetch uses file system built in.
- you add a second param to the fetch call, usually its enabled, you can disable it using { cache: 'no-store' }, for data that changes frequently.
- you can also set a deterministic time, like {nex: {revalidate: 10}} --> being 10 seconds
- other libraries like axios do not bring this cache functionality out of the box and need more custom configuration

###### Disabling caching in static route strategies

- [nextjs route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
- you export variables that nextjs engine reads to determine cache handling.
- server cache (data) and client cache (layout) are different.
- `export const revalidate = 0; export const dynamic = "force-dynamic"`
- Caching types:

  - Data cache: to store the result of fetch().
  - Full Route cache: to store output of static routes.
  - router cache (client side cache): to store the payload of pages in browser.
    - Automatic invalidation:
    - static routes: are cached for 5 min.
    - dynamic routes: are cached for 30secs. Meaning new data changes will be seen only after 30secs after a refresh.
      - We can force the router to refresh the page. `router.refresh()`

- Note: All this caching behaviour act differently in prod, after the build is created, rather than in dev mode. so diligently check the build behavior

## Rendering with nextjS

![Rendering](readme_imgs/rendering.png)

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
- follow installation instructions `https://daisyui.com/docs/install/`
  - note, this was removed after by `Radix UI Theme`, equivalent and even more robust

## Routing NextJS

#### Dynamic Routing

- built-in routing mapping to folder name, you use [id] , [slug], etc
- this is available only on Page.tsx as built int props params: {id}, other component in the folder level wont have access to the dynamic param
- nested ID need the structure slug1/[id]/slug2/[other_id].
- id identificators should not repeat, slugs can repeat.

#### Catch-all segments Routing

- if we need a very dynamic url with many slugs (referring to categories for example), you can use the catch-all segment feature. [...slug], the base route will require to have a slug after.
- this ...slug will be captured as an array of slug items.
- if we want the slug to be optional, for instance, users/ (all of them) and users/students/active/curreny_year (to make a inline filter), we use double square brakets: [[...slug]]

#### Link element from next/navigation

- it only downloads the content target, being a src (server render component) or client component but not other data.
- it pre-fecthes the links that are in the viewport.
  - this can be seen in prod, build the app. for instance, links to query params will be pre-fetched to improve performance (link page to href="/users?sortOrder=name" or href="/users?sortOrder=email")
- chaches pages on the client, to improve performance, it doesn't call the server again.

#### Page cache

- it is cleared every full page reload.

#### useRouter()

- use for programmatic navigation
- make sure to import from 'router/navigation'.
  - note that next/router is discontinued

#### Suspense

- a special wrapper component to show something while data is being loaded.
- syntax: `<Suspense fallback={<p>Loading ... </p>}>`
- SEO impact, you will see the 1st html loaded, shows the loading states for suspense = true.
  however this doesnt impact the SEO, because the connection pool is not closed and the data is retrieved.
  SEO knows it and reads the data when it loads.
  - This is called streamming (the same way as videos, nextjs streams html content)
- What if we want to wrap a whole page instead of sections of the page?
  - you can use the layout component to place the suspense element

#### Loading page

- another approach to display the user with a loading state is using hte laoding.tsx file.
- works similar to layout, page, not-found pages.

#### Not-found page

- These pages can live at the page level to give a customized message.
- The precedence: first use the page level file, then the root level file, if not, the default nextjs
- To call it from a validation statement: notFound() `import { notFound } from "next/navigation"`
- important to show when page url is valid but query does not have valid data, eg. user id > 100

#### Error page

- These pages can live at the page level to give a customized message.
- The precedence: first use the page level file, then the root level file, if not, the default nextjs
- The error captured by nextjs can be handled to a third party loggin service like [SENTRY](https://sentry.io/welcome/), display to the user or to the console log.
- The error is passed down as a props, also a reset param to allow the user to retry when the error is temporary
- The error page should be a client component 'use client' directive.

## API calls

#### route files

- same structure as pages
- syntax: `export function GET(request: NextRequest) {`
- Crud methods are named is capital letters: GET, POST, PUT/PATCH, DELETE
  - PUT: replace an object, PATCH: replace properties on one object
- if `request: NextRequest` is omited, NextJS will cache the data, to avoid that, explicitly add request as the parameter even if its not used.

#### ZOD: validation library

- Zod [documentation](https://zod.dev/)

#### Firebase with NextJS

- Follow [documentation](https://firebase.google.com/codelabs/firebase-nextjs#1) for setup
- currently using ekos.sv@gmail for this project
- login to [console](https://console.firebase.google.com/u/0/?pli=1)
- install firebase `npm install firebase`

#### Mysql installation

- visit [download site](https://dev.mysql.com/downloads/)
- go to MySQL Community Server
- downloaded version mysql-8.3.0-macos14-arm64 for mac
- mysql workbench warning that functions might be limited for latest version db 8.0 and above
- downloaded [DBeaver Universal Database Tool](https://dbeaver.io/): dbeaver-ce-24.0.3-macos-aarch64

#### Mysql remote instance on aiven

- Created an account in aiven using ekos.sv@gmail.com
- see [dashboard](https://console.aiven.io/account/a4aca5659fdb/project/ekos-7026/services/mysql-1cb81841/overview)
- note this connection requires ssl certificate, download the cert.pem from dashboard and use it in DBeaver or any DB GUI.
- updated in .env to use the cloud remote db
- run npx prisma migrate dev again to generate modesl in remote db
  - error during migration, mysql.sql_require_primary_key was set true, this migrations is creating some tables without pk. I had to set it false, but not recommended.
    - I went to dashboard/settings/advance/mysql.sql_require_primary_key: disabled
    - migrations completed, confirmed in DBeaver GUI
    - updated environment variable in vercel for new DATABASE_URL
    - redeploy site to read new variables in source code

#### Prisma sdetup with NextJS/MySQL

- MySQL database engine
- read [documentation](https://www.prisma.io/)
- install Prisma extension in VScode.
- setup prisma with CLI `npx prisma init`
- prisma folder is created with reference to the database
- `.env` file is created as well
- updated connection string using the [documentation reference](https://www.prisma.io/docs/orm/reference/connection-urls)
- updated DATABASE_URL in .env file

#### Prisma Data models

- entities or application domains like products, users, etc. see [documentation](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)
- whenver we edit a model, we want to format it `npx prisma format`

#### Prisma Migratations

- for relational db, you run: `npx prisma migrate dev`, for non-relational db: `npx prisma db push`
- the first migration creates the db, you just state the connection string to the db
- whenever we change or add a model, we need to run the prisma migration: `npx prisma migrate dev`
  - eg: adding to a model: `registeredAt DateTime @default(now())`

#### Prisma - table relationships

- chekign the example about assignedUserId to an issue, you modify the prisma models.
- Issue model additions:

```
  assignedToUserId String? @db.Char(255)
  assignedToUser User? @relation(fields: [assignedToUserId], references: [id])
```

- User model additions:

```
assignedIssues Issue[]
```

The run the migration: `npx prisma migrate dev`

#### Prisma Client Instance

- added @prisma/client in npm packages
- created the prisma client instance to be using in the code

```

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;

```

- note: to use Prisma client instance in development for nextjs (because it reloads twice), we need to add additional code to prevent the refresh to create too many instances in every import in dev mode.
  - [see documentation](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)

#### Cloudinary for images

- Setup cloudinary following the [documentation](https://console.cloudinary.com/console/c-7a6c04749c39512e5174cf535ef869/getting-started)
- account setup with ekos.sv@gmail.com
- install the npm package: `npm i next-cloudinary` and follow instructions for [next env](https://next.cloudinary.dev/)

###### Adding Upload Widget

- To add the upload [widget](https://console.cloudinary.com/settings/c-7a6c04749c39512e5174cf535ef869/upload), we need to get the upload preset key from settings of our account.
- setup the preset in your account
  - go to settings in the [cloud dashboard](https://console.cloudinary.com/settings/c-7a6c04749c39512e5174cf535ef869/billing/plans)
  - go to product environment settings/upload option
  - go to Upload presets, click on upload preset.
    - copy the name and change it to "unsigned"
    - folder: leave it blank, all files will be stored in the root directory.
      - added: activity_tracking_app folder

```

  <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}>
    {({ open }) => (
        <button className="btn btn-primary" onClick={() => open()}>
            Upload
        </button>
    )}
  </CldUploadWidget>
```

- configure options of widget in [demo page](https://demo.cloudinary.com/uw/#/)

## Authentication

- The outline:
  - setting up next auth
  - configuring the google provider
  - authentication sessions
  - protecting routes
  - database adapters
  - configuring the credentials

#### Setting up next auth

- set up [auth js](https://authjs.dev/getting-started)
- `npm install next-auth@beta`, this is v5, see [documentation](https://authjs.dev/getting-started/migrating-to-v5)
- Add an Route Handler under /app/api/auth/[...nextauth]/route.ts

#### Configuring the google provider

- visit [Google OAuth Configuration](https://console.cloud.google.com/projectselector2/apis/credentials?supportedpurview=project&authuser=2)
- configured OAuth consent screen as external
- add test users and let all config to point as test env.
  - configure the Authorized redirect URIs Oauth in google using the redirect url provided by next-auth `[origin]/api/auth/callback/google`
- add both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env fole
- add google provider in the next auth file

```
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ]
```

- add login auth link to navbar `/api/auth/signin`, endpoint exposed from next-auth

#### Authentication sessions

- See [authentication methos in authjs v5](https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side)

###### Accessing session from the client

- We need to wrap the app into a authProvider component
- this should wrap the body in layout, but it needs to be a client component - "use client"
- we can not convert the layout component to be a client component becuase it has the metadata
  - this needs to be src - server rendered component
- you separate the wrapper - client component to take a children as prop.

```
  "use client";
  import React, { ReactNode } from "react";
  import { SessionProvider } from "next-auth/react";


  const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
  };

  export default AuthProvider;
```

- now you can access session information from anywhere in the app
- wherever you access session data, you need to convert the component to client component
- use this to access session from client component

```
  import { useSession } from "next-auth/react";
  const { status, data: session } = useSession();

```

###### Accessing session from the server (components and routes)

- un SRC (server rendered components) load the following

```
  import { auth } from "@/auth";
  export const Component = () => {
    const session = await auth();
  }
```

#### Configure Facebook Provider for Next Auth

- follow the [documentation](https://next-auth.js.org/providers/facebook)
- creating an app within facebook for [developers](https://developers.facebook.com/apps/819546503241366/dashboard/)
- created activity_tracking_app for production
- created activity_tracking_app_dev for dev
- as facebook has its built in oauth application, [see docs](https://next-auth.js.org/configuration/providers/oauth)
- callback urls:
  - https://next-app-ten-azure.vercel.app/api/auth/callback/facebook (prod)
  - http://localhost:3000/api/auth/callback/facebook (dev)

#### Configure GitHub Provider for Next Auth

- NOTE: only allows one callback url - meaning it will only work for prod in this demo
- see [documentation](https://next-auth.js.org/providers/github)
- creating an OAuth app within [github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- go to developer settings and create the oauth app.

#### Logout session

- the logout session is already handled by authjs, we <Link> to /api/auth/signout and it will take us to the logout provider page
- you can customize it on the provider page
- if logout from server is needed, you can trigger the funtion `import { signOut } from "@/auth";` from next-auth instance (NextAuth)

#### Protecting routes: Middleware

- You use a middleware to inspect every request and determine the next step.
- [documentation](https://next-auth.js.org/tutorials/securing-pages-and-api-routes)
- nextjs is looking for a middleware.ts file in the root directory to execute the logic
- this is an example of how to redirect a call.
- note that default approach didnt work with the matcher, see `middleware.ts` file

```
  export default auth((req) => {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
  });
  export const config = { matcher: ["/issues/list"] }
```

#### Protecting Endpoints

- a god practice is to protect routes that modify data but not those that read data (some cases)
- if we use the route middleware, the entire route would be protected, so in the api layer
  we want to protect by the operation level. (PUT, DELETE, POST)
  - Adding session checkers in the Request itself

```
  const session = await auth();
  if (!session) return NextResponse.json({}, {status: 401})
```

#### Database adapter

- using the prisma adapter, see [documentation](https://authjs.dev/getting-started/adapters/prisma)
- you need to add new models in the `schema.prisma` file for the required data in auth tables
  - to do a clean transtition, removed all models (user and products) and added the recommended in docs.
- run `npx prisma migrate dev`
- session strategy is automatically updated to `database`, so you explicitly set it to: `session: { strategy: 'jwt' }` in the `auth.config` file

###### Credentials adapter

- To allow email and pass login, see [documentation](https://authjs.dev/getting-started/providers/credentials)

###### Fix Bcrypt error NextJS 14 redundancy components.

- see [thread](https://github.com/kelektiv/node.bcrypt.js/issues/979#issuecomment-1949878830)
- add bcrypt to config.externals like so:

```
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  }

  whenever used, require this way:
  const bcrypt = require("bcrypt");
  const hashedPassword = await bcrypt.hash(password, 12);
```

#### Sending Emails in React

- see [documentation](https://react.email/docs/getting-started/manual-setup)
- run `sudo npm i react-email @react-eamil/components E`
- added a folder in root: `emails`
- added `.react-email/` to .gitignore
- added permission to node_modules dir for server to run locally `sudo chmod -R 777 node_modules/`

###### Configuring Resend

- see the [integrations](https://react.email/docs/integrations/resend)
- run `npm install resend`
- create an account in [resend](https://resend.com/overview) - added with ekos.sv@gmail.com
- add an `api key` and place it in `.env`

#### Radix UI

- see [documentation](https://www.radix-ui.com/)
- you will use radix themes
- run `npm install @radix-ui/themes`
- add `import '@radix-ui/themes/styles.css';` at the top of the root layout page
- add `import { Theme } from '@radix-ui/themes';` and wrap the body with the <Theme> component

#### Markdown Editor

- [React SimpleMDE (EasyMDE)](https://www.npmjs.com/package/react-simplemde-editor)
- `npm install --save react-simplemde-editor easymde`
- in order to render the content we need another lib `react-markdown@8.0.7`
  - note, tailwing configuration disables to read headings and list items by default.
  - we need to install aditional pluging [@tailwindcss/typography](https://v1.tailwindcss.com/docs/typography-plugin)
  - [setup](https://github.com/tailwindlabs/tailwindcss-typography) - `npm install -D @tailwindcss/typography`
  - add this to `tailwind.config.js`
  ```
    module.exports = {
    theme: {
    // ...
    },
    plugins: [
    require('@tailwindcss/typography'),
    // ...
    ],
    }
  ```
  - add `className="prose"` to the markdown element

#### Handling Form submission

- [React hook form](https://react-hook-form.com/)
- `npm install react-hook-form@7.46.1`
- using Controller component to wrap elements that do not accept props to merge with the register functionality of react-hook
- added axios to handled API call.
- added useRouter from navigator to handle redirect after saving issue.
- frontend validation with same zod schema, using `@hookform/resolvers@3.3.1`

#### Adding Skeletons

- to keep consistency in loading pages
- add skeloton elements in each instance to load data

```
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

```

#### Link elements: combining RadixUI Link element with next/link functionality

- you create a custom component
- after mix the component, got this error: `Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.`
- see [docs](https://nextjs.org/docs/app/api-reference/components/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)
- you need to pass `<Link href={href} passHref legacyBehavior>` the extra params.

## Provider

#### [TankStack Query v5](https://tanstack.com/query/latest) - ReactQuery

- making fetch with useEffect and axios or fetch is not efficient, error handling and coming back to the page generates a new query each time
- we need to leverage caching, when we get data as lists, data that we dont need to re-fetch, unless its updated.
- for this approach you need a wrapper, query provider.
- look at the QueryClientProvider.tsx file
- usage in client components:

```
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
```

#### Sorting on columns.

- you implement a searchparam from the column clicked.

```
  <NextLink
    href={{
      query: { ...searchParams, orderBy: "name" },
    }}
  >
    Name
  </NextLink>
```

- the ` query: { ...searchParams, orderBy: "name" },` cares to update and keep any other searchParam in the query
- NextLink is used to differenciate the color.

###### Generating Dummy data for issues

- using chatGPT to generate SQL statemens:

```
INSERT INTO Issue (title, description, status, createdAt, updatedAt) VALUES
('Login Issue', 'Users are unable to login using their credentials.', 'OPEN', '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
('Payment Gateway Down', 'The payment gateway is currently down, causing transaction failures.', 'IN_PROGRESS', '2024-01-02 12:30:00', '2024-01-02 14:00:00'),
('UI Bug on Dashboard', 'Dashboard displays incorrect data for sales figures.', 'CLOSED', '2024-01-03 09:15:00', '2024-01-04 11:45:00'),
('Email Notifications Not Sent', 'Users are not receiving email notifications after registration.', 'OPEN', '2024-01-04 08:45:00', '2024-01-04 08:45:00'),
('Slow Page Load', 'The homepage takes too long to load.', 'IN_PROGRESS', '2024-01-05 11:00:00', '2024-01-05 13:30:00'),
('Broken Link on Help Page', 'There is a broken link on the help page.', 'CLOSED', '2024-01-06 14:00:00', '2024-01-07 16:20:00'),
('Database Timeout Error', 'Database queries are timing out during peak hours.', 'OPEN', '2024-01-07 15:10:00', '2024-01-07 15:10:00'),
('Password Reset Issue', 'Users cannot reset their passwords.', 'IN_PROGRESS', '2024-01-08 07:50:00', '2024-01-08 09:20:00'),
('Profile Picture Upload Failed', 'Users are unable to upload profile pictures.', 'CLOSED', '2024-01-09 10:05:00', '2024-01-10 12:30:00'),
('Search Functionality Broken', 'Search results are not displaying correctly.', 'OPEN', '2024-01-10 09:25:00', '2024-01-10 09:25:00'),
('API Rate Limit Exceeded', 'Clients are hitting the API rate limit frequently.', 'IN_PROGRESS', '2024-01-11 11:40:00', '2024-01-11 14:50:00'),
('Localization Issue', 'Some UI texts are not localized correctly.', 'CLOSED', '2024-01-12 13:15:00', '2024-01-13 15:00:00'),
('Billing Information Missing', 'Billing information is not being saved.', 'OPEN', '2024-01-13 14:45:00', '2024-01-13 14:45:00'),
('Data Sync Error', 'Data synchronization between services is failing.', 'IN_PROGRESS', '2024-01-14 07:20:00', '2024-01-14 09:00:00'),
('Incorrect Error Messages', 'Users receive incorrect error messages on failed actions.', 'CLOSED', '2024-01-15 10:30:00', '2024-01-16 11:45:00'),
('File Download Issue', 'Files are not downloading correctly from the server.', 'OPEN', '2024-01-16 08:15:00', '2024-01-16 08:15:00'),
('Broken Image Links', 'Some images are not loading on the product pages.', 'IN_PROGRESS', '2024-01-17 11:00:00', '2024-01-17 13:30:00'),
('Cart Update Error', 'Users are unable to update their cart items.', 'CLOSED', '2024-01-18 14:10:00', '2024-01-19 16:20:00'),
('Session Expiry Issue', 'User sessions are expiring too quickly.', 'OPEN', '2024-01-19 15:35:00', '2024-01-19 15:35:00'),
('Notifications Delayed', 'Push notifications are delayed by several hours.', 'IN_PROGRESS', '2024-01-20 07:50:00', '2024-01-20 09:20:00');

```

#### Adding charts to the dashboard

- we use [https://recharts.org/en-US/](https://recharts.org/en-US/)

# continue with:

- 4. Sorting issues
- Todo:
  - need to fix refresh issue when navigating back in assign issue details page
  - issue with cache for avatar icon, not displaying submenu options
