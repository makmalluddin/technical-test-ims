// File untuk berkomunikasi dengan db
import pool from '../config/db.js';

// Fungsi post data ke db 
const saveDataToDb = async (contractData, paymentSchedule) => {
  const connection = await pool.getConnection();
  try {
    // Memulai transaksi dengan db
    await connection.beginTransaction();

    // Insert data ke tabel KONTRAK
    await connection.query(
      `INSERT INTO KONTRAK (KONTRAK_NO, CLIENT_NAME, OTR, DP, JANGKA_WAKTU, BUNGA, POKOK_UTANG)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        contractData.kontrakNo,
        contractData.clientName,
        contractData.otr,
        contractData.dpAmount,
        contractData.jangkaWaktu,
        contractData.bungaPercent,
        contractData.pokokUtang
      ]
    );

    // Insert bulk data ke tabel JADWAL_ANGSURAN
    for (const item of paymentSchedule) {
      await connection.query(
        `INSERT INTO JADWAL_ANGSURAN (KONTRAK_NO, ANGSURAN_KE, ANGSURAN_PER_BULAN, TANGGAL_JATUH_TEMPO)
         VALUES (?, ?, ?, ?)`,
        [item.kontrakNo, item.angsuranKe, item.angsuranPerBulan, item.tanggalJatuhTempo]
      );
    }

    // Commit jika berhasil 
    await connection.commit();
    return { contractData, paymentSchedule };

  } catch (error) {
    // Rollback jika gagal 
    await connection.rollback();
    throw error;

  } finally {
    connection.release();
  }
};

// Fungsi get by nomor kontrak 
const getContractByNo = async (contractNo) => {
  const [contract] = await pool.query(`SELECT * FROM KONTRAK WHERE KONTRAK_NO = ?`, [contractNo]);
  const [schedule] = await pool.query(
    `SELECT ANGSURAN_KE, ANGSURAN_PER_BULAN, TANGGAL_JATUH_TEMPO, PAID_STATUS 
     FROM JADWAL_ANGSURAN WHERE KONTRAK_NO = ? ORDER BY ANGSURAN_KE ASC`,
    [contractNo]
  );

  if (contract.length === 0) return null;

  return {
    ...contract[0],
    JADWAL_ANGSURAN: schedule
  };
};

// Fungsi untuk delete data by nomor kontrak 
const deleteContractByNo = async (contractNo) => {
  const [result] = await pool.query(
    `DELETE FROM KONTRAK WHERE KONTRAK_NO = ?`,
    [contractNo]
  );
  return result.affectedRows > 0;
};

// Fungsi update status pembayaran 
const updatePaymentStatus = async (contractNo, angsuranKe, paidStatus, paidDate) => {
  const [result] = await pool.query(
    `UPDATE JADWAL_ANGSURAN 
     SET PAID_STATUS = ?, PAID_DATE = ? 
     WHERE KONTRAK_NO = ? AND ANGSURAN_KE = ?`,
    [paidStatus, paidDate, contractNo, angsuranKe]
  );

  return result.affectedRows > 0;
};

export { saveDataToDb, getContractByNo, deleteContractByNo, updatePaymentStatus };
