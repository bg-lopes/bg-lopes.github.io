---
description: How to deploy the static website to GitHub Pages
---

# Deploying to GitHub Pages

Follow these steps to host your website on GitHub for free.

## 1. Initialize Git Repository
If you haven't already, initialize a git repository in your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
```

## 2. Create a Repository on GitHub
1. Go to [GitHub.com](https://github.com) and log in.
2. Click the **+** icon in the top right and select **New repository**.
3. Name it `barbara-lopes-website` (or `username.github.io` if you want it to be your main site).
4. Make sure it is **Public** (unless you have GitHub Pro).
5. Do **not** initialize with README, .gitignore, or License (you already have files).
6. Click **Create repository**.

## 3. Push to GitHub
Follow the instructions shown on GitHub to push your existing repository. It will look something like this (replace `YOUR_USERNAME` with your actual GitHub username):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/barbara-lopes-website.git
git push -u origin main
```

## 4. Configure GitHub Pages
1. Go to your repository **Settings** tab.
2. Click on **Pages** in the left sidebar.
3. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` and `/ (root)`.
5. Click **Save**.

## 5. View Your Site
GitHub will take a minute to build your site. Refresh the Pages settings page to see your live URL (usually `https://YOUR_USERNAME.github.io/barbara-lopes-website/`).
