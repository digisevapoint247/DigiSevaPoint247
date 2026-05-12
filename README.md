# DigiSeva Point

Professional Next.js service platform for online form-filling assistance, appointments, AI chat, Razorpay payments, Jitsi video rooms, and Supabase-backed admin management.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Host on GitHub Pages

This repo includes `.github/workflows/deploy-github-pages.yml`.

1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. In GitHub, open **Settings > Pages**.
4. Set **Build and deployment > Source** to **GitHub Actions**.
5. Run the workflow or push to `main`.

The published URL will usually be:

```text
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
```

GitHub Pages is static hosting. On GitHub Pages:

- The public website, services, contact links, SEO, sitemap, and WhatsApp booking handoff work.
- Server APIs do not run, so Razorpay verification, OpenAI server chatbot, Supabase admin writes, and backend appointment storage need server hosting such as Vercel, Render, or a VPS.
- For Google indexing, set `NEXT_PUBLIC_SITE_URL` in the workflow to the final public URL and submit `/sitemap.xml` in Google Search Console.

## Configuration

Copy `.env.example` to `.env.local` and add keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
OPENAI_API_KEY=
OPENAI_CHAT_MODEL=gpt-5.4-mini
```

The site works in a demo-friendly mode without these keys:

- Appointments return a demo ID and Jitsi room link.
- Razorpay shows a setup-pending message.
- Chatbot uses guided fallback answers.
- Admin page explains the missing Supabase setup.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create an Auth user for the admin.
4. Insert that user into `admin_profiles`.
5. Add Supabase keys to `.env.local`.

## Contact

- Mobile: `8269805682`
- WhatsApp: `8269805682`
- Email: `digiseva247@gmail.com`

## Important Disclaimer

DigiSeva Point provides form-filling assistance only. It is not an official government portal and does not guarantee approval by any authority.
