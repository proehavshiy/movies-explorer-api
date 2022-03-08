# Movies Searcher API

A simple and fast backend API-server for my [diploma project](https://github.com/proehavshiy/movies-explorer-frontend) for Yandex.Practicum.
<br />
It can create, login, authentificate user through cookie and logout. 
The main purposes are to save, create and delete movies for frontend part tasks.
<br />
<br />
[Backend domain](https://api.filmsexplorer.nomoredomains.club/)
<br />
[Frontend domain](https://filmsexplorer.nomoredomains.club/)
<br />
[Frontend repo](https://github.com/proehavshiy/movies-explorer-frontend)

## REST endpoints: 
* POST /signup - register a new user
* POST /signin - login and authentification
* POST /signout - logout
* GET /users/me - get user data
* PATCH /users/me - update user data
* GET /movies - get all movies from a database
* POST /movies - add a new film to the database
* DELETE /movies/:movieId - delete certain movie

## Technologes, dependences & details:
* `Express.js` framework for Node.js 
* `MongoDB` & `mongoose` for holding user's data
* `ESlint` is for linting the code
* `nodemon` is for automatically restarting the app
* All routes are combined into particular [folder](https://github.com/proehavshiy/movies-explorer-api/tree/main/routes)
* **`parsers:`**
    + `body-parser` is for parsing request's data
    + `cookie-parser` is for parsing cookies
* **`Requests validation:`**
    + [email validation by `validator`](https://github.com/proehavshiy/movies-explorer-api/tree/main/models)
    + [DB middlewares based on `selebrate`](https://github.com/proehavshiy/movies-explorer-api/tree/main/middlewares/requestValidation)
* **`protection:`**
    + `helmet` is for secure HTTP headers
    + `dotenv` is for loading env variables from process.env file in production mode
    + [auth middleware based on `jsonwebtoken` & `bcryptjs`](https://github.com/proehavshiy/movies-explorer-api/blob/main/middlewares/auth.js)
    + [`CORS` request checking middleware](https://github.com/proehavshiy/movies-explorer-api/blob/main/middlewares/cors.js)
    + [`express-rate-limit` limiter for requests](https://github.com/proehavshiy/movies-explorer-api/blob/main/middlewares/limiter.js)
* **`error handling:`**
    + [requestLoger & errorLogger middlewares](https://github.com/proehavshiy/movies-explorer-api/blob/main/middlewares/logger/logger.js) based on `winston` & `express-winston`
    + Custom error classes are [created](https://github.com/proehavshiy/movies-explorer-api/tree/main/middlewares/errors)
    + All error handling process is centralized at the end of [app.js](https://github.com/proehavshiy/movies-explorer-api/blob/main/app.js)

## Guidelines for the project
* [Guidelines for backend part(rus)](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html#backend)

## Server specifications:
* Virtual machine [Yandex.Cloud](https://console.cloud.yandex.ru/)
* OS Ubuntu
* NginX web server
* MongoDB database
* Git
* and Node.js

## You can run this project locally:
* clone branch with `git clone git@github.com:proehavshiy/movies-explorer-api.git`
* `npm run dev` - run the project with nodemon 
* `npm run start` - run the project in the single mode
* `npm run lint` - check linter errors
