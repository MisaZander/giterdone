
# Git-er-done!

When you need to make a to-do list fast with little headache. This list will save your tasks for a full 48 hours on your local machine without any sign ins or authorizations. Perfect for when you need to write up a quick to-do list or remind yourself to call in that bug report. 

## Getting Started

In order to get this running on your local machine there are a few steps you'll need to take before running it. 
1. After cloning, run npm install in the home directory to install your node modules. 
1. Create a .env folder that contains the following information

```
Environment
NODE_ENV=development

DB Connection
DB_USERNAME= *your username here*
DB_PASSWORD=*your password here*
DB_DATABASE=giterdone
DB_HOST=*your host name here*

Sequelize Options
DB_FORCE=false
```
3. You must also remember to run the schema file located in the models directory to build a database in MySQL

### Dependencies

A list of dependencies we used in this project 

```
    "connect-session-sequelize": "^6.0.0",
    "dotenv": "^6.2.0",
    "express": "^4.16.3",
    "express-session": "^1.15.6",
    "materialize-css": "^1.0.0-rc.2",
    "mysql2": "^1.5.3",
    "path": "^0.12.7",
    "sequelize": "^4.38.0"
```

## Built With

* Materialize - Front-end framework and mobile optimization
* jQuery - all get, put, and delete requests from client side. Dynamic table creation and button functionality. 
* NodeJS - Primary framework for back end functionality
* Express JS - Server side functionality. 
* Sequelize - CRUD requests to the database
* Express-Session - Utilizes cookies for temporary session storage 

## Authors

* **Alexander Osborn** - *Back-end Development and Database Interactions* - [Github Portfolio](https://github.com/MisaZander)
* **Conner Rhodes** - *JQuery and Document Object Interactions* - [Github Portfolio](https://github.com/Crhodes92)
* **Chanda Shrestha** - *Front End Development & Design* - [Github Portfolio](https://github.com/chandashrestha)
* **Xavier Williams** - *Front End Development & Design* - [Github Portfolio](https://github.com/xavierwilliams1998)

