# Vergi takvimi ve duyurular nasıl güncellenir?

FOZ Defter, internete her bağlandığında bu depodaki `vergi-takvimi.json` dosyasını okur.
Bu dosyayı GitHub'da değiştirdiğinizde **uygulama güncellemesi gerekmeden** tüm kullanıcılarda:
- vergi son günleri değişir,
- yeni tarihler eklenir,
- duyurular uygulama içinde kart ve bildirim olarak görünür.

Kullanıcıdan hiçbir veri alınmaz; uygulama sadece bu dosyayı indirir.

## Düzenleme (telefondan da yapılabilir)
1. github.com/fozdemiroglu/FOZ-Defter → `vergi-takvimi.json` dosyasına girin.
2. Kalem simgesine (Edit) basın.
3. Değişikliği yapın → **Commit changes**.
4. Bir iki dakika içinde yayına girer. Kullanıcılar uygulamayı bir sonraki açışlarında görür.

İpucu: `"surum"` alanını her değişiklikte o günün tarihiyle güncelleyin; uygulamanın Ayarlar ekranında görünür.

## 1) Son gün değişikliği (bayram, uzatma)
`tarih_degisiklikleri` listesine ekleyin:

```json
"tarih_degisiklikleri": [
  { "tur": "kdv", "donem": "2026-10", "son_gun": "2026-12-01", "not": "Bayram nedeniyle uzatıldı" }
]
```

- `tur`: `kdv`, `muhtasar`, `gecici`, `gelir` (yıllık gelir vergisi), `gelir2` (2. taksit)
- `donem`: beyanın ait olduğu ay, `YYYY-AA`
  - KDV ve muhtasar: o ay (Ekim 2026 → `2026-10`). 3 aylık muhtasarda çeyreğin son ayı.
  - Geçici vergi: çeyreğin son ayı (3. dönem → `2026-09`)
  - Yıllık gelir vergisi: yılın Aralık ayı (2026 yılı → `2026-12`)
- `son_gun`: yeni son gün, `YYYY-AA-GG`
- `not`: uygulamada tarihin yanında görünür

## 2) Ek tarih
Takvimde olmayan bir tarih (ör. bir af/yapılandırma son günü):

```json
"ek_tarihler": [
  { "id": "yapilandirma-2026", "baslik": "Vergi yapılandırma başvurusu son gün", "son_gun": "2026-12-31", "not": "Başvuru e-Devlet'ten" }
]
```

## 3) Duyuru
Ana ekranda kart olarak görünür; bildirim izni verenlere bir kez bildirim gider:

```json
"duyurular": [
  { "id": "kdv-uzatma-kasim", "baslik": "KDV beyannamesi uzatıldı", "mesaj": "Ekim dönemi KDV beyannamesi 1 Aralık'a uzatıldı.", "baslangic": "2026-11-20", "bitis": "2026-12-01" }
]
```

- `id` her duyuru için farklı olmalı (aynı id ikinci kez gösterilmez).
- `baslangic` / `bitis` arasında gösterilir.

## Dikkat
- JSON'da virgüller önemli: liste elemanları arasında virgül olur, son elemandan sonra olmaz.
- Emin değilseniz değişikliği Claude'a yaptırabilirsiniz.

## Sınır
Web sürümünde bildirimler uygulama açıldığında kontrol edilir. Android sürümünde bu dosya
arka planda günde bir kez okunacak ve bildirimler uygulama kapalıyken de gelecek.
