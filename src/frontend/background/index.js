/* global chrome */

// Función para generar un UUID único
function generateUUID() {
  return crypto.randomUUID(); // Disponible en navegadores modernos
}

// Verificar si ya existe un UUID, si no, crearlo y guardarlo en Chrome Storage
chrome.storage.local.get(['userId'], (result) => {
  if (!result.userId) {
    const newUserId = generateUUID();
    chrome.storage.local.set({ userId: newUserId }, () => {
      console.log('Generated new userId:', newUserId);
    });
  } else {
    console.log('Existing userId:', result.userId);
  }
});
