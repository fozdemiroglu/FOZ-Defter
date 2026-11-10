# FOZ Defter → Google Play kapalı test rehberi

Yöntem: **TWA (Trusted Web Activity)**. GitHub Pages'teki uygulama, Chrome altyapısıyla tam ekran bir Play uygulaması olarak açılır.
- Telefonda Chrome'da test ettiğin her özellik aynen çalışır.
- GitHub'a gelen her düzeltme test kullanıcılarına yeni paket gerekmeden ulaşır.
- Telefonda Chrome'da daha önce girdiğin kayıtlar uygulamada da görünür (aynı depolama).

Toplam süre: yaklaşık 30-45 dakika + Google incelemesi (genelde 1-3 gün) + 14 gün kapalı test.

---

## Adım 0 — GitHub'da ikinci depo (1 dakika)
Uygulamanın üstünde tarayıcı adres çubuğu görünmemesi için Google, siteye küçük bir doğrulama dosyası koymamızı istiyor. Bu dosya sitenin köküne konmalı.

1. GitHub → **New repository** → adı tam olarak: `fozdemiroglu.github.io` → **Public** → Create.
2. Claude GitHub uygulamasının bu depoya da erişimi olsun (Settings → Applications → Claude → Configure → depoyu ekle).
3. Claude'a "açtım" yaz. Doğrulama dosyasını ve Pages ayarını birlikte yapacağız.

## Adım 1 — PWABuilder ile paket (10 dakika, bilgisayardan)
1. **https://www.pwabuilder.com** → adres kutusuna yaz: `https://fozdemiroglu.github.io/FOZ-Defter/` → **Start**.
2. **Package For Stores** → **Android** → **Generate Package** → **All Settings**:

| Alan | Değer |
|---|---|
| Package ID | `com.fozanalytics.defter` |
| App name | `FOZ Defter - Ön Muhasebe` |
| Launcher name | `FOZ Defter` |
| App version | `1.0.0` |
| App version code | `1` |
| Host | `fozdemiroglu.github.io` |
| Start URL | `/FOZ-Defter/index.html` |
| Theme color / Background color / Nav color | `#0B0F19` |
| Display mode | Standalone |
| Orientation | Portrait |
| Notification delegation | **Açık** |
| Location delegation | Kapalı |
| Google Play billing | Kapalı |
| Fallback behavior | Custom Tabs |
| Signing key | **Create new** |
| Key alias | `foz-defter` |
| Full name / Organization / Country | Fatih Özdemiroğlu / FOZ Analytics / TR |
| Key password, Store password | Güçlü bir şifre — **bir yere yaz** |

3. **Download** → bir ZIP iner. İçinde:
   - `*.aab` → Play'e yüklenecek paket
   - `signing.keystore` ve `signing-key-info.txt` → **imza anahtarı, kaybetme!** Google Drive'a ve şifre yöneticine yedekle. Her güncellemede gerekir.
   - `assetlinks.json` → içeriğini Claude'a gönder (Adım 3).

> Play "API 36'yı hedeflemeli" hatası verirse Claude'a yaz; paketi GitHub üzerinden güncel ayarla derleriz.

## Adım 2 — Play Console'da uygulama (15-20 dakika)
1. **Uygulama oluştur**: Ad `FOZ Defter - Ön Muhasebe`, varsayılan dil Türkçe, Uygulama, Ücretsiz, beyanları onayla.
2. **Test edin ve yayınlayın → Kapalı test** → yeni kanal (ör. "Kapalı test") → **Test kullanıcıları**: e-posta listesi veya Google Grubu (en az 12 kişi, öneri 15-20).
3. **Yeni sürüm oluştur** → `.aab` dosyasını yükle → Play Uygulama İmzalama'yı kabul et → sürüm notu: "İlk test sürümü" → Kaydet.
4. **Uygulama bütünlüğü (App integrity) → Uygulama imzalama** → "Uygulama imzalama anahtarı sertifikası" altındaki **SHA-256** parmak izini kopyala → Claude'a gönder (Adım 3).

## Adım 3 — Doğrulama dosyası (Claude yapar)
Claude'a iki şey göndereceksin: PWABuilder'ın `assetlinks.json` içeriği ve Play'deki SHA-256 parmak izi. Claude ikisini `https://fozdemiroglu.github.io/.well-known/assetlinks.json` dosyasına yazar. Bundan sonra uygulama adres çubuğu olmadan, tam ekran açılır.

## Adım 4 — Uygulama içeriği (Politika → Uygulama içeriği)
| Bölüm | Cevap |
|---|---|
| Gizlilik politikası | `https://fozdemiroglu.github.io/FOZ-Defter/gizlilik.html` |
| Reklamlar | Hayır, reklam içermiyor |
| Uygulama erişimi | Tüm işlevler özel erişim olmadan kullanılabilir (giriş yok) |
| İçerik derecelendirmesi | Kategori: Yardımcı program / Verimlilik. Tüm sorulara "Hayır" → 3+ |
| Hedef kitle | 18 yaş ve üzeri |
| Veri güvenliği | "Uygulamanız gerekli kullanıcı veri türlerinden herhangi birini topluyor veya paylaşıyor mu?" → **Hayır**. Veriler yalnızca cihazda kalıyor, sunucu yok. |
| Finansal özellikler | Kredi, ödeme, bankacılık, yatırım, kripto hizmeti **sunmuyor**. Bütçe / finans yönetimi benzeri bir seçenek varsa onu seç; yoksa finansal hizmet sunmadığını belirt. |
| Devlet uygulaması / Sağlık / Haber | Hayır |

## Adım 5 — Mağaza girişi (Büyüt → Mağaza varlığı → Ana mağaza girişi)
- **Uygulama adı:** FOZ Defter - Ön Muhasebe
- **Kısa açıklama:** `kisa-aciklama.txt`
- **Tam açıklama:** `magaza-metni.txt`
- **Uygulama simgesi:** `play-icon-512.png`
- **Öne çıkan görsel:** `one-cikan-gorsel-1024x500.png`
- **Telefon ekran görüntüleri:** `01` … `07` (1080×1920)
- **Kategori:** Finans (ya da İş). **E-posta:** info@ozdemirogludanismanlik.com
- **Web sitesi (isteğe bağlı):** `https://fozdemiroglu.github.io/FOZ-Defter/`
- **Ülkeler:** Türkiye (istersen tümü)

## Adım 6 — İncelemeye gönder ve test kullanıcıları
1. **Yayın özeti → Değişiklikleri incelemeye gönder.**
2. Onaylanınca Kapalı test sayfasındaki **katılım bağlantısını** test kullanıcılarına gönder (aşağıdaki mesaj).
3. **14 gün** boyunca en az 12 kişi katılımda kalmalı. Uygulamayı arada açıp kullanmaları iyi olur.
4. 14 gün dolunca Play Console → **Üretim erişimine başvur**.

### Test kullanıcılarına mesaj (WhatsApp / e-posta)
> Merhaba, FOZ Analytics olarak geliştirdiğim ücretsiz ön muhasebe uygulaması **FOZ Defter**'in Google Play kapalı testine katılır mısın?
> 1) Bu bağlantıya Google hesabınla girip "Test kullanıcısı ol" de: [KATILIM BAĞLANTISI]
> 2) Ardından Play Store'dan FOZ Defter'i yükle.
> 3) **14 gün boyunca testten çıkma ve uygulamayı kaldırma**; arada birkaç kez açman yeterli.
> Ana sayfadaki "Örnek verilerle dene" ile hemen deneyebilirsin. Görüşlerini bana yazarsan çok sevinirim. Teşekkürler!
