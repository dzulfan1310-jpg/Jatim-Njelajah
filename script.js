// ==================== DATA ==================== //

console.log('Script.js loaded successfully');

// Track recently viewed regions
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

// Featured regions (monthly featured)
const FEATURED_REGIONS = ['Malang', 'Surabaya', 'Banyuwangi', 'Ponorogo'];

// Dashboard feature removed — carousel and related handlers deleted

// Sample dataset (static)
const REGIONS = {
  'Surabaya': {
    foods: ['Lontong Kupang', 'Sate Klopo', 'Rawon', 'Perkedel Goreng', 'Tahu Goreng'],
    traditions: ['Festival Pahlawan', 'Perayaan Kemerdekaan', 'Hari Jadi Surabaya', 'Pawai Budaya'],
    clothing: 'Baju Cak & Ning Surabaya',
    trivia: 'Kota terbesar di Jatim, pusat sejarah, ekonomi, dan pendidikan. Dikenal dengan semangat kepahlawanan dan inovasi kuliner.',
    history: 'Surabaya berkembang sejak era Majapahit, menjadi pusat perdagangan dan pelabuhan penting di Jawa Timur.',
    population: '≈ 2.9 juta (perk.)',
    area: '350 km²',
    attractions: ['Tugu Pahlawan', 'Kebun Binatang Surabaya', 'Jalan Tunjungan'],
    website: 'https://surabaya.go.id'
  },
  'Sidoarjo': { foods: ['Tahu Tek', 'Tahu Campur', 'Bakso Tahu', 'Tahu Goreng Pedas', 'Lumpia Tahu'], traditions: ['Festival Tahu', 'Pameran Produk Tahu', 'Upacara Syukuran Pengrajin'], clothing: 'Baju Adat Sidoarjo', trivia: 'Terkenal sebagai sentra produksi tahu terbesar di Indonesia dengan ratusan pengrajin.', history: 'Sidoarjo berkembang sebagai pusat industri tahu sejak awal abad ke-20 dan dikenal dengan lumpur Lapindo.' },
  'Gresik': { foods: ['Otak-otak', 'Lontong Kupang', 'Kue Lapis', 'Petis', 'Ikan Bakar'], traditions: ['Festival Nelayan', 'Tradisi Istana', 'Ziarah Makam'], clothing: 'Baju Adat Gresik', trivia: 'Kota pelabuhan dengan sejarah maritim yang kaya sejak zaman Sunan Giri.', history: 'Gresik adalah pelabuhan penting sejak abad ke-14 dan menjadi pusat penyebaran Islam di Jawa Timur.' },
  'Lamongan': { foods: ['Soto Lamongan', 'Wingko Babat', 'Soto Koya', 'Udang Goreng', 'Tinutuan'], traditions: ['Sedekah Bumi', 'Festival Budaya Pesisir', 'Tradisi Masyarakat Nelayan', 'Perayaan Hari Kemerdekaan'], trivia: 'Pelabuhan pesisir dengan kuliner khas Soto Lamongan yang terkenal, tradisi syukuran panen laut yang kuat.', history: 'Lamongan dikenal sejak masa kerajaan Majapahit dan berkembang sebagai kota pesisir dan kuliner.' },
  'Tuban': { foods: ['Bandeng Presto', 'Geger Pamanukan', 'Ikan Bakar', 'Gabus Goreng', 'Nasi Kuning Tuban'], traditions: ['Tradisi Nelayan', 'Festival Laut', 'Ritual Keselamatan Berlayar'], trivia: 'Pelabuhan tua dengan produksi bandeng berkualitas tinggi dan warisan maritim turun-temurun.', history: 'Tuban adalah pelabuhan kuno yang menjadi jalur perdagangan utama di pesisir utara Jawa Timur.' },
  'Bojonegoro': { foods: ['Sego Tempong', 'Sate Ayam', 'Nasi Kuning', 'Tempe Goreng', 'Bakso'], traditions: ['Ritual Panen', 'Upacara Desa', 'Perayaan Hasil Bumi'], trivia: 'Daerah agraris dengan tradisi panen yang kuat dan penghasil minyak bumi.', history: 'Bojonegoro dikenal sebagai daerah penghasil minyak bumi dan pertanian sejak masa kolonial.' },
  'Mojokerto': { foods: ['Lontong Balap', 'Sate Mozok', 'Perkedel', 'Tahu Goreng', 'Nasi Campur'], traditions: ['Festival Lokal', 'Perayaan Sejarah Majapahit', 'Upacara Budaya'], trivia: 'Kota bersejarah dekat situs Candi Majapahit dengan kuliner tradisional yang autentik.', history: 'Mojokerto adalah pusat kerajaan Majapahit, salah satu kerajaan terbesar di Nusantara.' },
  'Malang': {
    foods: ['Bakso Malang', 'Pecel Malang', 'Apel Malang', 'Biji Salak', 'Perkedel Kentang'],
    traditions: ['Festival Apel', 'Grebeg Malang', 'Festival Bunga', 'Hari Jadi Kota'],
    trivia: 'Dataran tinggi dengan pariwisata berkembang, pusat produksi apel, dan budaya yang dinamis.',
    history: 'Malang dahulu merupakan bagian dari Kerajaan Kanjuruhan dan berkembang pesat pada masa kolonial Belanda sebagai kota pendidikan dan wisata.',
    population: '≈ 862.000 (perk.)',
    area: '145 km²',
    attractions: ['Jatim Park', 'Alun-Alun Malang', 'Kebun Apel'],
    website: 'https://malangkota.go.id'
  },
  'Batu': { foods: ['Apel Batu', 'Oleh-oleh Apel', 'Kue Apel', 'Jus Buah Segar', 'Perkedel'], traditions: ['Festival Buah Apel', 'Perayaan Musim Panen', 'Pameran Produk Lokal'], trivia: 'Kota wisata dataran tinggi terkenal sebagai penghasil apel terbaik dengan pemandangan indah.', history: 'Batu berkembang sebagai kota wisata sejak masa kolonial Belanda dan terkenal dengan agrowisata apel.' },
  'Lumajang': { foods: ['Tape Lumajang', 'Ikan Segar', 'Jamur Tiram', 'Nasi Kuning', 'Empal'], traditions: ['Festival Bunga', 'Upacara Adat', 'Perayaan Panen'], trivia: 'Gerbang masuk ke kawasan Bromo dengan tradisi kuliner tape yang terkenal.', history: 'Lumajang merupakan daerah agraris yang berkembang sejak masa kerajaan Mataram Kuno.' },
  'Probolinggo': { foods: ['Rujak Cingur', 'Ikan Laut Segar', 'Ikan Bakar', 'Tinutuan', 'Cakalang'], traditions: ['Pesta Laut', 'Festival Budaya Pesisir', 'Tradisi Nelayan'], trivia: 'Dekat Gunung Bromo dengan pesisir timur yang indah dan budaya nelayan yang kental.', history: 'Probolinggo berkembang sebagai kota pelabuhan dan pintu gerbang ke Gunung Bromo.' },
  'Pasuruan': { foods: ['Tahu Pasuruan', 'Gurita Bakar', 'Ikan Bakar', 'Nasi Ulam', 'Rempeyek'], traditions: ['Wisata Bromo', 'Festival Budaya', 'Perayaan Idul Fitri'], trivia: 'Gerbang menuju Bromo dengan kuliner khas dan pariwisata yang menarik.', history: 'Pasuruan adalah kota pelabuhan kuno dan jalur utama menuju kawasan wisata Bromo.' },
  'Kediri': { foods: ['Pecel Kediri', 'Tape Kediri', 'Gethuk', 'Bakso', 'Lumpia'], traditions: ['Festival Keraton', 'Perayaan Keagamaan', 'Upacara Budaya'], clothing: 'Baju Adat Kediri', trivia: 'Kota pendidikan dengan sejarah yang kaya, dikenal sebagai kota literasi dan tradisi pesantren.' },
  'Blitar': { foods: ['Pecel Blitar', 'Pisang Goreng', 'Bakso Blitar', 'Gethuk', 'Tempe Goreng'], traditions: ['Ziarah Makam Bung Karno', 'Festival Budaya', 'Perayaan Kemerdekaan'], clothing: 'Baju Adat Blitar', trivia: 'Lokasi makam Bung Karno (Presiden RI pertama) dengan warisan sejarah yang mendalam.' },
  'Jombang': { foods: ['Soto Jombang', 'Empal Gentong', 'Pecel', 'Bakso Kuning', 'Gethuk'], traditions: ['Tradisi Pesantren', 'Festival Keagamaan', 'Upacara Desa'], clothing: 'Baju Adat Jombang', trivia: 'Kota santri dengan tradisi pesantren yang kuat, pusat pendidikan agama Islam yang terkenal.' },
  'Nganjuk': { foods: ['Ayam Goreng Nganjuk', 'Soto Ayam', 'Pecel', 'Nasi Kuning', 'Bakso'], traditions: ['Upacara Desa', 'Festival Budaya', 'Perayaan Panen'], clothing: 'Baju Adat Nganjuk', trivia: 'Daerah pegunungan dengan pertanian yang subur dan ayam goreng yang terkenal.' },
  'Madiun': { foods: ['Pecel Madiun', 'Gethuk', 'Nasi Goreng', 'Tempe Goreng', 'Soto Banjar'], traditions: ['Grebeg Madiun', 'Perayaan Budaya Lokal', 'Upacara Adat'], clothing: 'Baju Adat Madiun', trivia: 'Kota kecil dengan kuliner khas yang autentik dan budaya lokal yang kuat.' },
  'Magetan': { foods: ['Sate Magetan', 'Bakso Magetan', 'Pecel', 'Gethuk', 'Nasi Kuning'], traditions: ['Festival Lokal', 'Perayaan Keagamaan', 'Upacara Budaya'], clothing: 'Baju Adat Magetan', trivia: 'Dekat dengan Gunung Lawu yang indah dengan tradisi budaya yang mendalam.' },
  'Ngawi': { foods: ['Ikan Sungai Segar', 'Tempe', 'Bakso', 'Pecel', 'Gethuk'], traditions: ['Ritual Panen', 'Upacara Adat', 'Perayaan Budaya'], clothing: 'Baju Adat Ngawi', trivia: 'Terletak di tepi Bengawan Solo dengan tradisi pertanian dan nelayan yang kuat.' },
  'Banyuwangi': {
    foods: ['Rujak Cingur', 'Bebek Goreng Osing', 'Tinutuan', 'Ikan Bakar', 'Cakalang'],
    traditions: ['Gandrung (Tari Tradisional)', 'Festival Budaya Osing', 'Perayaan Kemerdekaan', 'Upacara Adat'],
    trivia: 'Budaya Osing yang khas, pintu gerbang menuju Bali dengan tradisi yang autentik dan kulinari yang unik.',
    history: 'Banyuwangi dikenal sebagai tanah Blambangan, kerajaan terakhir di Jawa Timur sebelum jatuh ke tangan Mataram dan Belanda.',
    population: '≈ 1.6 juta (kabupaten, perk.)',
    area: '5,782 km² (kabupaten)',
    attractions: ['Ijen Crater', 'Pantai Pulau Merah', 'Taman Blambangan'],
    website: 'https://banyuwangikab.go.id'
  },
  'Bondowoso': { foods: ['Tape Bondowoso', 'Kue Tradisional', 'Bakso', 'Nasi Kuning', 'Kopi Lokal'], traditions: ['Ritual Lokal', 'Upacara Adat', 'Festival Budaya'], clothing: 'Baju Adat Bondowoso', trivia: 'Pegunungan dengan produksi kopi lokal yang berkualitas dan tradisi kerajinan tangan.' },
  'Situbondo': { foods: ['Ikan Laut Segar', 'Rujak Sitinggil', 'Ikan Bakar', 'Tinutuan', 'Bakso Laut'], traditions: ['Pesta Laut', 'Festival Budaya Pesisir', 'Tradisi Nelayan'], clothing: 'Baju Adat Situbondo', trivia: 'Pesisir utara Jatim dengan tradisi nelayan yang kuat dan keindahan alam yang memukau.' },
  'Jember': {
    foods: ['Tape Ketan Jember', 'Rujak Jember', 'Bakso', 'Nasi Kuning', 'Tempe Goreng'],
    traditions: ['Jember Fashion Carnaval', 'Festival Budaya', 'Perayaan Lokal'],
    clothing: 'Baju Adat Jember',
    trivia: 'Kota kreatif dengan festival besar Jember Fashion Carnaval yang terkenal internasional.',
    history: 'Jember berkembang sebagai pusat budaya dan festival regional.',
    population: '≈ 1.3 juta (kabupaten, perk.)',
    area: '1,200 km² (kabupaten)',
    attractions: ['Pantai Papuma', 'Jember Fashion Carnaval', 'Taman Botani Sukorambi'],
    website: 'https://jemberkab.go.id'
  },
  'Ponorogo': { foods: ['Sate Ponorogo', 'Bakso', 'Pecel', 'Gethuk', 'Nasi Kuning'], traditions: ['Reog Ponorogo (Tari Epik)', 'Festival Reog', 'Upacara Budaya'], trivia: 'Pusat seni Reog yang terkenal dengan kesenian tradisional yang spektakuler dan bersejarah.', history: 'Ponorogo dikenal sebagai asal mula kesenian Reog, yang telah ada sejak abad ke-15 dan menjadi simbol perlawanan rakyat terhadap penguasa.' },
  'Pacitan': { foods: ['Ikan Laut Segar', 'Seafood Bakar', 'Ikan Asin', 'Tinutuan', 'Cakalang'], traditions: ['Festival Pantai', 'Perayaan Lokal', 'Upacara Budaya'], clothing: 'Baju Adat Pacitan', trivia: 'Pesisir selatan dengan pantai indah dan pariwisata yang berkembang serta nelayan tradisional.' },
  'Trenggalek': { foods: ['Ikan Laut', 'Kue Tradisional', 'Bakso', 'Pecel', 'Nasi Kuning'], traditions: ['Festival Budaya', 'Upacara Adat', 'Perayaan Lokal'], clothing: 'Baju Adat Trenggalek', trivia: 'Perpaduan pesisir dan pegunungan dengan tradisi budaya yang unik dan keindahan alam.' },
  'Tulungagung': { foods: ['Gethuk Tulungagung', 'Ikan Laut', 'Bakso', 'Pecel', 'Nasi Kuning'], traditions: ['Perayaan Lokal', 'Upacara Adat', 'Festival Budaya'], clothing: 'Baju Adat Tulungagung', trivia: 'Dikenal dengan produksi marmer berkualitas tinggi dan warisan seni tradisional yang kaya.' },
  'Sampang': { foods: ['Sate Madura', 'Lontong', 'Ikan Bakar', 'Bakso Madura', 'Cakalang'], traditions: ['Tradisi Madura', 'Perayaan Budaya', 'Upacara Adat'], clothing: 'Baju Adat Sampang', trivia: 'Kabupaten di Pulau Madura dengan budaya lokal yang kuat dan tradisi kuliner autentik.' },
  'Pamekasan': { foods: ['Brem Banyakan', 'Rujak Madura', 'Sate Madura', 'Bakso', 'Ikan Asap'], traditions: ['Karapan Sapi Madura', 'Festival Budaya', 'Perayaan Lokal'], clothing: 'Baju Adat Pamekasan', trivia: 'Salah satu pusat tradisi Madura dengan Karapan Sapi yang terkenal sebagai warisan budaya.' },
  'Sumenep': { foods: ['Ikan Laut Segar', 'Bubur Madura', 'Sate Madura', 'Bakso', 'Cakalang'], traditions: ['Festival Budaya Madura', 'Perayaan Lokal', 'Upacara Adat'], clothing: 'Baju Adat Sumenep', trivia: 'Madura bagian timur dengan budaya yang kuat, keindahan alam pantai, dan tradisi nelayan.' },

};

// Insert realistic-estimate summaries for each region so the info panel shows data directly.
const REGION_ESTIMATES = {
  // Madura
  'Bangkalan': {
    foods: ['Nasi Serpang','Soto Mata Sapi','Bebek Sinjay'],
    traditions: ['Karapan Sapi','Rokat Tase (petik laut)'],
    clothing: 'Baju Pesa\'an (pria), kebaya (wanita)',
    history: 'Pusat sejarah Madura bagian barat; pusat kekuasaan lokal sejak abad ke-16.'
  },
  'Pamekasan': {
    foods: ['Sate Laler','Soto Pamekasan','Lorjuk'],
    traditions: ['Karapan Sapi','Ojhung (adu rotan)'],
    clothing: 'Baju Pesa\'an / Baju Marlena untuk wanita',
    history: 'Pamekasan dikenal sebagai pusat tradisi Madura dan penyebaran Islam di pulau tersebut.'
  },
  'Sampang': {
    foods: ['Kaldu Kokot','Nasi Ghule','Rujak Selingkuh'],
    traditions: ['Karapan Sapi','Mamaca (membaca hikayat)'],
    clothing: 'Baju Pesa\'an',
    history: 'Memiliki sejarah kepangeranan lokal dan pengaruh ulama yang kuat.'
  },
  'Sumenep': {
    foods: ['Soto Jamur','Kaldu Soto','Kue Otok'],
    traditions: ['Karapan Sapi','Mondhug Tasek (petik laut)'],
    clothing: 'Baju Pesa\'an dengan modifikasi Keraton Sumenep',
    history: 'Bekas pusat Kerajaan Sumenep dengan keraton dan situs bersejarah.'
  },

  // Jawa Timur daratan
  'Banyuwangi': {
    foods: ['Rujak Soto','Sego Tempong','Pecel Pithik'],
    traditions: ['Tari Gandrung','Kebo-Keboan'],
    clothing: 'Pakaian adat Osing (kebaya & batik untuk perempuan; surjan/beskap untuk pria)',
    history: 'Bekas Kerajaan Blambangan, dikenal dengan legenda Sri Tanjung dan pengaruh Majapahit.'
  },
  'Blitar': {
    foods: ['Pecel Blitar','Soto Ayam Lodho','Wajik Kletik'],
    traditions: ['Grebeg Pancasila','Larung Sesaji di pantai'],
    clothing: 'Pakaian adat Jawa Timuran / Mataraman',
    history: 'Kota sejarah, makam Proklamator RI (Soekarno) dan warisan Majapahit.'
  },
  'Bojonegoro': {
    foods: ['Ledre','Nasi Fluk','Gethuk Lindri'],
    traditions: ['Wayang Thengul','Sedekah Bumi'],
    clothing: 'Pakaian khas lokal (pengaruh Samin)',
    history: 'Daerah agraris dan energi (minyak); memiliki tradisi kultural Samin.'
  },
  'Bondowoso': {
    foods: ['Tape Manis','Nasi Kawul','Singkong Keju'],
    traditions: ['Tari Singo Ulung','Gendrung'],
    clothing: 'Pakaian adat Jawa Timur (pengaruh Besuki)',
    history: 'Dikenal sebagai kota tape dan memiliki situs megalitik.'
  },
  'Gresik': {
    foods: ['Nasi Krawu','Otak-otak Bandeng','Pudak'],
    traditions: ['Rebo Wekasan','Ziarah makam Wali'],
    clothing: 'Pakaian Jawa Pesisiran khas Gresik',
    history: 'Pelabuhan tua, pusat awal penyebaran Islam di Jawa Timur.'
  },
  'Jember': {
    foods: ['Suwar-Suwir','Prol Tape','Edamame'],
    traditions: ['Jember Fashion Carnaval','Larung Sesaji'],
    clothing: 'Pakaian adat campuran Jawa & Madura',
    history: 'Dikenal dengan perkebunan tembakau dan JFC yang mendunia.'
  },
  'Jombang': {
    foods: ['Es Degan','Sate Bandeng','Tahu Pong'],
    traditions: ['Ujung (adu rotan)','Gelar Budaya Majapahit'],
    clothing: 'Pakaian adat Jawa Timuran (pengaruh Mataraman)',
    history: 'Kota Santri dengan pesantren bersejarah seperti Tebuireng.'
  },
  'Kediri': {
    foods: ['Tahu Takwa','Getuk Pisang','Stik Tahu'],
    traditions: ['Grebeg Suro','Larung Sesaji'],
    clothing: 'Pakaian adat Kediri (pengaruh Mataraman)',
    history: 'Bekas pusat Kerajaan Kediri (Panjalu), kaya peninggalan sejarah.'
  },
  'Lamongan': {
    foods: ['Soto Lamongan','Nasi Boranan','Wingko Babat'],
    traditions: ['Tari Boran','Jejak Budaya Sunan Drajat'],
    clothing: 'Pakaian adat pesisir Lamongan',
    history: 'Kawasan penting dalam penyebaran Islam dan budaya pesisir.'
  },
  'Lumajang': {
    foods: ['Pisang Agung','Rujak Cingur Lumajang','Pecel Lele'],
    traditions: ['Tari Godril','Jaran Kencak'],
    clothing: 'Pakaian adat Lumajang',
    history: 'Terkait dengan Kerajaan Lamajang dan akses ke kawasan Bromo.'
  },
  'Madiun': {
    foods: ['Nasi Pecel Madiun','Brem','Bluder Cokro'],
    traditions: ['Grebeg Maulud','Dongkrek'],
    clothing: 'Pakaian adat Madiun (pengaruh Mataraman)',
    history: 'Peran historisnya termasuk peristiwa politik penting (Madiun 1948).'
  },
  'Magetan': {
    foods: ['Jeruk Pamelo','Pia Magetan','Kerupuk Kulit'],
    traditions: ['Merti Desa','Genduri'],
    clothing: 'Pakaian adat Magetan',
    history: 'Kawasan pegunungan sejuk dengan ikon wisata Telaga Sarangan.'
  },
  'Malang': {
    foods: ['Bakso Malang','Cwie Mie','Apel Malang'],
    traditions: ['Bantengan','Tradisi Tengger'],
    clothing: 'Pakaian adat Malangan (perpaduan Mataraman & pesisir)',
    history: 'Bekas pusat Kerajaan Singhasari dengan banyak situs purbakala.'
  },
  'Mojokerto': {
    foods: ['Onde-Onde','Kerupuk Rambak','Sambel Wader'],
    traditions: ['Grebeg Suro','Pencak Macan'],
    clothing: 'Pakaian adat Mojokerto (motif Majapahit)',
    history: 'Pusat peradaban Majapahit (Trowulan) dengan banyak situs arkeologis.'
  },
  'Nganjuk': {
    foods: ['Nasi Becek','Dumbleg','Bawang Merah lokal'],
    traditions: ['Tari Lenggo-Lenggok','Sedekah Bumi'],
    clothing: 'Pakaian adat Nganjuk',
    history: 'Terkait legenda Panji dan pusat pertanian lokal.'
  },
  'Ngawi': {
    foods: ['Tepo Tahu','Lethok','Keripik Tempe'],
    traditions: ['Grebeg Suran','Tari Orek-Orek'],
    clothing: 'Pakaian adat Ngawi',
    history: 'Daerah tepi Bengawan Solo dengan warisan agraris dan sejarah lokal.'
  },
  'Pacitan': {
    foods: ['Nasi Tiwul','Sale Pisang','Kerupuk Ikan'],
    traditions: ['Grebeg Suro di Goa Gong','Larung Sesaji'],
    clothing: 'Pakaian adat Pacitan (pesisir selatan)',
    history: 'Kota kelahiran tokoh nasional dan terkenal dengan geologi goa serta pantai.'
  },
  'Pasuruan': {
    foods: ['Bipang Jipang','Sate Komoh','Rawon Pasuruan'],
    traditions: ['Grebeg Suran','Tradisi Tengger'],
    clothing: 'Pakaian adat Pasuruan (pengaruh pesisir & Tengger)',
    history: 'Pelabuhan penting sejak kolonial dan akses menuju Bromo.'
  },
  'Ponorogo': {
    foods: ['Sate Ponorogo','Dawet Jabung','Tiwul Getuk'],
    traditions: ['Reog Ponorogo','Grebeg Suro'],
    clothing: 'Pakaian Warok dan kostum Jathil',
    history: 'Asal seni Reog, bagian penting budaya dan sejarah lokal.'
  },
  'Probolinggo': {
    foods: ['Anggur Probolinggo','Mangga Manalagi','Soto Kraksaan'],
    traditions: ['Grebeg Suro','Tradisi Tengger'],
    clothing: 'Pakaian adat Probolinggo (pesisir & Tengger)',
    history: 'Kawasan pertanian kuat dan pintu gerbang ke Bromo.'
  },
  'Situbondo': {
    foods: ['Soto Kikil','Nasi Karak','Tajin Palappa'],
    traditions: ['Petik Laut','Upacara Nelayan'],
    clothing: 'Pakaian adat Situbondo (pesisir & Madura pengaruh)',
    history: 'Bagian Tapal Kuda dengan tradisi bahari dan konservasi alam.'
  },
  'Trenggalek': {
    foods: ['Nasi Gegok','Ayam Lodho','Alen-Alen'],
    traditions: ['Larung Sesaji Pantai Prigi'],
    clothing: 'Pakaian adat Trenggalek',
    history: 'Daerah pegunungan dan pantai selatan dengan peninggalan budaya lokal.'
  },
  'Tuban': {
    foods: ['Kare Rajungan','Ampo','Krupuk Rambak'],
    traditions: ['Tayuban','Sedekah Bumi'],
    clothing: 'Pakaian adat pesisir Tuban',
    history: 'Dikenal sebagai Bumi Wali dan pelabuhan penting pada masa Majapahit.'
  },
  'Tulungagung': {
    foods: ['Nasi Lodho','Kopi Ijo','Getuk Pisang'],
    traditions: ['Ujung (adu rotan)','Nyadran'],
    clothing: 'Pakaian adat Tulungagung',
    history: 'Pusat kerajinan marmer dengan sejarah budaya Mataram Kuno.'
  },

  // Kota besar
  'Surabaya': {
    foods: ['Rujak Cingur','Lontong Balap','Tahu Tek'],
    traditions: ['Kenduren','Perayaan Hari Pahlawan'],
    clothing: 'Pakaian adat Suroboyoan (Baju Pencak & Kebaya)',
    history: 'Kota Pahlawan; pelabuhan penting sejak era Majapahit dan pusat perjuangan 10 November 1945.'
  },
  'Batu': {
    foods: ['Apel Malang','Susu Segar','Keripik Buah'],
    traditions: ['Petik Apel','Seni Bantengan'],
    clothing: 'Pakaian adat Jawa Mataraman',
    history: 'Kota wisata dataran tinggi yang dimekarkan dari Kabupaten Malang.'
  }
};

// Merge estimates into REGIONS; where estimate exists, overwrite or add fields.
Object.keys(REGIONS).forEach(region => {
  const entry = REGIONS[region];
  const est = REGION_ESTIMATES[region];
  if (est) {
    entry.population = est.population || entry.population || 'Informasi populasi tidak tersedia';
    entry.area = est.area || entry.area || 'Informasi luas tidak tersedia';
    entry.attractions = est.attractions && est.attractions.length ? est.attractions : (entry.attractions && entry.attractions.length ? entry.attractions : ['Atraksi lokal tidak tersedia']);
    entry.website = est.website || entry.website || '';
  } else {
    // For regions without a detailed estimate, keep existing or provide a concise generic summary
    if (!entry.population) entry.population = 'Perkiraan populasi wilayah (data ringkasan)';
    if (!entry.area) entry.area = 'Perkiraan luas wilayah (km²)';
    if (!entry.attractions || !Array.isArray(entry.attractions) || entry.attractions.length === 0) entry.attractions = ['Atraksi lokal tidak tersedia'];
    if (!entry.website) entry.website = '';
  }
});

// Traditional calendar / annual events per region
// Dates that follow the Hijri or Javanese calendar are given as estimates and may shift yearly.
const REGION_CALENDAR = {
  'Bangkalan': [
    { date: 'Agustus - Oktober (musim kemarau)', title: 'Karapan Sapi (seri & final)', desc: 'Musim pertandingan Karapan Sapi; final nasional bergeser setiap tahun.' }
  ],
  'Banyuwangi': [
    { date: 'Sepanjang tahun (rangkaian)', title: 'Banyuwangi Festival (B-Fest)', desc: 'Rangkaian event pariwisata dan budaya.' },
    { date: 'Juli (contoh: 12-13 Juli 2025)', title: 'Banyuwangi Ethno Carnival (BEC)', desc: 'Karnaval etnik dan budaya lokal (tanggal bisa berubah).' },
    { date: 'Oktober (contoh: 23-25 Oktober 2025)', title: 'Festival Gandrung Sewu', desc: 'Tari kolosal Gandrung di Pantai Boom dan area publik lainnya.' }
  ],
  'Blitar': [
    { date: '1 Suro (perkiraan)', title: 'Larung Sesaji (Pantai Serang)', desc: 'Upacara adat larung sesaji; 1 Suro mengikuti kalender Jawa/Hijri.' }
  ],
  'Bojonegoro': [
    { date: 'Mei - Juni', title: 'Festival Geopark Bojonegoro', desc: 'Rangkaian acara alam dan budaya (festival geowisata).'}
  ],
  'Bondowoso': [
    { date: 'Bulan Safar (perkiraan)', title: 'Tajin Safar (Asafar)', desc: 'Rangkaian ritual dan acara tradisi yang mengikuti bulan Safar.' }
  ],
  'Gresik': [
    { date: '25 Ramadan (Malam Selawe)', title: 'Malam Selawe', desc: 'Malam ke-25 Ramadan tradisi lokal (tanggal Hijri bergeser tiap tahun).' },
    { date: 'Menjelang Idulfitri', title: 'Pasar Bandeng', desc: 'Pekan kuliner dan penjualan makanan khas menjelang Lebaran.' },
    { date: 'Safar akhir (bergantung kalender)', title: 'Rebo Wekasan Desa Suci', desc: 'Ritual tradisional yang mengikuti kalender lokal.' }
  ],
  'Jember': [
    { date: 'Agustus (contoh: 23 Agustus 2025)', title: 'Gerak Jalan Tajemtra (Tanggul-Jember)', desc: 'Kirab jalan kaki massal dan kegiatan kemasyarakatan.' },
    { date: 'Agustus', title: 'Jember Fashion Carnaval (JFC)', desc: 'Parade kostum internasional dan acara kreatif tahunan.' }
  ],
  'Jombang': [
    { date: 'Mei (perkiraan)', title: 'Riyaya Undhuh-Undhuh (Mojowarno)', desc: 'Panen padi dan acara adat lokal; tanggal tahunan dapat berubah.' }
  ],
  'Kediri': [
    { date: '1 Suro (perkiraan)', title: 'Tradisi Satu Suro', desc: 'Peringatan 1 Muharram menurut kalender Jawa/Hijri; acara ritual dan kirab.' }
  ],
  'Lamongan': [
    { date: 'Akhir Mei (tahunannya)', title: 'Hari Jadi Lamongan', desc: 'Perayaan hari jadi kabupaten dengan kirab dan pagelaran seni.' }
  ],
  'Nganjuk': [
    { date: '15 Muharram (perkiraan)', title: 'Siraman Sedudo', desc: 'Ritual tradisional Siraman Sedudo; tanggal mengikuti kalender Jawa/Hijri.' }
  ],
  'Pacitan': [
    { date: 'Dzulqa\'dah (Senin Kliwon, perkiraan Mei/Juni)', title: 'Upacara Adat Ceprotan', desc: 'Ritual lokal yang mengikuti pentas kalender tradisi; tanggal dapat bergeser.' }
  ],
  'Pasuruan': [
    { date: '14 Kasada (Kalender Tengger, perkiraan awal Juni)', title: 'Yadnya Kasada (Bromo)', desc: 'Upacara besar suku Tengger, puncak ritual pada tanggal Kasada.' }
  ],
  'Probolinggo': [
    { date: '14 Kasada (Kalender Tengger, perkiraan awal Juni)', title: 'Yadnya Kasada (Bromo - wilayah pengiring)', desc: 'Upacara Tengger yang juga mempengaruhi daerah akses Bromo.' }
  ],
  'Ponorogo': [
    { date: '1 Suro (perkiraan)', title: 'Grebeg Suro & Festival Reog', desc: 'Rangkaian Grebeg Suro dan festival Reog sebagai acara budaya utama.' }
  ],
  'Surabaya': [
    { date: 'Mei', title: 'Parade Bunga dan Budaya (HJKS)', desc: 'Parade dan pameran dalam rangka Hari Jadi Kota Surabaya.' }
  ],

  // Events with shifting dates (announced yearly by local government)
  'Lumajang': [ { date: 'Februari (tanggal bergeser)', title: 'Patrol Musik Festival', desc: 'Festival musik lokal/pertunjukan; tanggal ditetapkan tiap tahun.' } ],
  'Madiun': [ { date: 'Bulan Suro / Juli (bergantung acara)', title: 'Suronan / Hari Jadi Madiun', desc: 'Tradisi Suronan (Suro) dan peringatan Hari Jadi; tanggal dapat berubah.' } ],
  'Magetan': [ { date: 'Desember - Januari (bergeser)', title: 'Kirab Budaya "Boyong Kantor"', desc: 'Kirab dan acara budaya tahunan saat pemindahan kantor atau perayaan daerah.' } ],
  'Malang': [ { date: 'Oktober - November (bergeser)', title: 'Festival Bantengan & Gebyak Wayang Topeng', desc: 'Rangkaian festival seni tradisional dan topeng Malangan.' } ],
  'Mojokerto': [ { date: 'Mei (bergeser)', title: 'Parade Tumpeng & Majapahit Travel Fair', desc: 'Acara kuliner dan promosi warisan Majapahit.' } ],
  'Ngawi': [ { date: 'Tanggal bergeser', title: 'Ngawi Agri Expo', desc: 'Pameran pertanian dan expo komoditas lokal; tanggal variatif.' } ],
  'Pamekasan': [ { date: 'Agustus - Oktober', title: 'Karapan Sapi (Penyisihan)', desc: 'Babak penyisihan Karapan Sapi sebelum musim final.' } ],
  'Sampang': [ { date: 'Agustus - Oktober', title: 'Karapan Sapi (Penyisihan)', desc: 'Sesi kualifikasi Karapan Sapi tingkat kabupaten.' } ],
  'Sumenep': [ { date: 'Agustus - Oktober', title: 'Karapan Sapi (Penyisihan)', desc: 'Serangkaian pertandingan Karapan Sapi lokal.' } ],
  'Sidoarjo': [ { date: 'Tanggal bergeser', title: 'Festival Gelar Budaya Kota Udang', desc: 'Festival budaya dan kuliner, tanggal diumumkan oleh pemda.' } ],
  'Situbondo': [ { date: 'Syawal / musim (bergeser)', title: 'Petik Laut / Larung Sesaji', desc: 'Ritual nelayan; tanggal menyesuaikan musim dan kalender lokal.' } ],
  'Tuban': [ { date: 'Syawal / musim (bergeser)', title: 'Petik Laut / Larung Sesaji', desc: 'Upacara laut tahunan di komunitas pesisir Tuban.' } ],
  'Trenggalek': [ { date: 'Tanggal bergeser', title: 'Upacara Adat Longkangan / Uluk-Uluk', desc: 'Ritual adat lokal dengan tanggal yang tidak tetap.' } ],
  'Tulungagung': [ { date: 'Tanggal bergeser', title: 'Upacara Adat Longkangan / Uluk-Uluk', desc: 'Rangkaian upacara adat yang bergeser tiap tahun.' } ],
  'Batu': [ { date: 'Sepanjang tahun (festival berkala)', title: 'Batu Art and Culture Festival (BACF)', desc: 'Serangkaian acara seni dan budaya yang diselenggarakan sepanjang tahun.' } ]
};

// Ensure every region has at least example calendar entries so the UI
// never shows an empty placeholder. These are benign example entries
// (month names and short descriptions) to make the calendar feel filled.
Object.keys(REGIONS).forEach(region => {
  if (!REGION_CALENDAR[region]) {
    REGION_CALENDAR[region] = [
      { date: 'Agustus', title: 'Peringatan Kemerdekaan', desc: `Upacara, lomba rakyat, dan kegiatan komunitas di ${region}.` },
      { date: 'September', title: 'Festival Budaya Lokal', desc: `Pameran seni tradisional, kuliner, dan produk kerajinan dari ${region}.` }
    ];
  }
});

function renderCalendar(){
  const container = document.getElementById('calendar-list');
  if(!container) return;
  const regions = Object.keys(REGIONS).sort();
  container.innerHTML = regions.map(r=>{
    const events = REGION_CALENDAR[r] || [];
    const eventsHtml = events.length ? `<ul>${events.map(ev=>`<li><strong>${ev.date}</strong> — <em>${ev.title}</em><div class="small">${ev.desc}</div></li>`).join('')}</ul>` : `<div class="small">Belum ada data kalender tradisi terperinci.</div>`;
    return `<div class="card" style="padding:12px"><strong style="color:#e6eef8">${r}</strong><div class="mt-6 small">${eventsHtml}</div></div>`;
  }).join('');
}

// Region images (now stored in `foto/` folder)
const REGION_IMAGES = {
  'Surabaya': 'foto/surabaya.jpg',
  'Malang': 'foto/malang.jpg',
  'Banyuwangi': 'foto/banyuwangi.jpg',
  'Jember': 'foto/jember.jpg',
  'Bandung': 'foto/bandung.jpg',
  'Sidoarjo': 'foto/sidoarjo.jpg',
  'Gresik': 'foto/gresik.webp',
  'Lamongan': 'foto/lamongan.webp',
  'Tuban': 'foto/tuban.jpg',
  'Bojonegoro': 'foto/bojonegoro.jpg',
  'Nganjuk': 'foto/nganjuk.webp',
  'Jombang': 'foto/jombang.webp',
  'Mojokerto': 'foto/mojokerto.jpeg',
  'Kediri': 'foto/kediri.jpg',
  'Blitar': 'foto/blitar.webp',
  'Tulungagung': 'foto/tulungagung.jpg',
  'Trenggalek': 'foto/trenggalek.webp',
  'Ponorogo': 'foto/ponorogo.png',
  'Pacitan': 'foto/pacitan.jpg',
  'Magetan': 'foto/magetan.jpg',
  'Ngawi': 'foto/Ngawi.jpg',
  'Madiun': 'foto/madiun.jpg',
  'Pamekasan': 'foto/pamekasan.jpg',
  'Sumenep': 'foto/sumenep.webp',
  'Sampang': 'foto/sampang.jpg',
  'Bangkalan': 'foto/bangkalan.jpg',
  'Probolinggo': 'foto/probolinggo.webp',
  'Lumajang': 'foto/lumajang.jpg',
  'Situbondo': 'foto/situbondo.webp',
  'Bondowoso': 'foto/bondowoso.webp',
  'Pasuruan': 'foto/pasuruan.webp'
};

// Rekomendasi wisata feature removed — related data omitted.

// Dialect clues
const DIALECT_CLUES = [
  {dialect:'Arek (Surabaya/Sidoarjo)', keywords:['rek','kok','ruh','lo','ee','ya','jal','ajak','ning','tak','opo','piye','puk','arek','poro','tak opo','lek','ra','endi','endi-endi','opo maneh','ancene','males','pucet','kepenak']},
  {dialect:'Mataraman (Madiun/Kediri)', keywords:['kowe','yo','lek','lho','ben','yen','lamun','apa','piye','opo','ndak','durung','awake','awakmu','padhang','peteng','medang','endang','endo','telu','papat','limo','nenem','pitu','wolu','sanga','sepuluh','mbok','mbokne','bocah','mas','mbak','pak','bu','mengko','mula','wiwit','neng','seben','sapiro','sakab']},
  {dialect:'Malangan', keywords:['kuceng','ngko','rek','kowe','yo','jangan','tulung','mangga','piye','opo','ndi','ndene','sampe','tulak','tekan','iku','kuwi','iki','endi','entok','karep','kepingin','emang','kenapa','ngape','ora','ben','yen','nang','ning','tumut','sumunut','metu','bali','weruh','tekan','sampai','bareng','soyo','sakbebare','seng','kena','kudu','musti','kudu','tenaga','gawean','kerjaan']},
  {dialect:'Madura', keywords:['bunten','kula','la','ak','kak','pas','ngguya','ke','ben','engga','reng','koloran','jarangna','parange','taon','sone','karana','jaro','coba','sakerat','se-iket','takena','patakena','baen','toman','baji','bejau','bejauwi','sepu','lopok','rempe','terang','jerang','koloran','sobar','sobara','mardika','mardikah','bangga','aengga','enggek','bibu','biyuk','bapak','ombak','tampo','tanggan','tangan','opo','napa','ngapa','punde','ora','enggak','tarunggan','tarungan','tagal','tandanya','tandak','tandakan']},
  {dialect:'Osing (Banyuwangi)', keywords:['isun','sira','kowe','isin','kulo','aku','kamu','dia','situ','siro','kami','kalian','opo','nopo','endi','ndi','piye','niye','pundi','nundi','yen','ben','lamun','manawa','lambe','lembeh','mangga','mangge','payek','panik','jenge','jange','uyah','urah','taneuh','tanauh','dunya','disa','isad','lembih','langghi','arak','barak','turah','turih','surat','kirim','wacan','bacaan']},
  {dialect:'Probolinggo', keywords:['kowe','yo','lek','ben','yen','piye','opo','ndi','rayu','rayuan','mayu','mbok','mbakne','mas','pak','bu','nyang','nyang-nyang','rak','e','rek','jal','wis','wuz','isun','kula','layah','eneng','aneng','entok','metu','metu-an','bali','balik','kerja','kerjahan','gawean','tangis','tangisan','kengkel','kuweke','kuwanan','kuwose','kuwose-kuwose']},
  {dialect:'Jember', keywords:['rek','kok','ruh','lo','ee','kowe','yo','lek','ben','yen','piye','opo','ndi','mate','matean','nggeblak','nggeblag','jengkol','jambul','jamboan','makan','bakso','bakso-baksan','ngape','ngapa','kenapa','napa','ragi','ragiyan','ketemu','ketuman','salto','salto-an','jampok','jempolkan']},
  {dialect:'Lumajang', keywords:['rek','kok','ruh','lo','ee','piye','opo','ndi','kowe','yo','lek','ben','yen','mate','matean','ngentot','gencet','gencetan','jepang','jepangan','jangka','jangkah','karep','kepingin','teken','tekeman','salto','saltoan','jampok','jempolkan','gawean','kerjaan']},
  {dialect:'Situbondo', keywords:['kowe','yo','lek','ben','yen','piye','opo','ndi','ruh','rek','kok','ee','lo','mate','matean','nggeblak','nggeblag','jengkol','jambul','jamboan','entok','ketemu','ketuman','salto','saltoan','jampok','jempolkan','gawean','kerjaan','karep','kepingin']},
  {dialect:'Bondowoso', keywords:['rek','kok','ruh','lo','ee','piye','opo','ndi','kowe','yo','lek','ben','yen','mate','matean','nggeblak','nggeblag','jengkol','jambul','jamboan','entok','ketemu','ketuman','salto','saltoan','jampok','jempolkan','gawean','kerjaan']},
  {dialect:'Banyuwangi Alt', keywords:['isun','sira','kowe','isin','kulo','mangga','mangge','payek','panik','jenge','jange','uyah','urah','taneuh','tanauh','dunya','disa','isad','lembih','langghi','arak','barak','turah','turih','surat','kirim','wacan','bacaan']},
  {dialect:'Lamongan', keywords:['rek','kok','ruh','lo','ee','piye','opo','ndi','kowe','yo','lek','ben','yen','mate','matean','nggeblak','nggeblag','jengkol','jambul','jamboan','entok','ketemu','ketuman','salto','saltoan','jampok','jempolkan','gawean','kerjaan']},
  {dialect:'Gresik', keywords:['rek','kok','ruh','lo','ee','piye','opo','ndi','kowe','yo','lek','ben','yen','mate','matean','nggeblak','nggeblag','jengkol','jambul','jamboan','entok','ketemu','ketuman','salto','saltoan','jampok','jempolkan']},
  {dialect:'Tuban', keywords:['rek','kok','ruh','lo','ee','piye','opo','ndi','kowe','yo','lek','ben','yen','mate','matean','nggeblak','nggeblag','jengkol','jambul','jamboan','entok','ketemu','ketuman','salto','saltoan','jampok','jempolkan']}
];

// Foods
const FOODS = [
  {name:'Soto Lamongan',mood:['hangat','pedas']},
  {name:'Lontong Kupang (Surabaya)',mood:['hangat','ringan']},
  {name:'Rawon Surabaya',mood:['hangat','pedas']},
  {name:'Perkedel Goreng (Surabaya)',mood:['ringan','manis']},
  {name:'Tahu Goreng Sidoarjo',mood:['pedas','ringan']},
  {name:'Bakso Malang',mood:['hangat','ringan']},
  {name:'Biji Salak Malang',mood:['manis','ringan']},
  {name:'Apel Malang',mood:['manis','ringan']},
  {name:'Perkedel Kentang Malang',mood:['ringan','pedas']},
  {name:'Rujak Cingur',mood:['pedas','manis']},
  {name:'Ikan Bakar Banyuwangi',mood:['pedas','hangat']},
  {name:'Tinutuan Banyuwangi',mood:['hangat','ringan']},
  {name:'Cakalang Fufu',mood:['pedas','hangat']},
  {name:'Nasi Kuning Jember',mood:['hangat','pedas']},
  {name:'Telur Asin Jember',mood:['manis','ringan']},
  {name:'Rengginang Jember',mood:['pedas','ringan']},
  {name:'Kacang Goreng Jember',mood:['pedas','ringan']},
  {name:'Bandrek Bandung',mood:['hangat','manis']},
  {name:'Oncom Goreng Bandung',mood:['pedas','ringan']},
  {name:'Tahu Goreng Bandung',mood:['pedas','ringan']},
  {name:'Tahu Campur Gresik',mood:['hangat','pedas']},
  {name:'Petis Gresik',mood:['pedas','manis']},
  {name:'Wingko Babat',mood:['manis','ringan']},
  {name:'Kue Lapis Gresik',mood:['manis','ringan']},
  {name:'Nasi Kuning Jombang',mood:['hangat','pedas']},
  {name:'Perkedel Goreng Jombang',mood:['ringan','manis']},
  {name:'Bakso Kuning Jombang',mood:['hangat','pedas']},
  {name:'Gethuk Kediri',mood:['manis','ringan']},
  {name:'Singkong Goreng Kediri',mood:['pedas','ringan']},
  {name:'Bubur Manado Kediri',mood:['hangat','pedas']},
  {name:'Pecel Madiun',mood:['pedas','hangat']},
  {name:'Nasi Goreng Madiun',mood:['pedas','hangat']},
  {name:'Tempe Goreng Madiun',mood:['pedas','ringan']},
  {name:'Tahu Sumedang',mood:['hangat','ringan']},
  {name:'Nasi Ulam Pasuruan',mood:['pedas','hangat']},
  {name:'Ikan Campur Pasuruan',mood:['hangat','pedas']},
  {name:'Rempeyek Pasuruan',mood:['pedas','ringan']},
  {name:'Bakso Lumajang',mood:['hangat','ringan']},
  {name:'Nasi Campur Lumajang',mood:['hangat','pedas']},
  {name:'Tempe Goreng Lumajang',mood:['pedas','ringan']},
  {name:'Pecel Probolinggo',mood:['pedas','hangat']},
  {name:'Gado-gado Probolinggo',mood:['pedas','hangat']},
  {name:'Ikan Bakar Probolinggo',mood:['pedas','hangat']},
  {name:'Soto Madura',mood:['hangat','pedas']},
  {name:'Ikan Asap Madura',mood:['pedas','hangat']},
  {name:'Bakso Madura',mood:['hangat','ringan']},
  {name:'Tahu Goreng Madura',mood:['pedas','ringan']},
  {name:'Nasi Kuning Tuban',mood:['hangat','pedas']},
  {name:'Ikan Bakar Tuban',mood:['pedas','hangat']},
  {name:'Gabus Goreng Tuban',mood:['pedas','ringan']},
  {name:'Nasi Goreng Blitar',mood:['pedas','hangat']},
  {name:'Tempe Goreng Blitar',mood:['pedas','ringan']},
  {name:'Bakso Blitar',mood:['hangat','ringan']},
  {name:'Nasi Ulam Ponorogo',mood:['pedas','hangat']},
  {name:'Pecel Ponorogo',mood:['pedas','hangat']},
  {name:'Gado-gado Ponorogo',mood:['pedas','hangat']},
  {name:'Tinutuan Situbondo',mood:['hangat','ringan']},
  {name:'Ikan Bakar Situbondo',mood:['pedas','hangat']},
  {name:'Bakso Situbondo',mood:['hangat','ringan']},
  {name:'Nasi Kuning Bondowoso',mood:['hangat','pedas']},
  {name:'Pecel Bondowoso',mood:['pedas','hangat']},
  {name:'Ikan Asap Bondowoso',mood:['pedas','hangat']},
  {name:'Bakso Bojonegoro',mood:['hangat','ringan']},
  {name:'Nasi Goreng Bojonegoro',mood:['pedas','hangat']},
  {name:'Tempe Goreng Bojonegoro',mood:['pedas','ringan']},
  {name:'Nasi Kuning Nganjuk',mood:['hangat','pedas']},
  {name:'Pecel Nganjuk',mood:['pedas','hangat']},
  {name:'Bakso Nganjuk',mood:['hangat','ringan']}
];

// ==================== FUNCTIONS ==================== //

// Render city cards dynamically from REGIONS
// ==================== RENDER FUNCTIONS ==================== //


// Dashboard-related carousel and CTA handlers removed.

// Featured/recent/gallery for dashboard removed (dashboard feature deleted)

function goToRegion(city) {
  showPage('map');
  showRegion(city);
  document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
  document.getElementById('nav-map').classList.add('active');
}

function renderCityGrid(){
  const container = document.getElementById('city-grid');
  if(!container) return;
  const keys = Object.keys(REGIONS).sort();
  container.innerHTML = keys.map(k=>{
    const seed = k.toLowerCase().replace(/\s+/g,'-');
    const fallback = `https://picsum.photos/seed/${seed}/300/180`;
    const imgUrl = REGION_IMAGES[k] || fallback;
    // add onerror fallback to handle missing files in `foto/` folder
    return `<div class="city-card" data-region="${k}"><img src="${imgUrl}" alt="Foto ${k}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'"><div class="city-label">${k}</div></div>`
  }).join('');
}

// Search/filter handler for regions
function initRegionSearch(){
  const searchInput = document.getElementById('search-region');
  if(searchInput){
    searchInput.addEventListener('input', function(){
      const query = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.city-card');
      let visibleCount = 0;
      cards.forEach(card => {
        const regionName = card.getAttribute('data-region').toLowerCase();
        if(regionName.includes(query)){
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      if(visibleCount === 0 && query.length > 0){
        console.info('Tidak ada hasil untuk: ' + query);
      }
    });
  }
}

// Show region info
function showRegion(name){
  // Info daerah tidak lagi ditampilkan di main view, hanya di popup overlay
  // Fungsi ini bisa dikosongkan atau digunakan untuk keperluan lain
  // document.getElementById('region-info').innerHTML = '';
  return;
}

// Pan map to region
function mapPanToRegion(region){
  try{
    const map = window._gmapsMap;
    const coords = window._REGION_COORDS && window._REGION_COORDS[region];
    const polygon = window._eastJatimPolygon;
    const infoWindow = window._infoWindow;
    if(!map || !coords) return;
    const latLng = new google.maps.LatLng(coords.lat, coords.lng);
    if(google.maps.geometry && google.maps.geometry.poly && polygon){
      const inside = google.maps.geometry.poly.containsLocation(latLng, polygon);
      if(!inside){
        if(infoWindow){ infoWindow.setContent('<div class="small">Koordinat berada di luar batas Jawa Timur</div>'); infoWindow.setPosition(latLng); infoWindow.open(map); setTimeout(()=>infoWindow.close(),1500); }
        return;
      }
    }
    map.panTo(latLng);
    map.setZoom(11);
  }catch(e){console.warn('mapPanToRegion error',e)}
}

// Show embedded map for region
function showEmbeddedMapForRegion(region){
  const coords = (window._REGION_COORDS && window._REGION_COORDS[region]) || null;
  let src = '';
  if(coords){
    src = `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=13&output=embed`;
  } else {
    src = `https://www.google.com/maps?q=${encodeURIComponent(region + ', Jawa Timur')}&z=11&output=embed`;
  }

  const info = (window.REGIONS && window.REGIONS[region]) || null;
  let overlay = document.getElementById('map-iframe-overlay');
  if(overlay){
    const iframe = overlay.querySelector('iframe');
    if(iframe) iframe.src = src;
    const infoNode = overlay.querySelector('.map-iframe-info');
    if(infoNode) infoNode.innerHTML = buildRegionInfoHTML(region, info, coords);
    overlay.style.display = 'flex';
    return;
  }

  overlay = document.createElement('div');
  overlay.id = 'map-iframe-overlay';
  overlay.className = 'map-iframe-overlay';
  overlay.innerHTML = `
    <div class="map-iframe-panel">
      <div class="map-iframe-header">
        <div class="title">Peta: ${region}</div>
        <div>
          <button class="close-btn" id="map-iframe-close">Tutup</button>
        </div>
      </div>
      <div class="map-iframe-content">
        <div class="map-iframe-body"><iframe src="${src}" loading="lazy" allowfullscreen></iframe></div>
        <div class="map-iframe-info">
          ${buildRegionInfoHTML(region, info, coords)}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  // prevent background scrolling while overlay is open
  document.body.classList.add('modal-open');

  document.getElementById('map-iframe-close').addEventListener('click', function(){
    const el = document.getElementById('map-iframe-overlay');
    if(el) {
      el.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
  overlay.addEventListener('click', function(ev){
    if(ev.target === overlay){
      overlay.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
}

// Build region info HTML
function buildRegionInfoHTML(region, info, coords){
  // Use REGION_ESTIMATES as the authoritative source for displayed fields.
  const est = (typeof REGION_ESTIMATES !== 'undefined' && REGION_ESTIMATES[region]) ? REGION_ESTIMATES[region] : null;
  // Helper to render list or fallback text for a field
  function renderList(title, items, fallback) {
    if(items && items.length) return `<div class="small" style="margin-top:8px"><strong>${title}:</strong></div><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
    return `<div class="small" style="margin-top:8px"><strong>${title}:</strong> ${fallback}</div>`;
  }

  const foods = renderList('Makanan Khas', est && est.foods, `Belum ada data spesifik untuk ${region}`);
  const trad = renderList('Tradisi Lokal', est && est.traditions, `Belum ada data spesifik untuk ${region}`);
  const clothing = est && est.clothing ? `<div class="small" style="margin-top:8px"><strong>Pakaian Adat:</strong></div><ul><li>${est.clothing}</li></ul>` : `<div class="small" style="margin-top:8px"><strong>Pakaian Adat:</strong> Belum ada data spesifik untuk ${region}</div>`;
  const history = est && est.history ? `<div class="small" style="margin-top:8px"><strong>Sejarah:</strong> ${est.history}</div>` : `<div class="small" style="margin-top:8px"><strong>Sejarah:</strong> Ringkasan sejarah singkat ${region} belum tersedia</div>`;
  const trivia = est && est.trivia ? `<div class="small" style="margin-top:6px;color:var(--muted)">${est.trivia}</div>` : '';

  const population = est && est.population ? `<div class="small" style="margin-top:8px"><strong>Populasi:</strong> ${est.population}</div>` : `<div class="small" style="margin-top:8px"><strong>Populasi:</strong> Perkiraan populasi ${region}</div>`;
  const area = est && est.area ? `<div class="small" style="margin-top:6px"><strong>Luas:</strong> ${est.area}</div>` : `<div class="small" style="margin-top:6px"><strong>Luas:</strong> Perkiraan luas wilayah ${region}</div>`;
  const attractions = renderList('Atraksi Unggulan', est && est.attractions, `Belum ada daftar atraksi untuk ${region}`);
  const website = est && est.website ? `<div class="small" style="margin-top:8px"><strong>Website/Info:</strong> <a href="${est.website}" target="_blank" rel="noopener noreferrer">${est.website}</a></div>` : `<div class="small" style="margin-top:8px"><strong>Website/Info:</strong> Tidak tersedia</div>`;

  const openHref = coords ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}` : `https://www.google.com/maps?q=${encodeURIComponent(region + ', Jawa Timur')}`;

  return `
    <h3 style="margin-bottom:6px">${region}</h3>
    ${trivia}
    ${population}
    ${area}
    ${attractions}
    ${foods}
    ${trad}
    ${clothing}
    ${history}
    ${website}
    <hr style="margin:14px 0 10px 0;border:0;border-top:1px solid #333;">
    <a class="open-native" href="${openHref}" target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>
  `;
}

// Rekomendasi Wisata feature removed — rendering functions deleted.

// Page navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-' + pageId).style.display = 'block';
}

// Google Maps initialization
function initMap() {
  const centerJatim = { lat: -7.5, lng: 112.5 };
  const mapEl = document.getElementById('map');
  if(!mapEl) return;
  
  const map = new google.maps.Map(mapEl, {
    center: centerJatim,
    zoom: 8
  });
  window._gmapsMap = map;

  const eastJatimCoords = [
    { lat: -6.0500, lng: 111.2000 },
    { lat: -6.2000, lng: 111.6000 },
    { lat: -6.4500, lng: 112.0500 },
    { lat: -6.6500, lng: 112.4500 },
    { lat: -6.9000, lng: 112.8500 },
    { lat: -7.1500, lng: 113.2000 },
    { lat: -7.4000, lng: 113.6000 },
    { lat: -7.6500, lng: 114.0000 },
    { lat: -7.9000, lng: 114.3000 },
    { lat: -8.1500, lng: 114.6500 },
    { lat: -8.4500, lng: 114.9000 },
    { lat: -8.7500, lng: 114.7000 },
    { lat: -9.0500, lng: 114.3500 },
    { lat: -9.3500, lng: 113.9500 },
    { lat: -9.6500, lng: 113.3000 },
    { lat: -9.4000, lng: 112.7000 },
    { lat: -9.0500, lng: 112.2000 },
    { lat: -8.6500, lng: 111.9000 },
    { lat: -8.1500, lng: 111.6500 },
    { lat: -7.6500, lng: 111.5000 },
    { lat: -7.1500, lng: 111.3500 },
    { lat: -6.7000, lng: 111.2500 },
    { lat: -6.2000, lng: 111.2000 }
  ];

  const eastJatimPolygon = new google.maps.Polygon({
    paths: eastJatimCoords,
    strokeColor: '#ffb703',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ffb703',
    fillOpacity: 0.06,
    clickable: false
  });
  eastJatimPolygon.setMap(map);

  const bounds = new google.maps.LatLngBounds();
  eastJatimCoords.forEach(c => bounds.extend(c));
  map.setOptions({ restriction: { latLngBounds: bounds, strictBounds: true } });
  map.fitBounds(bounds);

  const REGION_COORDS = {
    'Surabaya': { lat: -7.2575, lng: 112.7521 },
    'Sidoarjo': { lat: -7.4461, lng: 112.7181 },
    'Gresik': { lat: -7.1570, lng: 112.6527 },
    'Lamongan': { lat: -7.1283, lng: 112.4246 },
    'Tuban': { lat: -6.8938, lng: 112.0350 },
    'Bojonegoro': { lat: -7.1529, lng: 111.8870 },
    'Mojokerto': { lat: -7.4720, lng: 112.4470 },
    'Malang': { lat: -7.9797, lng: 112.6304 },
    'Batu': { lat: -7.8742, lng: 112.5190 },
    'Lumajang': { lat: -8.1265, lng: 113.2030 },
    'Probolinggo': { lat: -7.7540, lng: 113.2150 },
    'Pasuruan': { lat: -7.6540, lng: 112.9036 },
    'Kediri': { lat: -7.8667, lng: 112.0117 },
    'Blitar': { lat: -8.0946, lng: 112.1507 },
    'Jombang': { lat: -7.5369, lng: 112.2365 },
    'Nganjuk': { lat: -7.5840, lng: 111.9270 },
    'Madiun': { lat: -7.6306, lng: 111.5164 },
    'Magetan': { lat: -7.6627, lng: 111.3276 },
    'Ngawi': { lat: -7.4222, lng: 111.4338 },
    'Banyuwangi': { lat: -8.2196, lng: 114.3698 },
    'Bondowoso': { lat: -7.9420, lng: 114.2410 },
    'Situbondo': { lat: -7.6670, lng: 114.0100 },
    'Jember': { lat: -8.1719, lng: 113.7033 },
    'Ponorogo': { lat: -7.8680, lng: 111.4680 },
    'Pacitan': { lat: -8.2100, lng: 111.1370 },
    'Trenggalek': { lat: -8.0670, lng: 111.6410 },
    'Tulungagung': { lat: -8.0670, lng: 111.6230 },
    'Sampang': { lat: -7.1420, lng: 113.2320 },
    'Pamekasan': { lat: -7.1580, lng: 113.4850 },
    'Sumenep': { lat: -6.9140, lng: 113.9060 },
    'Bangkalan': { lat: -7.0600, lng: 112.1260 }
  };

  window._REGION_COORDS = REGION_COORDS;
  const infoWindow = new google.maps.InfoWindow();
  window._infoWindow = infoWindow;

  Object.keys(REGIONS).forEach(regionName => {
    const coords = REGION_COORDS[regionName];
    if(!coords) return;
    const marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: regionName
    });

    marker.addListener('click', () => {
      const data = REGIONS[regionName];
      const content = `
        <div style="min-width:200px">
          <strong>${regionName}</strong>
          <div class="small" style="margin-top:6px"><strong>Makanan:</strong> ${data.foods.join(', ')}</div>
          <div class="small" style="margin-top:6px"><strong>Tradisi:</strong> ${data.traditions.join(', ')}</div>
          <div class="small" style="margin-top:6px;color:#666">${data.trivia}</div>
        </div>`;
      const markerPos = marker.getPosition();
      let insideMarker = true;
      if(google.maps.geometry && google.maps.geometry.poly) {
        insideMarker = google.maps.geometry.poly.containsLocation(markerPos, eastJatimPolygon);
      }
      if(insideMarker) {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      } else {
        infoWindow.setContent('<div class="small">Marker di luar batas Jawa Timur</div>');
        infoWindow.open(map, marker);
        return;
      }

      const container = document.getElementById('region-info');
      if(container) container.innerHTML = `<div class="item"><strong>${regionName}</strong><div class="small">Makanan: ${data.foods.join(', ')}</div><div class="small">Tradisi: ${data.traditions.join(', ')}</div><div class="small" style="margin-top:6px;color:var(--muted)">${data.trivia}</div></div>`;
    });
  });

  window._eastJatimPolygon = eastJatimPolygon;

  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.getAttribute('data-region');
      const coords = REGION_COORDS[region];
      if(coords) {
        const latLng = new google.maps.LatLng(coords.lat, coords.lng);
        let canPan = true;
        if(google.maps.geometry && google.maps.geometry.poly) {
          canPan = google.maps.geometry.poly.containsLocation(latLng, eastJatimPolygon);
        }
        if(canPan) {
          map.panTo(latLng);
          map.setZoom(11);
        } else {
          infoWindow.setContent('<div class="small">Koordinat berada di luar batas Jawa Timur</div>');
          infoWindow.setPosition(latLng);
          infoWindow.open(map);
          setTimeout(()=>infoWindow.close(),1500);
        }
      }
    });
  });
  
  map.addListener('click', (ev) => {
    const latLng = ev.latLng;
    if(google.maps.geometry && google.maps.geometry.poly) {
      const inside = google.maps.geometry.poly.containsLocation(latLng, eastJatimPolygon);
      if(!inside) {
        infoWindow.setContent('<div class="small">Di luar batas Jawa Timur</div>');
        infoWindow.setPosition(latLng);
        infoWindow.open(map);
        setTimeout(()=>infoWindow.close(),1500);
      }
    }
  });
}

// ==================== EVENT LISTENERS ==================== //

// City card clicks
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.region-btn');
  if(btn) {
    const region = btn.getAttribute('data-region');
    showRegion(region);
    return;
  }
  const card = e.target.closest('.city-card');
  if(card && card.dataset && card.dataset.region) {
    const region = card.dataset.region;
    // Tampilkan overlay peta dan info budaya di sampingnya
    showEmbeddedMapForRegion(region);
    if(typeof mapPanToRegion === 'function') mapPanToRegion(region);
  }
});

// ==================== QUIZ DATA & FUNCTIONS ==================== //

// Quiz data
const quiz = [
  {q:'Mana makanan khas Lamongan?','a':['Soto Lamongan','Pecel Madiun','Rendang'],'c':0},
  {q:'Kata "kowe" berasal dari dialek?',a:['Arek','Mataraman','Madura'],'c':1},
  {q:'Apa yang khas dari Soto Lamongan?',a:['Koya','Santan kental','Kuah tomat'],'c':0}
]
let qindex=0, qscore=0

function startQuiz(){qindex=0;qscore=0;renderQuestion()}

function renderQuestion(){
  const area = document.getElementById('quiz-area')
  const q = quiz[qindex]
  area.innerHTML = `<div class="small"><strong>Soal ${qindex+1}:</strong> ${q.q}</div>` + q.a.map((opt,idx)=>`<div style="margin-top:8px"><button class="quiz-opt" data-idx="${idx}">${opt}</button></div>`).join('')
  document.querySelectorAll('.quiz-opt').forEach(b=>b.addEventListener('click',handleAnswer))
}

function handleAnswer(e){
  const idx = Number(e.target.dataset.idx)
  if(idx===quiz[qindex].c) qscore++
  qindex++
  if(qindex<quiz.length) renderQuestion()
  else finishQuiz()
}

function finishQuiz(){
  const res = document.getElementById('quiz-result')
  const area = document.getElementById('quiz-area')
  area.innerHTML = `<div class="small">Selesai! Skor: ${qscore}/${quiz.length}</div>`
  let message = 'Masih kaku, rek 😆'
  if(qscore>=2) message = 'Lumayan, wis ngerti budaya Jatim!'
  if(qscore===3) message = 'Wah, Arek Jatim Asli!'
  res.innerHTML = `<div class="item"><strong>${message}</strong></div>`
}

// ==================== EVENT LISTENERS (moved inside DOMContentLoaded) ==================== //

// ==================== ENHANCED QUIZ (interactive) ==================== //
const QUIZ_QUESTIONS = [
  { q: 'Mana makanan khas Lamongan?', a: ['Soto Lamongan','Pecel Madiun','Rendang'], c: 0, img: 'foto/lamongan.jpg', time: 15 },
  { q: 'Kata "kowe" berasal dari dialek?', a: ['Arek','Mataraman','Madura'], c: 1, img: '', time: 12 },
  { q: 'Apa yang khas dari Soto Lamongan?', a: ['Koya','Santan kental','Kuah tomat'], c: 0, img: '', time: 15 },
  { q: 'Kesenian mana yang terkenal di Ponorogo?', a: ['Reog','Kecak','Ondel-ondel'], c: 0, img: '', time: 12 },
  { q: 'Kota terbesar di Jawa Timur adalah?', a: ['Surabaya','Malang','Banyuwangi'], c: 0, img: 'foto/surabaya.jpg', time: 10 }
];

function shuffleArray(arr){ const a = arr.slice(); for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

let quizQuestions = [];
let quizIndex = 0, quizScore = 0, quizTimer = null, quizTimeLeft = 0;

function startQuiz(){
  quizQuestions = shuffleArray(QUIZ_QUESTIONS);
  quizIndex = 0;
  quizScore = 0;
  const startBtn = document.getElementById('btn-start-quiz');
  const retryBtn = document.getElementById('btn-restart-quiz');
  if(startBtn) startBtn.classList.add('hidden');
  if(retryBtn) retryBtn.classList.remove('hidden');
  renderQuizQuestion();
  updateQuizProgress();
}

function renderQuizQuestion(){
  const qEl = document.getElementById('quiz-question');
  const aEl = document.getElementById('quiz-answers');
  if(!quizQuestions || quizQuestions.length===0){ if(qEl) qEl.innerHTML='Tidak ada soal.'; return; }
  const qObj = quizQuestions[quizIndex];
  if(qEl) {
    qEl.innerHTML = '<div class="small"><strong>Soal '+(quizIndex+1)+' dari '+quizQuestions.length+'</strong></div>' +
      '<div style="margin-top:8px;font-weight:700">'+qObj.q+'</div>';
    if(qObj.img) qEl.innerHTML += '<img src="'+qObj.img+'" alt="soal image" style="width:100%;height:160px;object-fit:cover;border-radius:8px;margin-top:8px">';
  }
  if(aEl) {
    aEl.innerHTML = qObj.a.map((opt,idx)=>'<div style="margin-top:8px"><button class="quiz-opt btn" data-idx="'+idx+'" data-correct="'+(idx===qObj.c)+'">'+opt+'</button></div>').join('');
    document.querySelectorAll('.quiz-opt').forEach(b=>b.addEventListener('click', handleAnswerEnhanced));
  }
  startQuizTimer(qObj.time || 15);
  updateQuizProgress();
}

function handleAnswerEnhanced(e){
  if(!e || !e.currentTarget) return;
  stopQuizTimer();
  const btn = e.currentTarget;
  const correct = btn.dataset.correct === 'true';
  document.querySelectorAll('.quiz-opt').forEach(b=>b.disabled = true);
  if(correct){ quizScore++; btn.style.background = 'var(--accent)'; btn.style.color = '#08101a'; }
  else { btn.style.background = 'rgba(255,69,58,0.95)'; btn.style.color = '#fff'; }
  const correctBtn = Array.from(document.querySelectorAll('.quiz-opt')).find(b=>b.dataset.correct === 'true');
  if(correctBtn){ correctBtn.style.background = 'var(--accent)'; correctBtn.style.color = '#08101a'; }
  const fb = document.createElement('div'); fb.className = 'quiz-feedback ' + (correct ? 'correct' : 'wrong'); fb.textContent = correct ? 'Benar! 🎉' : 'Salah — jawaban yang benar telah ditandai.';
  const aEl = document.getElementById('quiz-answers'); if(aEl) aEl.appendChild(fb);
  setTimeout(()=>{ quizIndex++; if(quizIndex < quizQuestions.length) renderQuizQuestion(); else finishQuizEnhanced(); }, 1200);
}

function startQuizTimer(seconds){ stopQuizTimer(); quizTimeLeft = seconds; const timerEl = document.getElementById('quiz-timer'); if(timerEl) timerEl.textContent = 'Waktu: '+quizTimeLeft+'s'; quizTimer = setInterval(()=>{ quizTimeLeft--; if(timerEl) timerEl.textContent = 'Waktu: '+quizTimeLeft+'s'; const total = quizQuestions.length; const part = ((quizIndex)/total + ((seconds-quizTimeLeft)/seconds)/total)*100; const bar = document.getElementById('quiz-progress-bar'); if(bar) bar.style.width = Math.min(100, Math.round(part)) + '%'; if(quizTimeLeft <= 0){ stopQuizTimer(); const correctBtn = Array.from(document.querySelectorAll('.quiz-opt')).find(b=>b.dataset.correct === 'true'); if(correctBtn){ correctBtn.style.background = 'var(--accent)'; correctBtn.style.color = '#08101a'; } document.querySelectorAll('.quiz-opt').forEach(b=>b.disabled = true); const fb = document.createElement('div'); fb.className='quiz-feedback wrong'; fb.textContent='Waktu habis'; const aEl = document.getElementById('quiz-answers'); if(aEl) aEl.appendChild(fb); setTimeout(()=>{ quizIndex++; if(quizIndex < quizQuestions.length) renderQuizQuestion(); else finishQuizEnhanced(); }, 1000); } }, 1000); }

function stopQuizTimer(){ if(quizTimer) clearInterval(quizTimer); quizTimer = null; const timerEl = document.getElementById('quiz-timer'); if(timerEl) timerEl.textContent = ''; }

function updateQuizProgress(){ const bar = document.getElementById('quiz-progress-bar'); if(!bar || !quizQuestions || quizQuestions.length===0) return; const pct = Math.round((quizIndex / quizQuestions.length) * 100); bar.style.width = pct + '%'; }

function finishQuizEnhanced(){ stopQuizTimer(); const modal = document.getElementById('quiz-modal'); const body = document.getElementById('quiz-modal-body'); const percent = Math.round((quizScore / quizQuestions.length) * 100); let badgeHtml = ''; if(percent >= 80) badgeHtml = '<div class="badge great">Wah! Arek Jatim Asli</div>'; else if(percent >= 60) badgeHtml = '<div class="badge good">Lumayan!</div>'; else badgeHtml = '<div class="badge try">Coba lagi</div>'; if(body) body.innerHTML = '<div style="font-weight:700;font-size:18px">Skor Anda: '+quizScore+'/'+quizQuestions.length+' ('+percent+'%)</div><div class="mt-8">'+badgeHtml+'</div>'; if(modal){ modal.classList.remove('hidden'); modal.onclick = function(e){ if(e.target === modal) modal.classList.add('hidden'); } } const closeBtn = document.getElementById('quiz-modal-close'); const retryBtn = document.getElementById('quiz-modal-retry'); if(closeBtn) closeBtn.onclick = ()=>{ if(modal) modal.classList.add('hidden'); }; if(retryBtn) retryBtn.onclick = ()=>{ if(modal) modal.classList.add('hidden'); startQuiz(); }; const startBtn = document.getElementById('btn-start-quiz'); const restartBtn = document.getElementById('btn-restart-quiz'); if(startBtn) startBtn.classList.remove('hidden'); if(restartBtn) restartBtn.classList.add('hidden'); }

// Wire retry button (visible next to start)
document.addEventListener('click', function(e){ const r = e.target.closest && e.target.closest('#btn-restart-quiz'); if(r){ startQuiz(); } });


function setupEventListeners() {
  // Dialect Analyzer
  const dialectForm = document.getElementById('dialect-form');
  if(dialectForm) {
    dialectForm.addEventListener('submit',function(e){
      e.preventDefault();
      const txt = document.getElementById('txt-sentence').value.toLowerCase()
      const scores = {}
      DIALECT_CLUES.forEach(cl=>{scores[cl.dialect]=0;cl.keywords.forEach(k=>{if(txt.includes(k))scores[cl.dialect]+=1})})
      const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1])
      const best = sorted[0]
      const result = document.getElementById('dialect-result')
      if(best[1]===0){result.innerHTML=`<div class="small">Tidak terdeteksi: coba kalimat lain atau gunakan kosakata khas.</div>`;return}
      result.innerHTML = `<div class="item"><strong>Prediksi: ${best[0]}</strong><div class="small">Skor kemiripan: ${best[1]}</div><div class="small" style="margin-top:6px">Ciri: ${best[0].split(' ')[0]} biasanya memakai kata-kata khas: ${DIALECT_CLUES.find(d=>d.dialect===best[0]).keywords.join(', ')}</div></div>`
    });
  }

  // Kuliner Finder
  const foodForm = document.getElementById('food-form');
  if(foodForm) {
    foodForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const queryEl = document.getElementById('food-query');
      const q = (queryEl && queryEl.value) ? queryEl.value.toLowerCase().trim() : '';
      const target = document.getElementById('food-result');
      if(!q){
        if(target) target.innerHTML = '<div class="small">Masukkan kata kunci untuk mencari kuliner (nama atau daerah).</div>';
        return;
      }
      // If the query refers to a region, show only foods from that region.
      // Otherwise, match by food name or mood keywords.
      const matchedRegion = Object.keys(REGIONS).find(r => {
        const rn = r.toLowerCase();
        return rn === q || rn.includes(q) || q.includes(rn);
      });

      let matches = [];
      if (matchedRegion) {
        const regionFoods = REGIONS[matchedRegion].foods || [];
        // Try to enrich with existing FOODS entries (to preserve mood info when available)
        matches = regionFoods.map(foodName => {
          const found = FOODS.find(f => {
            const fname = (f.name||'').toLowerCase();
            return fname === foodName.toLowerCase() || fname.includes(foodName.toLowerCase());
          });
          return found || { name: foodName, mood: [] };
        });
      } else {
        // match by food name or mood keyword
        matches = FOODS.filter(f => {
          const name = (f.name||'').toLowerCase();
          const moodMatch = (f.mood||[]).some(m=> m.toLowerCase().includes(q));
          const nameMatch = name.includes(q);
          return nameMatch || moodMatch;
        });
      }
      if(!target) return;
      if(matches.length===0) {
        target.innerHTML = `<div class="small">Tidak ada hasil untuk "${q}". Coba gunakan kata lain atau nama daerah.</div>`;
      } else {
        target.innerHTML = `<div class="small" style="margin-bottom:10px;color:var(--accent)"><strong>Ditemukan ${matches.length} hasil untuk "${q}":</strong></div>` + matches.map(m=>`<div class="item"><strong>${m.name}</strong><div class="small">Cocok untuk mood: ${m.mood.join(', ')}</div></div>`).join('');
      }
    });
  }

  // Quiz button
  const btnStart = document.getElementById('btn-start-quiz');
  if(btnStart) {
    btnStart.addEventListener('click',startQuiz);
  }

  // Navigation
  const navMap = document.getElementById('nav-map');
  if(navMap) {
    navMap.addEventListener('click',function(e){
      e.preventDefault();
      showPage('map');
      showRegion('Lamongan');
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  // nav-wisata removed (rekomendasi wisata feature deleted)

  const navDialect = document.getElementById('nav-dialect');
  if(navDialect) {
    navDialect.addEventListener('click',function(e){
      e.preventDefault();
      showPage('dialect');
      document.getElementById('txt-sentence').focus();
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  const navFood = document.getElementById('nav-food');
  if(navFood) {
    navFood.addEventListener('click',function(e){
      e.preventDefault();
      showPage('food');
      const qEl = document.getElementById('food-query'); if(qEl) qEl.focus();
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  const navQuiz = document.getElementById('nav-quiz');
  if(navQuiz) {
    navQuiz.addEventListener('click',function(e){
      e.preventDefault();
      showPage('quiz');
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  const navCalendar = document.getElementById('nav-calendar');
  if(navCalendar) {
    navCalendar.addEventListener('click',function(e){
      e.preventDefault();
      showPage('calendar');
      document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
      this.classList.add('active');
    });
  }

  // nav-dashboard removed; no handler needed

  // Chart (if exists)
  if(document.getElementById('chartUsage')){
    const ctx = document.getElementById('chartUsage').getContext('2d')
    const chart = new Chart(ctx,{type:'bar',data:{labels:['Dialek','Kuliner','Peta','Quiz'],datasets:[{label:'Hits (sim)',data:[45,30,20,15],tension:0.4}]},options:{scales:{y:{beginAtZero:true}},plugins:{legend:{display:false}}}})
  }
}

// ==================== INITIALIZATION ==================== //

// Initialize when DOM is ready
function initApp() {
  console.log('Initializing app...');
  
  // Default page: show map (dashboard removed)
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  const mapPage = document.getElementById('page-map');
  if (mapPage) mapPage.classList.add('active');
  // mark map nav active if present
  const navMap = document.getElementById('nav-map');
  if(navMap) navMap.classList.add('active');
  renderCityGrid();
  initRegionSearch();
  setupEventListeners();
  // Dashboard removed; no carousel to initialize
  renderCalendar();
  console.log('App initialized');
}

// Wrap initialization in DOMContentLoaded to ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM already loaded
  initApp();
}

// Expose Google Maps error handler
window.showMapError = function(msg){
  const mapEl = document.getElementById('map');
  if(!mapEl) return;
  mapEl.innerHTML = '<div style="padding:18px;color:#ffefc3;background:rgba(0,0,0,0.12);border-radius:8px;text-align:center"><strong>Google Maps gagal dimuat</strong><div style="margin-top:8px;color:#ffd;">'+msg+'</div></div>';
};

window.gm_authFailure = function(){
  const msg = 'Autentikasi Google Maps gagal — periksa API key, billing, dan referer restrictions.';
  console.error('gm_authFailure:', msg);
  window.showMapError(msg + ' Lihat console untuk detail.');
};

setTimeout(function(){
  if(!(window.google && window.google.maps)){
    let guess = 'Kemungkinan: API key belum diganti, billing belum aktif, atau pembatasan referer pada API key.';
    guess += ' Cek console (F12) untuk pesan error spesifik seperti MissingKeyMapError atau RefererNotAllowedMapError.';
    console.warn('Google Maps did not initialize within timeout:', guess);
    window.showMapError(guess + ' (Lihat console untuk pesan lengkap)');
  }
}, 6000);

// ==================== WELCOME OVERLAY + INTERACTIVE EFFECTS ==================== //
(function(){
  const overlay = document.getElementById('welcome-overlay');
  if(!overlay) return;
  const typedEl = document.getElementById('welcome-typed');
  const btnSurprise = document.getElementById('btn-surprise');
  const btnClose = document.getElementById('btn-close');
  const canvas = document.getElementById('confetti-canvas');
  const shownKey = 'jn_welcome_seen_v1';

  function typeText(el, text, delay=35){
    el.textContent = '';
    let i = 0;
    const id = setInterval(()=>{
      el.textContent += text.charAt(i++);
      if(i >= text.length) clearInterval(id);
    }, delay);
  }

  // Allow forcing the welcome overlay via URL parameter or hash
  // Examples: `?welcome=1` or `#welcome` will force it to show
  const params = new URLSearchParams(location.search);
  const forceShow = params.get('welcome') === '1' || location.hash === '#welcome';
  if (forceShow) {
    localStorage.removeItem(shownKey);
  }

  // show overlay only if user belum lihat (or forced)
  if(!localStorage.getItem(shownKey)){
    overlay.setAttribute('aria-hidden','false');
    typeText(typedEl, 'Halo! Mari jelajahi Jawa Timur dengan cara yang menyenangkan ✨', 28);
  } else {
    overlay.setAttribute('aria-hidden','true');
  }

  btnClose && btnClose.addEventListener('click', ()=>{
    overlay.setAttribute('aria-hidden','true');
    localStorage.setItem(shownKey,'1');
  });

  btnSurprise && btnSurprise.addEventListener('click', ()=>{
    launchConfetti(canvas);
  });

  // particle trail for fun (lightweight)
  document.addEventListener('mousemove', function(e){ createParticle(e.clientX, e.clientY); });

  function createParticle(x,y){
    const p = document.createElement('div');
    p.className = 'particle';
    const hue = Math.floor(25 + Math.random()*50);
    p.style.background = `hsl(${hue} 100% 60%)`;
    p.style.left = x + 'px'; p.style.top = y + 'px';
    document.body.appendChild(p);
    const dx = (Math.random()-0.5) * 80; const dy = -40 - Math.random()*80;
    p.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(.2)`, opacity: 0 }
    ], { duration: 900 + Math.random()*400, easing: 'cubic-bezier(.2,.9,.2,1)' });
    setTimeout(()=> p.remove(), 1400);
  }

  // simple canvas confetti (no external libs)
  function launchConfetti(c){
    if(!c) return;
    const ctx = c.getContext('2d');
    const W = c.width = window.innerWidth;
    const H = c.height = window.innerHeight;
    const pieces = [];
    for(let i=0;i<120;i++){
      pieces.push({ x: Math.random()*W, y: Math.random()*-H, w: 6+Math.random()*12, h: 6+Math.random()*12, r: Math.random()*360, vx: (Math.random()-0.5)*6, vy: Math.random()*4+2, color: `hsl(${Math.random()*50+10} 100% 60%)` });
    }
    let raf;
    function draw(){
      ctx.clearRect(0,0,W,H);
      pieces.forEach(p=>{
        p.x += p.vx; p.y += p.vy; p.vy += 0.06;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r*Math.PI/180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
      });
      if(pieces.every(p=>p.y > H + 50)){ cancelAnimationFrame(raf); ctx.clearRect(0,0,W,H); return; }
      raf = requestAnimationFrame(draw);
    }
    draw();
    localStorage.setItem(shownKey,'1');
  }

  window.addEventListener('resize', ()=>{ if(canvas){ canvas.width = window.innerWidth; canvas.height = window.innerHeight } });
})();
