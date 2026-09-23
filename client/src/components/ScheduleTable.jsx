// Component untuk menampilkan tabel angsuran 

function ScheduleTable({
  paymentSchedule,
  onOpenUpdateModal,
  selectedAngsuran,
  onCloseModal,
  updateForm,
  setUpdateForm,
  handleUpdatePayment
}) {
  // Make sure fungsi return null jika paymentSchedule gagal dimuat 
  if (paymentSchedule.length === 0) return null;

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold mb-4">Jadwal Angsuran Bulanan</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="border-b">
              <th className="border p-2">Ke</th>
              <th className="border p-2">No. Kontrak</th>
              <th className="border p-2">Angsuran</th>
              <th className="border p-2">Jatuh Tempo</th>
              <th className="border p-2">Tgl Bayar</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paymentSchedule.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="border p-2">{item.angsuranKe}</td>
                <td className="border p-2">{item.kontrakNo}</td>
                <td className="border p-2">Rp {item.angsuranPerBulan?.toLocaleString('id-ID')}</td>
                <td className="border p-2">{item.tanggalJatuhTempo}</td>
                <td className="border p-2">{item.paidDate || '-'}</td>
                <td className="border p-2 font-bold">
                  {item.paidStatus ? 'LUNAS' : 'BELUM BAYAR'}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => onOpenUpdateModal(item)}
                    className="border px-2 py-1 text-xs cursor-pointer"
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal untuk update pembayaran */}
      {selectedAngsuran && (
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="border border-black bg-white p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Update Angsuran Ke-{selectedAngsuran.angsuranKe}
            </h3>
            <form onSubmit={handleUpdatePayment}>
              <div className="mb-4">
                <label className="block text-sm mb-1">Status Pembayaran</label>
                <select
                  value={updateForm.paidStatus}
                  onChange={(e) =>
                    setUpdateForm((prev) => ({ ...prev, paidStatus: e.target.value === 'true' }))
                  }
                  className="w-full border p-2"
                >
                  <option value="false">Belum Bayar</option>
                  <option value="true">Lunas</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-1">Tanggal Bayar (paidDate)</label>
                <input
                  type="date"
                  value={updateForm.paidDate}
                  onChange={(e) =>
                    setUpdateForm((prev) => ({ ...prev, paidDate: e.target.value }))
                  }
                  required
                  className="w-full border p-2"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="border px-4 py-2 text-sm cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="border border-black px-4 py-2 text-sm font-bold cursor-pointer"
                >
                  Simpan Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;
