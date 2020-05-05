
const router = require('express').Router()





/////select ankiety do wypelnienia

router.get('/ankietydowypelnienia', (req, res) => {

    const {id_student  } = req.user

    db.query('SELECT pr.nazwa,p.tytul,p.imie,p.nazwisko FROM projekt.ankieta a JOIN student_ankieta sa on sa.id_ankieta  = a.id_ankieta JOIN projekt.prowadzący p  on a.id_prowadzacy = p.id_prowadzacy  JOIN projekt.przedmiot  pr on pr.id_prowadzacy = p.id_prowadzacy where sa.id_student = $1 and a.data_zamkniecia > NOW() order by pr.nazwa',[id_student])
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




///// select ankiety wypelnione

router.get('/ankietywypelnione', (req, res) => {

    const {id_student  } = req.user

    db.query('SELECT pr.nazwa,p.tytul,p.imie,p.nazwisko FROM projekt.ankieta a JOIN student_ankieta sa on sa.id_ankieta  = a.id_ankieta JOIN projekt.prowadzący p  on a.id_prowadzacy = p.id_prowadzacy  JOIN projekt.przedmiot  pr on pr.id_prowadzacy = p.id_prowadzacy where sa.id_student = $1 and a.data_zamkniecia < NOW() order by pr.nazwa',[id_student])
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





//////////



module.exports = router;
