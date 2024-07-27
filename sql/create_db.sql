CREATE DATABASE pascabayar_db;

INSERT INTO public.level (nama_level) VALUES ('Admin'),("Petugas");
INSERT INTO public.pelanggan (id_pelanggan, username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif) VALUES (1, 'yogaprasetya', 'yogaprasetya', '12345', 'Yoga Prasetya', 'Kebon Jeruk', 1), (2, 'garymolen', 'garymolen', '12367', 'Gary Molen', 'Kebon Nanas', 3);