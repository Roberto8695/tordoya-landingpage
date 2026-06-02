export interface Servicio {
  id: string;
  nombre: string;
}

export interface Especialidad {
  id: string;
  nombre: string;
  icon: string;
  color: string;
  imagen: string;
  servicios: Servicio[];
}

export const especialidades: Especialidad[] = [
  {
    id: "abdominal",
    nombre: "Abdominal",
    icon: "HiOutlineViewList",
    color: "primary",
    imagen: "/image/especialidades/ABDOMINAL.webp",
    servicios: [
      { id: "abd-1", nombre: "Ecografía abdominal completa" },
      { id: "abd-2", nombre: "Ecografía hepática y Vías Biliares" },
      { id: "abd-3", nombre: "Ecografía de vesícula y vías biliares" },
      { id: "abd-4", nombre: "Ecografía de páncreas" },
      { id: "abd-5", nombre: "Ecografía de bazo" },
      { id: "abd-6", nombre: "Ecografia abdominopelvico" },
    ],
  },
  {
    id: "ginecologica",
    nombre: "Ginecológica",
    icon: "HiOutlineHeart",
    color: "secondary",
    imagen: "/image/especialidades/GINECOLÓGICA.webp",
    servicios: [
      { id: "gin-1", nombre: "Ecografía pélvica o ginecológica" },
      { id: "gin-2", nombre: "Ecografía transvaginal" },
      { id: "gin-3", nombre: "Monitoreo ó seguimiento folicular" },
    ],
  },
  {
    id: "obstetricia",
    nombre: "Obstétrica",
    icon: "HiOutlineArrowUp",
    color: "accent",
    imagen: "/image/especialidades/OBSTÉTRICA.webp",
    servicios: [
      { id: "obs-1", nombre: "Obstétrico Biometría fetal (tradicional)" },
      { id: "obs-2", nombre: "Obstétrica cromosómica ó estructural I trimestre" },
      { id: "obs-3", nombre: "Obstétrica estructural del 2do y 3er trimestre" },
      { id: "obs-4", nombre: "Obstétrico Gemelar" },
      { id: "obs-5", nombre: "Obstétrica 3D Y 4D" },
      { id: "obs-6", nombre: "Perfil biofísico fetal" },
      { id: "obs-7", nombre: "Doppler obstétrico" },
    ],
  },
  {
    id: "urologica",
    nombre: "Urológica",
    icon: "HiOutlineBeaker",
    color: "primary",
    imagen: "/image/especialidades/UROLÓGICA.webp",
    servicios: [
      { id: "uro-1", nombre: "Ecografía renal bilateral" },
      { id: "uro-2", nombre: "Ecografía vesical, vías urinarias transabdominal" },
      { id: "uro-3", nombre: "Ecografía prostática suprapúbica" },
      { id: "uro-4", nombre: "Ecografía prostática transrectal" },
      { id: "uro-5", nombre: "Ecografia testicular" },
    ],
  },
  {
    id: "partes-blandas",
    nombre: "Partes Blandas",
    icon: "HiOutlineShieldExclamation",
    color: "secondary",
    imagen: "/image/especialidades/PARTES_BLANDAS.webp",
    servicios: [
      { id: "pb-1", nombre: "Ecografía de tiroides" },
      { id: "pb-2", nombre: "Ecografía mamaria" },
      { id: "pb-3", nombre: "Ecografía de partes blandas localizada" },
      { id: "pb-4", nombre: "Ecografía de pared Abdominal e inguinal (hernias)" },
      { id: "pb-5", nombre: "Ecografía ganglionar" },
    ],
  },
  {
    id: "doppler",
    nombre: "Doppler",
    icon: "HiOutlineTrendingUp",
    color: "accent",
    imagen: "/image/especialidades/DOPPLER.webp",
    servicios: [
      { id: "dop-1", nombre: "Doppler carotídeo y/o vertebrales" },
      { id: "dop-2", nombre: "Doppler arterial miembros inferiores" },
      { id: "dop-3", nombre: "Doppler venoso miembros inferiores" },
      { id: "dop-4", nombre: "Doppler arterial miembros superiores" },
      { id: "dop-5", nombre: "Doppler venoso miembros superiores" },
      { id: "dop-6", nombre: "Doppler testicular" },
      { id: "dop-7", nombre: "Doppler hepatoportal" },
      { id: "dop-8", nombre: "Doppler tiroideo" },
      { id: "dop-9", nombre: "Doppler pelvico ginecológico" },
      { id: "dop-10", nombre: "Doppler renal" },
    ],
  },
  {
    id: "musculoesquetica",
    nombre: "Musculoesquelética",
    icon: "HiOutlineArchive",
    color: "primary",
    imagen: "/image/especialidades/MUSCULOESQUELÉTICA.webp",
    servicios: [
      { id: "msk-1", nombre: "Ecografía MSK hombro" },
      { id: "msk-2", nombre: "Ecografía MSK rodilla" },
      { id: "msk-3", nombre: "Ecografía MSK codo" },
      { id: "msk-4", nombre: "Ecografía MSK tobillo" },
      { id: "msk-5", nombre: "Ecografía MSK muñeca" },
    ],
  },
  {
    id: "emergencias",
    nombre: "Emergencias",
    icon: "HiOutlineExclamation",
    color: "secondary",
    imagen: "/image/especialidades/EMERGENCIAS.webp",
    servicios: [
      { id: "emg-1", nombre: "Abdomen agudo (apendicitis, colecistitis, pancreatitis aguda, peritonitis)" },
    ],
  },
  {
    id: "otros",
    nombre: "Otros",
    icon: "HiOutlineInformationCircle",
    color: "accent",
    imagen: "/image/especialidades/OTROS.webp",
    servicios: [
      { id: "oth-1", nombre: "Colposcopia" },
      { id: "oth-2", nombre: "Citología Cervico vaginal (Papanicolau, PAP)" },
    ],
  },
];
