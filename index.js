const express = require("express")
const server  = express()

const database = require("./database")

function CreateDish(request, response) {
    database("dishes").
        insert({id: 3, name: "Frango executivo", price: 90.1}).
        then(function(data) {
            console.log(data)
        }).catch(function(error) {
            console.log(error)
        })

    response.json({})
}

function ListDishes(request, response) {
    database("dishes").
        then(function(data) {
            if(data.length == 0) {
                response.status(404)
            }

            response.json(data)
        }).
        catch(function(error) {
            response.status(500)
            response.json({error: error})
        })
}

function GetDishByID(request, response) {
    database("dishes").
        where('id', request.param.id).
        then(function(data) {
            console.log(data)
        }).
        catch(function(error) {
            console.log(error)
        })

    response.json({})
}

server.post("/dishes", CreateDish)
server.get("/dishes", ListDishes)
server.get("/dishes/:id", GetDishByID)

server.listen(3000)
