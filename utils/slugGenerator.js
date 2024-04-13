const slugGenerator = (text) => {
    const turkishChars = {
        ş: 's',
        ı: 'i',
        İ: 'i',
        ğ: 'g',
        ü: 'u',
        ö: 'o',
        ç: 'c'
    }

    return text
        .toLowerCase()
        .replace(/[şıİğüöç]/g, (char) => turkishChars[char] || '') // Türkçe karakterleri İngilizce karakterlere çevir
        .replace(/[^a-zA-Z0-9-]/g, '-') // İngilizce karakterler ve '-' dışındaki tüm karakterleri '-' ile değiştir
        .replace(/[-\s]+/g, '-') // Birden fazla '-' ve boşluğu tek '-' ile değiştir
        .replace(/^-+|-+$/g, '') // Başta ve sonda kalan '-' karakterlerini sil
}

module.exports = slugGenerator