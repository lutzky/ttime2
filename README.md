# ttime2

Javascript port of ttime, for use with github.com/lutzky/repy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment

For deployment to github pages:

```
npm install -g angular-cli-ghpages
ng build --prod --base-href "http://lutzky.net/ttime2/"
ngh
```

This will build a production version of the binary in `dist/`, and push it as the `gh-pages` branch of the current repository. Note that the trailing slash in `base-href` is important. For your own github pages account, you probably want to replace `lutzky.net` with `username.github.io`.

```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

