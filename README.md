# Northcoders House of Games API 🎲

## Hosted Version Link

https://nc-games-application.herokuapp.com/api

## Project Description

Northcoders' House of Games API is a reddit-style board of game reviews with user comments. [Node-postgres](https://node-postgres.com/) is used to interact with the PSQL database which houses separate tables for categories, comments, reviews and users.

## Setup Instructions

### 1. Fork & Clone

- Click on the fork button located on the top right of the screen and then click your username. This will create a version associated to your own Github account.

- Before cloning check the subtitle on the top left is <em>`your_Github_account_name`</em>`/be-nc-games`. Once checked, cd in your terminal to the directory where you would like the local clone copy of the repo to be located and type the following command. Replace <em>your_Github_account_name</em> with your actual username.

```
git clone your_Github_account_name/be-nc-games.git
```

### 2. Dependency Installation

To be able to use the Northcoders House of Games API as intended, you will need to install the following dependencies below. Express, postgres and dotenv are required for seeding and interacting with the database. Supertest and Jest are required for testing. NPM has to be installed first as it is the package manager for the rest of the packages.

In order to install these packages, open your terminal and execute the following commands.

- Install npm

```
npm i
```

- Install express

```
npm i express
```

- Install postgres

```
npm i pg
```

- Install dotenv

```
npm i dotenv
```

- Install pg format

```
npm i pg format
```

- Install supertest

```
npm i supertest -D
```

- Install jest

```
npm i jest -D
```

### 3. Seeding Database

Seeding the database will execute the SQL code and generate separate tables with data for categories, comments, reviews and users. Use the terminal command:

```
npm run seed
```

### 4. Run Tests

To run the tests which have been provided, use the terminal command:

```
npm run test
```

## Setup ENV

For the database to work with test data and development data, .env files will need to be created within the nc-games directory.

1. Create a file called `.env.test`. Within the file type the following code:

```
PGDATABASE=nc_games_test

```

2. Create a file called `.env.development`. Within the file type the following code:

```
PGDATABASE=nc_games
```

## Minimum version of Node.JS and Node-postgres Required

- Node.JS v16.13.0
- Node-postgres v14.1
