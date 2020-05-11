
const router = require('express').Router()

const db = require('./polaczenie')





////dodawanie odpowiedzi - insert tresci do odpowiedzi dla konkretnego id



router.post('/odpowiedz/:id_ankieta', auth, (req, res) => {

	const { id_pytanie} = req.body.id_pytanie;
	const {tresc } =req.body.tresc;
	const {id_ankieta} = req.params;
	const {id_student} = req.user;
  
     db.query('insert into odpowiedz values($3,$1,$4,$2)',[id_pytanie,tresc,id_ankieta,id_student])
        .then(result => {
            res.status(201).json({
                status: "ok"
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })




module.exports = router;



