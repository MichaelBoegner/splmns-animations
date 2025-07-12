# SPLMNS Animation Challenge – Submission by Michael Boegner

This is my submission for the SPLMNS Frontend Developer technical challenge. The app includes two views:

---

## 🔹 View 1 – Submit Interface

Accessible at `/submit`

- Allows the user to enter a **name or short phrase** (max 20 characters).
- Submitting immediately sends the text to View 2 (`/display`) using `BroadcastChannel`.
- Includes basic input trimming and a cooldown to prevent overlap from rapid submissions.

---

## 🔹 View 2 – Animated Display

Accessible at `/display`

- Fixed **16:9 aspect ratio** responsive layout.
- Animates up to **five characters simultaneously** across the screen using randomized sprites.
- Each animated element displays the submitted name or phrase.
- Includes:
  - A **front and back rain canvas layer** for realism
  - A **mid-layer DOM animation** for characters (using Framer Motion)

---

## 🧪 Tech Stack

- **React 19**
- **Framer Motion 12** – DOM-based character animation
- **HTML Canvas** – Rain and splash particle effects
- **Vite** – Fast bundling and development
- **React Router** – Multi-view routing
- **Vercel** - Deployment

---

## ⚙️ Performance Notes

- Animation is capped to 5 characters at a time.
- Rain and splash loops are optimized with aging/removal of splash particles.
- When running two browser window simultaneously, slight frame drops may occur due to total browser rendering load. Debugging has shown that this appears to be due to something with the `RainOverlay.jsx` implmentation, though I thought, initially, that it had to do with using Framer Motion for character animation. 
- A future version will try reducing draw frame rate for `RainOverlay.jsx` and converting character animation to Canvas. 

---

## 🤖 AI Tools Used

- **ChatGPT-4**: Assisted with boilerplate code, refining motion paths (flying arc), optimizing rendering performance, and writing this readme ^_^.

---

## 🛠️ Running Locally

```bash
npm install
npm run dev
```

Then visit: 
- [http://localhost:5173/submit](http://localhost:5173/submit)
- [http://localhost:5173/display](http://localhost:5173/display)


## Deployment

see: [https://rainydays-two.vercel.app/](https://rainydays-two.vercel.app/)


