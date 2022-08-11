# Eleventy Duo

Eleventy Duo is a minimal and beautiful Eleventy theme for personal blogs.


## Getting Started

- [Generate a new repo from this repository template](https://github.com/yinkakun/eleventy-duo/generate) which will copy this project into your own new repo.

- Clone your new repository with `git clone https://github.com/YOUR_REPO`,

- Navigate to the newly created repo

- Install dependencies with `yarn install`

- Serve the site locally with `yarn dev`

- Use `yarn build` to build a production version of the site.

## Customize

Open `data/site.json` and adjust the values to your details, it contains vital information to make the site your own. You'll need to change the description, title and url to match with the project, edit navigation items and social media links.

You'll also need to replace the favicon and default social image in the `src/images/` directory with your own graphics.

## Manually Edit contents

### Homepage

Edit the homepage content at `src/index.md`.

Sample frontmatter for homepage.

```
---
layout: home
title: 'Eleventy Duo'
---

Contents
```

### About page

Edit the about page content at `src/about.md`.

Sample frontmatter for about page.

```
---
title: About Aidan Charles Powell
layout: about.njk
name: Aidan Charles Powell
image: '/images/me.jpeg'
---

Contents
```

### Blog posts

Blog contents is at `src/posts`. Delete placeholder blog posts. Do not delete the `posts.json` file. Create blog posts in markdown format.

Sample frontmatter for blog posts.

```
---
title: Even yet another post with rich media
date: '2020-12-24'
tags: [demo-content, media]
decription: The last person we talked to said this would be ready action item, and what do you feel you would bring to the table if you were hired for this position bells and whistles. #optional
---

Contents
```

### Generic pages

You can create generic pages in markdown format that use a base layout.

Sample frontmatter for generic pages.

```
---
layout: base
permalink: /generic-page
title: Generic page
---

Contents
```


## Deployment

[Netlify](https://netlify.com) is a great way to easily deploy sites. There's no special setup you need to do with Forestry to deploy with Netlify. When Forestry makes commits to your repo, Netlify will auto-trigger a rebuild / deploy when new commits are made.

- Create a new site in Netlify and import your repository.

- Set the build command to `yarn build`

- Set the publish directory to `public`

## Built with

- Eleventy for site generation (obviously)

- Webpack for asset bundling

- PostCSS for CSS processing

- Autoprefixer for vendor prefixing CSS

- PostCSS Preset Env for transpiling css

- PurgeCSS for unused CSS removal

- CSSNano for CSS minification

## License

This project is licensed under the MIT License.

Isn't Jamstack beautiful?
