CREATE TRIGGER after_update_penggunaan
after update on penggunaan
for each row
when(old.meter_awal is distinct from new.meter_awal or old.meter_akhir is distinct from new.meter_akhir)
execute function update_tagihan()