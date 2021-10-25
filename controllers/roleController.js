const roleModel =require('../models/roleModel')
module.exports={
    Createrole: function (req, res) {
        roleModel.create((req.body),
              function (err, role) { 
            if (err) {
                console.log(err)
                res.json({msg : 'error', statut: 500, data: null})
            }
            else{
                 res.json({ msg: 'role ajouté', statut: 200, data: role })
            }
    })
},




}