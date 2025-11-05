# 🚀 GitHub Deploy Talimatları

## 1. GitHub Repository Oluşturma

1. GitHub'a git: https://github.com/new
2. Repository adı: `raw-ajans` (veya istediğiniz ad)
3. **Public** seçin (GitHub Pages için gerekli)
4. **README, .gitignore ekleme** - Zaten var
5. "Create repository" butonuna tıklayın

## 2. GitHub'a Push

Repository oluşturduktan sonra şu komutları çalıştırın:

```bash
# Remote ekle (YOUR_USERNAME'i değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/raw-ajans.git

# Ana branch'i main olarak ayarla
git branch -M main

# GitHub'a push et
git push -u origin main
```

## 3. GitHub Pages ile Deploy

1. GitHub repository'nize gidin
2. **Settings** → **Pages** sekmesine gidin
3. **Source** bölümünden:
   - Branch: `main` seçin
   - Folder: `/ (root)` seçin
4. **Save** butonuna tıklayın
5. Birkaç dakika içinde siteniz yayında olacak!

## 4. Build Ayarları (Vite için)

GitHub Pages için build ayarı gerekli. `package.json`'da build script'i var.

Deploy için:
```bash
npm run build
```

`dist` klasörünü deploy etmeniz gerekecek veya GitHub Actions kullanabilirsiniz.

---

**Kolay Yol:** Vercel/Netlify kullanarak otomatik deploy edebilirsiniz:
- Vercel: https://vercel.com (GitHub ile bağla, otomatik deploy)
- Netlify: https://netlify.com (Drag & drop veya GitHub bağlantısı)

