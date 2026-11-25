# The Golden Sip Café – menu, WhatsApp ordering & owner panel

* Customers: `/` – menu, search, Veg / Non-Veg / Beverages filters, cart, order sent to WhatsApp **+91 75594 92970**
* Owner: `/admin` – password login; change prices, add/rename/delete categories and dishes, mark dishes sold out, reorder.
  Nothing in the owner panel works without the password (checked on the server, not in the page).

## Put it live (about 10 minutes)

1. **Replace your current site files.** Open the GitHub repo that Vercel deploys for `goldensip-kohl.vercel.app`,
   delete the old files, and upload everything from this folder (keep the folders `api`, `lib`, `public`).
   (Or create a new Vercel project from this folder.)
2. **Add the free database** (so price/menu changes are saved):
   Vercel dashboard → your project → **Storage** → *Create Database* → **Upstash Redis** (free plan) → connect it to the project.
   Vercel adds the connection settings by itself.
3. **Set the owner password:** Project → **Settings → Environment Variables** → add
   `ADMIN_PASSWORD` = the password you want (Production, Preview, Development).
   Optional: `SESSION_SECRET` = any long random text.
4. **Redeploy** (Deployments → ⋯ → Redeploy). Open `https://<your-site>/admin` and log in.

Project settings: Framework Preset = **Other**; leave Build Command / Output Directory empty (vercel.json already sets them).

## Notes
* Change the WhatsApp number: `WHATSAPP` near the top of the script in `public/index.html`.
* Until the first Save in the owner panel, customers see the starting menu from `lib/default-menu.json`.
  After the first Save the database copy is used.
* 8 wrong passwords in 15 minutes locks that visitor out for 15 minutes.
* Test on your computer: `ADMIN_PASSWORD=test node dev-server.js` → http://localhost:3000 (no database → read-only).
