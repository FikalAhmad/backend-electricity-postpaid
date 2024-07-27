CREATE OR REPLACE FUNCTION after_insert_penggunaan()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO tagihan (id_pelanggan, bulan, tahun, jumlah_meter, tarif_per_kwh, total_bayar)
    VALUES (NEW.id_pelanggan, NEW.bulan, NEW.tahun, NEW.meter_akhir - NEW.meter_awal, 1000, (NEW.meter_akhir - NEW.meter_awal) * 1000);
    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_after_insert_penggunaan
AFTER INSERT ON penggunaan
FOR EACH ROW
EXECUTE FUNCTION after_insert_penggunaan();

DELIMITER //
CREATE TRIGGER after_insert_penggunaan
AFTER INSERT ON penggunaan
FOR EACH ROW
BEGIN
    DECLARE jumlah_meter INT;
    DECLARE tarif DECIMAL(10,2);
    DECLARE total DECIMAL(10,2);

    SET jumlah_meter = NEW.meter_akhir - NEW.meter_awal;
    SELECT tarif_per_kwh INTO tarif FROM tarif WHERE daya = (SELECT daya FROM pelanggan WHERE pelanggan_id = NEW.pelanggan_id);
    SET total = jumlah_meter * tarif;

    INSERT INTO tagihan (penggunaan_id, jumlah_meter, total_tagihan) VALUES (NEW.penggunaan_id, jumlah_meter, total);
END //
DELIMITER ;


