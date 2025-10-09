CREATE OR REPLACE FUNCTION tambah_pembayaran()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    total_bayar INT;
    tarifperkwh FLOAT;
BEGIN
    SELECT t.tarifperkwh INTO tarifperkwh
    FROM tarif t
    JOIN pelanggan p ON t.id_tarif = p.id_tarif
    WHERE p.id_pelanggan = NEW.id_pelanggan;

    total_bayar := NEW.jumlah_meter * tarifperkwh;

    INSERT INTO pembayaran(id_tagihan, id_pelanggan, tanggal_pembayaran, bulan_bayar, biaya_admin, total_bayar, id_user)
    VALUES (NEW.id_tagihan, NEW.id_pelanggan, CURRENT_DATE, NEW.bulan, 7000, total_bayar, 11);

    RETURN NEW;
END;
$$;
