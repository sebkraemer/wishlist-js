# Wishlist-js backend service

# About

As a private project to get into JS and backend development with node, I
decided to create this web project. The idea for a wishlist came from the family just at the right time (isn't it more fun to have a project with real applicability instead of just coding a tutorial?)
Anything technically new for me is currently mostly drawn from Pluralsight material.

## Planned basic features

* node.js based backend service for REST API
* service uses db for data persistence, probably mongodb
* some kind of frontend, undecided yet; possible solutions:
  * html with server side renderin/templating
  * web based solution with react
  * native mobile app
  * react native
  * flutter
  * ?

## Possible additional or advanced features

* user authentication
* deployment solution
* extended data model (more properties)

## other

* tests incl. mocking
* github CI
* sonarqube

# Documentation

## API

### resource

```
{
    "id": 1,
    "owner": "seb",
    "wish": "anc headset",
    "link": "http://am.com/asdfh923h",
    "notes": "for the job",
    "priority": 2, // [1-3] ?
    // dateCreated, dateChanged, maybe
}
```

### REST routes
```
{
  "GET /api/wishes": {
    "desc": "returns all wishes",
    "response": "200 application/json",
    "data": [{}, {}, {}]
  },

  "GET /api/wishes/:id": {
    "desc": "returns a wish respresented by its id",
    "response": "200 application/json",
    "data": {}
  },

  "POST /api/wishes": {
    "desc": "create and returns a new wish uisng the posted object",
    "response": "201 application/json",
    "data": {}
  },

  "PUT /lions/:id": {
    "desc": "updates and returns a wish with the posted update object",
    "response": "200 application/json",
    "data": {}
  },

  // "PATCH /lions/:id" ?

  "DELETE /lions/:id": {
    "desc": "deletes and returns the matching wish",
    "response": "200 application/json",
    "data": {}
  }
}
```
