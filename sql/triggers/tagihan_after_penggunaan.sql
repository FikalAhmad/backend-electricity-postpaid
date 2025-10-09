CREATE TRIGGER tagihan_after_penggunaan
after insert on penggunaan
for each row
execute function tambah_tagihan()