
CREATE TABLE Race (
                      id SERIAL PRIMARY KEY,
                      nom VARCHAR(100) NOT NULL,
                      description TEXT
);


CREATE TABLE Unité (
                       id SERIAL PRIMARY KEY,
                       nom VARCHAR(100) NOT NULL,
                       description TEXT,
                       race_id INT,
                       img_url VARCHAR(255),
                       FOREIGN KEY (race_id) REFERENCES Race(id) ON DELETE SET NULL
);


CREATE TABLE Batiment (
                          id SERIAL PRIMARY KEY,
                          nom VARCHAR(100) NOT NULL,
                          description TEXT,
                          race_id INT,
                          img_url VARCHAR(255),
                          FOREIGN KEY (race_id) REFERENCES Race(id) ON DELETE CASCADE
);


CREATE TABLE Batiment_Unité (
                                batiment_id INT NOT NULL,
                                unité_id INT NOT NULL,
                                FOREIGN KEY (batiment_id) REFERENCES Batiment(id) ON DELETE CASCADE,
                                FOREIGN KEY (unité_id) REFERENCES Unité(id) ON DELETE CASCADE,
                                PRIMARY KEY (batiment_id, unité_id)
);


CREATE TABLE Amélioration_Batiment (
                                       id SERIAL PRIMARY KEY,
                                       nom VARCHAR(100) NOT NULL,
                                       description TEXT,
                                       coût_minerai INT NOT NULL,
                                       coût_gaz INT NOT NULL,
                                       temps_de_recherche INT NOT NULL,
                                       type VARCHAR(50) DEFAULT NULL,
                                       img_url VARCHAR(255)
);


CREATE TABLE Batiment_Amélioration (
                                       batiment_id INT NOT NULL,
                                       amélioration_batiment_id INT NOT NULL,
                                       FOREIGN KEY (batiment_id) REFERENCES Batiment(id) ON DELETE CASCADE,
                                       FOREIGN KEY (amélioration_batiment_id) REFERENCES Amélioration_Batiment(id) ON DELETE CASCADE,
                                       PRIMARY KEY (batiment_id, amélioration_batiment_id)
);


CREATE TABLE Amélioration_Unité (
                                    id SERIAL PRIMARY KEY,
                                    nom VARCHAR(100) NOT NULL,
                                    description TEXT,
                                    coût_minerai INT NOT NULL,
                                    coût_gaz INT NOT NULL,
                                    type VARCHAR(50) DEFAULT NULL,
                                    img_url VARCHAR(255)
);


CREATE TABLE Unité_Amélioration (
                                    unité_id INT NOT NULL,
                                    amélioration_unité_id INT NOT NULL,
                                    FOREIGN KEY (unité_id) REFERENCES Unité(id) ON DELETE CASCADE,
                                    FOREIGN KEY (amélioration_unité_id) REFERENCES Amélioration_Unité(id) ON DELETE CASCADE,
                                    PRIMARY KEY (unité_id, amélioration_unité_id)
);

CREATE TABLE Unité_Sort_Buff (
                                 id SERIAL PRIMARY KEY,
                                 unité_id INT NOT NULL,
                                 nom VARCHAR(100) NOT NULL,
                                 description TEXT,
                                 type VARCHAR(50) DEFAULT NULL,
                                 FOREIGN KEY (unité_id) REFERENCES Unité(id) ON DELETE CASCADE
);


CREATE TABLE Counter (
                         id SERIAL PRIMARY KEY,
                         nom VARCHAR(100) NOT NULL,
                         description TEXT
);


CREATE TABLE Counter_Unité (
                               unité_id INT NOT NULL,
                               counter_id INT NOT NULL,
                               FOREIGN KEY (unité_id) REFERENCES Unité(id) ON DELETE CASCADE,
                               FOREIGN KEY (counter_id) REFERENCES Counter(id) ON DELETE CASCADE,
                               PRIMARY KEY (unité_id, counter_id)
);


CREATE TABLE Utilisateur (
                             id SERIAL PRIMARY KEY,
                             username VARCHAR(100) NOT NULL,
                             mot_de_passe VARCHAR(100) NOT NULL,
                             email VARCHAR(100) NOT NULL,
                             date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO Race (nom, description) VALUES
                                        ('Terran', 'Une race humaine avec une technologie avancée.'),
                                        ('Protoss', 'Une race avancée avec des capacités psioniques.'),
                                        ('Zerg', 'Une race insectoïde, caractérisée par une prolifération rapide.');

