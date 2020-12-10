const Nature = require ("../models/natures.model");

const create = (req, res) => {
    Nature.findOrCreate({
        where: {desc: req.body.desc},
        defaults: {
            desc: req.body.desc
        }
    }).then(newNature => {
        if (newNature[1]){
            res.status(200).json({
                message: "Nature Created Successfully" ,
                newNature: newNature[0],
                created: newNature[1]
            }); 
        }
        else {res.status(409).json({
            message: "Nature Already Exists", 
            newNature: newNature[0],
            created: newNature[1]
        })}
    }).catch(error => {
        res.status(400).send(error); 
    })
}

const list = (res) => {
    Nature.findAll().then(natures => {
        res.status(200).json(natures); 
    }).catch(error => {
        res.status(400).send(error); 
    })
}

exports.create = create;
exports.list = list;