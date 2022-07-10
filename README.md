# Compfest SEA Task 2
This is the source code for my kantin jujur website. This project is hosted on https://kantinjujur-next20.vercel.app/ 
Give it a try!
It's built using Atlas MongoDB as the database, with Prisma as the ORM.
Next.js is used to create both the frontend and the backend (through api routes).

## Background
Kantin jujur allows users to sell and buy items without much supervision. They're allowed to take and deposit money into the balance box.
However, the canteen only trusts their own students to use this website. As such, visitors are only allowed to see the items listed. 

## Environment
For simplicity sake, the .env file is uploaded directly rather than being put in this file.
No more stressful configuration needed! ( Seeing that both these approaches leak the data, might as well leave the .env file there for you guys XD)

## Getting Started
You can run this project on your local host by running

```bash
npm install
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### Modifying the env
If for some reason you were to want to setup things on your own, then:
1. Get your own mongoDB URI, replace the one in .env.
2. Run ```prisma db push ``` to push the schema state to the database.
3. Browse your data by doing ```prisma studio ``` to confirm if schema is pushed to db. 
4. Setup an AWS bucket and account, replace the variables in .env (https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html)

## Features
Aside from core features, I added some extras that I'd like to highlight <3
#### Login system
Uses JWT token that are stored as a cookie client-side. Cookie will be verified first before access to protected routes is allowed.
#### Authentication/Auth 
Authentication is done in such a way that prevents users from seeing a flash of screen that they're not allowed to access. Backend refuses to serve unauthenticated requests at protected routes.
#### AWS S3 bucket
User don't need to get a URL of their picture first, they can just attach their pics directly in the form. Our backend will upload the picture to AWS store the image link in DB.
#### Validation
User friendly form, with tight validation. Backend also provides quite a tight validation requirement. 

## Framework Credits
This project couldn't have been possible without Next.js, Tailwind, and modules like react-hook-form, hot-toast, JWT, bcrypt, and much more <3
