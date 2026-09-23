import { useState } from 'react';
import apiService from '../services/apiService';

function useCreditSimulation() {
  const [formData, setFormData] = useState({
    clientName: 'SUGUS',
    otr: 240000000,
    dpPercent: 20,
    jangkaWaktu: 18
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [selectedAngsuran, setSelectedAngsuran] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    paidStatus: false,
    paidDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'clientName' ? value : Number(value)
    }));
  };

  // Create simulasi angsuran ke backend 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const data = await apiService.createSimulasi(formData);
      setResult(data);
    }

    catch (err) {
      setErrorMsg(err.message);
    }

    finally {
      setLoading(false);
    }
  };

  // Fungsi untuk refresh data jika update pembayaran 
  const refreshData = async (contractNo) => {
    try {
      const data = await apiService.getContractDetail(contractNo);
      setResult(data);
    }

    catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Fungsi handle delete data 
  const handleDelete = async () => {
    const contractNo = result?.contractData?.kontrakNo;
    if (!contractNo) return;
    if (!window.confirm(`Yakin ingin menghapus kontrak ${contractNo}?`)) return;

    setLoading(true);
    try {
      const message = await apiService.deleteContract(contractNo);
      alert(message);
      setResult(null);
    }

    catch (err) {
      setErrorMsg(err.message);
    }

    finally {
      setLoading(false);
    }
  };

  // 4. Update Pembayaran
  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    if (!selectedAngsuran) return;

    try {
      const message = await apiService.updatePaymentStatus(
        selectedAngsuran.kontrakNo,
        selectedAngsuran.angsuranKe,
        updateForm
      );

      alert(message);
      setSelectedAngsuran(null);
      await refreshData(selectedAngsuran.kontrakNo);
    }

    catch (err) {
      setErrorMsg(err.message);
    }
  };

  return {
    formData,
    result,
    loading,
    errorMsg,
    selectedAngsuran,
    updateForm,
    setSelectedAngsuran,
    setUpdateForm,
    handleChange,
    handleSubmit,
    handleDelete,
    handleUpdatePayment
  };
};

export default useCreditSimulation;
