CREATE TABLE usuarios(
	id SERIAL NOT NULL,
	tipo_documento VARCHAR(2) NOT NULL,
	numero_documento VARCHAR(10) NOT NULL,
	primer_nombre VARCHAR(20) NOT NULL,
	segundo_nombre VARCHAR(20) NULL,
	primer_apellido VARCHAR(20) NOT NULL,
	segundo_apellido VARCHAR(20) NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (id),
  CONSTRAINT usuarios_ck_tipo_documento CHECK (tipo_documento IN ('TI', 'CC', 'CE', 'PP')),
	CONSTRAINT usuarios_uq_documento UNIQUE (tipo_documento, numero_documento)
);

CREATE TABLE modulos(
	id INTEGER NOT NULL,
  usuario VARCHAR(16) NOT NULL,
	clave VARCHAR(32) NOT NULL,
	CONSTRAINT modulos_pk PRIMARY KEY (id)
);

CREATE TABLE turnos(
	id SERIAL NOT NULL,
	usuario INTEGER NOT NULL,
	modulo INTEGER NULL,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	categoria VARCHAR(3) NOT NULL,
	codigo VARCHAR(6) NOT NULL,
  estado VARCHAR(10) NOT NULL DEFAULT 'Pendiente',
  fecha_asignado TIMESTAMP NULL,
  fecha_cambio TIMESTAMP NULL,
	CONSTRAINT turnos_pk PRIMARY KEY (id),
  CONSTRAINT turnos_ck_estado CHECK (estado IN ('Pendiente', 'Asignado', 'En curso', 'Completado', 'Cancelado'))
);

ALTER TABLE turnos
  ADD CONSTRAINT turnos_fk_usuario FOREIGN KEY (usuario) REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  ADD CONSTRAINT turnos_fk_modulo FOREIGN KEY (modulo) REFERENCES modulos(id) ON UPDATE CASCADE ON DELETE RESTRICT
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