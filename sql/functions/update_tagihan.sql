CREATE OR REPLACE FUNCTION update_tagihan()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    new_jumlah_meter INT;
BEGIN
    -- Hitung ulang jumlah pemakaian meter
    new_jumlah_meter := NEW.meter_akhir - NEW.meter_awal;

    -- Update data tagihan sesuai id_penggunaan
    UPDATE tagihan
    SET jumlah_meter = new_jumlah_meter
    WHERE id_penggunaan = NEW.id_penggunaan;

    RETURN NEW;
END;
$$;
