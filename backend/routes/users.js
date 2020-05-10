var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    "user": "user1",
    "password": "passw0rd"
  });
});


//// logowanie studenta 
router.get('/studentlogin', (req, res) => {

    const {log  } = req.body.login;
    const {pass  } = req.body.password;

    db.query('select id_pracownik from projekt.pracownik p where p.login = $1 and p.password = $2 ',[log,pass])
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


//// logowanie pracownika

router.get('/pracowniklogin', (req, res) => {

    const {log } = req.body.nr_indesu;
    const {pass } = req.body.pesel;

    db.query('select id_student from projekt.student s where s.nr_indeksu = $1 and s.pesel = $2 ',[log,pass])
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
