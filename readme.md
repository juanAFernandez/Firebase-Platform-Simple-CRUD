![](./firebase.png)

# Firebase Platform Simple CRUD

If you are here probably know the power of **Firebase Platform**, so the idea behind of this project is show how to build a simple **serverless** api based of a simple CRUD using this platform, specifically **Cloud Functions** to build the REST API ( using [Node.js](https://nodejs.org/en/) with JavaScript, [ExpressJS](https://expressjs.com/) as framework and [joi](https://github.com/hapijs/joi) as schema validator, *obviously last two are only an option, you can select yours*) and **Cloud Firestore** as document database.

## Previously

1. Create project from Firebase Console, creating an id, for example:

     `fir-platformsimplecrud`

2. Prepare the environment

    1. Inside of functions folder execute `npm install` to install all dependencies. `node_modules` folder will be created.
    2. Execute `firebase init functions` and select your project_id, in this case `fir-platformsimplecrud`.
    3. Select language, in my case *JavaScript*
    4. Continue **avoiding overwrite** `functions/package.json` and `functions/index.js`. And **not install dependencies** with `npm`.

3. Create `serviceAccountKey.json` file.

    If Firebase Console, you need to go to *Settings* section, *ServiceAccounts*, in the selecte section by default *Node.js* click to *Create new key*. Open the file and copy the content to `serviceAccountKey.json` file and save it in *functions folder*.
    You need also go to *Database* main section and click to *Start*. Select test options, **this is only for learning pursposes**, be carefull with it.

4. Change `databaseURL`in `index.js`.

    You need the url of your database in secction where app will bi initializated,
    search it and change by yours.

## Run server

Run the server is so easily as execute: `firebase serve --only functions`.

## Test our API with Insomnia

[Insomnia](https://insomnia.rest/) is a really powerfull API REST client that as creators said *"you will love"*. We are going to use it to our tests.

### Previous conf

Instead of create the requests in Insomnia we provide a file with these defined,
but you need change a little thing, the **base_url** in the **Development** environment.

How? When you run your server take a look to api url, for example:
`http://localhost:5000/fir-platformsimplecrud/us-central1/api`.

Copy this to `base_url` in `data` dict in `FirebaseCRUDInsomniaFile.json` file to set url in the environment, the section is like this:
```
...
"data": {
    "base_url": "YOUR URL HERE"
}
...
```

You **also can change this from the interface**, as you prefer.

### Import file

After, in the default workspace, go to `settings` and go to `Import/Export` and import this (maybe you will need to change to this workspace after to be imported).


## Finally

Now you can execute simple CRUD request over our serve **in local** and check changes in **Cloud Firestore** in the **Firebase Console**. Will be nice test all our environment locally without use the *free tier* but it is difficult for now and is out of this beginners little project.

Obviously you can deploy the project in Firebase Cloud, is as simple as run `firebase deploy`.

## How to check package versions

- npm packages

    `npm show <package name>`

- node and npm

    `node --version` and `npm --version`

## **Contribute**

Some mistake? Any improvement? Please open an issue or make a pull request with your contribution, keeping in mind that is only a learning project, we don't want more functionallity, this will be covered in future projects.