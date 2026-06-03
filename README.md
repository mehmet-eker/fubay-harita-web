# Fubay Harita Web Sitesi

FUBAY HARİTA MÜHENDİSLİK VE DRONE HİZMETLERİ TİC. LTD. ŞTİ. kurumsal tanıtım sitesi.

TanStack Start (React 19 + Vite 7) ile geliştirilmiş, Nitro üzerinden **Cloudflare Workers**'a deploy edilebilen SSR uygulamasıdır.

## Geliştirme (local)

```bash
npm install
npm run dev
```

Site `http://localhost:8080` adresinde açılır.

Diğer komutlar:

| Komut | Açıklama |
| --- | --- |
| `npm run build` | Production derlemesi (`.output/` altına Cloudflare Worker üretir) |
| `npm run preview` | Derlenmiş çıktıyı yerelde önizler |
| `npm run deploy` | Derleyip Cloudflare'e deploy eder (`wrangler deploy`) |
| `npm run lint` | ESLint |

## GitHub → Cloudflare deploy

Proje, GitHub deposundan Cloudflare'e otomatik deploy edilecek şekilde yapılandırılmıştır.
`npm run build`, `.output/` içine bir Cloudflare Worker paketi ve gerekli `wrangler.json`
ayar dosyalarını üretir.

### 1. Depoyu GitHub'a gönderin

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<kullanici-adi>/fubay-harita-website.git
git push -u origin main
```

### 2. Cloudflare'de bağlayın

1. [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Workers** → **Import a repository / Connect to Git**.
2. GitHub hesabınızı yetkilendirip bu depoyu seçin.
3. Build ayarları:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
4. **Save and Deploy** deyin.

Bundan sonra `main` dalına yapılan her `git push`, Cloudflare'de otomatik olarak yeni
bir deploy tetikler.

### Elle deploy (alternatif)

Kendi makinenizden tek seferlik deploy için:

```bash
npm run deploy
```

İlk kullanımda `wrangler` sizi Cloudflare hesabınıza giriş yapmaya yönlendirir.
