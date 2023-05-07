INSERT INTO usuarios(tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) VALUES
	('CC', '1001025610', 'Alejandro', NULL, 'Córdoba', 'Ríos'),
	('CC', '1001391548', 'Adrián', 'David', 'Perdomo', 'Echeverri'),
	('CC', '1000413716', 'Juan', 'José', 'Severino', 'Carrillo'),
	('CC', '1007697751', 'Diego', 'Fernando', 'Yepez', 'Perez'),
	('TI', '1000412780', 'Michell', NULL, 'Marín', 'Bedoya'),
	('TI', '1039082377', 'Jhon', 'Leyson', 'Olivares', 'Graciano'),
	('CC', '1034986074', 'Juan', 'Camilo', 'Manjarrés', 'Baena')
;

INSERT INTO administradores(id, clave) VALUES
	(1, MD5('1234567a')),
	(2, MD5('1234567a'))
;

INSERT INTO turnos(usuario, administrador, fecha, categoria, estado) VALUES
	(3, 1, CURRENT_TIMESTAMP, 'A', 'Cancelado'),
	(4, 1, CURRENT_TIMESTAMP, 'A', 'Completado'),
	(5, NULL, CURRENT_TIMESTAMP, 'A', 'Pendiente'),
	(6, 2, CURRENT_TIMESTAMP, 'B', 'Asignado'),
	(7, NULL, CURRENT_TIMESTAMP, 'B', 'Pendiente')
;