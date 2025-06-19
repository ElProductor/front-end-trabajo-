const STORAGE_KEY = 'alimentacionConscienteData';

/**
 * Obtener todos los registros del almacenamiento local
 * @returns {Array} Lista de registros
 */
function getAllRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer registros del localStorage:', error);
    return [];
  }
}

/**
 * Guardar un nuevo registro en localStorage
 * @param {Object} record - Registro a guardar (debe tener un id único)
 */
function saveRecord(record) {
  try {
    const all = getAllRecords();
    const exists = all.find(r => r.id === record.id);

    if (exists) {
      console.warn(`Ya existe un registro con id ${record.id}. No se guardará duplicado.`);
      return;
    }

    const newRecord = {
      id: record.id || Date.now(),
      ...record,
    };

    all.push(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (error) {
    console.error('Error al guardar el registro:', error);
  }
}

/**
 * Actualizar un registro existente por ID
 * @param {Object} updatedRecord - Objeto con el mismo id que se quiere actualizar
 */
function updateRecord(updatedRecord) {
  try {
    const all = getAllRecords();
    const index = all.findIndex(r => r.id === updatedRecord.id);

    if (index !== -1) {
      all[index] = updatedRecord;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } else {
      console.warn(`Registro con id ${updatedRecord.id} no encontrado.`);
    }
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
}

/**
 * Eliminar un registro por ID
 * @param {number|string} id - ID del registro a eliminar
 */
function deleteRecord(id) {
  try {
    const all = getAllRecords();
    const filtered = all.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
}

export {
  getAllRecords,
  saveRecord,
  updateRecord,
  deleteRecord,
};
