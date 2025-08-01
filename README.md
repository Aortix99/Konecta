Backend:

a instalar
 npm i

 comando apra ejecutar
 npm run dev

 comando para ejecutar test y covertura
 npm run test
 npm run coverage

tiene .env lo cual se conecta a la bd
tiene la secret keym

NODE_ENV=development

JWT_SECRET=miclaveultrasecreta
JWT_EXPIRES_IN=1h

DB_HOST=bd
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=konecta
PORT=5000

mejores practicas:
partiendo desde la creacion de las tablas, se genera una migracion para que cuando corra el proyecto backend vaya genere las tablas en bd y deje registro.
se aplica  clean architecture tratando de separar todo y que el aplicativo sea escalable y facil de entender.
se controla el ingreso de inyect sql con la libreria de joi, y se procede con metodo post en la mayoria de los casos para tener el control de la data que ingrese
