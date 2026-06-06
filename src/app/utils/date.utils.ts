export function formatDateToDDMMYYYY(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  
  // Handle YYYY-MM-DD format directly from <input type="date">
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }

  // Handle DD/MM/YYYY or DD-MM-YYYY if user types it directly in text input
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // Assuming it's already DD/MM/YYYY as we forced it in the frontend UI
      return dateStr;
    }
  }
  
  // Fallback for other formats
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
