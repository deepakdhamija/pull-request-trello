# Pull Request For Trello

Create a Pull Request Using Trello Card Information Automatically

## Install
```bash
npm install -g prtrello
```

## Configuration
Run  ```prtrello`` for the first time and you will be requested to setup your Github credentials and Trello Token.


## About Trello Token
Since trello uses OAuth to authenticate, the tool can't get a fresh token automatically. With that in mind, you need to access ```https://trello.com/1/authorize?key=31bf1b83dbdaeb38fe6a7b29ef9132de&name=prtrello&expiration=never&response_type=token``` to get a new token. This token has no expiration date.

## Usage
After your setup, the next time you use the tool you will receive these questions:
```
What is the task ID?: [123456]:
Getting trello card information...
[Github]: Enter the repository name: [woboinc/hpb]:
[Github]: Enter the title or use this: [#74zySCLD] [BUG] Shipping prices should not be displayed with 'est.' on Review & Confirm step of Checkout:
[Github]: Enter the description or use this: https://trello.com/c/74zySCLD:
[Github]: Do you have any extra comments? Leave blank for nothing:
[Github]: Enter the branch name of your task: [djalma/test]:
[Github]: This pull-request should be merge into: [master]:
[Github]: Opening Pull Request...

#####################################################################
Pull Request Sent:https://github.com/woboinc/hpb/pull/291 shipit! :D
#####################################################################

At this time, your default browser will open a new window with the pull-request URL.
```
