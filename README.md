Getting Started
===============

* Get the code: git clone git@github.com:comsysto/mobile-tracks-app.git
* Make sure your MongoDB is up and running (if you have to adjust the config see src/main/resources/com/comsysto/labs/mobile/tracks/applicationContext.xml)
* Read "The MongoDB part" on http://blog.comsysto.com/2012/03/30/using-mongodb-geospatial-with-spring-tutorial
* mvn org.mortbay.jetty:maven-jetty-plugin:run
* Open http://localhost:8080/mobile-tracks-app/ in your browser
* Login with joe@joe.com:joe or scott@scott.com:scott
* Upload some of the demo tracks provided in src/test/resources/tracks (most of the tracks start in Munich/Bavaria/Germany)
