INSERT INTO usuarios(tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) VALUES
	('CC', '1001025610', 'Alejandro', NULL, 'Córdoba', 'Ríos'),
	('CC', '1001391548', 'Adrián', 'David', 'Perdomo', 'Echeverri'),
	('CC', '1000413716', 'Juan', 'José', 'Severino', 'Carrillo'),
	('CC', '1007697751', 'Diego', 'Fernando', 'Yepez', 'Perez'),
	('TI', '1000412780', 'Michell', NULL, 'Marín', 'Bedoya'),
	('TI', '1039082377', 'Jhon', 'Leyson', 'Olivares', 'Graciano'),
	('CC', '1034986074', 'Juan', 'Camilo', 'Manjarrés', 'Baena'),
	('CC', '1007666713', 'Karen', 'Andrea', 'Gómez', 'Lobo'),
	('CC', '1000918870', 'Alexander', NULL, 'Restrepo', 'Múnera'),
	('CC', '1004347933', 'Santiago', NULL, 'Cano', 'Duque'),
	('TI', '1152465682', 'Pablo', NULL, 'Buitrago', 'Mejía'),
	('CE', '93466', 'Santiago', NULL, 'Sandoval', NULL),
	('CC', '1127616721', 'Nixon', 'Daniel', 'Lizcano', 'Santana'),
	('CC', '1119390059', 'Santiago', 'Jesus', 'Brito', 'Diaz'),
	('TI', '1002064093', 'Juan', 'Sebastián', 'Montoya', 'Atehortua')
;

INSERT INTO modulos(id, usuario, clave) VALUES
	(1, 'modulo1', MD5('1234567a')),
	(2, 'modulo2', MD5('1234567a')),
	(3, 'modulo3', MD5('1234567a')),
	(4, 'modulo4', MD5('1234567a')),
	(5, 'modulo5', MD5('1234567a'))
;

INSERT INTO turnos(usuario, modulo, categoria, estado, fecha_asignado, fecha_cambio) VALUES
	(1, 1, 'A', 'Cancelado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(2, 1, 'A', 'Completado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(3, NULL, 'A', 'Pendiente', NULL, NULL),
	(5, 4, 'B', 'Cancelado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(6, 5, 'B', 'Completado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(7, NULL, 'A', 'Pendiente', NULL, NULL),
	(10, NULL, 'A', 'Pendiente', NULL, NULL),
	(12, NULL, 'B', 'Pendiente', NULL, NULL),
	(14, NULL, 'A', 'Pendiente', NULL, NULL),
	(15, NULL, 'B', 'Pendiente', NULL, NULL)
;