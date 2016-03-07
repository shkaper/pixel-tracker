# pixelTracker

A web tool that lets users create pixels and track requests.
Utilizes MEAN stack (MongoDB, Express, AngularJS, NodeJS).

View it on <a href="http://pixel-tracker-app.herokuapp.com/#/pixel">heroku</a>
<img src="http://pixel-tracker-app.herokuapp.com/t/56dcda6671de51110009c034.gif">

## Current state

Done:
+ Home, pixels creation, pixel statistics pages
+ Pixels serving
+ Implemented API
+ Configured Grunt tasks for dev purposes
+ Pagination
+ Deployment to heroku

TODO:
+ Stats design
+ Filtering and sorting
+ Authentication

## Build and development

+ `npm install`
+ `bower install`
+ `mongod` to start MongoDB service
+ `grunt build` to build OR:
+ `grunt serve` to build then start server and watch for file updates

## External dependencies

+ Grunt, npm, NodeJS, MongoDB
