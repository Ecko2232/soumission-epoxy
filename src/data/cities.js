export const cities = [
  // Grand Montréal
  {
    slug: 'montreal', name: 'Montréal', region: 'Grand Montréal', regionGroup: 'grand-montreal',
    population: '2M+',
    intro: 'Montréal est le plus grand marché époxy au Québec. Que ce soit dans Rosemont, Plateau-Mont-Royal, Saint-Laurent ou Verdun, nos poseurs interviennent partout sur l\'île pour les garages, sous-sols finis et espaces commerciaux.',
    services: ['Garage résidentiel', 'Sous-sol fini', 'Local commercial', 'Entrepôt industriel'],
    nearby: ['Laval', 'Longueuil', 'Brossard'],
    keywords: ['poseur époxy Montréal', 'époxy garage Montréal', 'plancher époxy Montréal', 'revêtement époxy Montréal'],
  },
  {
    slug: 'laval', name: 'Laval', region: 'Grand Montréal', regionGroup: 'grand-montreal',
    population: '440K+',
    intro: 'Laval est l\'une des villes où la demande en époxy résidentiel est la plus forte au Québec. Les maisons des secteurs Sainte-Dorothée, Chomedey et Vimont disposent souvent de grands garages doubles — parfaits pour un système époxy métallique ou à flocons.',
    services: ['Garage double', 'Sous-sol', 'Atelier', 'Dalle commerciale'],
    nearby: ['Montréal', 'Blainville', 'Repentigny'],
    keywords: ['poseur époxy Laval', 'époxy garage Laval', 'plancher époxy Laval', 'revêtement époxy Laval'],
  },
  {
    slug: 'longueuil', name: 'Longueuil', region: 'Grand Montréal', regionGroup: 'grand-montreal',
    population: '250K+',
    intro: 'Longueuil et ses quartiers Saint-Hubert, Greenfield Park et Boucherville sont des marchés actifs pour les revêtements époxy. La rive-sud génère une forte demande pour les garages résidentiels et les espaces commerciaux.',
    services: ['Garage résidentiel', 'Commerce', 'Sous-sol', 'Espace industriel'],
    nearby: ['Montréal', 'Brossard', 'Saint-Jean-sur-Richelieu'],
    keywords: ['poseur époxy Longueuil', 'époxy garage Longueuil', 'plancher époxy Longueuil'],
  },
  {
    slug: 'brossard', name: 'Brossard', region: 'Grand Montréal', regionGroup: 'grand-montreal',
    population: '90K+',
    intro: 'Brossard, connue pour ses maisons modernes et ses condos haut de gamme, est un marché en croissance pour les revêtements époxy de qualité. Les résidents recherchent principalement des finitions métalliques et des systèmes polyaspartique.',
    services: ['Garage résidentiel', 'Sous-sol haut de gamme', 'Dalle commerciale'],
    nearby: ['Longueuil', 'Saint-Lambert', 'Laprairie'],
    keywords: ['poseur époxy Brossard', 'époxy garage Brossard', 'plancher époxy Brossard'],
  },
  {
    slug: 'saint-jean-sur-richelieu', name: 'Saint-Jean-sur-Richelieu', region: 'Grand Montréal', regionGroup: 'grand-montreal',
    population: '100K+',
    intro: 'Saint-Jean-sur-Richelieu est une ville en expansion rapide où les nouvelles constructions et les rénovations de sous-sols alimentent une forte demande pour les revêtements époxy.',
    services: ['Garage résidentiel', 'Sous-sol', 'Commerce local', 'Atelier'],
    nearby: ['Longueuil', 'Saint-Hyacinthe', 'Granby'],
    keywords: ['poseur époxy Saint-Jean-sur-Richelieu', 'époxy garage Saint-Jean', 'plancher époxy Saint-Jean-sur-Richelieu'],
  },

  // Montérégie
  {
    slug: 'saint-hyacinthe', name: 'Saint-Hyacinthe', region: 'Montérégie', regionGroup: 'monteregie',
    population: '60K+',
    intro: 'Saint-Hyacinthe, capitale agroalimentaire du Québec, présente une forte demande en époxy industriel pour ses nombreux entrepôts et usines, en plus d\'un marché résidentiel actif.',
    services: ['Espace industriel', 'Entrepôt', 'Garage résidentiel', 'Local commercial'],
    nearby: ['Granby', 'Longueuil', 'Sorel-Tracy'],
    keywords: ['poseur époxy Saint-Hyacinthe', 'époxy Saint-Hyacinthe', 'plancher époxy Saint-Hyacinthe'],
  },
  {
    slug: 'granby', name: 'Granby', region: 'Montérégie', regionGroup: 'monteregie',
    population: '70K+',
    intro: 'Granby et la région des Cantons-de-l\'Est constituent un marché en croissance pour les revêtements époxy, tant pour les résidences que pour les commerces du centre-ville.',
    services: ['Garage résidentiel', 'Local commercial', 'Sous-sol', 'Atelier'],
    nearby: ['Sherbrooke', 'Saint-Hyacinthe', 'Magog'],
    keywords: ['poseur époxy Granby', 'époxy Granby', 'plancher époxy Granby'],
  },
  {
    slug: 'sorel-tracy', name: 'Sorel-Tracy', region: 'Montérégie', regionGroup: 'monteregie',
    population: '35K+',
    intro: 'Sorel-Tracy, avec son tissu industriel et ses quartiers résidentiels en rénovation, est un marché stable pour les applications époxy commerciales et résidentielles.',
    services: ['Garage', 'Industriel', 'Commercial', 'Sous-sol'],
    nearby: ['Saint-Hyacinthe', 'Trois-Rivières'],
    keywords: ['poseur époxy Sorel-Tracy', 'époxy Sorel', 'plancher époxy Sorel-Tracy'],
  },
  {
    slug: 'saint-bruno', name: 'Saint-Bruno-de-Montarville', region: 'Montérégie', regionGroup: 'monteregie',
    population: '30K+',
    intro: 'Saint-Bruno-de-Montarville est reconnue pour ses résidences de standing. Les propriétaires investissent dans des finitions époxy haut de gamme pour valoriser leurs garages et sous-sols.',
    services: ['Garage haut de gamme', 'Sous-sol fini', 'Système métallique'],
    nearby: ['Longueuil', 'Brossard', 'Saint-Basile-le-Grand'],
    keywords: ['poseur époxy Saint-Bruno', 'époxy Saint-Bruno', 'plancher époxy Saint-Bruno-de-Montarville'],
  },

  // Laurentides
  {
    slug: 'saint-jerome', name: 'Saint-Jérôme', region: 'Laurentides', regionGroup: 'laurentides',
    population: '80K+',
    intro: 'Saint-Jérôme, carrefour des Laurentides, voit une forte demande pour les revêtements époxy dans ses zones commerciales et industrielles, ainsi que dans les nouvelles constructions résidentielles.',
    services: ['Commerce', 'Industriel', 'Garage résidentiel', 'Sous-sol'],
    nearby: ['Blainville', 'Mirabel', 'Mont-Tremblant'],
    keywords: ['poseur époxy Saint-Jérôme', 'époxy Saint-Jérôme', 'plancher époxy Saint-Jérôme'],
  },
  {
    slug: 'blainville', name: 'Blainville', region: 'Laurentides', regionGroup: 'laurentides',
    population: '70K+',
    intro: 'Blainville est une des villes à la croissance immobilière la plus rapide au Québec. Ses nombreuses maisons neuves avec garages doubles créent une demande constante pour les systèmes époxy résidentiels.',
    services: ['Garage double neuf', 'Sous-sol', 'Système à flocons', 'Métallique'],
    nearby: ['Laval', 'Mirabel', 'Saint-Jérôme'],
    keywords: ['poseur époxy Blainville', 'époxy Blainville', 'plancher époxy Blainville'],
  },
  {
    slug: 'mirabel', name: 'Mirabel', region: 'Laurentides', regionGroup: 'laurentides',
    population: '60K+',
    intro: 'Mirabel combine zones industrielles importantes et secteurs résidentiels en expansion. Une combinaison idéale pour le marché époxy, tant pour les grandes surfaces industrielles que les garages résidentiels.',
    services: ['Industriel', 'Entrepôt', 'Garage résidentiel', 'Local commercial'],
    nearby: ['Blainville', 'Saint-Jérôme', 'Laval'],
    keywords: ['poseur époxy Mirabel', 'époxy Mirabel', 'plancher époxy Mirabel'],
  },
  {
    slug: 'mont-tremblant', name: 'Mont-Tremblant', region: 'Laurentides', regionGroup: 'laurentides',
    population: '10K+',
    intro: 'Mont-Tremblant attire des propriétaires de chalets et résidences secondaires haut de gamme. Les finitions époxy métalliques et polyaspartiques sont particulièrement populaires pour les garages de chalet et les espaces de villégiature.',
    services: ['Chalet haut de gamme', 'Garage résidentiel', 'Métallique', 'Polyaspartique'],
    nearby: ['Saint-Jérôme', 'Sainte-Agathe-des-Monts'],
    keywords: ['poseur époxy Mont-Tremblant', 'époxy Mont-Tremblant', 'plancher époxy Mont-Tremblant'],
  },

  // Région de Québec
  {
    slug: 'quebec', name: 'Québec', region: 'Région de Québec', regionGroup: 'quebec-ville',
    population: '800K+',
    intro: 'Québec est le deuxième plus grand marché époxy au Québec. De Sainte-Foy à Charlesbourg, en passant par Beauport et Limoilou, nos poseurs couvrent l\'ensemble de la région pour tous types de projets résidentiels, commerciaux et industriels.',
    services: ['Garage résidentiel', 'Local commercial', 'Industriel', 'Sous-sol'],
    nearby: ['Lévis', 'Saint-Augustin-de-Desmaures'],
    keywords: ['poseur époxy Québec', 'époxy garage Québec', 'plancher époxy Québec', 'revêtement époxy Québec'],
  },
  {
    slug: 'levis', name: 'Lévis', region: 'Région de Québec', regionGroup: 'quebec-ville',
    population: '150K+',
    intro: 'Lévis, sur la rive-sud de Québec, est une ville en pleine expansion avec de nombreux projets résidentiels neufs. Les propriétaires de Saint-Romuald, Charny et Sainte-Marie investissent massivement dans les revêtements époxy pour leurs garages.',
    services: ['Garage neuf', 'Sous-sol', 'Commerce', 'Atelier mécanique'],
    nearby: ['Québec', 'Saint-Jean-Chrysostome'],
    keywords: ['poseur époxy Lévis', 'époxy Lévis', 'plancher époxy Lévis'],
  },
  {
    slug: 'saint-augustin', name: 'Saint-Augustin-de-Desmaures', region: 'Région de Québec', regionGroup: 'quebec-ville',
    population: '20K+',
    intro: 'Saint-Augustin-de-Desmaures est un secteur résidentiel haut de gamme de la région de Québec. Ses grandes propriétés avec garages doubles et triples représentent un marché cible pour les systèmes époxy premium.',
    services: ['Garage triple', 'Sous-sol haut de gamme', 'Métallique premium'],
    nearby: ['Québec', 'Lévis'],
    keywords: ['poseur époxy Saint-Augustin', 'époxy Saint-Augustin-de-Desmaures'],
  },

  // Outaouais
  {
    slug: 'gatineau', name: 'Gatineau', region: 'Outaouais', regionGroup: 'outaouais',
    population: '290K+',
    intro: 'Gatineau, ville frontalière avec Ottawa, est un marché bilingue dynamique pour les revêtements époxy. Les secteurs Hull, Aylmer et Gatineau-centre présentent une forte demande résidentielle et commerciale.',
    services: ['Garage résidentiel', 'Local commercial', 'Sous-sol', 'Industriel'],
    nearby: ['Aylmer', 'Ottawa (Ontario)'],
    keywords: ['poseur époxy Gatineau', 'époxy Gatineau', 'plancher époxy Gatineau', 'revêtement époxy Gatineau'],
  },
  {
    slug: 'aylmer', name: 'Aylmer', region: 'Outaouais', regionGroup: 'outaouais',
    population: '45K+',
    intro: 'Aylmer est le secteur résidentiel le plus huppé de Gatineau. Ses maisons de style anglais et ses grandes propriétés représentent un marché idéal pour les finitions époxy haut de gamme.',
    services: ['Garage haut de gamme', 'Sous-sol fini', 'Système métallique'],
    nearby: ['Gatineau', 'Ottawa'],
    keywords: ['poseur époxy Aylmer', 'époxy Aylmer', 'plancher époxy Aylmer'],
  },

  // Estrie
  {
    slug: 'sherbrooke', name: 'Sherbrooke', region: 'Estrie', regionGroup: 'estrie',
    population: '170K+',
    intro: 'Sherbrooke est la métropole de l\'Estrie. Son dynamisme économique et sa population étudiante importante génèrent une demande variée en époxy — des garages résidentiels aux locaux commerciaux du centre-ville.',
    services: ['Garage résidentiel', 'Local commercial', 'Industriel', 'Université et institutions'],
    nearby: ['Magog', 'Granby'],
    keywords: ['poseur époxy Sherbrooke', 'époxy Sherbrooke', 'plancher époxy Sherbrooke', 'revêtement époxy Sherbrooke'],
  },
  {
    slug: 'magog', name: 'Magog', region: 'Estrie', regionGroup: 'estrie',
    population: '30K+',
    intro: 'Magog, au bord du lac Memphrémagog, attire de nombreux propriétaires de résidences secondaires. Les chalets et maisons de villégiature de la région demandent des finitions époxy durables et esthétiques.',
    services: ['Chalet', 'Résidence secondaire', 'Garage résidentiel', 'Métallique'],
    nearby: ['Sherbrooke', 'Granby'],
    keywords: ['poseur époxy Magog', 'époxy Magog', 'plancher époxy Magog'],
  },

  // Mauricie
  {
    slug: 'trois-rivieres', name: 'Trois-Rivières', region: 'Mauricie', regionGroup: 'mauricie',
    population: '140K+',
    intro: 'Trois-Rivières, entre Montréal et Québec, est un marché industriel et résidentiel important pour les revêtements époxy. Son parc industriel actif génère une demande constante pour les grandes surfaces.',
    services: ['Industriel', 'Entrepôt', 'Garage résidentiel', 'Commerce'],
    nearby: ['Shawinigan', 'Drummondville'],
    keywords: ['poseur époxy Trois-Rivières', 'époxy Trois-Rivières', 'plancher époxy Trois-Rivières'],
  },
  {
    slug: 'shawinigan', name: 'Shawinigan', region: 'Mauricie', regionGroup: 'mauricie',
    population: '50K+',
    intro: 'Shawinigan vit une renaissance économique qui stimule les projets de rénovation résidentielle et commerciale. Un marché en croissance pour les revêtements époxy à prix compétitifs.',
    services: ['Garage résidentiel', 'Commerce', 'Industriel', 'Sous-sol'],
    nearby: ['Trois-Rivières', 'La Tuque'],
    keywords: ['poseur époxy Shawinigan', 'époxy Shawinigan', 'plancher époxy Shawinigan'],
  },

  // Lanaudière
  {
    slug: 'joliette', name: 'Joliette', region: 'Lanaudière', regionGroup: 'lanaudiere',
    population: '50K+',
    intro: 'Joliette est le centre urbain de Lanaudière. Sa zone commerciale et ses quartiers résidentiels en développement créent une demande régulière pour les applications époxy.',
    services: ['Commerce', 'Garage résidentiel', 'Sous-sol', 'Atelier'],
    nearby: ['Repentigny', 'Laval', 'Trois-Rivières'],
    keywords: ['poseur époxy Joliette', 'époxy Joliette', 'plancher époxy Joliette'],
  },
  {
    slug: 'repentigny', name: 'Repentigny', region: 'Lanaudière', regionGroup: 'lanaudiere',
    population: '90K+',
    intro: 'Repentigny, aux portes de Montréal, connaît une croissance immobilière soutenue. Ses nombreuses maisons unifamiliales avec garages représentent un marché idéal pour les systèmes époxy résidentiels.',
    services: ['Garage résidentiel', 'Sous-sol', 'Système à flocons', 'Commercial'],
    nearby: ['Laval', 'Joliette', 'Montréal'],
    keywords: ['poseur époxy Repentigny', 'époxy Repentigny', 'plancher époxy Repentigny'],
  },
]

export const regionGroups = [
  { id: 'all',           label: 'Toutes les régions' },
  { id: 'grand-montreal',label: 'Grand Montréal' },
  { id: 'monteregie',    label: 'Montérégie' },
  { id: 'laurentides',   label: 'Laurentides' },
  { id: 'quebec-ville',  label: 'Région de Québec' },
  { id: 'outaouais',     label: 'Outaouais' },
  { id: 'estrie',        label: 'Estrie' },
  { id: 'mauricie',      label: 'Mauricie' },
  { id: 'lanaudiere',    label: 'Lanaudière' },
]
