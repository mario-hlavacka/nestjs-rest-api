import { PrismaClient } from '../generated/prisma'
const prisma = new PrismaClient()
async function main() {
    const shelters = [
        {name: 'Žilinský útulok o.z.'},
        {name: 'Trenčiansky Útulok'},
        {name: 'HAFKÁČI'},
        {name: 'Útulok pre psov - TEZAS'},
        {name: 'Útulok Piešťany'},
        {name: 'Sloboda zvierat'},
        {name: 'Útulok Nádej'},
        {name: 'OZ Tuláčik Brezno'},
        {name: 'Mestský Útulok - Martin'},
        {name: 'Šťastný Domov - Happy House'},
        {name: 'OZ Pes v núdzi'},
        {name: 'Cerberus'},
        {name: 'Útulok Levice - OZ Šťastný Domov'},
        {name: 'Mestský útulok Nové Zámky'},
        {name: 'Únia vzájomnej pomoci ľudí a psov'},
        {name: 'OZ OČAMI PSA'}
    ];

    await prisma.shelter.createMany({
        data: shelters,
        skipDuplicates: true
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });