# Capstone Project: Travel App
 
## Overview
This project is a travel app that obtains a desired trip location and date from the user and displays weather, length of trip and an image of the location using information obtained from external APIs(Geonames API, Weatherbit API, Pixabay API). 
If the trip is within a week, the user gets the current weather forecast. If the trip is in the future, the user will get a predicted forecast.
In case that the entered location brings up no results the app will pull in an image for the country. 

## Instructions
In order to test the project, here's what you have to do:
-download all files from github
-open two command windows and run the following scripts: 'npm run start' and 'npm run build-prod'
-open http://localhost:8082/
-enter the location and then the leaving and departing date
-click on 'SUBMIT TRIP INFO'

##List of what software, firmware and hardware you may require
Webpack, express and jest are used. For the plugins, you can find the full list on the devDependencies list, in the package.json file. 

##List of files included in the project css folder fonts folder javascript folder index filereadme file
Folder sttucture:__test__, .babelrc,.env, src folder,.gitignore, package.json, package-lock.json, readme.md, webpack.dev.js, webpack.prod.js

##Acknowledgements and credits for any resources or blogs that helped you create the project 
Resources:
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
Udacity
Geonames API
Weatherbit API
Pixabay API
