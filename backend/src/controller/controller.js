import calculateCredit from "../service/creditSerice.js";
import { saveDataToDb, getContractByNo, deleteContractByNo, updatePaymentStatus } from "./repoController.js"

const createSimulasi = async (req, res) => {
  try {
    // Ambil variable dari request
    const { clientName, otr, dpPercent, jangkaWaktu } = req.body;

    // Make sure data lengkap 
    if (!clientName || !otr || !dpPercent || !jangkaWaktu) {
      return res.status(400).json({
        status: 'error',
        message: 'Lengkapi field: clientName, otr, dpPercent, dan jangkaWaktu'
      });
    }

    // Hitung logika simulasi
    const { contractData, paymentSchedule } = calculateCredit({
      clientName,
      otr,
      dpPercent,
      loanPeriode: jangkaWaktu
    });

    // Simpan data to DB 
    await saveDataToDb(contractData, paymentSchedule);

    // Kirim response balik 
    res.status(201).json({
      status: 'success',
      message: 'Simulasi kredit dibuat',
      data: {
        contractData,
        paymentSchedule
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Fungsi untuk get detail contract 
const getContractDetail = async (req, res) => {
  try {
    // Ambil data 
    const { contractNo } = req.params;
    const data = await getContractByNo(contractNo);

    if (!data) {
      return res.status(404).json({ status: 'error', message: 'Kontrak tidak ditemukan' });
    }

    // kirim response balik  
    res.json({ status: 'success', data });
  }

  catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Fungsi delete data by nomor kontrak 
const deleteContract = async (req, res) => {
  try {
    const { contractNo } = req.params;
    const isDeleted = await deleteContractByNo(contractNo);

    if (!isDeleted) {
      return res.status(404).json({
        status: 'error',
        message: `Kontrak ${contractNo} tidak ditemukan`
      });
    }

    res.json({
      status: 'success',
      message: `Kontrak ${contractNo} dan jadwal angsurannya berhasil dihapus`
    });
  }

  catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Fungsi update pembayaran 
const updatePayment = async (req, res) => {
  try {
    const { contractNo, angsuranKe } = req.params;
    const { paidStatus, paidDate } = req.body;

    // Make sure paidStatus tidak kosong  
    if (typeof paidStatus !== 'boolean') {
      return res.status(400).json({
        status: 'error',
        message: 'Field paidStatus belum diisi'
      });
    }

    // Make sure paidDate tidak kosong 
    if (!paidDate || paidDate.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Field paidDate belum diisi'
      });
    }

    // Update payment status 
    const isUpdated = await updatePaymentStatus(contractNo, Number(angsuranKe), paidStatus, paidDate);

    if (!isUpdated) {
      return res.status(404).json({
        status: 'error',
        message: `Data angsuran ke-${angsuranKe} untuk kontrak ${contractNo} tidak ditemukan`
      });
    }

    res.json({
      status: 'success',
      message: `Status angsuran ke-${angsuranKe} untuk kontrak ${contractNo} diperbarui`
    });
  }

  catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export { createSimulasi, getContractDetail, deleteContract, updatePayment };
