# movies-explorer-api

A simple and fast backend API-server for my diploma project for Yandex.Practicum. 
It can create, login, authentificate user via cookie and logout. 
The main purposes are to save, create and delete movies for frontend part tasks.

[movies-explorer-api](https://api.filmsexplorer.nomoredomains.club/)
[movies-explorer-frontend](https://filmsexplorer.nomoredomains.club/)

## REST endpoints: 
* POST /signup - register a new user
* POST /signin - login and authentification
* POST /signout - logout
* GET /users/me - get user data
* PATCH /users/me - update user data

* GET /movies - get all movies from a database
* POST /movies - add a new film to the database
* DELETE /movies/:movieId - delete certain movie

## Specifications:
* Virtual machine via [Yandex.Cloud](https://console.cloud.yandex.ru/)
* OS Ubuntu
* NginX web server
* MongoDB database
* Git
* and Node.js
