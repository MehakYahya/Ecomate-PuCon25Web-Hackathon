# Voice Input Feature - Urdu to English Transcription

## Overview
This feature allows users to create posts using voice input in Urdu language. The spoken Urdu words are automatically converted to English text in real-time.

## How It Works
- **Technology**: Uses Web Speech API (built into modern browsers)
- **Language**: Configured for Urdu (Pakistan) - `ur-PK`
- **Real-time**: Continuous speech recognition with live transcription
- **Auto-translation**: Browser API handles language recognition and conversion

## How to Use
1. Navigate to the **Eco Feed** page
2. Click on "Create Post" button
3. You'll see a microphone icon (🎤) next to the content textarea
4. Click the microphone button to start recording
5. Speak in Urdu - your speech will be converted to English text
6. The recording indicator (🔴) will pulse while recording
7. Click the microphone again to stop recording
8. The transcribed text appears in the content field
9. Submit your post as usual

## Browser Support
This feature works best on:
- ✅ **Google Chrome** (Recommended)
- ✅ **Microsoft Edge**
- ✅ **Safari** (MacOS/iOS)
- ❌ **Firefox** (Limited support)

## Notes
- The microphone button will be disabled if your browser doesn't support speech recognition
- You may need to grant microphone permissions when first using this feature
- Internet connection is required as the speech recognition uses cloud services
- The feature works in real-time - you can see words appear as you speak

## Troubleshooting
- **No microphone button?** - Your browser may not support speech recognition. Try Chrome.
- **Not transcribing?** - Check your microphone permissions in browser settings
- **Wrong language detected?** - Make sure you're speaking clearly in Urdu
- **Button disabled?** - The browser API may not be available. Try a different browser.
