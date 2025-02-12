/* eslint-disable no-undef */
export async function getApiUrl() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['API_URL'], (result) => {
      resolve(result.API_URL);
    });
  });
}

export async function getDomainUrl() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['DOMAIN_URL'], (result) => {
      resolve(result.DOMAIN_URL);
    });
  });
}

export async function shortenUrl(originalUrl, userId) {
  try {
    const API_URL = await getApiUrl();
    const DOMAIN_URL = await getDomainUrl();
    const res = await fetch(`${API_URL}/api/shortenUrl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        originalUrl: originalUrl,
        userId: userId
      })
    });

    if (!res.ok) throw new Error('Failed to shorten URL');

    const data = await res.json();
    return `${DOMAIN_URL}${data.shortenedUrl}`;
  } catch (error) {
    console.error('Error shortening URL:', error);
    return null;
  }
}

export async function getUrlsInStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['userLinks'], (result) => {
      resolve(result.userLinks);
    });
  });
}

export async function deleteUserUrls(userId) {
  try {
    const API_URL = await getApiUrl();
    const res = await fetch(`${API_URL}/api/urlsDelete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) throw new Error('Failed to delete user URLs');

    const data = await res
      .json()
      .catch(() => ({ message: 'URLs deleted successfully' }));

    await new Promise((resolve) => {
      chrome.storage.local.remove('userLinks', () => {
        console.log('User links removed from storage.');
        resolve();
      });
    });

    return data;
  } catch (error) {
    console.error('Error deleting user URLs:', error);
    return [];
  }
}

export async function getUserUrls(userId) {
  try {
    const API_URL = await getApiUrl();
    const DOMAIN_URL = await getDomainUrl();
    let shortenerUrls = await getUrlsInStorage();

    if (shortenerUrls && shortenerUrls.length > 0) {
      return shortenerUrls;
    }

    const res = await fetch(`${API_URL}/api/urls/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 404) {
        return [];
      }
      throw new Error(
        `Failed to get user URLs: ${data.message || res.statusText}`
      );
    }

    shortenerUrls = data.map((url) => `${DOMAIN_URL}${url.shortenedUrl}`);

    chrome.storage.local.set({ userLinks: shortenerUrls });

    return shortenerUrls;
  } catch (error) {
    console.error('Error getting user URLs:', error);
    return [];
  }
}
