const router = require('express').Router();
let Services = require('../models/services.model');

router.route('/').get((req, res) =>{
    Services.find()
        .then(service => res.json(service))
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    const pricePerUnit = Number(req.body.pricePerUnit);
    const totalUnits = Number(req.body.totalUnits);
    const totalUnitsAvailable = Number(req.body.totalUnitsAvailable);

    const newServices = new Services({
        name,
        description,
        pricePerUnit,
        totalUnits,
        totalUnitsAvailable,
    })

    newServices.save()
        .then(() => {
            res.json('service saved!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res) => {
    Services.findById(req.params.id)
        .then(service => res.json(service))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/:id').delete((req,res) => {
    Services.findByIdAndDelete(req.params.id)
        .then(service => res.json('Service deleted: '))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.route('/updateServices/:id').post((req, res) => {
    Services.findById(req.params.id)
        .then( stock => {
            stock.name = res.data.name;
            stock.description = res.data.description;
            stock.pricePerUnit = Number(res.data.pricePerUnit);
            stock.totalUnits = Number(res.data.totalUnits);
            stock.totalUnitsAvailable = Number(res.data.totalUnitsAvailable -1);

            stock.save()
                .then(() => res.json('service availablity data updated!'))
                .catch(err => res.json('ERROR: ' + err));
        })
})

router.route('/update/:id').post((req, res) => {
    Services.findById(req.params.id)
        .then(stock => {
            stock.name = req.body.name;
            stock.description = req.body.description;
            stock.pricePerUnit = Number(req.body.pricePerUnit);
            stock.totalUnits = Number(req.body.totalUnits);
            stock.totalUnitsAvailable = Number(req.body.totalUnitsAvailable);

            stock.save()
                .then(() => res.json('service updated!'))
                .catch(err => res.status(400).json('ERROR: ' + err));
        })

})

module.exports = router;