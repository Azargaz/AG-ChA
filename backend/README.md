### Uruchamianie

Aby połączyć się z bazą danych należy dodać plik o nazwie `.env` w głównym folderze backendu z następującymi wartościami:
```
DB_USER='nazwa_użytkownika'
DB_USER_PASS='hasło_użytkownika'
DB_HOST='localhost'
DB_PORT='5432'
DB_NAME='projekt_io'
PRIVATE_KEY='wpisz tutaj co chcesz'
```

Uruchamianie serwera:
- `npm i` - instalacja wszystkich niezbędnych modułów
- `npm start` - uruchomienie lokalnego serwera pod adresem `http://localhost:3001`
