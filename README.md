315 Team 14 Project 3 - Accessible Web POS for Panda Express
## How to do branch/pullrequest workflow:
**1. Start a Branch**
```
   git branch your_branch
```
**2. Get on your Branch**
```
   git checkout your_branch
```
**3. Do work, commits, and pushes on your branch. Please do not push to main.**
```
   git add .
   git commit -m "I did a thing"
   git push --set-upstream origin your_branch 
```
   - After first push you can just:
```
   git push
```
**3. Pull request if you think the work is ready for the main branch**
   1. Use the website: https://github.tamu.edu/petercastelein/project3
   2. Click on Pull requests
   3. Click on New pull request
   4. Click Compare & pull request
   5. Click on compare main and select your_branch
   6. Clcik on Create pull request
   7. Fill out the message and comment of what the update is about
   8. Click Create Pull Request

**4. The website will alert you if there are merge conflicts and walk you through selecting what changes to keep and discard.**

**4. The code is now merged into the github main. Your local machine main branch will now be out of date.**

**6. Update your local main and local branch if others have updated main as well. Rebase is important to make the history clean.**
```
   git checkout main
   git pull
   git checkout your_branch
   git rebase main
   git merge main
```
**7. Continue working on your branch.**

**8. Please do not merge from your branch into main or push to main, or we'll enter into Git Hell. Let me (Peter) know if you have any questions or improvements :)**

