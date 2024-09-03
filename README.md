## Travel App Project

## Overview
This project uses Geonames Api to get the location geographic coordinates (latitude and logitude) inorder to use them to get the frocasted weather for a specific location form Weatherbit Api. Also it uses Pixabay Api to get some images for the trip location. 

## Run the project
To run this project on your local machine:
* Make a forked repo.

* Clone it on your local machine using the following command:
```
git clone <the url of your forked repo>
```
* cd into the cloned files.

* Then type to install all the required dependencies:
```
$ npm install
```
* create .env file in the root directory either manualy, or type the following command in the terminal:
```
touch .env
```
* add your all API Keys inside .env file that you have created like this:
```
GEO_NAMES_API_USER_NAME = your key
PIXABAY_API_KEY = your key
WEATHER_BIT_API_KEY = your key
```
* Then type the following to create a build of the files:
```
$ npm run build
```
* Then the following command to run the server:
```
$ npm start
```
* open a new window in your browser and type:

```
http://localhost:3000/
```

License
---

MIT