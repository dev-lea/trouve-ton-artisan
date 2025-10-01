-- server/db/seed.sql
USE trouve_ton_artisan;

INSERT INTO categories (name) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

INSERT INTO specialities (name, category_id) VALUES
('Boucher', 1),
('Boulanger', 1),
('Chocolatier', 1),
('Traiteur', 1),
('Chauffagiste', 2),
('Electricien', 2),
('Menuisier', 2),
('Plombier', 2),
('Bijoutier', 3),
('Couturier', 3),
('Ferronier', 3),
('Coiffeur', 4),
('Fleuriste', 4),
('Toiletteur', 4),
('Webdesign', 4);

INSERT INTO artisans
(name, rating, about, email, website, photo, city, department, speciality_id, is_top)
VALUES
('Boucherie Dumont', 4.5,
 'Boucherie de quartier réputée pour ses viandes françaises et ses conseils de cuisson.',
 'boucherie.dumond@gmail.com', NULL, 'photo-artisan.png', 'Lyon', 'Rhône', 1, 0),

('Au pain chaud', 4.8,
 'Boulangerie artisanale : pains au levain et viennoiseries pur beurre, cuits sur pierre.',
 'aupainchaud@hotmail.com', NULL, 'photo-artisan.png', 'Montélimar', 'Drôme', 2, 1),

('Chocolaterie Labbé', 4.9,
 'Chocolats fins fabriqués à la main, ganaches de saison et tablettes grands crus.',
 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 'photo-artisan.png', 'Lyon', 'Rhône', 3, 1),

('Traiteur Truchon', 4.1,
 'Traiteur événementiel : menus sur mesure pour réceptions privées et professionnelles.',
 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 'photo-artisan.png', 'Lyon', 'Rhône', 4, 0),

('Orville Salmons', 5.0,
 'Chauffagiste certifié : installation et entretien de chaudières et pompes à chaleur.',
 'o-salmons@live.com', NULL, 'photo-artisan.png', 'Evian', 'Haute-Savoie', 5, 1),

('Julien Durand', 4.7,
 'Électricien polyvalent : rénovation, mise aux normes et dépannage rapide.',
 'julien.durand@live.fr', NULL, 'photo-artisan.png', 'Annecy', 'Haute-Savoie', 6, 0),

('Atelier Bois & Co', 4.4,
 'Menuiserie sur mesure : agencements intérieurs, meubles et menuiseries extérieures.',
 'atelierbois@orange.fr', NULL, 'photo-artisan.png', 'Chambéry', 'Savoie', 7, 0),

('Plomberie Martin', 4.6,
 'Plomberie et salles de bain complètes : installation, dépannage et urgences 7j/7.',
 'plomb.martin@gmail.com', NULL, 'photo-artisan.png', 'Saint-Priest', 'Rhône', 8, 0),

('Bijouterie Orfèvre', 4.9,
 'Créations et réparations de bijoux, sertissage de pierres et pièces uniques.',
 'contact@bijouterie-orf.fr', 'https://bijouterie-orf.fr', 'photo-artisan.png', 'Valence', 'Drôme', 9, 1),

('Maison Couture', 4.3,
 'Atelier de retouches et créations : robes, costumes et textile sur mesure.',
 'contact@maison-couture.fr', NULL, 'photo-artisan.png', 'Romans-sur-Isère', 'Drôme', 10, 0),

('Forge & Tradition', 4.2,
 'Ferronnerie d’art : rampes, portails, mobilier métal et restauration.',
 'forge.tradition@gmail.com', NULL, 'photo-artisan.png', 'Annonay', 'Ardèche', 11, 0),

('Coiffure Élégance', 4.8,
 'Salon mixte : coupes, colorations végétales et conseils morpho.',
 'contact@coiffure-elegance.fr', NULL, 'photo-artisan.png', 'Bourg-en-bresse', 'Ain', 12, 1),

('Fleuriste des Alpes', 4.6,
 'Bouquets de saison, compositions événementielles et abonnements floraux.',
 'fleurs-alpes@gmail.com', NULL, 'photo-artisan.png', 'Chamonix', 'Haute-Savoie', 13, 0),

('Toutou Chic', 4.9,
 'Toilettage canin tout gabarit, bien-être animal et soins adaptés.',
 'toutouchic@gmail.com', NULL, 'photo-artisan.png', 'Aix-les-bains', 'Savoie', 14, 1),

('Studio Webly', 4.7,
 'Studio web : sites vitrine, UI/UX et identité visuelle pour PME.',
 'contact@studiowebly.fr', 'https://studiowebly.fr', 'photo-artisan.png', 'Vienne', 'Isère', 15, 1),

('Charcuterie Bernard', 4.4,
 'Charcuterie artisanale : spécialités régionales et plats traiteur.',
 'charcuterie.bernard@gmail.com', NULL, 'photo-artisan.png', 'Saint-Priest', 'Rhône', 1, 0),

('Boulangerie Puy-en-Velay', 4.5,
 'Boulangerie de tradition : farines locales et pétrissage lent.',
 'boulangerie.puy@outlook.fr', NULL, 'photo-artisan.png', 'Le Puy-en-Velay', 'Haute-Loire', 2, 0);
