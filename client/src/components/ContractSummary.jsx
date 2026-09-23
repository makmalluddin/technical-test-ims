// Component untuk menampilkan contract summary setelah input data 

function ContractSummary({ contractData, onDelete }) {
  if (!contractData) return null;

  return (
    <div className="border p-4 mb-6">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">Ringkasan Kontrak</h2>
        <button
          onClick={onDelete}
          className="border border-red-600 text-red-600 px-3 py-1 font-bold cursor-pointer"
        >
          Hapus Kontrak
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="border p-2">
          <span className="text-xs block">No. Kontrak</span>
          <span className="font-bold">{contractData.kontrakNo}</span>
        </div>
        <div className="border p-2">
          <span className="text-xs block">Client</span>
          <span className="font-bold">{contractData.clientName}</span>
        </div>
        <div className="border p-2">
          <span className="text-xs block">Bunga</span>
          <span className="font-bold">{contractData.bungaPercent}%</span>
        </div>
        <div className="border p-2">
          <span className="text-xs block">Tenor</span>
          <span className="font-bold">{contractData.jangkaWaktu} Bulan</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t pt-4 mb-4">
        <div>
          <span className="text-xs block">OTR</span>
          <span className="font-bold">Rp {contractData.otr?.toLocaleString('id-ID')}</span>
        </div>
        <div>
          <span className="text-xs block">DP</span>
          <span className="font-bold">Rp {contractData.dpAmount?.toLocaleString('id-ID')}</span>
        </div>
        <div>
          <span className="text-xs block">Pokok Utang</span>
          <span className="font-bold">Rp {contractData.pokokUtang?.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="border p-3 text-center">
        <span className="text-sm block">Angsuran / Bulan</span>
        <span className="text-2xl font-bold">
          Rp {contractData.angsuranPerBulan?.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  );
};

export default ContractSummary;
