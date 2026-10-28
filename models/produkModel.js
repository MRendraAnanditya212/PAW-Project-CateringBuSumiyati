/**
 * Model Data Produk - Catering Bu Sumiyati
 * Mengelola data dan operasi produk makanan & layanan katering.
 * Saat ini menggunakan data statis in-memory yang nantinya dapat diintegrasikan
 * langsung ke database MySQL pada pertemuan berikutnya tanpa mengubah struktur controller.
 */

const daftarProduk = [
  {
    id: 1,
    nama: 'Paket Nasi Box Ayam Bakar Madu',
    kategori: 'Nasi Box',
    deskripsi: 'Ayam bakar rempah madu legit khas Solo, nasi putih pulen, tahu tempe bacem, lalapan segar, sambal bajak, dan buah pisang.',
    harga: 28000,
    stok: 150,
    rating: 4.9,
    terjual: 1250,
    gambar: '/images/nasi-box-ayam-madu.jpg',
    keunggulan: 'Menu favorit acara kantor dan gathering kampus, rasa manis gurih meresap.'
  },
  {
    id: 2,
    nama: 'Paket Nasi Kotak Rendang Daging Sapi',
    kategori: 'Nasi Box',
    deskripsi: 'Daging sapi pilihan dimasak rendang autentik Minang 6 jam, gulai kapau nangka muda, sambal ijo, telur balado, dan kerupuk udang.',
    harga: 38000,
    stok: 85,
    rating: 5.0,
    terjual: 890,
    gambar: '/images/nasi-kotak-rendang.jpg',
    keunggulan: 'Daging sangat empuk, bumbu rempah kaya rempah premium nusantara.'
  },
  {
    id: 3,
    nama: 'Paket Prasmanan Tradisional Joglo (Min. 50 Porsi)',
    kategori: 'Prasmanan',
    deskripsi: 'Nasi liwet wangi, ayam kremes gurih, gurame filet asam manis, sop kimlo bakso ikan, sambal goreng ati krecek, es puter kelapa kopyor.',
    harga: 65000,
    stok: 25,
    rating: 4.8,
    terjual: 320,
    gambar: '/images/prasmanan-joglo.jpg',
    keunggulan: 'Termasuk meja saji, pemanas chafing dish, perlengkapan makan, dan 2 staf pramusaji.'
  },
  {
    id: 4,
    nama: 'Snack Box Premium Syukuran',
    kategori: 'Snack Box',
    deskripsi: 'Lemper ayam bakar pulen, risoles ragout mayo, pastel basah telur daging, bolu gulung keju lembut, dan air mineral botol 330ml.',
    harga: 16500,
    stok: 200,
    rating: 4.9,
    terjual: 2400,
    gambar: '/images/snack-box-syukuran.jpg',
    keunggulan: 'Kemasan box eksklusif laminasi food grade, cocok untuk seminar & pengajian.'
  },
  {
    id: 5,
    nama: 'Nasi Tumpeng Kuning Komplit (15-20 Porsi)',
    kategori: 'Tumpeng',
    deskripsi: 'Tumpeng kerucut kuning harum gurih kelapa, ayam suwir pedas manis, perkedel kentang lembut, orek tempe kacang, telur dadar rawis, urap sayur, dan hiasan wortel/cabai cantik.',
    harga: 450000,
    stok: 12,
    rating: 5.0,
    terjual: 145,
    gambar: '/images/tumpeng-komplit.jpg',
    keunggulan: 'Pusat perhatian untuk peresmian, ulang tahun, dan selamatan dengan ucapan custom.'
  },
  {
    id: 6,
    nama: 'Paket Tumpeng Mini Selamatan Personal',
    kategori: 'Tumpeng',
    deskripsi: 'Nasi tumpeng mini personal dengan lauk ayam goreng serundeng, mie goreng kecap, telur balado separuh, kering kentang mustofa, dan timun garnish.',
    harga: 35000,
    stok: 120,
    rating: 4.9,
    terjual: 780,
    gambar: '/images/tumpeng-mini.jpg',
    keunggulan: 'Wadah mika kubah transparan higienis dengan pita hias, praktis dibagikan ke tetangga.'
  }
];

const ProdukModel = {
  /**
   * Mengambil semua produk
   * @returns {Array} Daftar semua produk
   */
  getAll() {
    return daftarProduk;
  },

  /**
   * Mengambil produk berdasarkan ID
   * @param {number|string} id 
   * @returns {Object|null}
   */
  getById(id) {
    const numericId = parseInt(id, 10);
    return daftarProduk.find(item => item.id === numericId) || null;
  },

  /**
   * Mengambil produk berdasarkan kategori
   * @param {string} kategori 
   * @returns {Array}
   */
  getByKategori(kategori) {
    if (!kategori || kategori.toLowerCase() === 'semua') {
      return daftarProduk;
    }
    return daftarProduk.filter(
      item => item.kategori.toLowerCase() === kategori.toLowerCase()
    );
  },

  /**
   * Menambah produk baru ke array statis
   * @param {Object} data 
   * @returns {Object} Produk yang baru ditambahkan
   */
  add(data) {
    const newId = daftarProduk.length > 0 ? Math.max(...daftarProduk.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      nama: data.nama || 'Produk Baru',
      kategori: data.kategori || 'Umum',
      deskripsi: data.deskripsi || '',
      harga: Number(data.harga) || 0,
      stok: Number(data.stok) || 0,
      rating: 5.0,
      terjual: 0,
      keunggulan: data.keunggulan || 'Higienis dan lezat.'
    };
    daftarProduk.push(newProduct);
    return newProduct;
  }
};

module.exports = ProdukModel;
