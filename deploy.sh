#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 把 Github 主分支改為 master，或是更改 git init 預設分支名稱

# 修改本地 git init 預設分支為 master 
# git config --global init.defaultBranch master

# if you are deploying to https://<USERNAME>.github.io
# git push -f https://github.com/<USERNAME>/<USERNAME>.GitHub.io.git main

# if you are deploying to https://<USERNAME>.Github.io/<REPO>
# git push -f https://github.com/<USERNAME>/<REPO>.git main:gh-pages
git push -f https://github.com/Pudding1989/Twitter-by-ALPHA-Camp.git master:gh-pages

cd -