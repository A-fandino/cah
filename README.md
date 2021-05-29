# Cards Against Humanity

After cloning/downloading the whole application the following command must be executed inside of 'cah' directory to install all the project packages:

> npm install

Then a **data.js** file must be created at **src/game** exporting an object with your Firebase credentials. i.e:

**src/game/data.js**

    const data = {

    key: "XXXXXXXXXXX",

    messagingSenderId: "XXXXXXXXXXX",

    appId: "XXXXXXXXXXX",

    measurementId: "XXXXXXXXXXX",

    authDomain: "XXXXXXXXXXX",

    projectId: "XXXXXXXXXXX",

    storageBucket: "XXXXXXXXXXX"

    };


    export default data;

> I think this project is a little messed up so I'll probably make a new version with different technologies and cleaner code in the future
