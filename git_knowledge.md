# Git Knowledge

## Questions

**Have you used Git before?**  
Yes I've used git in projects for version control and collaboration.

**Which Git client did you choose? Why?**  
Git CLI + Zed's inbuilt git viewer. git log --graph --all --oneline

**Most interesting thing learned today?**  
`git rerere` (Reuse Recorded Resolution) Git remembers how you resolved a merge conflict and reapplies it automatically next time.

```sh
git config --global rerere.enabled true
```

---

## Core Knowledge

### Clean branch history

```sh
# First conflict on branch-a
git rebase main        # conflict in auth.js -> resolve manually
```

### Init & Basic Workflow

```sh
git init                          # initialise repo
git add .                         # stage all changes
git commit -m "message"           # commit staged changes
git commit --amend -m "new msg"   # edit last commit message
```

### Remotes

```sh
# HTTPS (simpler, less secure)
git remote add origin https://github.com/eyeofastarte/repo.git

# SSH (preferred more secure, no password prompts)
git remote add origin eyeofastarte@host:path/repo.git
```

### Push / Pull / Fetch

```sh
git push          # upload local commits to remote
git pull          # fetch + merge remote changes
git fetch         # download remote changes without merging
```

### Branches

```sh
git branch -a                   # list all branches (local + remote)
git checkout -b <branch>        # create and switch to new branch
                                # avoids Detached HEAD state
```

### Rebase

```sh
git rebase <branch>    # replay current branch commits on top of <branch>
git rebase --abort     # cancel an in-progress rebase
```
