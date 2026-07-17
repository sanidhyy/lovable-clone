<a name="readme-top"></a>

# AI-powered application builder built with Next.js 16

![AI-powered application builder built with Next.js 16](/.github/images/img_main.png 'AI-powered application builder built with Next.js 16')

[![Ask Me Anything!](https://flat.badgen.net/static/Ask%20me/anything?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy 'Ask Me Anything!')
[![GitHub license](https://flat.badgen.net/github/license/sanidhyy/lovable-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/lovable-clone/blob/main/LICENSE 'GitHub license')
[![Maintenance](https://flat.badgen.net/static/Maintained/yes?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/lovable-clone/commits/main 'Maintenance')
[![GitHub branches](https://flat.badgen.net/github/branches/sanidhyy/lovable-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/lovable-clone/branches 'GitHub branches')
[![Github commits](https://flat.badgen.net/github/commits/sanidhyy/lovable-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/lovable-clone/commits 'Github commits')
[![GitHub issues](https://flat.badgen.net/github/issues/sanidhyy/lovable-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/lovable-clone/issues 'GitHub issues')
[![GitHub pull requests](https://flat.badgen.net/github/prs/sanidhyy/lovable-clone?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/lovable-clone/pulls 'GitHub pull requests')
[![Vercel status](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://clone-vibe.vercel.app 'Vercel status')

<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Folder Structure](#bangbang-folder-structure)
- [Getting Started](#toolbox-getting-started)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Stats](#wrench-stats)
- [Contribute](#raised_hands-contribute)
- [Acknowledgements](#gem-acknowledgements)
- [Buy Me a Coffee](#coffee-buy-me-a-coffee)
- [Follow Me](#rocket-follow-me)
- [Learn More](#books-learn-more)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)
- [Give A Star](#star-give-a-star)
- [Star History](#star2-star-history)
- [Give A Star](#star-give-a-star)

</details>

## :bangbang: Folder Structure

Here is the folder structure of this app.

<!--- FOLDER_STRUCTURE_START --->
```bash
lovable-clone/
  |- prisma/
    |-- migrations/
    |-- schema.prisma
  |- public/
  |- sandbox-templates/
    |-- nextjs/
  |- src/
    |-- app/
      |--- (home)/
      |--- api/
      |--- projects/
      |--- apple-icon.png
      |--- favicon.ico
      |--- global-error.tsx
      |--- globals.css
      |--- icon0.svg
      |--- icon1.png
      |--- layout.tsx
      |--- manifest.json
      |--- not-found.tsx
    |-- components/
      |--- code-view/
      |--- providers/
      |--- ui/
      |--- error-state.tsx
      |--- file-explorer.tsx
      |--- hint.tsx
      |--- loading-state.tsx
      |--- responsive-dialog.tsx
      |--- theme-toggle.tsx
      |--- tree-view.tsx
      |--- user-control.tsx
    |-- config/
      |--- http-status-codes.ts
      |--- index.ts
    |-- constants/
      |--- index.ts
    |-- env/
      |--- client.ts
      |--- server.ts
    |-- hooks/
      |--- use-confirm.tsx
      |--- use-mobile.ts
      |--- use-scroll.ts
    |-- inngest/
      |--- client.ts
      |--- functions.ts
      |--- utils.ts
    |-- lib/
      |--- db.ts
      |--- encryption.ts
      |--- utils.ts
    |-- modules/
      |--- auth/
      |--- home/
      |--- messages/
      |--- pricing/
      |--- projects/
      |--- settings/
      |--- usage/
    |-- trpc/
      |--- routers/
      |--- client.tsx
      |--- init.ts
      |--- query-client.ts
      |--- server.tsx
    |-- types/
      |--- index.ts
    |-- proxy.ts
  |- .env.example
  |- .env/.env.local
  |- .gitignore
  |- .prettierignore
  |- .prettierrc.mjs
  |- components.json
  |- environment.d.ts
  |- eslint.config.mjs
  |- next.config.ts
  |- package.json
  |- pnpm-lock.yaml
  |- pnpm-workspace.yaml
  |- postcss.config.mjs
  |- prisma.config.ts
  |- tsconfig.json
  |- vercel.ts
```
<!--- FOLDER_STRUCTURE_END --->

<br />

## :toolbox: Getting Started

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create `.env.local` file in **root** directory.
4. Contents of `.env.local`:

```env
# disable telemetry
DO_NOT_TRACK="1"
NEXT_TELEMETRY_DISABLED="1"

# app base url
NEXT_PUBLIC_APP_BASE_URL="http://localhost:3000"

# neon db uri
DATABASE_URL="postgresql://<username>:<password>@<hostname>/Vibe?sslmode=require&channel_binding=require"

# e2b api key and sandbox template name
E2B_API_KEY="e2b_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
E2B_SANDBOX_TEMPLATE_NAME="<org-name>/<template-name>"

# clerk api keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
CLERK_SECRET_KEY="sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# clerk redirect urls
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"

# verification secret and cron secret (generated by `openssl rand -hex 32`)
VERIFICATION_SECRET="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
CRON_SECRET="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

```

### 5. Disable Telemetry (Optional)

```bash
DO_NOT_TRACK=1
NEXT_TELEMETRY_DISABLED=1
```

- These disable analytics/telemetry from Next.js and other packages. Keep them as provided.

---

### 6. App Base URL

```bash
NEXT_PUBLIC_APP_BASE_URL="http://localhost:3000"
```

- Keep as `http://localhost:3000` during development.
- Change to your deployed URL (e.g., `https://clone-vibe.vercel.app`) in production.

---

### 7. Neon (PostgreSQL Database)

- Sign up at [Neon](https://neon.tech/).
- Create a new **PostgreSQL project**.
- Go to **Connection Details** and copy the **Connection String**.
- Replace `<username>`, `<password>`, and `<hostname>` with your Neon credentials.
- Append `?sslmode=require` at the end (needed for secure connections).

---

### 8. Clerk (Authentication)

- Go to [Clerk Dashboard](https://dashboard.clerk.com/).
- Create a new application.
- Navigate to **API Keys**:
  - Copy **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - Copy **Secret Key** → `CLERK_SECRET_KEY`
- Redirect URLs: Keep as provided unless you modify authentication routes.

### 9. E2B (Sandbox)

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- Go to [E2B Dashboard](https://e2b.dev/).
- Sign up for a new account and go to API Keys page.
- Create a new key and copy the API key → `E2B_API_KEY`.
- Open terminal and run `npm i -g @e2b/cli` to install the E2B CLI.
- Login to E2B CLI using `e2b auth login`.
- Assign a name to the template through environment variable `E2B_SANDBOX_TEMPLATE_NAME`. Make sure the template name is unique and not already taken.
- Run `pnpm run e2b:build` to create a new sandbox.

### 10. Generate Secrets

- Generate **verification secret** and **cron secret** (for cryptographic signing):

  ```bash
  openssl rand -hex 32
  ```

  Copy the output → `VERIFICATION_SECRET` and `CRON_SECRET` separately

---

### 11. Ngrok
  
- Download Ngrok: https://ngrok.com/download
- Sign up at [Ngrok](https://ngrok.com/) and copy your auth token from the dashboard.
- Authenticate ngrok locally:

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

---

12. Install Project Dependencies using `pnpm install --legacy-peer-deps` or `npm install --legacy-peer-deps`.

13. Now app is fully configured 👍 and you can start using this app using either one of `pnpm run dev` or `npm run dev`.

**NOTE:** Please make sure to keep your API keys and configuration values secure and do not expose them publicly.

## :camera: Screenshots

![Modern UI/UX](/.github/images/img1.png 'Modern UI/UX')

![Demo and Code view](/.github/images/img2.png 'Demo and Code view')

![Subscriptions powered by Clerk](/.github/images/img3.png 'Subscriptions powered by Clerk')

## :gear: Tech Stack

[![React JS](https://skillicons.dev/icons?i=react 'React JS')](https://react.dev/ 'React JS') [![Next JS](https://skillicons.dev/icons?i=next 'Next JS')](https://nextjs.org/ 'Next JS') [![Typescript](https://skillicons.dev/icons?i=ts 'Typescript')](https://www.typescriptlang.org/ 'Typescript') [![PostgreSQL](https://skillicons.dev/icons?i=postgres 'PostgreSQL')](https://www.postgresql.org/ 'PostgreSQL') [![Prisma](https://skillicons.dev/icons?i=prisma 'Prisma')](https://www.prisma.io/ 'Prisma') [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind 'Tailwind CSS')](https://tailwindcss.com/ 'Tailwind CSS') [![Vercel](https://skillicons.dev/icons?i=vercel 'Vercel')](https://vercel.app/ 'Vercel')

## :wrench: Stats

[![Stats for Vibe](/.github/images/stats.svg 'Stats for Vibe')](https://pagespeed.web.dev/analysis?url=https://clone-vibe.vercel.app 'Stats for Vibe')

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :gem: Acknowledgements

Useful resources and dependencies that are used in Vibe.

- Thanks to CodeWithAntonio: https://codewithantonio.com/
<!--- DEPENDENCIES_START --->
- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser): ^7.28.6
- [@clerk/nextjs](https://www.npmjs.com/package/@clerk/nextjs): ^7.2.8
- [@clerk/themes](https://www.npmjs.com/package/@clerk/themes): ^2.4.57
- [@e2b/code-interpreter](https://www.npmjs.com/package/@e2b/code-interpreter): ^2.6.1
- [@eslint/eslintrc](https://www.npmjs.com/package/@eslint/eslintrc): ^3.3.5
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): ^5.2.2
- [@ianvs/prettier-plugin-sort-imports](https://www.npmjs.com/package/@ianvs/prettier-plugin-sort-imports): ^4.7.0
- [@inngest/agent-kit](https://www.npmjs.com/package/@inngest/agent-kit): ^0.13.2
- [@next/eslint-plugin-next](https://www.npmjs.com/package/@next/eslint-plugin-next): ^16.2.9
- [@prisma/adapter-pg](https://www.npmjs.com/package/@prisma/adapter-pg): ^7.8.0
- [@prisma/client](https://www.npmjs.com/package/@prisma/client): ^7.3.0
- [@radix-ui/react-collapsible](https://www.npmjs.com/package/@radix-ui/react-collapsible): ^1.1.13
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog): ^1.1.19
- [@radix-ui/react-dropdown-menu](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu): ^2.1.16
- [@radix-ui/react-label](https://www.npmjs.com/package/@radix-ui/react-label): ^2.1.8
- [@radix-ui/react-separator](https://www.npmjs.com/package/@radix-ui/react-separator): ^1.1.11
- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot): ^1.2.4
- [@radix-ui/react-tabs](https://www.npmjs.com/package/@radix-ui/react-tabs): ^1.1.17
- [@radix-ui/react-tooltip](https://www.npmjs.com/package/@radix-ui/react-tooltip): ^1.2.12
- [@t3-oss/env-nextjs](https://www.npmjs.com/package/@t3-oss/env-nextjs): ^0.13.11
- [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss): ^4.3.2
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query): ^5.100.11
- [@trpc/client](https://www.npmjs.com/package/@trpc/client): ^11.9.0
- [@trpc/server](https://www.npmjs.com/package/@trpc/server): ^11.9.0
- [@trpc/tanstack-react-query](https://www.npmjs.com/package/@trpc/tanstack-react-query): ^11.9.0
- [@types/node](https://www.npmjs.com/package/@types/node): ^26.1.0
- [@types/pg](https://www.npmjs.com/package/@types/pg): ^8.20.0
- [@types/prismjs](https://www.npmjs.com/package/@types/prismjs): ^1.26.6
- [@types/react](https://www.npmjs.com/package/@types/react): ^19.2.14
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): ^19.2.3
- [@vercel/config](https://www.npmjs.com/package/@vercel/config): ^0.3.0
- [@vercel/functions](https://www.npmjs.com/package/@vercel/functions): ^3.6.2
- [class-variance-authority](https://www.npmjs.com/package/class-variance-authority): ^0.7.1
- [client-only](https://www.npmjs.com/package/client-only): ^0.0.1
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.1
- [date-fns](https://www.npmjs.com/package/date-fns): ^4.1.0
- [dotenv](https://www.npmjs.com/package/dotenv): ^17.4.2
- [e2b](https://www.npmjs.com/package/e2b): ^2.19.0
- [eslint](https://www.npmjs.com/package/eslint): ^9.39.2
- [eslint-config-next](https://www.npmjs.com/package/eslint-config-next): 16.2.4
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier): ^10.1.8
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier): ^5.5.6
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks): ^7.1.1
- [eslint-plugin-tailwindcss](https://www.npmjs.com/package/eslint-plugin-tailwindcss): 4.0.0-beta.0
- [inngest](https://www.npmjs.com/package/inngest): ^4.13.0
- [lucide-react](https://www.npmjs.com/package/lucide-react): ^1.17.0
- [mprocs](https://www.npmjs.com/package/mprocs): ^0.9.6
- [next](https://www.npmjs.com/package/next): 16.2.10
- [next-themes](https://www.npmjs.com/package/next-themes): ^0.4.6
- [openai](https://www.npmjs.com/package/openai): ^6.35.0
- [pg](https://www.npmjs.com/package/pg): ^8.20.0
- [prettier](https://www.npmjs.com/package/prettier): ^3.9.5
- [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss): ^0.8.0
- [prisma](https://www.npmjs.com/package/prisma): ^7.8.0
- [prismjs](https://www.npmjs.com/package/prismjs): ^1.30.0
- [random-word-slugs](https://www.npmjs.com/package/random-word-slugs): ^0.1.7
- [rate-limiter-flexible](https://www.npmjs.com/package/rate-limiter-flexible): ^11.0.1
- [react](https://www.npmjs.com/package/react): 19.2.5
- [react-dom](https://www.npmjs.com/package/react-dom): 19.2.5
- [react-error-boundary](https://www.npmjs.com/package/react-error-boundary): ^6.1.1
- [react-hook-form](https://www.npmjs.com/package/react-hook-form): ^7.81.0
- [react-hot-toast](https://www.npmjs.com/package/react-hot-toast): ^2.6.0
- [react-resizable-panels](https://www.npmjs.com/package/react-resizable-panels): ^4.11.0
- [react-textarea-autosize](https://www.npmjs.com/package/react-textarea-autosize): ^8.5.9
- [server-only](https://www.npmjs.com/package/server-only): ^0.0.1
- [superjson](https://www.npmjs.com/package/superjson): ^2.2.6
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^3.6.0
- [tailwind-scrollbar](https://www.npmjs.com/package/tailwind-scrollbar): ^4.0.2
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^4.3.0
- [tsx](https://www.npmjs.com/package/tsx): ^4.22.3
- [tw-animate-css](https://www.npmjs.com/package/tw-animate-css): ^1.4.0
- [typescript](https://www.npmjs.com/package/typescript): ^6.0.3
- [vaul](https://www.npmjs.com/package/vaul): ^1.1.2
- [zod](https://www.npmjs.com/package/zod): ^4.4.3
- [zustand](https://www.npmjs.com/package/zustand): ^5.0.14

<!--- DEPENDENCIES_END --->

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy 'Buy me a Coffee')

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy 'Follow Me')
[![Tweet about this project](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/intent/tweet?text=Check+out+this+amazing+app:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Flovable-clone 'Tweet about this project')

## :books: Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## :page_with_curl: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#sanidhyy/lovable-clone&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sanidhyy/lovable-clone&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sanidhyy/lovable-clone&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sanidhyy/lovable-clone&type=Timeline" />
</picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
