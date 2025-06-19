const STORAGE_KEY = 'alimentacionConscienteData'

export function getAllRecords() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveRecord(record) {
  const all = getAllRecords()
  all.push(record)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function updateRecord(updatedRecord) {
  const all = getAllRecords()
  const index = all.findIndex(r => r.id === updatedRecord.id)
  if(index !== -1) {
    all[index] = updatedRecord
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  }
}

export function deleteRecord(id) {
  const all = getAllRecords()
  const filtered = all.filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}
