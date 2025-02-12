/* global chrome */

function generateUUID() {
  return crypto.randomUUID();
}

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

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ API_URL: 'https://shrink-link-api.vercel.app/' });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    DOMAIN_URL: 'shrinkit.fyi/'
  });
});
