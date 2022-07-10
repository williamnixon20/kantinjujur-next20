Hi! This is the sourcecode for my Compfest SEA Task 2 project. 
This project is hosted on https://kantinjujur-next20.vercel.app/
Give it a go!

## Background
Kantin jujur allows users to sell and buy items without much supervision. They're allowed to take and deposit money into the balance box.

However, the canteen only trusts their own students to use this website. As such, visitors are only allowed to see the items listed. 
## Environment

For simplicity sake, the .env file is uploaded directly rather than being in the Readme.
No more stressful configuration needed!

## Getting Started

You can run this project on your local host by running

```bash
npm install
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Features
Aside from core features, I added some extras that I'd like to highlight <3
1. Login system, uses JWT token that are stored as a cookie client-side. Cookie will be verified first before access to protected routes is allowed.
2. AWS S3 photo upload, user doesnt need to get a URL of their picture first, they can just attach their pics directly in the form.
3. User friendly form, with tight validation. 

## Framework Credits
This project couldn't have been possible without Next.js, Tailwind, and the modules like react-hook-form and hot-toast <3.