CREATE TABLE level (id_level SERIAL NOT NULL, nama_level VARCHAR(255) NOT NULL, PRIMARY KEY (id_level));

CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    nama_admin VARCHAR(50) NOT NULL,
    id_level INT,
    FOREIGN KEY (id_level) REFERENCES level(id_level)
);

CREATE TABLE tarif (
    id_tarif INT PRIMARY KEY,
    daya INT,
    tarifperkwh DECIMAL(10, 2) NOT NULL
);

CREATE TABLE pelanggan (
    id_pelanggan INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    nomor_kwh VARCHAR(50) NOT NULL,
    nama_pelanggan VARCHAR(100) NOT NULL,
    alamat VARCHAR(255) NOT NULL,
    id_tarif INT NOT NULL.BIGINT,
    FOREIGN KEY (id_tarif) REFERENCES tarif(id_tarif)
);

CREATE TABLE penggunaan (
    id_penggunaan INT AUTO_INCREMENT PRIMARY KEY,
    id_penggunaan INT NOT NULL,
    bulan VARCHAR(20) NOT NULL,
    tahun INT NOT NULL,
    meter_awal INT NOT NULL,
    meter_akhir INT NOT NULL,
    FOREIGN KEY (id_penggunaan) REFERENCES penggunaan(id_penggunaan)
);

CREATE TABLE tagihan (
    id_tagihan INT AUTO_INCREMENT PRIMARY KEY,
    id_penggunaan INT NOT NULL,
    id_pelanggan INT NOT NULL,
    jumlah_meter INT NOT NULL,
    total_tagihan DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Belum Bayar',
    FOREIGN KEY (id_penggunaan) REFERENCES penggunaan(id_penggunaan),
    FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan)
);

CREATE TABLE pembayaran (
    id_pembayaran INT AUTO_INCREMENT PRIMARY KEY,
    id_tagihan INT NOT NULL,
    id_pelanggan INT NOT NULL,
    tanggal_pembayaran DATE NOT NULL,
    bulan_bayar VARCHAR(20) NOT NULL,
    biaya_admin INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_tagihan) REFERENCES tagihan(id_tagihan)
    FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan)
);