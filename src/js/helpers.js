import { TIMEOUT_SEC } from './config.js';

/**
 *
 * @param {string} url HTTP request URL
 * @param {Object} uploadData data to be uploaded (for POST requests. If undefined, GET request will be initiated)
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const resp = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const respJson = await resp.json();
    if (!resp.ok) throw new Error(respJson.message);
    return respJson;
  } catch (err) {
    throw err;
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
