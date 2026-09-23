// Component untuk input data simulasi kontrak 

function SimulasiForm({ formData, handleChange, handleSubmit, loading }) {
  return (
    <div className="border p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Input Data Simulasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Nama Client</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Harga OTR (Rp)</label>
            <input
              type="number"
              name="otr"
              value={formData.otr}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">DP (%)</label>
            <input
              type="number"
              name="dpPercent"
              value={formData.dpPercent}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Tenor (Bulan)</label>
            <input
              type="number"
              name="jangkaWaktu"
              value={formData.jangkaWaktu}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-black p-2 font-bold cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Memproses...' : 'Hitung & Simpan Kredit'}
        </button>
      </form>
    </div>
  );
};

export default SimulasiForm;
