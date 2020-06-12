insert into pytanie values (1,false,'Czy zajęcia były prowadzone w sposób ciekawy?');
insert into pytanie values (2,false,'Czy sposób prowadzenia zajęć był zgodny z planem umieszonym na syllabusie przedmiotu?');
insert into pytanie values (3,false,'Czy prowadzący przestrzegał zasad zaliczenia przedstawionych na syllabusie?');
insert into pytanie values (4,true,'Co było najciekawszą częścią przeprowadzonych laboratorium?');

insert into wydzial(pelna_nazwa, nazwa_skrocona) values 
    ('Fizyki i Informatyki Stosowanej', 'FiIS');

insert into kierunek(id_wydzial, pelna_nazwa, nazwa_skrocona) values 
    (1, 'Informatyka Stosowana', 'IS');

insert into przedmiot(id_kierunek, nazwa) values 
    (1, 'Fizyka I');

insert into prowadzacy(id_przedmiot, tytul, imie_nazwisko) values 
    (1, 'dr', 'Jan Kowalski'),
    (1, 'mgr', 'Andrzej Nowak');

insert into student(pesel,mail, nr_indeksu, imie, nazwisko, id_wydzial) values
    ('12345678987','dominik.trybuch@gmail.com', '99999', 'Jan', 'Nowak', 1);

insert into pracownik(login, haslo, email) values
    ('admin', 'admin', 'admin@mail.com');

insert into ankieta(id_prowadzacy, data_zamkniecia) values
    (1, '2020-06-01');

insert into ankieta_pytanie values 
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1);

insert into student_ankieta values
    (1, 1, false);