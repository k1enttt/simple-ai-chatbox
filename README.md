This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Simple Gemini Chatbox

Simple Gemini Chatbox is a web application built with Next.js that leverages the Gemini API to provide real-time chat functionality.

## Getting Started

First, install the dependencies:

```bash
npm i
```

Then, create a environment file to store your api key:

```bash
copy .env.template .env # For Window

cp .env.template .env # For Mac and Linux
```

After that, replace **"your_gemini_api_key_here"** with your actual Gemini API key. To find your key, follow these steps:
1. Create a Google AI Studio account (if you're already have one, skip this step)
2. Click the 'Get API key' button on the left sidebar.
3. Click the 'Create API key' button and congrats, you have a Gemini API key.

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
