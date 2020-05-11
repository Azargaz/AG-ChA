

const router = require('express').Router()

const db = require('./polaczenie')



/////select dla wynikow( wszystkie ankiety)
router.get('/wyniki', (req, res) => {


    db.query('select * from wypelnione_ankiety')
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})


//select dla odpowiedzi( wszystkie  pytania odpowiedzi dla konkretengo id_ankiety i id_studenta )

router.get('/wyniki/:ankieta_id', (req, res) => {

    
    const {id_student} = req.user;
    const {id_ankieta } =  req.params;

    db.query('select odpowiedzi_do_ankiety($1,$2)',[id_student,id_ankieta])
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})


module.exports = router;



