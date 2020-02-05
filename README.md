# 1st challenge from Rocketseat's bootcamp

## 📖 Introduction

The 1st challenge only requires an API which the user can does a simple CRUD. There isn't no DB, just a global array which is used as a database alike.

## Libraries:

* [ExpressJS](https://expressjs.com/) 
* [HelmetJS](https://helmetjs.github.io/)
* [Airbnb's ESlint](https://www.npmjs.com/package/eslint-config-airbnb)

## API

The main entity is `project` the following methods are implemented:


**NOTE:** You can download the full Postman's collection [here](./docs/Challenge1-Rocketseat.postman_collection.json).

### Project

#### Create

You can create a new one by doing:

`POST /project`

Body: 

```
{
    "id": 2,
    "title": "Hello",
    "tasks": []
}
```

#### Update

You can update a project just by passing its id to:

`PUT /project/:id`

Body:

```
{
  "title": "Another awesome title"
}
```

#### Delete

You can delete a project just by passing its id to:

`DELETE /project/:id`

#### GET

You can list all projects:

`GET /projects`

### Tasks

You can add a taks into a project by doing:

`POST /projects/:id/tasks`

Body: 

```
{
	"title": "Lagwagon"
}
```


---

Made with ❤️ by [mCodex](https://github.com/mcodex).