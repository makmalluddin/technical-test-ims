import { useState } from 'react';

function App() {
  // State Form Input
  const [formData, setFormData] = useState({
    clientName: 'SUGUS',
    otr: 240000000,
    dpPercent: 20,
    jangkaWaktu: 18
  });

  // State Hasil Response dari Backend
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handler Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'clientName' ? value : Number(value)
    }));
  };

  // Handler Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/kontrak/simulasi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Gagal memproses simulasi');
      }

      setResult(resData.data);
    }

    catch (err) {
      setErrorMsg(err.message);
    }

    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Simulasi Kredit & Angsuran</h1>
          <p className="text-slate-500 mt-1">Sistem Manajemen Kredit IMS Finance</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Input Data Simulasi</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Nama Client */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Nama Client
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                />
              </div>

              {/* OTR */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Harga OTR (Rp)
                </label>
                <input
                  type="number"
                  name="otr"
                  value={formData.otr}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                />
              </div>

              {/* DP % */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Uang Muka / DP (%)
                </label>
                <input
                  type="number"
                  name="dpPercent"
                  value={formData.dpPercent}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                />
              </div>

              {/* Jangka Waktu */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Tenor (Bulan)
                </label>
                <input
                  type="number"
                  name="jangkaWaktu"
                  value={formData.jangkaWaktu}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Memproses Simulasi...' : 'Hitung & Simpan Kredit'}
            </button>
          </form>

          {/* Pesan Error */}
          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              Error: {errorMsg}
            </div>
          )}
        </div>

        {/* Hasil Simulasi Card */}
        {result && (
          <div className="space-y-6">

            {/* Ringkasan Kontrak */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">
                Ringkasan Kontrak
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-6">
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block text-xs">No. Kontrak</span>
                  <span className="font-bold text-slate-800">{result.contractData?.kontrakNo}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block text-xs">Client</span>
                  <span className="font-bold text-slate-800">{result.contractData?.clientName}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block text-xs">Bunga</span>
                  <span className="font-bold text-slate-800">{result.contractData?.bungaPercent}%</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-slate-500 block text-xs">Tenor</span>
                  <span className="font-bold text-slate-800">{result.contractData?.jangkaWaktu} Bulan</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-4">
                <div>
                  <span className="text-slate-500 text-xs block">Harga OTR</span>
                  <span className="text-slate-800 font-semibold">
                    Rp {result.contractData?.otr?.toLocaleString('id-ID')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Uang Muka (DP)</span>
                  <span className="text-slate-800 font-semibold">
                    Rp {result.contractData?.dpAmount?.toLocaleString('id-ID')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Pokok Utang</span>
                  <span className="text-slate-800 font-semibold">
                    Rp {result.contractData?.pokokUtang?.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Angsuran Highlight */}
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg flex justify-between items-center">
                <span className="text-indigo-900 font-medium">Angsuran per Bulan</span>
                <span className="text-2xl font-bold text-indigo-700">
                  Rp {result.contractData?.angsuranPerBulan?.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Tabel Jadwal Angsuran */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 overflow-hidden">
              <h2 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">
                Jadwal Angsuran Bulanan
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b text-slate-600 text-xs uppercase tracking-wider">
                      <th className="p-3">Angsuran Ke</th>
                      <th className="p-3">No. Kontrak</th>
                      <th className="p-3">Nilai Angsuran</th>
                      <th className="p-3">Jatuh Tempo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm text-slate-700">
                    {result.paymentSchedule?.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="p-3 font-medium text-slate-900">{item.angsuranKe}</td>
                        <td className="p-3">{item.kontrakNo}</td>
                        <td className="p-3 font-semibold text-slate-800">
                          Rp {item.angsuranPerBulan?.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3">{item.tanggalJatuhTempo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
