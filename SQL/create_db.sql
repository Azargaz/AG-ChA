
CREATE SEQUENCE AG-ChA.wydzial_id_wydzial_seq_1;

CREATE TABLE AG-ChA.wydzial (
                id_wydzial NUMERIC NOT NULL DEFAULT nextval('AG-ChA.wydzial_id_wydzial_seq_1'),
                nazwa VARCHAR NOT NULL,
                CONSTRAINT wydzial_pk PRIMARY KEY (id_wydzial)
);


ALTER SEQUENCE AG-ChA.wydzial_id_wydzial_seq_1 OWNED BY AG-ChA.wydzial.id_wydzial;

CREATE SEQUENCE AG-ChA.kierunek_id_kierunek_seq;

CREATE TABLE AG-ChA.kierunek (
                id_kierunek NUMERIC NOT NULL DEFAULT nextval('AG-ChA.kierunek_id_kierunek_seq'),
                id_wydzial NUMERIC NOT NULL,
                nazwa VARCHAR NOT NULL,
                CONSTRAINT kierunek_pk PRIMARY KEY (id_kierunek)
);


ALTER SEQUENCE AG-ChA.kierunek_id_kierunek_seq OWNED BY AG-ChA.kierunek.id_kierunek;

CREATE SEQUENCE AG-ChA.przedmiot_id_przedmiot_seq;

CREATE TABLE AG-ChA.przedmiot (
                id_przedmiot NUMERIC NOT NULL DEFAULT nextval('AG-ChA.przedmiot_id_przedmiot_seq'),
                id_kierunek NUMERIC NOT NULL,
                nazwa VARCHAR NOT NULL,
                CONSTRAINT przedmiot_pk PRIMARY KEY (id_przedmiot)
);


ALTER SEQUENCE AG-ChA.przedmiot_id_przedmiot_seq OWNED BY AG-ChA.przedmiot.id_przedmiot;

CREATE SEQUENCE AG-ChA.prowadzacy_id_prowadzacy_seq_1;

CREATE TABLE AG-ChA.prowadzacy (
                id_prowadzacy NUMERIC NOT NULL DEFAULT nextval('AG-ChA.prowadzacy_id_prowadzacy_seq_1'),
                id_przedmiot NUMERIC NOT NULL,
                CONSTRAINT prowadzacy_pk PRIMARY KEY (id_prowadzacy)
);


ALTER SEQUENCE AG-ChA.prowadzacy_id_prowadzacy_seq_1 OWNED BY AG-ChA.prowadzacy.id_prowadzacy;

CREATE SEQUENCE AG-ChA.pytanie_id_pytanie_seq;

CREATE TABLE AG-ChA.pytanie (
                id_pytanie NUMERIC NOT NULL DEFAULT nextval('AG-ChA.pytanie_id_pytanie_seq'),
                pytanie_otwarte BOOLEAN NOT NULL,
                tresc_pyt VARCHAR NOT NULL,
                CONSTRAINT pytanie_pk PRIMARY KEY (id_pytanie)
);


ALTER SEQUENCE AG-ChA.pytanie_id_pytanie_seq OWNED BY AG-ChA.pytanie.id_pytanie;

CREATE SEQUENCE AG-ChA.ankieta_id_ankieta_seq;

CREATE TABLE AG-ChA.ankieta (
                id_ankieta NUMERIC NOT NULL DEFAULT nextval('AG-ChA.ankieta_id_ankieta_seq'),
                id_prowadzacy NUMERIC NOT NULL,
                data_zamkniecia DATE NOT NULL,
                CONSTRAINT ankieta_pk PRIMARY KEY (id_ankieta)
);


ALTER SEQUENCE AG-ChA.ankieta_id_ankieta_seq OWNED BY AG-ChA.ankieta.id_ankieta;

CREATE TABLE AG-ChA.ankieta_pytanie (
                id_pytanie NUMERIC NOT NULL,
                id_ankieta NUMERIC NOT NULL,
                CONSTRAINT ankieta_pytanie_pk PRIMARY KEY (id_pytanie, id_ankieta)
);


CREATE SEQUENCE AG-ChA.student_id_student_seq;

CREATE TABLE AG-ChA.student (
                id_student NUMERIC NOT NULL DEFAULT nextval('AG-ChA.student_id_student_seq'),
                pesel VARCHAR NOT NULL,
                nr_indeksu VARCHAR NOT NULL,
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                id_wydzial NUMERIC NOT NULL,
                CONSTRAINT student_pk PRIMARY KEY (id_student)
);


ALTER SEQUENCE AG-ChA.student_id_student_seq OWNED BY AG-ChA.student.id_student;

CREATE TABLE AG-ChA.student_ankieta (
                id_ankieta NUMERIC NOT NULL,
                id_student NUMERIC NOT NULL,
                wypelnionia BOOLEAN NOT NULL,
                CONSTRAINT student_ankieta_pk PRIMARY KEY (id_ankieta, id_student)
);


CREATE SEQUENCE AG-ChA.odpowiedz_id_odpowiedz_seq;

CREATE TABLE AG-ChA.odpowiedz (
                id_odpowiedz NUMERIC NOT NULL DEFAULT nextval('AG-ChA.odpowiedz_id_odpowiedz_seq'),
                id_ankieta NUMERIC NOT NULL,
                id_pytanie NUMERIC NOT NULL,
                id_student NUMERIC NOT NULL,
                tresc_odp VARCHAR NOT NULL,
                CONSTRAINT odpowiedz_pk PRIMARY KEY (id_odpowiedz)
);


ALTER SEQUENCE AG-ChA.odpowiedz_id_odpowiedz_seq OWNED BY AG-ChA.odpowiedz.id_odpowiedz;

CREATE SEQUENCE AG-ChA.pracownik_id_pracownik_seq;

CREATE TABLE AG-ChA.pracownik (
                id_pracownik NUMERIC NOT NULL DEFAULT nextval('AG-ChA.pracownik_id_pracownik_seq'),
                login VARCHAR NOT NULL,
                haslo VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                CONSTRAINT pracownik_pk PRIMARY KEY (id_pracownik)
);


ALTER SEQUENCE AG-ChA.pracownik_id_pracownik_seq OWNED BY AG-ChA.pracownik.id_pracownik;

ALTER TABLE AG-ChA.kierunek ADD CONSTRAINT wydzial_kierunek_fk
FOREIGN KEY (id_wydzial)
REFERENCES AG-ChA.wydzial (id_wydzial)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.student ADD CONSTRAINT wydzial_student_fk
FOREIGN KEY (id_wydzial)
REFERENCES AG-ChA.wydzial (id_wydzial)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.przedmiot ADD CONSTRAINT kierunek_przedmiot_fk
FOREIGN KEY (id_kierunek)
REFERENCES AG-ChA.kierunek (id_kierunek)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.prowadzacy ADD CONSTRAINT przedmiot_prowadzacy_fk
FOREIGN KEY (id_przedmiot)
REFERENCES AG-ChA.przedmiot (id_przedmiot)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.ankieta ADD CONSTRAINT prowadzacy_ankieta_fk
FOREIGN KEY (id_prowadzacy)
REFERENCES AG-ChA.prowadzacy (id_prowadzacy)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.odpowiedz ADD CONSTRAINT pytanie_odpowiedz_fk
FOREIGN KEY (id_pytanie)
REFERENCES AG-ChA.pytanie (id_pytanie)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.ankieta_pytanie ADD CONSTRAINT pytanie_ankieta_pytanie_fk
FOREIGN KEY (id_pytanie)
REFERENCES AG-ChA.pytanie (id_pytanie)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.ankieta_pytanie ADD CONSTRAINT ankieta_ankieta_pytanie_fk
FOREIGN KEY (id_ankieta)
REFERENCES AG-ChA.ankieta (id_ankieta)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.student_ankieta ADD CONSTRAINT ankieta_student_ankieta_fk
FOREIGN KEY (id_ankieta)
REFERENCES AG-ChA.ankieta (id_ankieta)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.odpowiedz ADD CONSTRAINT ankieta_odpowiedz_fk
FOREIGN KEY (id_ankieta)
REFERENCES AG-ChA.ankieta (id_ankieta)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.odpowiedz ADD CONSTRAINT student_odpowiedz_fk
FOREIGN KEY (id_student)
REFERENCES AG-ChA.student (id_student)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE AG-ChA.student_ankieta ADD CONSTRAINT student_student_ankieta_fk
FOREIGN KEY (id_student)
REFERENCES AG-ChA.student (id_student)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;