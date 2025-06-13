// key value pairs
// stingify value before saving
// and parse value when getting

// functions:
// get(key)
// set(key, value)
// remove(key)
// clear()

export const winLocalStorage = {
  get: async (key: string): Promise<unknown> => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  set: async (key: string, value: unknown): Promise<void> => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
  },

  clear: async (): Promise<void> => {
    localStorage.clear();
  },
};

export const chromeStorage = {
  get: async (key: string): Promise<unknown> => {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key] || null);
      });
    });
  }
  ,
  set: async (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      const item: Record<string, unknown> = {};
      item[key] = value;
      chrome.storage.local.set(item, () => {
        resolve();
      });
    });
  }
  ,
  remove: async (key: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, () => {
        resolve();
      });
    });
  }
  ,
  clear: async (): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  }
};

// check if chrome.storage is available
export const storage = typeof chrome !== "undefined" && chrome.storage
  ? chromeStorage
  : winLocalStorage;