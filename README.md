# MatsuoLabGPT

A simple, locally running ChatGPT UI that makes your text generation faster and chatting even more engaging!

## Features

- **GPT 3.5 & GPT 4** via OpenAI API
- **Speech-to-Text** via Azure & OpenAI Whisper
- **Text-to-Speech** via Azure & Eleven Labs
- Run locally on browser – no need to install any applications
- Faster than the official UI – connect directly to the API
- Easy mic integration – no more typing!
- Use your own API key – ensure your data privacy and security
- Data submitted via the API is not used for training and stored for 30 days only
- All state stored locally in localStorage – no analytics or external service calls

> Note that GPT-4 API access is needed to use it. GPT 3.5 is enabled for all users.

### Prerequisites

- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/) (or npm or pnpm)
- Any modern web browser like Google Chrome, Mozilla Firefox, or Microsoft Edge

### Installation

1. Clone the repository:

```
$ git clone <repository address>
```

2. Install dependencies, build the bundle and run the server

```
$ yarn
$ yarn build
$ yarn start
```

Then navigate to http://localhost:3000

### Add to .env.local(⚠️ Local use only)

If you want the keys to persist across app builds, you can add it to the .env.local.

```
$ echo "NEXT_PUBLIC_OPENAI_API_KEY=<your-open-ai-key-here>" > .env.local
$ echo "NEXT_PUBLIC_11LABS_API_KEY=<your-eleven-labs-key-here>" >> .env.local
```
