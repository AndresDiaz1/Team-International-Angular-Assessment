# TeamInternationalAngularAssessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Prerequisites

This project uses [json-server](https://github.com/typicode/json-server), a full fake REST API. Install it using:

```bash
$ npm install -g json-server
```

### Install dependencies

Install the dependencies running:

```bash
$ npm install
```


## Run project

### Run fake REST API 

1. Make sure you are on project's root, where `employees.json` file is located.
2. Start JSON server (it will use port 3000). 

```bash
$ json-server --watch employees.json
```

### Run angular project

1. Run in other terminal
```bash
$ ng s -o
```
2. It will open your default browser with `http://localhost:4200/#/home`


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

