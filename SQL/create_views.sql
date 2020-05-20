set SEARCH_PATH TO projekt,public;


create or replace view student_wypelnil as 
(

		select a.id_ankieta,a.id_prowadzacy,s.id_wydzial,s.id_student,s.imie,s.nazwisko
		from student_ankieta sa
			 join student s on sa.id_student = s.id_student
			 join ankieta a on sa.id_ankieta = a.id_ankieta
			 where sa.wypelniona = 'True'


);



create or replace view student_moze_wypelnic as 
(
		select a.id_ankieta,a.id_prowadzacy,s.id_wydzial,s.id_student,s.imie,s.nazwisko
		from student_ankieta sa
			 join student s on sa.id_student = s.id_student
			 join ankieta a on sa.id_ankieta = a.id_ankieta
			 where sa.wypelniona = 'FALSE'

);



create or replace view  wypelnione_ankiety as (

select s.id_ankieta,w.id_wydzial,k.pelna_nazwa,p.nazwa,pr.imie_nazwisko from student_wypelnil s 
join prowadzacy pr on  s.id_prowadzacy = pr.id_prowadzacy 
join  przedmiot p on pr.id_przedmiot = p.id_przedmiot 
 join kierunek k on p.id_kierunek= k.id_kierunek 
 join wydzial w on s.id_wydzial = w.id_wydzial
 group by s.id_ankieta,w.id_wydzial,k.pelna_nazwa,p.nazwa,pr.imie_nazwisko
 order by s.id_ankieta
);


create or replace view odpowiedzi_do_ankiety as (
	select o.id_ankieta, o.id_pytanie, o.tresc_odp, COUNT(o.id_student) from odpowiedz o join pytanie p on o.id_pytanie = p.id_pytanie where p.pytanie_otwarte=false group by o.id_ankieta, o.id_pytanie, p.pytanie_otwarte, o.tresc_odp
);

-- create or replace function odpowiedzi_do_ankiety (id_stud integer,id_ank integer)
-- returns table(imie text,nazwisko text,id_pytanie integer,tresc_pyt text,tresc_odp text) as
-- $$
-- BEGIN

-- select wa.imie,wa.nazwisko,p.id_pytanie,p.tresc_pyt,o.tresc_odp from projekt.wypelnione_ankiety wa join projekt.odpowiedz o on wa.id_ankieta = o.id_ankieta join projekt.pytanie p on p.id_pytanie = o.id_pytanie where wa.id_student = id_stud and wa.id_ankieta = id_ank;


-- END;
-- $$
-- LANGUAGE plpgsql;