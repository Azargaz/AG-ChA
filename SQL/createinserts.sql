insert into pytanie values (1,true,'Czy zajęcia byłyy prowadzone w sposób ciekawy?');
insert into pytanie values (2,true,'Czy sposób prowadzenia zajęć odbiegał od planu umieszonego na syllabusie przedmiotu?');
insert into pytanie values (3,true,'w skali od jeden do 10 jak Pan/Pani ocenia zajęcia? Proszę podać liczbę');
insert into pytanie values (4,true,'co było najciekawszą częścią przeprowadzonych laboratorium?');

insert into wydzial(pelna_nazwa, nazwa_skrocona) values 
    ('Fizyki i Informatyki Stosowanej', 'FiIS');

insert into kierunek(id_wydzial, pelna_nazwa, nazwa_skrocona) values 
    (1, 'Informatyka Stosowana', 'IS');

insert into przedmiot(id_kierunek, nazwa) values 
    (1, 'Fizyka I');

insert into prowadzacy(id_przedmiot, tytul, imie_nazwisko) values 
    (1, 'dr', 'Jan Kowalski');

insert into student(pesel, nr_indeksu, imie, nazwisko, id_wydzial) values
    ('12345678987', '99999', 'Jan', 'Nowak', 1);

insert into ankieta(id_prowadzacy, data_zamkniecia) values
    (4, '2020-06-01');

insert into ankieta_pytanie values 
    (1, 3),
    (2, 3),
    (3, 3),
    (4, 3);

insert into student_ankieta values
    (3, 1, false);

SELECT sa.id_ankieta,pr.nazwa,p.tytul,p.imie_nazwisko 
    FROM projekt.ankieta a JOIN projekt.student_ankieta sa 
    on sa.id_ankieta = a.id_ankieta 
    JOIN projekt.prowadzacy p 
    on a.id_prowadzacy = p.id_prowadzacy 
    JOIN projekt.przedmiot pr 
    on pr.id_przedmiot = p.id_przedmiot 
    where sa.id_student = $1 
    and a.data_zamkniecia > NOW() order by pr.nazwa;