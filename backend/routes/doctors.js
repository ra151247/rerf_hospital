const router = require('express').Router();
let Doctors = require('../models/doctors.model');

router.route('/').get((req, res) =>{
    Doctors.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const experience = Number(req.body.experience);
    const speciality = req.body.speciality;
    const availableTiming = req.body.availableTiming;
    const price = Number(req.body.price);

    const newDoctor = new Doctors({
        name,
        email,
        experience,
        speciality,
        availableTiming,
        price
    })

    newDoctor.save()
        .then(() => {
            res.json('Doctor saved!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res) => {
    Doctors.findById(req.params.id)
        .then(doctor => res.json(doctor))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/:id').delete((req,res) => {
    Doctors.findByIdAndDelete(req.params.id)
        .then(doctor => res.json('Doctor deleted: '))
        .catch(err => res.status(400).json('ERROR: ' + err));
})


router.route('/update/:id').post((req, res) => {
    Doctors.findById(req.params.id)
        .then(doctor => {
            doctor.name = req.body.name;
            doctor.email = req.body.email;
            doctor.speciality = req.body.speciality;
            doctor.experience = Number(req.body.experience);
            doctor.availableTiming = req.body.availableTiming;
            doctor.price = Number(req.body.price);

            doctor.save()
                .then(() => res.json('Doctor updated!'))
                .catch(err => res.status(400).json('ERROR: ' + err));
        })

})

module.exports = router;