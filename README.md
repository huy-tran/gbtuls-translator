# Gonbi Translator

## Quasar Hack-a-May Contest
First of all thanks to the Quasar Framework team and its community for this awesome tool. I have been using Quasar for  more than a year and utilising its high quality libraries and out-of-the-box tools for all of my FrontEnd projects. Quasar is no doubt my to go UI library.

As a non-native English speaker I sometimes find it difficult to read articles, news, documentations to fully understand the content. I had to open a new tab, copy and paste the text I want to translate, then switched back to the page I was reading, etc... I was trying to look for any Browser extension which allows me to have the translator tool on the page.

It was such a great news that Quasar has recently released its Browser Extension Tool. Having Quasar under my belt, I decided to build this Gonbi Translator which utilises Google Translate under the hood. As a result I don't have to switching between tabs, I have my own tool to solve my difficulties.

## Usage
- Load unpacked Chrome extension or Firefox extension by browsing to either the src-bex (in development mode) or under dist (in production mode)
- Select the text you want to translate and press Alt + T
- Enjoy your on-page translator

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m bex
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build -m bex
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
