CREATE TRIGGER pembayaran_after_tagihan
after insert on tagihan
for each row
execute function tambah_pembayaran()