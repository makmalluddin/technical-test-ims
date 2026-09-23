// File segala fungsi perhitungan

// Fungsi menghitung rate bunga
const getBungaRate = (loanPeriode) => {
  if (loanPeriode <= 12) return 12.0;
  if (loanPeriode <= 24) return 14.0;
  return 16.5;
};

// Fungsi generate contract number 
const getContractNumber = (initNumber = 1) => {
  let counter = initNumber;

  return () => {
    const number = counter++;
    const numberPad = String(number).padStart(5, '0')
    return `AGR${numberPad}`
  };
};
const generateContractNo = getContractNumber();

// Fungsi menghitung rincian kredit dan jadwal angsuran 
const calculateCredit = ({ clientName, otr, dpPercent, loanPeriode }) => {
  // Hitung variabel yang dibutuhkan angsuran 
  const dpAmount = (dpPercent / 100) * otr;
  const pokokUtang = otr - dpAmount;
  const bungaPercent = getBungaRate(loanPeriode);

  // Hitung angsuran perbulan 
  const totalBunga = pokokUtang * ((loanPeriode / 12) * bungaPercent) / 100;
  const totalUtang = pokokUtang + totalBunga;
  const angsuranPerBulan = Math.round(totalUtang / loanPeriode);

  // Generate contract number 
  const kontrakNo = generateContractNo();

  // Generate Jadwal Angsuran (Hardcode)
  const startDate = new Date('2024-01-25'); // Tanggal angsuran pertama
  const paymentSchedule = [];

  for (let i = 1; i <= loanPeriode; i++) {
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + (i - 1));

    paymentSchedule.push({
      kontrakNo,
      angsuranKe: i,
      angsuranPerBulan,
      tanggalJatuhTempo: dueDate.toISOString().split('T')[0]
    });
  }

  return {
    contractData: {
      kontrakNo,
      clientName,
      otr,
      dpAmount,
      pokokUtang,
      bungaPercent,
      jangkaWaktu: loanPeriode,
      angsuranPerBulan
    },
    paymentSchedule
  };
};

export default calculateCredit;
