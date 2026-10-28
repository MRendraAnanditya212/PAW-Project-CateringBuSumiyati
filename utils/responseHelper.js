/**
 * Helper terstandarisasi untuk response REST API JSON
 */

function success(res, data, message = 'Berhasil mengambil data', statusCode = 200) {
  return res.status(statusCode).json({
    sukses: true,
    pesan: message,
    data: data
  });
}

function error(res, message = 'Terjadi kesalahan pada server', statusCode = 500) {
  return res.status(statusCode).json({
    sukses: false,
    pesan: message,
    waktu: new Date().toISOString()
  });
}

module.exports = {
  success,
  error
};
