const router = require('express').Router();
let Pharmacy = require('../models/pharmacy.model');

router.route('/').get((req, res) =>{
    Pharmacy.find()
        .then(pharmacy => res.json(pharmacy))
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const pricePerUnit =Number(req.body.pricePerUnit);
    const mfgDate = req.body.mfgDate;
    const expDate = req.body.expDate;

    const newPharmacy = new Pharmacy({
        name,
        pricePerUnit,
        mfgDate,
        expDate,
    })

    newPharmacy.save()
        .then(() => {
            res.json('pharmacy saved!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res) => {
    Pharmacy.findById(req.params.id)
        .then(pharmacy => res.json(pharmacy))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/:id').delete((req,res) => {
    Pharmacy.findByIdAndDelete(req.params.id)
        .then(pharmacy => res.json('pharmacy deleted: '))
        .catch(err => res.status(400).json('ERROR: ' + err));
})


router.route('/update/:id').post((req, res) => {
    Pharmacy.findById(req.params.id)
        .then(pharmacy => {
            pharmacy.name = req.body.name;
            pharmacy.pricePerUnit = Number(req.body.pricePerUnit);
            pharmacy.mfgDate = req.body.mfgDate;
            pharmacy.expDate = req.body.expDate;

            pharmacy.save()
                .then(() => res.json('Pharmacy updated!'))
                .catch(err => res.status(400).json('ERROR: ' + err));
        })

})

module.exports = router;