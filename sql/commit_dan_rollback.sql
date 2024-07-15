-- Perintah commit setelah insert data tarif
INSERT INTO tarif (daya, tarif_per_kwh) VALUES (2200, 1690.00);
COMMIT;

-- Perintah rollback setelah menghapus satu data pelanggan
DELETE FROM pelanggan WHERE pelanggan_id = 2;
ROLLBACK;