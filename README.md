Da biste uspješno pokrenuli aplikaciju potrebno je koristiti "npm start" komandu. 

Aplikacija je inicijalno kreirana sa komandom "npm init react-app table".

Logika za zadatak je smještena u TableApp.js
Potencijalna zajednička logika za više komponenti je izmještena u Utils.js (npr. ako želimo dodati više funkcionalnosti na više tabela, kao što su filterisanje, sortiranje, refresh tabele, view itd.)

Sami zadatak ima nekoliko faktora koji ograničavaju UX, a to su:

- Search ne radi ukoliko želimo naći brojeve koji su manji od 100, jer se neće aktivirati search na manje od tri karaktera
- Redoslijed kolona se mijenja ukoliko ih izbacimo pa ponovo ubacimo, nije definisano ponašanje tabele u tom slučaju
- Nije definisano da li search treba raditi i po fieldovima koji nisu vidljivi u tom trenutku u kolonama koje su selektovane





