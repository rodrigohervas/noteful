# noteful app 

App using react Routing and Context

## technologies used:

HTML5, CSS3, Javascript, React

## Noteful Server for this client:

You can clone the following Nodejs server for a full stack noteful app:

1. Clone the noteful-server repository to your local machine: `git clone https://github.com/rodrigohervas/noteful-server.git NEW-PROJECT-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Make sure that the .gitignore file is encoded as 'UTF-8'
5. Install the node dependencies `npm install`
6. Add an `.env` file with the following content:
    1. NODE_ENV='development'
    2. PORT=4000
    3. DB_URL=[YOUR_CONNECTION_STRING_HERE]
7. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "noteful-server",`
8. Modify the API endpoints in the noteful client at: ./src/config/config.js

## Live Site

https://notefulrh.now.sh/