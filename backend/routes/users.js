const router = require('express').Router();
let Users = require('../models/users.model');

router.route('/').get((req, res) =>{
    Users.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/add').post((req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const age = Number(req.body.age);
    const phoneNo = Number(req.body.phoneNo);
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const newUsers = new Users({
        firstName,
        lastName,
        gender,
        age,
        phoneNo,
        email,
        password,
        role,
    })

    newUsers.save()
        .then(() => {
            res.json('user saved!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res) => {
    Users.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/:id').delete((req,res) => {
    Users.findByIdAndDelete(req.params.id)
        .then(user => res.json('Service deleted: '))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/updateUsers/:id').post((req, res) => {
    Users.findById(req.params.id)
        .then( user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.gender = req.body.gender;
            user.age = Number(req.body.age);
            user.phoneNo = Number(req.body.phoneNo);
            user.email = req.body.email;
            user.password = req.body.password;
            user.role = req.body.role;
            
            user.save()
                .then(() => res.json('user availablity data updated!'))
                .catch(err => res.json('ERROR: ' + err));
        })
})

router.route('/update/:id').post((req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.gender = req.body.gender;
            user.age = Number(req.body.age);
            user.phoneNo = Number(req.body.phoneNo);
            user.email = req.body.email;
            user.password = req.body.password;
            user.role = req.body.role;

            user.save()
                .then(() => res.json('user updated!'))
                .catch(err => res.status(400).json('ERROR: ' + err));
        })

})

module.exports = router;