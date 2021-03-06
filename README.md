# tinyMapp

## Description
tinyMapp helps users create lists of their favorite places and list them under a title. It uses Google Map's API to generate the map and markers on the map, with Express handling the routes and PostGresQL for the database.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Screenshots
![Screenshot of home page](https://github.com/sanjanadesai27/midterm/blob/master/public/screenshots/homepage.png)
![Screenshot of map page](https://github.com/sanjanadesai27/midterm/blob/master/public/screenshots/mappage.png)

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- express
- jQuery
- ejs
- knex
- morgan
- sass
