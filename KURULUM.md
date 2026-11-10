# FOZ Defter - Ön Muhasebe · v0.2 test sürümü

## Bilgisayarda hızlı deneme
1. ZIP'i bir klasöre açın.
2. `index.html` dosyasına çift tıklayın (Chrome veya Edge önerilir).
3. "Örnek verilerle dene" düğmesiyle tüm ekranları gezin.

Not: Dosyadan açıldığında bildirimler ve "uygulama olarak yükle" çalışmaz. Tam deneme için GitHub Pages'i kullanın.

## Telefonda tam deneme (GitHub Pages, ücretsiz)
1. GitHub'da yeni bir depo açın, örneğin `foz-defter`.
2. Bu klasördeki tüm dosyaları deponun köküne yükleyin (index.html, sw.js, jsqr.js, manifest.webmanifest, ikonlar).
3. Settings → Pages → Branch: `main` / root → Save.
4. Birkaç dakika sonra adres hazır olur: `https://fozdemiroglu.github.io/foz-defter/`
5. Telefonda Chrome ile açın → menü → **Ana ekrana ekle**. Artık uygulama gibi açılır ve internetsiz çalışır.
6. Ayarlar → **Bildirim izni ver** → **Test bildirimi**.

## Test listesi
- [ ] Gider ve gelir girişi, KDV dahil/hariç hesaplaması
- [ ] Vadeli gider → Cari → Vadeler'de görünüyor mu?
- [ ] Borç/alacak ekle → kısmi ödeme → kalan bakiye → "Ödendi"
- [ ] Gerçekleşen ödeme tarihi doğru kaydediliyor mu?
- [ ] e-SMM: brütten nete ve netten brüte hesaplama, stopaj, KDV tevkifatı
- [ ] e-Arşiv/e-Fatura QR okutma (kamera ve görselden)
- [ ] Fiş fotoğrafı ekleme
- [ ] Sesli kayıt (Chrome) ve yazılı komut
- [ ] Kredi kartı: harcama karta, ödeme transfer olarak
- [ ] Bildirimler: vadesi 3 gün kalan bir kayıt girin ve uygulamayı açın
- [ ] Rapor → Excel indir → Excel'de açılıyor mu?
- [ ] Cari ekstre → yazdır / PDF
- [ ] Yedek al → Tüm verileri sil → Yedekten yükle

### v0.2 ile gelenler
- [ ] + → Vergi / SGK ödemesi: KDV tahakkukunu gir, son gün otomatik geliyor mu? "Bugün ödendi"
- [ ] Rapor → KDV özetinde "Beyan edilen" sütunu ve Vergi ve SGK ödemeleri tablosu
- [ ] Gelir formunda Belge türü ve Gelişmiş → KDV tevkifatı / stopaj, net tahsil hesabı
- [ ] Kategori seçince KDV oranı kendiliğinden geliyor mu? (Ayarlar → Kategoriler'den değiştirilebilir)
- [ ] Sesli kayıtta KDV ayrışıyor mu? ("Elektrik faturası 1.200 TL ödedim")
- [ ] Gider eklerken "Bu işlemi tekrarla" → Ayarlar → Tekrarlayan işlemler
- [ ] Ayarlar → Excel/CSV içe aktar (banka ekstresi CSV'si veya Excel)
- [ ] Ana sayfadaki yedek hatırlatması ve duyuru kartı

## Vergi takvimi ve duyurular
Bayram uzatması, ek tarih veya duyuru için `vergi-takvimi.json` dosyasını GitHub'da düzenleyin. Ayrıntılar: VERGI-TAKVIMI.md

## Bu test sürümünde olmayanlar (Android sürümüne kalanlar)
- Fiş üzerindeki yazıların otomatik okunması (ML Kit). Şimdilik QR kodu okunuyor, fiş fotoğrafı kayda ekleniyor.
- Uygulama kapalıyken zamanında gelen bildirimler. Şimdilik bildirimler uygulama açıldığında kontrol ediliyor.
- Taksitli kart harcamaları, döviz ve gram altın, teklif hazırlama, İngilizce dil, isteğe bağlı AI sohbet.

FOZ Analytics · Created by Fatih Özdemiroğlu · info@ozdemirogludanismanlik.com
