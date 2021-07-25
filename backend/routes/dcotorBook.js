const router = require('express').Router();
let DoctorBook = require('../models/booking/doctor.booking');

router.route('/').get((req, res) =>{
    DoctorBook.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/add').post((req,res) => {
    const email = req.body.email;
    const patientName = req.body.patientName;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const doctor = req.body.doctor;
    const department = req.body.department;
    const note = req.body.note;
    const status = req.body.status;

    const newDoctor = new DoctorBook({
        email,
        patientName,
        age,
        gender,
        doctor,
        department,
        note,
        status
    })

    newDoctor.save()
        .then(() => {
            res.json('Doctor saved!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res) => {
    DoctorBook.findById(req.params.id)
        .then(doctorBook => res.json(doctorBook))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/:id').delete((req,res) => {
    DoctorBook.findByIdAndDelete(req.params.id)
        .then(doctor => res.json('Doctor deleted: '))
        .catch(err => res.status(400).json('ERROR: ' + err));
})


router.route('/update/:id').post((req, res) => {
    DoctorBook.findById(req.params.id)
        .then(doctor => {
            doctor.email = req.body.name;
            doctor.patientName = req.body.patientName;
            doctor.age = Number(req.body.age);
            doctor.gender = req.body.gender;
            doctor.doctor = req.body.doctor;
            doctor.department = req.body.department
            doctor.note = req.body.note;
            doctor.status = req.body.status;

            doctor.save()
                .then(() => res.json('doctorbook updated!'))
                .catch(err => res.status(400).json('ERROR: ' + err));
        })

})

router.route('/update/status/:id').put((req, res) => {
    DoctorBook.findByIdAndUpdate(req.params.id, req.body)
        .then(doctor => res.json("status updated"))
        .catch(err => res.status(400).json("ERROR: "+ err));
})

module.exports = router;