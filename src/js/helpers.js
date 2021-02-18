import { TIMEOUT_SEC } from './config.js';

export const getJson = async function (url) {
  try {
    const resp = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const respJson = await resp.json();
    if (!resp.ok) throw new Error(respJson.message);
    return respJson;
  } catch (err) {
    throw err;
  }
};

export const sendJson = async function (url, uploadData) {
  try {
    const sendPromise = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    });

    const resp = await Promise.race([sendPromise, timeout(TIMEOUT_SEC)]);
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
