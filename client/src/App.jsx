import useCreditSimulation from "./hooks/useCreditSimulation";
import ContractSummary from "./components/ContractSummary";
import SimulasiForm from "./components/SimulasiForm";
import ScheduleTable from "./components/ScheduleTable";

function App() {
  const {
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
  } = useCreditSimulation();

  return (
    <div className="p-6 max-w-5xl mx-auto font-mono">
      <h1 className="text-2xl font-bold mb-2">Simulasi Kredit & Angsuran</h1>
      <p className="text-sm mb-6">Technical test - Muhammad Akmalluddin</p>

      {errorMsg && <div className="border border-red-600 text-red-600 p-3 mb-4">Error: {errorMsg}</div>}

      <SimulasiForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      {result && (
        <>
          <ContractSummary
            contractData={result.contractData}
            onDelete={handleDelete}
          />

          <ScheduleTable
            paymentSchedule={result.paymentSchedule}
            onOpenUpdateModal={(item) => {
              setSelectedAngsuran(item);
              setUpdateForm({
                paidStatus: item.paidStatus,
                paidDate: item.paidDate || new Date().toISOString().split('T')[0]
              });
            }}
            selectedAngsuran={selectedAngsuran}
            onCloseModal={() => setSelectedAngsuran(null)}
            updateForm={updateForm}
            setUpdateForm={setUpdateForm}
            handleUpdatePayment={handleUpdatePayment}
          />
        </>
      )}
    </div>
  );
}

export default App;
