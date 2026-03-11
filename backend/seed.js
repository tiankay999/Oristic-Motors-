const { sequelize } = require('./config/database');
const Product = require('./models/product');

const products = [
    // SUVs
    {
        name: '2024 Range Rover Sport SVR',
        slug: '2024-range-rover-sport-svr',
        price: 450000,
        category: 'suv',
        description: 'The ultimate luxury SUV with a supercharged V8 engine, delivering 575 HP of raw power combined with unmatched refinement.',
        images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 3,
        stockStatus: 'instock'
    },
    {
        name: '2024 Mercedes-Benz G63 AMG',
        slug: '2024-mercedes-benz-g63-amg',
        price: 950000,
        category: 'suv',
        description: 'Iconic boxy design meets modern luxury and unbridled AMG V8 bi-turbo power. The G-Wagon commands attention.',
        images: ['https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 2,
        stockStatus: 'instock'
    },
    {
        name: '2024 BMW X7 M60i',
        slug: '2024-bmw-x7-m60i',
        price: 680000,
        category: 'suv',
        description: 'Three rows of Bavarian luxury paired with an M-tuned V8 engine. The pinnacle of BMW\'s SAV lineup.',
        images: ['https://images.unsplash.com/photo-1655209378120-eaba2f7fa7b9?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 4,
        stockStatus: 'instock'
    },
    {
        name: '2024 Cadillac Escalade V',
        slug: '2024-cadillac-escalade-v',
        price: 850000,
        category: 'suv',
        description: 'An aggressive supercharged V8 transforms America\'s favorite luxury hauler into an absolute powerhouse.',
        images: ['https://images.unsplash.com/photo-1549525281-afc3cceae1ba?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 5,
        stockStatus: 'instock'
    },
    {
        name: '2024 Porsche Cayenne Turbo E-Hybrid',
        slug: '2024-porsche-cayenne-turbo-e-hybrid',
        price: 720000,
        category: 'suv',
        description: 'Porsche performance DNA infused into a plug-in hybrid SUV. Astonishing acceleration with zero-emissions capability.',
        images: ['https://images.unsplash.com/photo-1503375894025-06ca98f5a519?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 1,
        stockStatus: 'instock'
    },

    // Sedans
    {
        name: '2024 Mercedes-Benz S-Class',
        slug: '2024-mercedes-benz-s-class',
        price: 520000,
        category: 'sedan',
        description: 'The pinnacle of automotive luxury. Advanced technology meets timeless elegance in every detail.',
        images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 4,
        stockStatus: 'instock'
    },
    {
        name: '2024 BMW 7 Series 760i',
        slug: '2024-bmw-7-series-760i',
        price: 510000,
        category: 'sedan',
        description: 'Bold styling, an incredible rear-seat theater screen, and an impossibly smooth V8 powertrain.',
        images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 6,
        stockStatus: 'instock'
    },
    {
        name: '2024 Audi S8',
        slug: '2024-audi-s8',
        price: 490000,
        category: 'sedan',
        description: 'Understated elegance hiding a twin-turbo V8. The executive express for those who value subtle power.',
        images: ['https://images.unsplash.com/photo-1610880846497-21a441dfddbb?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 3,
        stockStatus: 'instock'
    },
    {
        name: '2024 Bentley Flying Spur',
        slug: '2024-bentley-flying-spur',
        price: 1800000,
        category: 'sedan',
        description: 'Hand-crafted British luxury combined with astonishing W12 thrust. A masterpiece of automotive art.',
        images: ['https://images.unsplash.com/photo-1631245999661-d703b0c60da8?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 1,
        stockStatus: 'instock'
    },
    {
        name: '2024 Porsche Panamera Turbo S',
        slug: '2024-porsche-panamera-turbo-s',
        price: 750000,
        category: 'sedan',
        description: 'A sedan that handles like a 911. Insane performance figures without compromising on four-door practicality.',
        images: ['https://images.unsplash.com/photo-1506015391300-415214824367?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 2,
        stockStatus: 'instock'
    },

    // Sports Cars
    {
        name: '2024 Porsche 911 GT3',
        slug: '2024-porsche-911-gt3',
        price: 680000,
        category: 'sports-car',
        description: 'A track-bred precision machine with a naturally aspirated 4.0L flat-six engine. Pure driving perfection.',
        images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 2,
        stockStatus: 'instock'
    },
    {
        name: '2024 Lamborghini Huracán EVO',
        slug: '2024-lamborghini-huracan-evo',
        price: 1500000,
        category: 'sports-car',
        description: 'Naturally aspirated V10 producing 631 HP. A symphony of speed, technology, and Italian artistry.',
        images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 1,
        stockStatus: 'instock'
    },
    {
        name: '2024 Chevrolet Corvette Z06',
        slug: '2024-chevrolet-corvette-z06',
        price: 550000,
        category: 'sports-car',
        description: 'America’s supercar features a high-revving flat-plane crank V8 that rivals the world’s best exotics.',
        images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 4,
        stockStatus: 'instock'
    },
    {
        name: '2024 Aston Martin Vantage',
        slug: '2024-aston-martin-vantage',
        price: 600000,
        category: 'sports-car',
        description: 'Quintessential British styling meeting raw AMG V8 power. Stunning to look at, thrilling to drive.',
        images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 2,
        stockStatus: 'instock'
    },
    {
        name: '2024 McLaren Artura',
        slug: '2024-mclaren-artura',
        price: 980000,
        category: 'sports-car',
        description: 'A next-generation hybrid supercar blending a twin-turbo V6 with electric motors for blistering acceleration.',
        images: ['https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 1,
        stockStatus: 'instock'
    },

    // Coupes
    {
        name: '2024 BMW M4 Competition',
        slug: '2024-bmw-m4-competition',
        price: 380000,
        category: 'coupe',
        description: 'Twin-turbo inline-six producing 503 HP. Aggressive styling meets racetrack capability.',
        images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 5,
        stockStatus: 'instock'
    },
    {
        name: '2024 Toyota GR Supra',
        slug: '2024-toyota-supra',
        price: 250000,
        category: 'coupe',
        description: 'The legendary Supra returns. A true masterpiece of automotive engineering, combining power, precision, and style.',
        images: ['https://cdn-fastly.autoguide.com/media/2023/06/28/13406665/2021-toyota-gr-supra-adds-more-power-new-entry-level-four-cylinder.jpg?size=1224x1438&nocrop=1'],
        isFeatured: false,
        stock: 9,
        stockStatus: 'instock'
    },
    {
        name: '2024 Lexus RC F',
        slug: '2024-lexus-rc-f',
        price: 320000,
        category: 'coupe',
        description: 'One of the last naturally aspirated V8 coupes left. Japanese reliability meets roaring performance.',
        images: ['https://sportscar365.com/wp-content/uploads/2024/08/DSC_5306.jpg'],
        isFeatured: false,
        stock: 3,
        stockStatus: 'instock'
    },
    {
        name: '2024 Mercedes-AMG CLE 53',
        slug: '2024-mercedes-amg-cle-53',
        price: 410000,
        category: 'coupe',
        description: 'Replacing the C and E-class coupes, the CLE offers muscular AMG proportions and a brilliant mild-hybrid inline-six.',
        images: ['https://images.unsplash.com/photo-1616422285623-14ff016ed326?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 4,
        stockStatus: 'instock'
    },
    {
        name: '2024 Audi RS5 Coupe',
        slug: '2024-audi-rs5-coupe',
        price: 390000,
        category: 'coupe',
        description: 'Quattro all-wheel drive stability gripping corners while the biturbo V6 fires you down straights.',
        images: ['https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 2,
        stockStatus: 'instock'
    },

    // Convertibles
    {
        name: '2024 Ferrari Roma Spider',
        slug: '2024-ferrari-roma-spider',
        price: 1200000,
        category: 'convertible',
        description: 'Italian excellence in a retractable soft-top. A V8 masterpiece designed for la dolce vita.',
        images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 1,
        stockStatus: 'instock'
    },
    {
        name: '2024 Porsche 911 Turbo S Cabriolet',
        slug: '2024-porsche-911-turbo-s-cab',
        price: 950000,
        category: 'convertible',
        description: 'Hypercar-beating acceleration with the wind in your hair. The ultimate drop-top daily driver.',
        images: ['https://images.unsplash.com/photo-1599395279612-4299b6f84931?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 1,
        stockStatus: 'instock'
    },
    {
        name: '2024 Mazda MX-5 Miata RF',
        slug: '2024-mazda-mx-5-miata-rf',
        price: 150000,
        category: 'convertible',
        description: 'The quintessential roadster. Lightweight, rear-wheel drive, and endlessly fun around corners.',
        images: ['https://images.unsplash.com/photo-1533284133567-0da9844151ce?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 12,
        stockStatus: 'instock'
    },
    {
        name: '2024 BMW Z4 M40i',
        slug: '2024-bmw-z4-m40i',
        price: 290000,
        category: 'convertible',
        description: 'A classic, long-hood short-deck roadster with a powerful turbocharged inline-six engine.',
        images: ['https://images.unsplash.com/photo-1555026402-9bc1a1dbfe98?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 5,
        stockStatus: 'instock'
    },
    {
        name: '2024 Mercedes-AMG SL 63',
        slug: '2024-mercedes-amg-sl-63',
        price: 780000,
        category: 'convertible',
        description: 'The iconic Sport Leicht returns to its AMG roots. A brilliant, luxurious, and ferociously fast tourer.',
        images: ['https://images.unsplash.com/photo-1622283944682-1dd2d849b2de?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 2,
        stockStatus: 'instock'
    },

    // Crossovers
    {
        name: '2024 Toyota RAV4 Hybrid',
        slug: '2024-toyota-rav4-hybrid',
        price: 180000,
        category: 'crossover',
        description: 'Efficient hybrid powertrain meets adventure-ready design. The perfect blend of economy and capability.',
        images: ['https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 10,
        stockStatus: 'instock'
    },
    {
        name: '2024 Audi Q5 Sportback',
        slug: '2024-audi-q5-sportback',
        price: 250000,
        category: 'crossover',
        description: 'Coupe-like elegance meets SUV versatility. Quattro all-wheel drive and virtual cockpit technology.',
        images: ['https://images.unsplash.com/photo-1606611013016-969c19ba27a5?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 4,
        stockStatus: 'instock'
    },
    {
        name: '2024 Porsche Macan GTS',
        slug: '2024-porsche-macan-gts',
        price: 420000,
        category: 'crossover',
        description: 'The sports car of the compact SUV segment. Visceral performance and telepathic handling.',
        images: ['https://images.unsplash.com/photo-1580274455006-218764b8fb49?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 3,
        stockStatus: 'instock'
    },
    {
        name: '2024 Volvo XC60 Recharge',
        slug: '2024-volvo-xc60-recharge',
        price: 310000,
        category: 'crossover',
        description: 'Scandinavian minimalist design paired with a powerful, efficient plug-in hybrid drivetrain.',
        images: ['https://images.unsplash.com/photo-1622329381781-ca46ae6ddca9?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 6,
        stockStatus: 'instock'
    },
    {
        name: '2024 Genesis GV70',
        slug: '2024-genesis-gv70',
        price: 280000,
        category: 'crossover',
        description: 'Striking exterior style, a class-leading luxury interior, and smooth, responsive turbo power.',
        images: ['https://images.unsplash.com/photo-1633519195027-e455bebccae2?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 8,
        stockStatus: 'instock'
    },

    // Hatchbacks
    {
        name: '2024 Volkswagen Golf GTI',
        slug: '2024-volkswagen-golf-gti',
        price: 120000,
        category: 'hatchback',
        description: 'The iconic hot hatch. Turbocharged performance with everyday practicality and German engineering.',
        images: ['https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 8,
        stockStatus: 'instock'
    },
    {
        name: '2024 Honda Civic Type R',
        slug: '2024-honda-civic-type-r',
        price: 280000,
        category: 'hatchback',
        description: 'The king of front-wheel drive track performance. Striking looks and a brilliant manual gearbox.',
        images: ['https://images.unsplash.com/photo-1605810755737-0cf4d07bfafe?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 2,
        stockStatus: 'instock'
    },
    {
        name: '2024 Toyota GR Corolla',
        slug: '2024-toyota-gr-corolla',
        price: 260000,
        category: 'hatchback',
        description: 'A rally-bred homologation special featuring an aggressive widebody, AWD, and a wildly powerful 3-cylinder engine.',
        images: ['https://images.unsplash.com/photo-1590362891991-f20dc00a4dfb?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 3,
        stockStatus: 'instock'
    },
    {
        name: '2024 Mazda 3 Hatchback Turbo',
        slug: '2024-mazda-3-hatchback-turbo',
        price: 140000,
        category: 'hatchback',
        description: 'Premium interior appointments and sleek Kodo design paired with a torquey turbocharged engine.',
        images: ['https://images.unsplash.com/photo-1579402927236-41fccd7c2df4?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 12,
        stockStatus: 'instock'
    },
    {
        name: '2024 Mini Cooper S (F66)',
        slug: '2024-mini-cooper-s',
        price: 135000,
        category: 'hatchback',
        description: 'Go-kart handling and iconic British styling evolved for the modern era. Undeniably fun to drive.',
        images: ['https://images.unsplash.com/photo-1522778735398-e7bf9d1fd0de?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 7,
        stockStatus: 'instock'
    },

    // Minivans
    {
        name: '2024 Toyota Sienna Platinum',
        slug: '2024-toyota-sienna-platinum',
        price: 220000,
        category: 'minivan',
        description: 'Redefining family travel with premium comfort, hybrid efficiency, and captain\'s chairs for all.',
        images: ['https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 6,
        stockStatus: 'instock'
    },
    {
        name: '2024 Honda Odyssey Elite',
        slug: '2024-honda-odyssey-elite',
        price: 210000,
        category: 'minivan',
        description: 'The traditional standard for family haulers featuring Magic Slide seats and an ultra-reliable V6.',
        images: ['https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 8,
        stockStatus: 'instock'
    },
    {
        name: '2024 Chrysler Pacifica Pinnacle Hybrid',
        slug: '2024-chrysler-pacifica-pinnacle',
        price: 240000,
        category: 'minivan',
        description: 'The only plug-in hybrid minivan on the market, offering incredible luxury touches and EV driving range.',
        images: ['https://images.unsplash.com/photo-1605810755737-0cf4d07bfafe?auto=format&fit=crop&q=80&w=800'],
        isFeatured: false,
        stock: 4,
        stockStatus: 'instock'
    },
    {
        name: '2024 Kia Carnival SX Prestige',
        slug: '2024-kia-carnival-sx-prestige',
        price: 230000,
        category: 'minivan',
        description: 'An "MPV" styling approach that looks more like a luxury SUV while offering unmatched family flexibility inside.',
        images: ['https://images.unsplash.com/photo-1503375894025-06ca98f5a519?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 5,
        stockStatus: 'instock'
    },
    {
        name: '2024 Lexus LM 350h',
        slug: '2024-lexus-lm-350h',
        price: 590000,
        category: 'minivan',
        description: 'The ultimate chauffeur-driven luxury minivan experience featuring massive rear privacy screens and massage reclining seats.',
        images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'],
        isFeatured: true,
        stock: 1,
        stockStatus: 'instock'
    },
];

const seed = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync the database to be sure
        await Product.sync();

        // Delete existing items to avoid duplicates
        await Product.destroy({ where: {} });
        console.log('Cleared existing products.');

        // Insert new items
        await Product.bulkCreate(products);
        console.log(`Successfully seeded ${products.length} products.`);

    } catch (error) {
        console.error('Unable to seed to the database:', error);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

seed();
