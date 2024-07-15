CREATE OR REPLACE FUNCTION hitung_total_penggunaan(bulan INT, tahun INT)
RETURNS INT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (
        SELECT SUM(meter_akhir - meter_awal)
        FROM penggunaan
        WHERE bulan = $1 AND tahun = $2
    );
END;
$$;
DELIMITER //
CREATE FUNCTION total_penggunaan_bulan(pelanggan_id INT, bulan VARCHAR(20), tahun INT) RETURNS INT
BEGIN
    DECLARE total_penggunaan INT;
    SELECT SUM(meter_akhir - meter_awal) INTO total_penggunaan
    FROM penggunaan
    WHERE pelanggan_id = pelanggan_id AND bulan = bulan AND tahun = tahun;
    RETURN total_penggunaan;
END //
DELIMITER ;