/**
 * Format angka numerik ke format Rupiah standar Indonesia
 * Contoh: 28000 -> "Rp 28.000"
 */
function formatRupiah(amount) {
  if (typeof amount !== 'number') {
    amount = Number(amount) || 0;
  }
  return 'Rp ' + amount.toLocaleString('id-ID');
}

module.exports = {
  formatRupiah
};
