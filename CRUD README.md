# CRUD

> This readme describes the API Endpoints for CRUD techniques

## Table of Contents

1. [Create](#Create)
2. [Read](#Read)
3. [Update](#Update)
3. [Delete](#Delete)

## Create

> Method: POST

> Route: '/api/CRUD/:id'

Creates a new entry in the db

Assumes req.body is in JSON format and of the format:
* id: integer
* app_description: string
* additional_text: string
* images: array of strings (urls)

Response: Status Code 200

## Read

> Method:GET

> Route: '/api/CRUD/:id'

Retrieves entry by specified id

Requires a param of id

Response: requested data from db in JSON format

## Update

> Method: PUT

> Route: '/api/CRUD/:id'

Updates entry by specified id

Assumes req.body is in JSON format and of the format:
* id: integer
* app_description: string
* additional_text: string
* images: array of strings (urls)

Response: Status Code 200

## Delete

> Method: DELETE

> Route: '/api/CRUD/:id'

Deletes entry by specified id

Requires a param of id

Response: Status Code 200



