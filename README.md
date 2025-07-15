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
- **Github Copilot**: Assisted with pull request reviews. 

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

## Retrospective

### ✅ What Went Well
- Implemented clean `getUpdatedCharacters()` logic with graceful exits.
- Accounted for case when databank of available sprite types is only 5 or 6, avoiding duplicate sprite types and non-random behaviors. 
- Created test cases that caught edge behavior.
- Succeeded in immersive rain using a front and back rain layer. 
- Generally maintained a good roadmap throughout, without having to backtrack on work. 

### ⚠️ What Didn’t Go Well
- Testing with an older machine resulted in misperceiving poor quality of animation, causing time to be wasted on unnecessarily trying alternative approaches to improve performance. 
- Initially forgot to handle graceful exiting.
- Probably could have scoped both the tech stack and architecture a bit better. 

### 🧠 What I Learned
- Thoughtful test coverage helps expose invisible bugs early.
- Learned to avoid reference equality pitfalls by comparing type.id values instead of full objects, preventing accidental duplication or overwriting in state updates.

### 🔁 What I’d Do Differently
- Isolate `getUpdatedCharacters()` logic into a dedicated component sooner.
- More deliberately document scoping at the beginning.
- Test from a better machine. 
- Maintain the Retrospective document along the way. 

### 📈 Next Steps
- Allow maintenance of characters' state onReload and maybe add a reset button. 
- Add splashing for characters' feet. 
- Add more sprites in databank. 
- Add more testing. 
