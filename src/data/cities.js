export const cities = [
  // Grand Montréal
  { slug: 'montreal', name: 'Montréal', region: 'Grand Montréal', regionGroup: 'grand-montreal', keywords: ['époxy garage Montréal', 'plancher époxy Montréal', 'pose époxy Montréal'], population: '2M+' },
  { slug: 'laval', name: 'Laval', region: 'Grand Montréal', regionGroup: 'grand-montreal', keywords: ['époxy Laval', 'plancher époxy Laval', 'garage époxy Laval'], population: '440K+' },
  { slug: 'longueuil', name: 'Longueuil', region: 'Grand Montréal', regionGroup: 'grand-montreal', keywords: ['époxy Longueuil', 'plancher époxy Longueuil'], population: '250K+' },
  { slug: 'saint-jean-sur-richelieu', name: 'Saint-Jean-sur-Richelieu', region: 'Grand Montréal', regionGroup: 'grand-montreal', keywords: ['époxy Saint-Jean-sur-Richelieu', 'plancher époxy Saint-Jean'], population: '100K+' },
  { slug: 'brossard', name: 'Brossard', region: 'Grand Montréal', regionGroup: 'grand-montreal', keywords: ['époxy Brossard', 'plancher époxy Brossard'], population: '90K+' },

  // Montérégie
  { slug: 'saint-hyacinthe', name: 'Saint-Hyacinthe', region: 'Montérégie', regionGroup: 'monteregie', keywords: ['époxy Saint-Hyacinthe', 'plancher époxy Saint-Hyacinthe'], population: '60K+' },
  { slug: 'granby', name: 'Granby', region: 'Montérégie', regionGroup: 'monteregie', keywords: ['époxy Granby', 'plancher époxy Granby'], population: '70K+' },
  { slug: 'sorel-tracy', name: 'Sorel-Tracy', region: 'Montérégie', regionGroup: 'monteregie', keywords: ['époxy Sorel-Tracy', 'plancher époxy Sorel'], population: '35K+' },
  { slug: 'saint-bruno', name: 'Saint-Bruno-de-Montarville', region: 'Montérégie', regionGroup: 'monteregie', keywords: ['époxy Saint-Bruno', 'plancher époxy Saint-Bruno'], population: '30K+' },

  // Laurentides
  { slug: 'saint-jerome', name: 'Saint-Jérôme', region: 'Laurentides', regionGroup: 'laurentides', keywords: ['époxy Saint-Jérôme', 'plancher époxy Saint-Jérôme'], population: '80K+' },
  { slug: 'blainville', name: 'Blainville', region: 'Laurentides', regionGroup: 'laurentides', keywords: ['époxy Blainville', 'plancher époxy Blainville'], population: '70K+' },
  { slug: 'mirabel', name: 'Mirabel', region: 'Laurentides', regionGroup: 'laurentides', keywords: ['époxy Mirabel', 'plancher époxy Mirabel'], population: '60K+' },
  { slug: 'mont-tremblant', name: 'Mont-Tremblant', region: 'Laurentides', regionGroup: 'laurentides', keywords: ['époxy Mont-Tremblant', 'plancher époxy Mont-Tremblant'], population: '10K+' },

  // Québec (ville)
  { slug: 'quebec', name: 'Québec', region: 'Région de Québec', regionGroup: 'quebec-ville', keywords: ['époxy garage Québec', 'plancher époxy Québec', 'pose époxy Québec'], population: '800K+' },
  { slug: 'levis', name: 'Lévis', region: 'Région de Québec', regionGroup: 'quebec-ville', keywords: ['époxy Lévis', 'plancher époxy Lévis'], population: '150K+' },
  { slug: 'saint-augustin', name: 'Saint-Augustin-de-Desmaures', region: 'Région de Québec', regionGroup: 'quebec-ville', keywords: ['époxy Saint-Augustin', 'plancher époxy Saint-Augustin'], population: '20K+' },

  // Outaouais
  { slug: 'gatineau', name: 'Gatineau', region: 'Outaouais', regionGroup: 'outaouais', keywords: ['époxy Gatineau', 'plancher époxy Gatineau', 'garage époxy Gatineau'], population: '290K+' },
  { slug: 'aylmer', name: 'Aylmer', region: 'Outaouais', regionGroup: 'outaouais', keywords: ['époxy Aylmer', 'plancher époxy Aylmer'], population: '45K+' },

  // Estrie
  { slug: 'sherbrooke', name: 'Sherbrooke', region: 'Estrie', regionGroup: 'estrie', keywords: ['époxy Sherbrooke', 'plancher époxy Sherbrooke', 'garage époxy Sherbrooke'], population: '170K+' },
  { slug: 'magog', name: 'Magog', region: 'Estrie', regionGroup: 'estrie', keywords: ['époxy Magog', 'plancher époxy Magog'], population: '30K+' },

  // Mauricie
  { slug: 'trois-rivieres', name: 'Trois-Rivières', region: 'Mauricie', regionGroup: 'mauricie', keywords: ['époxy Trois-Rivières', 'plancher époxy Trois-Rivières'], population: '140K+' },
  { slug: 'shawinigan', name: 'Shawinigan', region: 'Mauricie', regionGroup: 'mauricie', keywords: ['époxy Shawinigan', 'plancher époxy Shawinigan'], population: '50K+' },

  // Lanaudière
  { slug: 'joliette', name: 'Joliette', region: 'Lanaudière', regionGroup: 'lanaudiere', keywords: ['époxy Joliette', 'plancher époxy Joliette'], population: '50K+' },
  { slug: 'repentigny', name: 'Repentigny', region: 'Lanaudière', regionGroup: 'lanaudiere', keywords: ['époxy Repentigny', 'plancher époxy Repentigny'], population: '90K+' },
]

export const regionGroups = [
  { id: 'all', label: 'Toutes les régions' },
  { id: 'grand-montreal', label: 'Grand Montréal' },
  { id: 'monteregie', label: 'Montérégie' },
  { id: 'laurentides', label: 'Laurentides' },
  { id: 'quebec-ville', label: 'Région de Québec' },
  { id: 'outaouais', label: 'Outaouais' },
  { id: 'estrie', label: 'Estrie' },
  { id: 'mauricie', label: 'Mauricie' },
  { id: 'lanaudiere', label: 'Lanaudière' },
]
