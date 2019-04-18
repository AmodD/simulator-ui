# generator

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Vue CLI v3
package.json: Add port option to serve script: scripts.serve=vue-cli-service serve --port 4000
CLI Option --port to npm run serve, e.g. npm run serve -- --port 3000. Note the --, this makes passes the port option to the npm script instead of to npm itself. Since at least v3.4.1, it should be e.g. vue-cli-service serve --port 3000.
Environment Variable $PORT, e.g. PORT=3000 npm run serve
.env Files, more specific envs override less specific ones, e.g. PORT=3242
vue.config.js, devServer.port, e.g. devServer: { port: 9999 }

