DROP TABLE importance;
DROP TABLE location;

CREATE TABLE importance (
	importance_id integer PRIMARY KEY,
	importance_name varchar(30)
);
 
 INSERT INTO importance ("importance_name") VALUES ("Very important locations (example: Wonders of the world, etc...)");
 INSERT INTO importance ("importance_name") VALUES ("Important locations (example: ancient cities, biggest mountains, lakes, seas, etc...)");
 INSERT INTO importance ("importance_name") VALUES ("Less important locations (example: geysers, volcanoes, towers, bridges, etc...)");
 INSERT INTO importance ("importance_name") VALUES ("Local importance (example: airports, hotels, restaurants, etc...)");
 INSERT INTO importance ("importance_name") VALUES ("Not important locations (example: Shops, malls, gas stations)");
 
CREATE TABLE location (
	location_id integer PRIMARY KEY,
	latitude integer,
	longitude integer,
	location_name varchar(50),
	importance integer,
	create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (importance) REFERENCES importance (importance_id)
);


CREATE TABLE attachment(
	attachment_id integer PRIMARY KEY,
	attachment_fileName varchar(200),
	attachment_name varchar(50),
	attachment_year integer,
	attachment_type varchar(50),
	attachment_description varchar,
	attachment_link varchar(200),
	create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	location_id integer,
	FOREIGN KEY (location_id) REFERENCES location (location_id)
);
