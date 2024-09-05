
# Descripción
Crear una API REST para gestionar libros en una biblioteca. La API debe permitir crear, leer, actualizar y eliminar libros y editoriales (CRUD). Cada libro tendrá un título, un autor y un año de publicación y su respectiva editorial.

# Puntos a considerar
* Trabajar en equipo
* El codigo debera implementar POO
* Codigo limpio
* Principios Solid

# Se deben de crear las siguientes rutas
router.post('/books', bookController.create);
router.get('/books', bookController.getAll);
router.get('/books/:id', bookController.getById);
router.put('/books/:id', bookController.update);
router.delete('/books/:id', bookController.delete);

router.post('/editorials', editorialController.create);
router.get('/editorials', editorialController.getAll);
router.get('/editorials/:id', editorialController.getById);
router.put('/editorials/:id', editorialController.update);
router.delete('/editorials/:id', editorialController.delete);

# Comando para levantar el contenedor de base de datos

docker run -d --name postgres-container -e POSTGRES_USER=PostgreDemo -e POSTGRES_PASSWORD=Postgr301 -e POSTGRES_DB=library -p 5432:5432 postgres:latest
