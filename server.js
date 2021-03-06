var express = require("express")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")

//connect to mysql database
var sequelize = new Sequelize('manager_contacte', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var Person = sequelize.define('person', {
    nume: Sequelize.STRING,
    domiciuliu: Sequelize.STRING,
    porecla: Sequelize.STRING,
    birthday: Sequelize.DATE
})

var Contact=sequelize.define('contact', {
telefon: Sequelize.STRING,
 person_id: Sequelize.INTEGER,
telefon_secundar: Sequelize.STRING,
e_mail : Sequelize.STRING })


Person.hasOne(Contact)
var app = express()

app.use('/nodeamin', nodeadmin(app))

//access static files
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// get a list of people
app.get('/person', function(request, response) {
    Person.findAll().then(function(person){
        response.status(200).send(person)
    })
        
})

// get one category by id
app.get('/categories/:id', function(request, response) {
    Person.findOne({where: {id:request.params.id}}).then(function(person) {
        if(person) {
            response.status(200).send(person)
        } else {
            response.status(404).send()
        }
    })
})

//create a new person
app.post('/person', function(request, response) {
   Person.create(request.body).then(function(person) {
        response.status(201).send(person)
    })
})


app.put('/person/:id', function(request, response) {
    Person.findById(request.params.id).then(function(person) {
        if(person) {
            person.update(request.body).then(function(person){
                response.status(201).send(person)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/person/:id', function(request, response) {
    Person.findById(request.params.id).then(function(person) {
        if(person) {
            person.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})



app.get('/contact', function(request, response) {
    Contact.findAll(
        {
            include: [{
                model: Person,
                where: { id: Sequelize.col('contact.person_id') }
            }]
        }
        
        ).then(
            function(contact) {
                response.status(200).send(contact)
            }
        )
})

app.get('/contact/:id', function(request, response) {
    Contact.findById(request.params.id).then(
            function(contact) {
                response.status(200).send(contact)
            }
        )
})

app.post('/contact', function(request, response) {
    Contact.create(request.body).then(function(contact) {
        response.status(201).send(contact)
    })
})

app.put('/contact/:id', function(request, response) {
    Contact.findById(request.params.id).then(function(contact) {
        if(contact) {
            contact.update(request.body).then(function(contact){
                response.status(201).send(contact)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/contact/:id', function(request, response) {
    Contact.findById(request.params.id).then(function(contact) {
        if(contact) {
            contact.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/person/:id/contact', function(request, response) {
    Contact.findAll({where:{person_id: request.params.id}}).then(
            function(contact) {
                response.status(200).send(contact)
            }
        )
})

app.listen(8080)
