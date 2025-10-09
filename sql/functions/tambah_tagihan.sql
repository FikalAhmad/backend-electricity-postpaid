CREATE OR REPLACE FUNCTION tambah_tagihan()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    jumlah_meter INT;
BEGIN
    jumlah_meter := NEW.meter_akhir - NEW.meter_awal;

    INSERT INTO tagihan(id_penggunaan, id_pelanggan, bulan, tahun, jumlah_meter, status)
    VALUES (NEW.id_penggunaan, NEW.id_pelanggan, NEW.bulan, NEW.tahun, jumlah_meter, false);

    RETURN NEW;
END;
$$;
