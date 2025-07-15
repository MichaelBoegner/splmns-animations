# SPLMNS Animation Challenge 

This is my submission for the SPLMNS Frontend Developer technical challenge.

---

## View 1 – Submit Interface

Accessible at `/submit`

- Allows the user to enter a **name or short phrase** (max 20 characters).
- Submitting immediately sends the text to View 2 (`/display`) using `BroadcastChannel`.
- Includes basic input trimming and a cooldown to prevent overlap from rapid submissions.

---

## View 2 – Animated Display

Accessible at `/display`

- Fixed **16:9 aspect ratio** responsive layout.
- Animates up to **five characters simultaneously** across the screen using randomized sprites.
- Each animated element displays the submitted name or phrase.
- Includes:
  - A **front and back rain canvas layer** for realism
  - A **mid-layer DOM animation** for characters (using Framer Motion)

---

## Tech Stack

- **React 19**
- **Framer Motion 12** – DOM-based character animation
- **HTML Canvas** – Rain and splash particle effects
- **Vite** – Fast bundling and development
- **React Router** – Multi-view routing
- **Vercel** - Deployment
- **Vitest** - Unit testing

---

## Performance Notes

- Animation is capped to 5 characters at a time.
- Rain and splash loops are optimized with aging/removal of splash particles.
- You may experience degraded performance on older machines, especially when multiple browser windows are open. For example, running this on my 2019 Intel Macbook results in some lag, but running it on my 2023 M2 Pro results in flawless animation.

### If you encounter jittering or lag:
- Try running the app in a single Chrome window
- Close unnecessary background tabs
- Disable Chrome hardware acceleration (in rare cases)

---

## AI Tools Used

- **ChatGPT-4**: Assisted with boilerplate code, refining motion paths (flying arc), optimizing rendering performance, and writing this readme ^_^.

---

## Running Locally

```bash
npm install
npm run dev
```

Then visit: 
- [http://localhost:5173/submit](http://localhost:5173/submit)
- [http://localhost:5173/display](http://localhost:5173/display)


## Deployment

- Submit: [https://rainydays-two.vercel.app/submit](https://rainydays-two.vercel.app/submit)
- Display: [https://rainydays-two.vercel.app/display](https://rainydays-two.vercel.app/display)

