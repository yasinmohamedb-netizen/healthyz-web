// src/utils/AddressCallback.js

let callback = null;

export const setAddressCallback = (fn) => {
  callback = fn;
};

export const runAddressCallback = (address) => {
  if (callback) {
    callback(address);
    callback = null;   // clear after use
  }
};
