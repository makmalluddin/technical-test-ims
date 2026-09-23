const BASE_URL = 'http://localhost:5000/api/kontrak';

const apiService = {
  // Create simulasi kredit 
  async createSimulasi(formData) {
    const response = await fetch(`${BASE_URL}/simulasi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message);
    return {
      contractData: resData.data.contractData,
      paymentSchedule: resData.data.paymentSchedule
    };
  },

  // Get data kontrak dan angsuran kredit by nomor kontrak  
  async getContractDetail(contractNo) {
    const response = await fetch(`${BASE_URL}/${contractNo}`);
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message);

    // Sesuaikan data dengan format fe 
    return {
      contractData: {
        kontrakNo: resData.data.KONTRAK_NO,
        clientName: resData.data.CLIENT_NAME,
        otr: resData.data.OTR,
        dpAmount: resData.data.DP,
        pokokUtang: resData.data.POKOK_UTANG,
        bungaPercent: resData.data.BUNGA,
        jangkaWaktu: resData.data.JANGKA_WAKTU,
        angsuranPerBulan: resData.data.JADWAL_ANGSURAN[0]?.ANGSURAN_PER_BULAN
      },
      paymentSchedule: resData.data.JADWAL_ANGSURAN.map((item) => ({
        kontrakNo: resData.data.KONTRAK_NO,
        angsuranKe: item.ANGSURAN_KE,
        angsuranPerBulan: item.ANGSURAN_PER_BULAN,
        tanggalJatuhTempo: item.TANGGAL_JATUH_TEMPO,
        paidStatus: Boolean(item.PAID_STATUS),
        paidDate: item.PAID_DATE
      }))
    };
  },

  // Delete data by nomor kontrak  
  async deleteContract(contractNo) {
    const response = await fetch(`${BASE_URL}/${contractNo}`, {
      method: 'DELETE'
    });
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message);
    return resData.message;
  },

  // Update data payment khusus paid_status dan paid_date 
  async updatePaymentStatus(contractNo, angsuranKe, payload) {
    const response = await fetch(`${BASE_URL}/${contractNo}/angsuran/${angsuranKe}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message);
    return resData.message;
  }
};

export default apiService;
