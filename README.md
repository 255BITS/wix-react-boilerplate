# Wix React Boilerplate

## The fastest way to start developing for Wix using React

## Features

* webpack-hot-reload-module - Your changes are reflected instantly
* webpack support for both client and serverside es6 and beyond
* Dockerfile for simple and powerful deployment and scaling
* database agnostic
* Custom UI components built for creating good user experiences in Wix.
* Default styles for Settings and Dashboard
* Wix middleware that will parse wix instance into req.wix
* And more!


## Getting started

```bash
  npm install
  npm start
```

Then go to localhost:3000/settings and localhost:3000/widget


### Running on dev.wix.com

1. Create a new wix app at dev.wix.com.
2. Add a widget component
3. Fill in the form, with localhost:3000/widget and localhost:3000/settings as the endpoints.  Mobile is the same.
4. Add your WIX_SECRET environment variable to credentials-dev.sh
5. Restart the server and test.


### Deploying

Static caching is enabled in server/server-production.js.  This replaces web servers(nginx, apache) when scaling 
for most apps.

Scaling is achieved horizontally by running more containers.  We deploy on docker-cloud(cloud.docker.com).

### Custom routes

All routes are stored in server/router.js.  Add custom code here.

## Licensing

MIT.  Use this for whatever you like.  If you do something cool send me an email, I want to see it.

## Credits/Authors

* Martyn Garcia (martyn@255bits.com)
* Mikkel Garcia (mikkel@255bits.com)
* The Wix team (wix.com)
