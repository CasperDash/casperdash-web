export const validatePublicKey = (val: string) => {
  if (val.length < 2) {
    return false;
  }
  if (!/^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(val)) {
    return false;
  }

  return true;
};
