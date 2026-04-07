# How to Add Your Own Games to Small Talk

## Option 1 – Drop-in HTML game (easiest)

1. Create a folder: `public/games/<your-game-id>/`
2. Put your game's HTML file there as `index.html`
3. Open `src/app/games/[gameId]/page.tsx`
4. Add your game to the `GAME_INFO` object:
   ```ts
   'my-game-1': { title: 'My Cool Game', emoji: '🎮', description: 'Description here' },
   ```
5. Uncomment the iframe block in the same file and change the gameId:
   ```tsx
   if (gameId === 'my-game-1') {
     return (
       <iframe
         src={`/games/my-game-1/index.html`}
         className="w-full rounded-3xl"
         style={{ height: '600px', border: 'none' }}
         title="My Cool Game"
       />
     )
   }
   ```
6. Your game is now accessible at: `/games/my-game-1?subject=animals&level=1`

---

## Option 2 – React component game

1. Create your component in `src/components/games/MyGame.tsx`
   - It should accept `words: WordItem[]` and `onScore: (score: number) => void` props
2. Import it in `src/app/games/[gameId]/page.tsx`
3. Add the case: `{gameId === 'my-game' && <MyGame words={words} onScore={handleScore} />}`
4. Add to `GAME_INFO`

---

## Running the project

```bash
cd small-talk
npm run dev     # starts at http://localhost:3000
npm run build   # production build
npm start       # serve production build
```

## Adding new subjects

1. Create `src/data/content/mysubject.ts` — copy `animals.ts` as template
2. Import and add it to `SUBJECTS` array in `src/data/subjects.ts`

## Folder structure

```
small-talk/
├── public/
│   └── games/          ← Drop your HTML games here
├── src/
│   ├── app/
│   │   ├── page.tsx                          ← Homepage
│   │   ├── subject/[subjectId]/page.tsx      ← Subject + levels
│   │   ├── lesson/[subjectId]/[level]/page.tsx  ← Flashcard lesson
│   │   ├── quiz/[subjectId]/[level]/page.tsx    ← Interactive quiz
│   │   └── games/[gameId]/page.tsx           ← Game hub
│   ├── components/
│   │   ├── games/
│   │   │   ├── WordMatch.tsx     ← Match English↔Hebrew pairs
│   │   │   ├── SpellingBee.tsx   ← Type the English spelling
│   │   │   └── BubblePop.tsx     ← Pop the right bubble
│   │   ├── layout/Header.tsx
│   │   └── ui/
│   ├── data/
│   │   ├── subjects.ts           ← All subjects registry
│   │   └── content/              ← Content per subject
│   ├── hooks/useProgress.ts      ← localStorage progress
│   └── types/index.ts
```
