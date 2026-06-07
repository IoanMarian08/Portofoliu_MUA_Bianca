# Makeup Artist Website

Luxury bilingual portfolio website for a makeup artist brand, built with a React + Vite frontend and a Node.js + Express backend for local development. Production deployment is prepared for Vercel with a serverless appointment API.

## Project overview

Highlights:
- Editorial, luxury-focused UI with responsive layouts and refined motion
- Full Romanian and English support with a single persistent language switch
- Appointment form that sends email requests to `bianca.buca@yahoo.com`
- Local Express backend for development
- Root-level Vercel serverless API for production deployment

## Folder structure

```text
/makeup-artist-website
  /api
  /frontend
  /backend
  vercel.json
  package.json
  README.md
```

## Frontend setup

Tech stack:
- React
- Vite
- React Router
- Custom i18n with localStorage persistence
- Plain CSS with a premium editorial visual system

Routes:
- `/`
- `/meet-your-artist`
- `/contact`
- `/make-an-appointment`
- `/instagram`
- `/faqs`

Local setup:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend environment variables:

```env
VITE_API_URL=http://localhost:5000
```

Notes:
- For local development, `VITE_API_URL` should point to the Express backend.
- For Vercel production, `VITE_API_URL` can be left empty so the frontend uses the same-origin route `/api/appointments`.
- `npm run dev` runs the image conversion step before starting Vite.

## Backend setup

Tech stack:
- Node.js
- Express
- Nodemailer
- dotenv
- cors

Local setup:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend environment variables:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
APPOINTMENT_RECEIVER_EMAIL=bianca.buca@yahoo.com
FRONTEND_URL=http://localhost:5173
PORT=5000
```

## Running locally

Start the backend first:

```bash
cd backend
npm install
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Local URLs:
- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000/api/health`
- Backend appointment endpoint: `http://localhost:5000/api/appointments`

## Appointment email flow

Local development:
- The frontend submits to `VITE_API_URL + /api/appointments`
- The local Express backend sends the email through Nodemailer

Vercel production:
- The frontend submits to `/api/appointments`
- The root serverless function in [api/appointments.js](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/api/appointments.js) sends the email through Nodemailer

The email includes:
- Full name
- Email
- Phone number
- Desired service
- Preferred date
- Preferred time
- Event type
- Location
- Additional details
- Selected website language: Romanian or English

Recommended SMTP setup:
1. Use Gmail with an App Password, or another SMTP provider such as Brevo, Mailgun, or Zoho.
2. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM`.
3. Keep all SMTP values only on the server side or in the Vercel project environment settings.

Example Gmail configuration:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Makeup by Bianca <your-email@gmail.com>"
APPOINTMENT_RECEIVER_EMAIL=bianca.buca@yahoo.com
```

## Deployment on Vercel

Deployment approach:
- The repository root is the Vercel project root.
- The frontend is built from `frontend/`.
- The production appointment API runs from the root serverless function `api/appointments.js`.
- The local Express backend is not required in production.

Files used for deployment:
- [vercel.json](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/vercel.json)
- [package.json](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/package.json)
- [api/appointments.js](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/api/appointments.js)

How to import into Vercel:
1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Create a new Vercel project and import the repository.
3. Select the repository root as the Root Directory.

Vercel build settings:
- Build command: `npm run build --prefix frontend`
- Output directory: `frontend/dist`
- Install command: handled in `vercel.json` as `npm install && npm install --prefix frontend`

Why the build command is enough:
- `frontend/package.json` includes a `prebuild` script.
- Vercel runs `npm run build --prefix frontend`.
- That automatically runs the HEIC conversion step before `vite build`.

Environment variables to add in the Vercel dashboard:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
APPOINTMENT_RECEIVER_EMAIL=bianca.buca@yahoo.com
VITE_API_URL=
```

Important notes for Vercel variables:
- Add them in `Project Settings -> Environment Variables`.
- `SMTP_*` and `APPOINTMENT_RECEIVER_EMAIL` are server-side values.
- `VITE_API_URL` is frontend-safe.
- On Vercel, `VITE_API_URL` should usually be left empty so requests go to `/api/appointments` on the same domain.

How routing works on Vercel:
- `vercel.json` rewrites all non-API routes to `/index.html`.
- This prevents React Router routes like `/contact` or `/faqs` from returning 404 on refresh.

How the appointment API works on Vercel:
- The frontend submits to `/api/appointments`.
- The serverless function accepts only `POST`.
- It validates the request body.
- It sends the email with Nodemailer using Vercel environment variables.
- It returns JSON success or error responses.

How to test the deployed appointment form:
1. Deploy the project.
2. Open the live site.
3. Visit `/make-an-appointment`.
4. Complete the form in either language.
5. Submit the form and confirm the success message appears.
6. Check the destination inbox for the new appointment email.

Common issues:
- React Router 404 on refresh:
  This is handled by the rewrite rules in [vercel.json](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/vercel.json).
- SMTP credentials missing:
  The serverless function will fail if `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, or `SMTP_FROM` are not set.
- Gmail app password required:
  Standard Gmail account passwords will not work. Use a Google App Password.
- CORS not needed on Vercel:
  When the frontend and API are on the same Vercel domain, no extra CORS configuration is needed.

## Bilingual support

Languages included:
- Romanian
- English

How it works:
- The language system is defined in [frontend/src/i18n/translations.js](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/i18n/translations.js)
- Global language state is managed in [frontend/src/context/LanguageContext.jsx](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/context/LanguageContext.jsx)
- Components access translations through [frontend/src/hooks/useTranslation.js](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/hooks/useTranslation.js)
- The selected language is stored in `localStorage`
- Default language is Romanian unless the browser language suggests English

Language switch:
- The language switch button is in the header navigation
- It shows the target language: `EN` or `RO`
- The selected language persists after refresh

## HEIC image support

The portfolio supports real `.heic` and `.heif` files automatically.

How it works:
- Put source images in [frontend/src/assets/images](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/assets/images)
- Organize them in category folders such as:
  - `glam`
  - `editorial&creative`
  - `retro - pin up`
  - `bridal`
  - `soft glam`
  - `mature skin`
- The conversion script scans those folders recursively.
- `.heic` and `.heif` files are converted to `.webp`.
- Existing browser-friendly files like `.jpg`, `.jpeg`, `.png`, `.webp`, and `.avif` are copied into the generated folder.
- Generated files are stored in `frontend/public/generated/images`.
- A manifest file is regenerated automatically at [frontend/src/data/generatedPortfolioImages.json](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/data/generatedPortfolioImages.json).
- The React portfolio reads only from that generated manifest, so `.heic` files are never rendered directly in the browser.

Manual conversion command:

```bash
cd frontend
npm run convert:images
```

When conversion runs:
- Before local frontend development via `npm run dev`
- Before production build via the `prebuild` hook
- On Vercel before `vite build`

Important notes:
- Do not manually edit files inside `frontend/public/generated/images` unless absolutely necessary.
- If one image fails to convert, the script logs the error and continues processing the rest.
- If a converted image is already newer than the source, the script skips it.
- Folder names with spaces and nested folders are supported.
- Adding a new `.heic` image to a category updates the generated manifest the next time you run the conversion or build.

## Where to replace content

Brand text and social links:
- Update brand name and social URLs in [frontend/src/constants/site.js](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/constants/site.js)
- Update all translated copy in [frontend/src/i18n/translations.js](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/i18n/translations.js)

Hero video:
- Replace the temporary remote video reference in [frontend/src/constants/site.js](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/constants/site.js)
- Add the production video file under [frontend/src/assets/videos/README.md](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/assets/videos/README.md)

Portfolio and artist imagery:
- Replace placeholders described in [frontend/src/assets/images/README.md](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/assets/images/README.md)
- The portfolio image manifest is generated automatically in [frontend/src/data/generatedPortfolioImages.json](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/data/generatedPortfolioImages.json)
- The conversion pipeline is defined in [frontend/scripts/convert-heic-images.js](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/scripts/convert-heic-images.js)
- Update the artist portrait section in [frontend/src/pages/MeetYourArtist.jsx](/mnt/x/Programming/Proiecte/Portofoliu_MUA_Bianca/frontend/src/pages/MeetYourArtist.jsx)

Contact recipient:
- Update `APPOINTMENT_RECEIVER_EMAIL` in `backend/.env` for local development if needed
- Update `APPOINTMENT_RECEIVER_EMAIL` in the Vercel project environment variables for production

## Features included

- Cinematic hero video with premium overlay and CTA
- Two-column editorial navigation block on the homepage
- Responsive portfolio grid with modal previews
- Romanian and English language switching with persistence
- Meet Your Artist, Contact, Instagram, and FAQs pages
- Backend-connected appointment form with validation, loading, success, and error states
- Vercel-ready serverless production API
- Responsive mobile navigation and language switch
