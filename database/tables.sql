CREATE TYPE tipo_documento AS ENUM ('CC', 'TI', 'CE', 'PP');

CREATE TABLE usuarios(
	id SERIAL NOT NULL,
	tipo_documento tipo_documento NOT NULL,
	numero_documento VARCHAR(10) NOT NULL,
	primer_nombre VARCHAR(20) NOT NULL,
	segundo_nombre VARCHAR(20) NULL,
	primer_apellido VARCHAR(20) NOT NULL,
	segundo_apellido VARCHAR(20) NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (id),
	CONSTRAINT usuarios_uq_documento UNIQUE (tipo_documento, numero_documento)
);

CREATE TABLE administradores(
	id INTEGER NOT NULL,
	clave VARCHAR(32) NOT NULL,
	CONSTRAINT administradores_pk PRIMARY KEY (id)
);

CREATE TYPE estado_turno AS ENUM ('Pendiente', 'Asignado', 'Completado', 'Cancelado');

CREATE TABLE turnos(
	id SERIAL NOT NULL,
	usuario INTEGER NOT NULL,
	administrador INTEGER NULL,
	fecha TIMESTAMP NOT NULL,
	categoria VARCHAR(3) NOT NULL,
	codigo VARCHAR(6) NOT NULL,
  estado estado_turno NOT NULL DEFAULT 'Pendiente',
	CONSTRAINT turnos_pk PRIMARY KEY (id)
);

ALTER TABLE administradores
  ADD CONSTRAINT administradores_fk_id FOREIGN KEY (id) REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT
;

ALTER TABLE turnos
  ADD CONSTRAINT turnos_fk_usuario FOREIGN KEY (usuario) REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  ADD CONSTRAINT turnos_fk_administrador FOREIGN KEY (administrador) REFERENCES administradores(id) ON UPDATE CASCADE ON DELETE RESTRICT
;

CREATE OR REPLACE FUNCTION generar_codigo_turno() 
RETURNS TRIGGER AS $$
DECLARE
  secuencia_actual INTEGER;
  secuencia_nueva VARCHAR(3);
BEGIN
  SELECT COALESCE(
  (SELECT RIGHT(codigo, 3)::INTEGER
   FROM turnos 
   WHERE categoria = NEW.categoria AND fecha::DATE = NEW.fecha::DATE
   ORDER BY id DESC
   LIMIT 1
  ), 0) INTO secuencia_actual;
  
  IF secuencia_actual = 999 THEN
    secuencia_actual = 0;
  END IF;
  
  secuencia_nueva = LPAD((secuencia_actual + 1)::TEXT, 3, '0');
  NEW.codigo := NEW.categoria || secuencia_nueva;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER turnos_tg_insert_codigo 
BEFORE INSERT ON turnos 
FOR EACH ROW 
EXECUTE FUNCTION generar_codigo_turno();