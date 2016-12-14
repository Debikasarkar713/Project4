DROP TABLE IF EXISTS boys CASCADE;
DROP TABLE IF EXISTS  girls CASCADE;
DROP TABLE IF EXISTS countries CASCADE;

BEGIN;


CREATE TABLE boys (
country VARCHAR NOT NULL,
code VARCHAR,
year_1990 VARCHAR,
year_2000 VARCHAR,
year_2010 VARCHAR,
year_2012 VARCHAR,
year_2013 VARCHAR,
year_2014 VARCHAR
);

CREATE TABLE girls (
country VARCHAR NOT NULL,
code VARCHAR,
year_1990 VARCHAR,
year_2000 VARCHAR,
year_2010 VARCHAR,
year_2012 VARCHAR,
year_2013 VARCHAR,
year_2014 VARCHAR
);


CREATE TABLE countries(
country VARCHAR NOT NULL,
latitude VARCHAR,
longitude VARCHAR,
name VARCHAR NOT NULL
);
COMMIT;

COPY boys (country, code, year_1990, year_2000, year_2010,  year_2012, year_2013, year_2014) FROM '/Users/debikasarkar/code/wdi/project4/girlsEd/db/primarymale.csv' DELIMITER ',' CSV;
COPY girls (country, code, year_1990, year_2000, year_2010,  year_2012, year_2013, year_2014) FROM '/Users/debikasarkar/code/wdi/project4/girlsEd/db/primaryfemale.csv' DELIMITER ',' CSV;
COPY countries (country, latitude, longitude, name) FROM '/Users/debikasarkar/code/wdi/project4/girlsEd/db/countries.csv' DELIMITER ',' CSV;
