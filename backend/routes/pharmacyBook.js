const router = require('express').Router();
let PharmacyBook = require('../models/booking/pharmacy.booking');

router.route('/').get((req, res) =>{
    PharmacyBook.find()
        .then(pharmacy => res.json(pharmacy))
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/add').post((req,res) => {
    const email = req.body.email;
    const name = req.body.name;
    const pricePerUnit = Number(req.body.pricePerUnit);
    const quantity = Number(req.body.quantity);
    const totalprice = Number(req.body.totalprice);
    const status = req.body.status;

    const newPharmacy = new PharmacyBook({
        email,
        name,
        pricePerUnit,
        quantity,
        totalprice,
        status,
    })

    newPharmacy.save()
        .then(() => {
            res.json('Pharmacy saved!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res) => {
    PharmacyBook.findById(req.params.id)
        .then(pharmacyBook => res.json(pharmacyBook))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/:id').delete((req,res) => {
    PharmacyBook.findByIdAndDelete(req.params.id)
        .then(doctor => res.json('Pharmacy deleted: '))
        .catch(err => res.status(400).json('ERROR: ' + err));
})


router.route('/update/:id').post((req, res) => {
    PharmacyBook.findById(req.params.id)
        .then(pharmacy => {
            pharmacy.email = req.body.email;
            pharmacy.name = req.body.name;
            pharmacy.pricePerUnit = Number(req.body.pricePerUnit);
            pharmacy.quantity = Number(req.body.quantity);
            pharmacy.totalprice = Number(req.body.totalprice);
            pharmacy.status = req.body.status;

            pharmacy.save()
                .then(() => res.json('pharmacybook updated!'))
                .catch(err => res.status(400).json('ERROR: ' + err));
        })

})

module.exports = router;