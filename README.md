# Schnelldurchlauf Klimakrise

Live:

https://schnelldurchlauf.eu/klimakrise

State: experimental

## Technical background

Minimal template for OER one pagers based on markdown content. The template uses some minification, privacy-friendly embeds and other goodies such as a visual scroll progress bar, but keeps the main goal of simplicity in mind. Based on [startbootstrap/clean-blog](https://startbootstrap.com/themes/clean-blog/) (MIT license).

**VIDEO: Demonstration of development process: https://www.youtube.com/watch?v=Ju8Sxcw6hkE**

**Features:**
- local dev environment with gulp (auto-refresh in browser, scss, js minification, npm packages)
- convert markdown to html with gulp-markdown
- "subpage" content via bootstrap modal (therefore no need of complex URL routing or something like that), e.g. Imprint and Privacy Page

## Run it locally / local development

1. Install [nodejs](https://nodejs.org/en/download/)
1. Open a terminal
1. Check if node is installed with `node -v` and check `npm -v`
1. Clone this repository to your local harddrive
1. Change the directory to the cloned local repository
1. Run `npm install` (this will install dependencies)
1. Run `npm start run` for dev live preview (this generates `build/` dir and watches for changes in scss, markdown files, etc.)
1. To create production build use `gulp`
1. For deployment checkout GitHub Actions gh-pages [actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) / [ftpdeploy](https://github.com/SamKirkland/FTP-Deploy-Action), see `.github/` directory in this repo

2DO:
- add GithubAction for `gulp`, otherwise local `gulp` command + push is necessary and changes can not only be done via Github Editor e.g.

Third party libraries:

- 2ClickIframePrivacy

### About gulp build process

- JS task only minifies clean-blog.js to clean-blog.min.js and adds header
- Do not edit /css directly, use /scss directory (changes will be overriden by gulp)

### Add custom javascript files (third party, non-npm)

1. add to /js
2. add as ignore line in gulpfile if it should not be minified (files with .min.js will be automatically ignored)
3. include it in html

Nice way: Use .js file in editor, include .min.js in html, run 'npm start run' while developing (this will automatically minify your js if you change something and reload the browser)

## Privacy embeds (GDPR, 2Click)

Use iframes with following attributes (see https://github.com/01-Scripts/2Click-Iframe-Privacy for more information)
```
src="" data-src="https://www.youtube-nocookie.com/embed/DdKhKxShJf0" data-2click-type="video"
```
