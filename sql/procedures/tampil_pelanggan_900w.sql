CREATE OR REPLACE PROCEDURE tampilkan_pelanggan_900_watt()
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM pelanggan WHERE daya = 900;
END;
$$;

DELIMITER //
CREATE PROCEDURE pelanggan_daya_900()
BEGIN
    SELECT nama_pelanggan, alamat
    FROM pelanggan
    WHERE daya = 900;
END //
DELIMITER ;