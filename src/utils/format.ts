// src/utils/format.ts

/**
 * Format tanggal ke dalam bentuk string yang mudah dibaca
 * @param dateString - String tanggal dari API atau database (ISO format atau timestamp)
 * @param options - Opsi tambahan untuk formatting
 * @returns String tanggal yang sudah diformat
 */
export function formatDate(
  dateString: string | Date,
  options: {
    withTime?: boolean;
    locale?: string;
    timeZone?: string;
  } = {}
): string {
  const { withTime = false, locale = 'id-ID', timeZone = 'Asia/Jakarta' } = options;

  let date: Date;

  if (typeof dateString === 'string') {
    // Handle berbagai format tanggal string
    if (dateString.includes('T')) {
      // ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
      date = new Date(dateString);
    } else if (/^\d+$/.test(dateString)) {
      // Timestamp (number as string)
      date = new Date(parseInt(dateString));
    } else {
      // Format lain (anggap format YYYY-MM-DD)
      date = new Date(dateString);
    }
  } else {
    // Jika sudah berupa Date object
    date = dateString;
  }

  // Fallback untuk tanggal invalid
  if (isNaN(date.getTime())) {
    return 'Tanggal tidak valid';
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timeZone,
  };

  if (withTime) {
    formatOptions.hour = '2-digit';
    formatOptions.minute = '2-digit';
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}

/**
 * Format tanggal relatif (e.g. "2 hari yang lalu")
 * @param dateString - String tanggal dari API atau database
 * @returns String tanggal relatif
 */
export function formatRelativeDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Fallback untuk tanggal invalid
  if (isNaN(date.getTime())) {
    return 'Tanggal tidak valid';
  }

  const intervals = {
    tahun: 31536000,
    bulan: 2592000,
    minggu: 604800,
    hari: 86400,
    jam: 3600,
    menit: 60,
    detik: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit} yang lalu`;
    }
  }

  return 'Baru saja';
}

/**
 * Format tanggal ke format YYYY-MM-DD untuk input date
 * @param date - Date object atau string tanggal
 * @returns String dalam format YYYY-MM-DD
 */
export function formatDateForInput(date: Date | string = new Date()): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}
