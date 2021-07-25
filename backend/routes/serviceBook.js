const router = require('express').Router();
let ServiceBook = require('../models/booking/service.booking');

router.route('/').get((req, res) =>{
    ServiceBook.find()
        .then(service => res.json(service))
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/add').post((req,res) => {
    const email = req.body.email;
    const patientName = req.body.patientName;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const doctor = req.body.doctor;
    const department = req.body.department;
    const service = req.body.service;
    const note = req.body.note;
    const status = req.body.status;

    const newServices = new ServiceBook({
        email,
        patientName,
        age,
        gender,
        doctor,
        department,
        service,
        note,
        status,
    })

    newServices.save()
        .then(() => {
            res.json('service saved!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res) => {
    ServiceBook.findById(req.params.id)
        .then(service => res.json(service))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/:id').delete((req,res) => {
    ServiceBook.findByIdAndDelete(req.params.id)
        .then(service => res.json('Service deleted: '))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/update/:id').post((req, res) => {
    ServiceBook.findById(req.params.id)
        .then(stock => {
            stock.email = req.body.email;
            stock.patientName = req.body.patientName;
            stock.age = Number(req.body.age);
            stock.gender= req.body.gender;
            stock.doctor = req.body.doctor;
            stock.department = req.body.department;
            stock.service = req.body.service;
            stock.note = req.body.note;
            stock.status = req.body.status;

            stock.save()
                .then(() => res.json('service updated!'))
                .catch(err => res.status(400).json('ERROR: ' + err));
        })

})

router.route('/update/status/:id').put((req, res) => {
    ServiceBook.findByIdAndUpdate(req.params.id, req.body)
        .then(doctor => res.json("status updated"))
        .catch(err => res.status(400).json("ERROR: "+ err));
})


module.exports = router;