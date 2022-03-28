USE DB_INNPACTIA;


CREATE TABLE PERSONA(
id_persona int auto_increment NOT NULL,
nombre varchar(50),
estado int,
genero varchar(50),
fech_registro date,
usr_registro varchar(50),
PRIMARY KEY (id_persona)
);

CREATE TABLE USUARIO(
id_usuario int auto_increment NOT NULL,
id_persona int,
correo varchar(50),
contrasenya varchar(100),
estado int,
fech_registro date,
usr_registro varchar(50),
PRIMARY KEY(id_usuario),
FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
 );
 
 CREATE TABLE INDICADOR (
 id_indicador int auto_increment NOT NULL,
 nombre_indicador varchar(50),
 estado int,
 fech_registro date,
 usr_registro varchar(50),
 PRIMARY KEY(id_indicador)
 );
 
 create TABLE DATO_INDICADOR(
 id_dato int auto_increment NOT NULL,
 id_indicador int,
 descripcion VARCHAR(255),
 total numeric,
 fecha date,
 fech_registro date,
usr_registro varchar(50),
PRIMARY KEY (id_dato),
FOREIGN KEY (id_indicador) REFERENCES indicador(id_indicador)
 );
 

 DELIMITER $$
CREATE PROCEDURE SP_LOGIN1(IN email VARCHAR(50))
BEGIN
    SELECT * 
    FROM usuario
    WHERE correo = email;
END$$
DELIMITER ;

drop procedure sp_nuevo_usuario


DELIMITER $$
ALTER PROCEDURE SP_NUEVO_USUARIO(IN nombre VARCHAR(50), IN correo VARCHAR(50),IN contrasenya VARCHAR(100),
 IN genero VARCHAR(50), IN usr_registro VARCHAR(50))

BEGIN
DECLARE id_persona INT;
DECLARE `_rollback` BOOL DEFAULT 0;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;


START TRANSACTION;
INSERT INTO persona (nombre,estado,genero,fech_registro,usr_registro)
			VALUES(nombre,1,genero,current_date(),usr_registro);

SET id_persona = (SELECT MAX(id_persona) FROM PERSONA);
select id_persona;

INSERT INTO usuario (id_persona, correo,contrasenya,estado,fech_registro, usr_registro)
			VALUES(id_persona, correo,contrasenya,1,current_date(),usr_registro);
IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE SP_NUEVO_INDICADOR(in_nombre_indicador varchar(50), in_us varchar(50))
BEGIN
START TRANSACTION;
INSERT INTO INDICADOR (nombre_indicador,estado,fech_registro,usr_registro)
		Values(in_nombre_indicador,1,current_date(), in_us);
        END$$
        DELIMITER ;
        
        CALL SP_NUEVO_INDICADOR('P01','ymunoz@.com');
        select * from indicador
        select * from dato_indicador
        
        drop procedure sp_dato_indicador
        
        
DELIMITER $$        
CREATE PROCEDURE SP_DATO_INDICADOR( in id_indicador int,in descripcion  varchar(255),
in total numeric, in fecha date ,in us varchar(50)
)
BEGIN

DECLARE `_rollback` BOOL DEFAULT 0;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
START TRANSACTION;



INSERT INTO dato_indicador (id_indicador,descripcion,total,fecha,fech_registro,usr_registro)
		Values(id_indicador,descripcion,total,fecha,current_date(), us);
       IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END$$
DELIMITER ;

DELIMITER $$        
CREATE PROCEDURE SP_ELIMINAR_INDICADOR(in id int
)
BEGIN
DECLARE `_rollback` BOOL DEFAULT 0;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
START TRANSACTION;
delete from dato_indicador where  id_indicador = id;
delete from indicador where id_indicador = id;

       IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END$$
DELIMITER ;

DELIMITER $$        
CREATE PROCEDURE SP_EDITAR_INDICADOR(in id int, in nombre varchar(50)
)
BEGIN
DECLARE `_rollback` BOOL DEFAULT 0;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
START TRANSACTION;
UPDATE INDICADOR SET nombre_indicador=nombre where id_indicador = id ;


       IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END$$
DELIMITER ;

DELIMITER $$        
CREATE PROCEDURE SP_SELECT_INDICADOR(in id int)
BEGIN

SELECT * FROM indicador WHERE id_indicador = case when id=0 then id_indicador
else id end ;


END$$
DELIMITER ;

DELIMITER $$        
CREATE PROCEDURE SP_EDITAR_DATO_INDICADOR(in id int, in descripcion varchar(255), in total numeric, in fecha date)

BEGIN
DECLARE `_rollback` BOOL DEFAULT 0;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
START TRANSACTION;
UPDATE dato_indicador SET descripcion = descripcion, total = total, fecha = fecha where id_dato = id ;


       IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END$$
DELIMITER ;


DELIMITER $$        
CREATE PROCEDURE SP_SELECT_DATO_INDICADOR(in id int)

BEGIN
SELECT * FROM DATO_INDICADOR where id_indicador = 9;

END$$
DELIMITER ;










