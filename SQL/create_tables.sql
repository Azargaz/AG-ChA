CREATE SCHEMA projekt;
set SEARCH_PATH TO projekt,public;

CREATE SEQUENCE grupa_id_grupa_seq;

CREATE TABLE grupa (
                id_grupa NUMERIC NOT NULL DEFAULT nextval('grupa_id_grupa_seq'),
                nazwa VARCHAR NOT NULL,
                CONSTRAINT grupa_pk PRIMARY KEY (id_grupa)
);


ALTER SEQUENCE grupa_id_grupa_seq OWNED BY grupa.id_grupa;

CREATE SEQUENCE wydzial_id_wydzial_seq_1;

CREATE TABLE wydzial (
                id_wydzial NUMERIC NOT NULL DEFAULT nextval('wydzial_id_wydzial_seq_1'),
                pelna_nazwa VARCHAR NOT NULL,
                nazwa_skrocona VARCHAR NOT NULL,
                CONSTRAINT wydzial_pk PRIMARY KEY (id_wydzial)
);


ALTER SEQUENCE wydzial_id_wydzial_seq_1 OWNED BY wydzial.id_wydzial;

CREATE SEQUENCE kierunek_id_kierunek_seq;

CREATE TABLE kierunek (
                id_kierunek NUMERIC NOT NULL DEFAULT nextval('kierunek_id_kierunek_seq'),
                id_wydzial NUMERIC NOT NULL,
                pelna_nazwa VARCHAR NOT NULL,
                nazwa_skrocona VARCHAR NOT NULL,
                CONSTRAINT kierunek_pk PRIMARY KEY (id_kierunek)
);


ALTER SEQUENCE kierunek_id_kierunek_seq OWNED BY kierunek.id_kierunek;

CREATE SEQUENCE przedmiot_id_przedmiot_seq;

CREATE TABLE przedmiot (
                id_przedmiot NUMERIC NOT NULL DEFAULT nextval('przedmiot_id_przedmiot_seq'),
                id_kierunek NUMERIC NOT NULL,
                nazwa VARCHAR NOT NULL,
                CONSTRAINT przedmiot_pk PRIMARY KEY (id_przedmiot)
);


ALTER SEQUENCE przedmiot_id_przedmiot_seq OWNED BY przedmiot.id_przedmiot;

CREATE SEQUENCE prowadzacy_id_prowadzacy_seq_1;

CREATE TABLE prowadzacy (
                id_prowadzacy NUMERIC NOT NULL DEFAULT nextval('prowadzacy_id_prowadzacy_seq_1'),
                id_przedmiot NUMERIC NOT NULL,
                tytul text,
                imie_nazwisko text,
                CONSTRAINT prowadzacy_pk PRIMARY KEY (id_prowadzacy)
);


ALTER SEQUENCE prowadzacy_id_prowadzacy_seq_1 OWNED BY prowadzacy.id_prowadzacy;

CREATE SEQUENCE pytanie_id_pytanie_seq;

CREATE TABLE pytanie (
                id_pytanie NUMERIC NOT NULL DEFAULT nextval('pytanie_id_pytanie_seq'),
                pytanie_otwarte BOOLEAN NOT NULL,
                tresc_pyt VARCHAR NOT NULL,
                CONSTRAINT pytanie_pk PRIMARY KEY (id_pytanie)
);


ALTER SEQUENCE pytanie_id_pytanie_seq OWNED BY pytanie.id_pytanie;

CREATE SEQUENCE ankieta_id_ankieta_seq;

CREATE TABLE ankieta (
                id_ankieta NUMERIC NOT NULL DEFAULT nextval('ankieta_id_ankieta_seq'),
                id_prowadzacy NUMERIC NOT NULL,
                data_zamkniecia DATE NOT NULL,
                CONSTRAINT ankieta_pk PRIMARY KEY (id_ankieta)
);


ALTER SEQUENCE ankieta_id_ankieta_seq OWNED BY ankieta.id_ankieta;

CREATE TABLE ankieta_pytanie (
                id_pytanie NUMERIC NOT NULL,
                id_ankieta NUMERIC NOT NULL,
                CONSTRAINT ankieta_pytanie_pk PRIMARY KEY (id_pytanie, id_ankieta)
);


CREATE SEQUENCE student_id_student_seq;

CREATE TABLE student (
                id_student NUMERIC NOT NULL DEFAULT nextval('student_id_student_seq'),
                pesel VARCHAR NOT NULL,k
                nr_indeksu VARCHAR NOT NULL,
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                id_wydzial NUMERIC NOT NULL,
                CONSTRAINT student_pk PRIMARY KEY (id_student)
);


ALTER SEQUENCE student_id_student_seq OWNED BY student.id_student;

CREATE TABLE student_grupa (
                id_student NUMERIC NOT NULL,
                id_grupa NUMERIC NOT NULL,
                CONSTRAINT student_grupa_pk PRIMARY KEY (id_student, id_grupa)
);


CREATE TABLE student_ankieta (
                id_ankieta NUMERIC NOT NULL,
                id_student NUMERIC NOT NULL,
                wypelnionia BOOLEAN NOT NULL default 'FALSE',
                CONSTRAINT student_ankieta_pk PRIMARY KEY (id_ankieta, id_student)
);


CREATE TABLE odpowiedz (
                id_ankieta NUMERIC NOT NULL,
                id_pytanie NUMERIC NOT NULL,
                id_student NUMERIC NOT NULL,
                tresc_odp VARCHAR NOT NULL,
                CONSTRAINT odpowiedz_pk PRIMARY KEY (id_ankieta, id_pytanie, id_student)
);


CREATE SEQUENCE pracownik_id_pracownik_seq;

CREATE TABLE pracownik (
                id_pracownik NUMERIC NOT NULL DEFAULT nextval('pracownik_id_pracownik_seq'),
                login VARCHAR NOT NULL,
                haslo VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                CONSTRAINT pracownik_pk PRIMARY KEY (id_pracownik)
);


ALTER SEQUENCE pracownik_id_pracownik_seq OWNED BY pracownik.id_pracownik;

ALTER TABLE student_grupa ADD CONSTRAINT grupa_student_grupa_fk
FOREIGN KEY (id_grupa)
REFERENCES grupa (id_grupa)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE kierunek ADD CONSTRAINT wydzial_kierunek_fk
FOREIGN KEY (id_wydzial)
REFERENCES wydzial (id_wydzial)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE student ADD CONSTRAINT wydzial_student_fk
FOREIGN KEY (id_wydzial)
REFERENCES wydzial (id_wydzial)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE przedmiot ADD CONSTRAINT kierunek_przedmiot_fk
FOREIGN KEY (id_kierunek)
REFERENCES kierunek (id_kierunek)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE prowadzacy ADD CONSTRAINT przedmiot_prowadzacy_fk
FOREIGN KEY (id_przedmiot)
REFERENCES przedmiot (id_przedmiot)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ankieta ADD CONSTRAINT prowadzacy_ankieta_fk
FOREIGN KEY (id_prowadzacy)
REFERENCES prowadzacy (id_prowadzacy)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE odpowiedz ADD CONSTRAINT pytanie_odpowiedz_fk
FOREIGN KEY (id_pytanie)
REFERENCES pytanie (id_pytanie)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ankieta_pytanie ADD CONSTRAINT pytanie_ankieta_pytanie_fk
FOREIGN KEY (id_pytanie)
REFERENCES pytanie (id_pytanie)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE ankieta_pytanie ADD CONSTRAINT ankieta_ankieta_pytanie_fk
FOREIGN KEY (id_ankieta)
REFERENCES ankieta (id_ankieta)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE student_ankieta ADD CONSTRAINT ankieta_student_ankieta_fk
FOREIGN KEY (id_ankieta)
REFERENCES ankieta (id_ankieta)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE odpowiedz ADD CONSTRAINT ankieta_odpowiedz_fk
FOREIGN KEY (id_ankieta)
REFERENCES ankieta (id_ankieta)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE odpowiedz ADD CONSTRAINT student_odpowiedz_fk
FOREIGN KEY (id_student)
REFERENCES student (id_student)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE student_ankieta ADD CONSTRAINT student_student_ankieta_fk
FOREIGN KEY (id_student)
REFERENCES student (id_student)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE student_grupa ADD CONSTRAINT student_student_grupa_fk
FOREIGN KEY (id_student)
REFERENCES student (id_student)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;