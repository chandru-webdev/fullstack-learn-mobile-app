# Study Path (React Native / Expo)

Full-stack topic checklist from `doc/Full_Stack_Developer_Complete_Topic_Checklist.txt` plus the 30-day Python + DSA sprint.

- Weekday **1–2h** (plan uses 90 min: DSA 40 / Python 40 / Apply 10)
- Weekend **4–6h** (plan uses 5h: DSA 2 / Python 2.5 / Apply 0.5)
- ~**17.5h / week**, ~**70h / 30 days**
- **12 tasks** (4 weeks × DSA + Python + Apply), not a 30-item checklist
- Tap a task → dialog with what / where / platforms / links
- Each username has **isolated** progress. New user = empty tasks.

## Run on your phone

```bash
cd study-native
npx expo start
```

Install **Expo Go** from Play Store, scan the QR code.

## Play Store (AAB)

1. `npm i -g eas-cli` then `eas login`
2. `eas build -p android --profile production`
3. Upload the `.aab` in Google Play Console (package `com.chandru.studypath`)
4. Internal test track first: `eas submit -p android --profile production`

Preview APK for your own phone:

```bash
eas build -p android --profile preview
```

Google Play requires a developer account (~$25 one-time).
