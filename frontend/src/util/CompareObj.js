const compareArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1.sort((a, b) => a.id - b.id);
  arr2.sort((a, b) => a.id - b.id);

  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];

    if (
      obj1.name !== obj2.name ||
      obj1.turn !== obj2.turn ||
      obj1.isDeleted !== obj2.isDeleted
    ) {
      return false;
    }
  }
  return true;
};

export { compareArray };
