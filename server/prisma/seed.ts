import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set. Check your .env file.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.servicio.deleteMany();
  await prisma.especialidad.deleteMany();

  const especialidades = [
    {
      slug: 'abdominal',
      nombre: 'Abdominal',
      icon: 'HiOutlineViewList',
      color: 'primary',
      imagen: '/image/especialidades/ABDOMINAL.webp',
      orden: 1,
      servicios: [
        { slug: 'eco-abdominal-completa', nombre: 'Ecografía abdominal completa', orden: 1 },
        { slug: 'eco-hepatica-vias-biliares', nombre: 'Ecografía hepática y Vías Biliares', orden: 2 },
        { slug: 'eco-vesicula-vias-biliares', nombre: 'Ecografía de vesícula y vías biliares', orden: 3 },
        { slug: 'eco-pancreas', nombre: 'Ecografía de páncreas', orden: 4 },
        { slug: 'eco-bazo', nombre: 'Ecografía de bazo', orden: 5 },
        { slug: 'eco-abdominopelvico', nombre: 'Ecografía abdominopelvico', orden: 6 },
      ],
    },
    {
      slug: 'ginecologica',
      nombre: 'Ginecológica',
      icon: 'HiOutlineHeart',
      color: 'secondary',
      imagen: '/image/especialidades/GINECOLÓGICA.webp',
      orden: 2,
      servicios: [
        { slug: 'eco-pelvica-ginecologica', nombre: 'Ecografía pélvica o ginecológica', orden: 1 },
        { slug: 'eco-transvaginal', nombre: 'Ecografía transvaginal', orden: 2 },
        { slug: 'monitoreo-folicular', nombre: 'Monitoreo ó seguimiento folicular', orden: 3 },
      ],
    },
    {
      slug: 'obstetrica',
      nombre: 'Obstétrica',
      icon: 'HiOutlineArrowUp',
      color: 'accent',
      imagen: '/image/especialidades/OBSTÉTRICA.webp',
      orden: 3,
      servicios: [
        { slug: 'obstetrico-biometria-fetal', nombre: 'Obstétrico Biometría fetal (tradicional)', orden: 1 },
        { slug: 'obstetrica-cromosomica-i-trimestre', nombre: 'Obstétrica cromosómica ó estructural I trimestre', orden: 2 },
        { slug: 'obstetrica-estructural-ii-iii-trimestre', nombre: 'Obstétrica estructural del 2do y 3er trimestre', orden: 3 },
        { slug: 'obstetrico-gemelar', nombre: 'Obstétrico Gemelar', orden: 4 },
        { slug: 'obstetrica-3d-4d', nombre: 'Obstétrica 3D Y 4D', orden: 5 },
        { slug: 'perfil-biofisico-fetal', nombre: 'Perfil biofísico fetal', orden: 6 },
        { slug: 'doppler-obstetrico', nombre: 'Doppler obstétrico', orden: 7 },
      ],
    },
    {
      slug: 'urologica',
      nombre: 'Urológica',
      icon: 'HiOutlineBeaker',
      color: 'primary',
      imagen: '/image/especialidades/UROLÓGICA.webp',
      orden: 4,
      servicios: [
        { slug: 'eco-renal-bilateral', nombre: 'Ecografía renal bilateral', orden: 1 },
        { slug: 'eco-vesical-vias-urinarias', nombre: 'Ecografía vesical, vías urinarias transabdominal', orden: 2 },
        { slug: 'eco-prostatica-suprapubica', nombre: 'Ecografía prostática suprapúbica', orden: 3 },
        { slug: 'eco-prostatica-transrectal', nombre: 'Ecografía prostática transrectal', orden: 4 },
        { slug: 'eco-testicular', nombre: 'Ecografía testicular', orden: 5 },
      ],
    },
    {
      slug: 'partes-blandas',
      nombre: 'Partes Blandas',
      icon: 'HiOutlineShieldExclamation',
      color: 'secondary',
      imagen: '/image/especialidades/PARTES_BLANDAS.webp',
      orden: 5,
      servicios: [
        { slug: 'eco-tiroides', nombre: 'Ecografía de tiroides', orden: 1 },
        { slug: 'eco-mamaria', nombre: 'Ecografía mamaria', orden: 2 },
        { slug: 'eco-partes-blandas-localizada', nombre: 'Ecografía de partes blandas localizada', orden: 3 },
        { slug: 'eco-pared-abdominal-inguinal', nombre: 'Ecografía de pared Abdominal e inguinal (hernias)', orden: 4 },
        { slug: 'eco-ganglionar', nombre: 'Ecografía ganglionar', orden: 5 },
      ],
    },
    {
      slug: 'doppler',
      nombre: 'Doppler',
      icon: 'HiOutlineTrendingUp',
      color: 'accent',
      imagen: '/image/especialidades/DOPPLER.webp',
      orden: 6,
      servicios: [
        { slug: 'doppler-carotideo-vertebral', nombre: 'Doppler carotídeo y/o vertebrales', orden: 1 },
        { slug: 'doppler-arterial-miembros-inferiores', nombre: 'Doppler arterial miembros inferiores', orden: 2 },
        { slug: 'doppler-venoso-miembros-inferiores', nombre: 'Doppler venoso miembros inferiores', orden: 3 },
        { slug: 'doppler-arterial-miembros-superiores', nombre: 'Doppler arterial miembros superiores', orden: 4 },
        { slug: 'doppler-venoso-miembros-superiores', nombre: 'Doppler venoso miembros superiores', orden: 5 },
        { slug: 'doppler-testicular', nombre: 'Doppler testicular', orden: 6 },
        { slug: 'doppler-hepatoportal', nombre: 'Doppler hepatoportal', orden: 7 },
        { slug: 'doppler-tiroideo', nombre: 'Doppler tiroideo', orden: 8 },
        { slug: 'doppler-pelvico-ginecologico', nombre: 'Doppler pélvico ginecológico', orden: 9 },
        { slug: 'doppler-renal', nombre: 'Doppler renal', orden: 10 },
      ],
    },
    {
      slug: 'musculoesqueletica',
      nombre: 'Musculoesquelética',
      icon: 'HiOutlineArchive',
      color: 'primary',
      imagen: '/image/especialidades/MUSCULOESQUELÉTICA.webp',
      orden: 7,
      servicios: [
        { slug: 'msk-hombro', nombre: 'Ecografía MSK hombro', orden: 1 },
        { slug: 'msk-rodilla', nombre: 'Ecografía MSK rodilla', orden: 2 },
        { slug: 'msk-codo', nombre: 'Ecografía MSK codo', orden: 3 },
        { slug: 'msk-tobillo', nombre: 'Ecografía MSK tobillo', orden: 4 },
        { slug: 'msk-muneca', nombre: 'Ecografía MSK muñeca', orden: 5 },
      ],
    },
    {
      slug: 'emergencias',
      nombre: 'Emergencias',
      icon: 'HiOutlineExclamation',
      color: 'secondary',
      imagen: '/image/especialidades/EMERGENCIAS.webp',
      orden: 8,
      servicios: [
        { slug: 'abdomen-agudo', nombre: 'Abdomen agudo (apendicitis, colecistitis, pancreatitis, peritonitis)', orden: 1 },
      ],
    },
    {
      slug: 'otros',
      nombre: 'Otros',
      icon: 'HiOutlineInformationCircle',
      color: 'accent',
      imagen: '/image/especialidades/OTROS.webp',
      orden: 9,
      servicios: [
        { slug: 'colposcopia', nombre: 'Colposcopia', orden: 1 },
        { slug: 'citologia-cervico-vaginal', nombre: 'Citología Cervico vaginal (Papanicolau, PAP)', orden: 2 },
      ],
    },
  ];

  for (const esp of especialidades) {
    const { servicios, ...especialidadData } = esp;
    const created = await prisma.especialidad.create({
      data: {
        ...especialidadData,
        servicios: {
          create: servicios,
        },
      },
    });
    console.log(`  ✅ ${created.nombre} (${created.slug}) - ${servicios.length} servicios`);
  }

  // ─── Banner Slides ─────────────────────────────────────
  console.log('\n  🖼️  Seeding banner slides...');

  await prisma.bannerSlide.deleteMany();

  const bannerSlides = [
    {
      badge: 'Conoce a quien te cuida',
      title: 'Máster en Ultrasonografía',
      subtitle: 'Dra. Evelia Martínez · Especialista en Cirugía General · Diagnóstico preciso por imagen · Atención en CDMX',
      description: 'Dra. Evelia Martínez con más de 15 años de experiencia en diagnóstico por ultrasonido.',
      bullets: JSON.stringify([
        { id: 'b1', text: 'Especialista en Cirugía General' },
        { id: 'b2', text: 'Diagnóstico preciso por imagen' },
        { id: 'b3', text: 'Atención en CDMX · Benito Juárez' },
      ]),
      cta1: JSON.stringify({ label: 'Agenda tu cita', href: '#contacto', style: 'primary' }),
      cta2: null,
      imageDesktop: '/image/banners/dra_evelia.webp',
      imageMobile: '',
      theme: 'corporate',
      layout: 'text-left-image-right',
      active: true,
      orden: 0,
    },
    {
      badge: 'Para ella',
      title: 'Tu salud femenina, protegida desde adentro',
      subtitle: 'Estudios especializados para el cuidado integral de la mujer en cada etapa de su vida.',
      description: 'Colposcopía, Citología Cérvico Vaginal, Ecografía Pélvica y más.',
      bullets: JSON.stringify([
        { id: 'b4', text: 'Colposcopía' },
        { id: 'b5', text: 'Citología Cérvico Vaginal (Papanicolau)' },
        { id: 'b6', text: 'Ecografía Pélvica / Ginecológica' },
        { id: 'b7', text: 'Ecografía Transvaginal' },
        { id: 'b8', text: 'Monitoreo y Seguimiento Folicular' },
      ]),
      cta1: JSON.stringify({ label: 'Agenda tu cita', href: '#contacto', style: 'secondary' }),
      cta2: JSON.stringify({ label: 'Ver todos los servicios', href: '#servicios', style: 'ghost' }),
      imageDesktop: '/image/banners/utero.webp',
      imageMobile: '',
      theme: 'light-blue',
      layout: 'text-left-image-right',
      active: true,
      orden: 1,
    },
  ];

  for (const slide of bannerSlides) {
    const { cta2, ...rest } = slide;
    await prisma.bannerSlide.create({
      data: cta2 ? { ...rest, cta2 } : { ...rest, cta2: undefined },
    });
    console.log(`    ✅ Slide: ${slide.title}`);
  }

  console.log('\n🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });