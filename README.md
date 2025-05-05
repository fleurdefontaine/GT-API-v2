# 🚀 GT-API

Selamat datang di **GT-API**!  
Project ini adalah REST API yang dibuat dengan Express + TypeScript untuk mengambil berbagai informasi item dari Growtopia Wiki secara cepat.

---

## ⚠️ Status Project

> **Project ini masih dalam tahap pengembangan dan belum selesai 100%.**
>  
> Fitur-fitur utama sudah bisa dicoba, tapi kemungkinan masih ada bug atau fitur yang belum tersedia.  
> Feel free buat kasih saran, kritik, atau kontribusi!

---

## 📊 Contoh Response API

- GET /api/details?name=Wind Asteroid

```json
[
  {
    "name": "Wind Asteroid",
    "imageUrl": "https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/1696/y-offset/640/window-width/32/window-height/32?format=png&fill=cb-20250501143843",
    "wikiUrl": "https://growtopia.fandom.com/wiki/Wind_Asteroid",
    "description": "The howling winds that came down with this asteroid have become a permanent part of it! Now it will float forever, whispering the secrets of space to you as it does. (NOTE: Secret of space may not actually be secret. Or audible.",
    "properties": "This item can be placed in two directions, depending on the direction you're facing. This item never drops any seeds.",
    "ChiType": "Wind",
    "Hardness": [
      "4 Hits without Pickaxe",
      "3 Hits with Pickaxe"
    ],
    "GrowTime": "1h 0m 0s",
    "GemsDrop": "N/A",
    "Seed": {
      "colors": [
        "#B0BEA3",
        "#D5E0E8"
      ],
      "spriteUrl": "https://static.wikia.nocookie.net/growtopia/images/9/9c/SeedSprites.png/revision/latest/window-crop/width/16/x-offset/848/y-offset/320/window-width/16/window-height/16?format=png&fill=cb-20250501143844"
    },
    "PaintPreview": [],
    "Recipe":{"type":"None","items":[]}
  }
]
```

---