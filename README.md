<hr>
<div align="center">
  <h1>Simulasi Angsuran Kredit</h1>
  <p>
    <strong>Aplikasi web-based untuk generate angsuran yang perlu dibayarkan Client</strong>
  </p>
</div>

<hr>
<div align="center">
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/210f301d-5009-47c5-b588-2cc12860ee6c" />
</div>
<hr>

Aplikasi ini dibangun bagian dari *technical test* untuk posisi **Junior IT Developer**. Proyek ini bertujuan untuk mensimulasikan perhitungan cicilan bulanan menggunakan skema bunga flat tahunan, serta mengelola data ringkasan kontrak dan jadwal angsuran pelanggan dalam satu tampilan visual.

## 🛠️ Tech Stack

- **Frontend:** Vite, React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Containerization:** Docker & Docker Compose

## 🚀 Fitur Utama

- **Simulasi Angsuran:** Kalkulasi pokok utang dan angsuran bulanan berdasarkan OTR, DP, dan Jangka Waktu (Bulan).
- **Jadwal Pembayaran:** *Generate* otomatis daftar jatuh tempo dan angsuran setiap bulan.
- **Update & Delete:** Fitur tambahan untuk menghapus kontrak yang dibatalkan dan memperbarui status pembayaran angsuran.

## 🏁 Get Started

Instalasi dan Penggunaan Aplikasi

<details>
<summary><b>Instalasi</b></summary>
Jalankan aplikasi via docker, pastikan Docker sudah terinstal.
<br>
  
- Clone repository:
   ```sh
   git clone https://github.com/makmalluddin/technical-test-ims.git

- Masuk ke folder
  ```sh
   cd technical-test-ims

- Di dalam folder backend, rename .env.example jadi .env dan isi sesuai value 
- Jalankan docker
  ```sh
  docker compose up -d --build
- Buka aplikasi pada http://localhost:5173
- Buka backend pada http://localhost:5000/api/health

</details>
<details>
<summary><b>Panduan Aplikasi</b></summary>
<br>

1. Isi data sesuai field dan submit
   <div align="center">
   <img width="700"alt="image" src="https://github.com/user-attachments/assets/6f5e1f33-05cf-4a79-83af-67b8e56df7d0" />
   </div>
2. Otomatis ter generate Ringkasan Kontrak & Simulasi Angsuran
   <div align="center">
     <img width="594" alt="image" src="https://github.com/user-attachments/assets/a95240fa-8895-495c-bd3e-f44623a3dbc6" />

   </div>
3. Anda dapat konfirmasi apakah angsuran dibayarkan setiap bulan
   <div align="center">
     <img width="372" height="254" alt="image" src="https://github.com/user-attachments/assets/2cf6d1e3-c6c1-428d-8149-0f75ec917736" />

   </div>
4. Anda juga dapat hapus kontrak client
   <div align="center">
     <img width="462" height="167" alt="image" src="https://github.com/user-attachments/assets/38e63e3e-f176-4519-ae27-a992e0351b7d" />

   </div>
</details>

## 🔗 Daftar API

Berikut adalah daftar *endpoint* utama pada backend aplikasi ini:

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Cek status API |
| `POST` | `/api/kontrak/simulasi` | Membuat simulasi kredit baru & jadwal angsuran |
| `GET` | `/api/kontrak/:contractNo` | Mengambil daftar kontrak by nomor contract |
| `DELETE` | `/api/kontrak/:contractNo` | Menghapus kontrak beserta jadwal angsurannya |
| `PATCH` | `/api/kontrak/:contractNo/angsuran/:ansuranKe`| Memperbarui status bayar angsuran bulanan |


## 📂 File Structure
<pre>
technical-test-ims/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controller/
│   │   │   ├── controller.js
│   │   │   └── repoController.js
│   │   ├── route/
│   │   │   └── route.js
│   │   └── service/
│   │       └── creditSerice.js
│   ├── Dockerfile
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ContractSummary.jsx
│   │   │   ├── ScheduleTable.jsx
│   │   │   └── SimulasiForm.jsx
│   │   ├── hooks/
│   │   │   └── useCreditSimulation.js
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── database/
│   └── db-schema.sql
└── README.md
</pre>
