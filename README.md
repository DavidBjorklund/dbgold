# DBGold
This is a project application of an ecommerce website, made purely with ReactJS.

The hosted of version of this ecommerce site can be found at [Värmdö Gymnasiums server](http://labb.vgy.se/~davidbd/webbutveckling1/projekt/foretag).


## To run this project locally
### Prerequisites:

* Node
* npm


### Change the path of the website
To change the path of the website you should change two things:
1. In the /src/app/app.js > you should update the variable basename to your new path.
2. In the /package.json > you should update the "homepage" value. 

### Test Application

To test the application in developer mode in a local server, type the following in your command prompt in the application folder:

`npm start`

npm will then create a local server where you can view the website in your browser.


### Build Application

The current application production build is in the /build folder, to update the build folder, type the following in your command prompt in the application folder:

`npm run build`


## To deploy this project

The /build folder is ready to be deployed on any Apache Server.

If you wish to change something first you need to edit the /src folder to your liking and then follow the instructions above on how to build application.
