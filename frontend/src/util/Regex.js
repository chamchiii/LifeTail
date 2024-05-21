const idCheck = (id) => {
  const idRegex = /^[a-zA-Z0-9]{3,}$/;

  if (idRegex.test(id)) {
    return true;
  }

  return false;
};

const pdCheck = (password) => {
  const pdRegex = /^[a-zA-Z0-9]{3,}$/;

  if (pdRegex.test(password)) {
    return true;
  }

  return false;
};

const commentCheck = (comment) => {
  const commentRegex = /^.{5,}$/;

  if (commentRegex.test(comment)) {
    return true;
  }

  return false;
};

export { idCheck, pdCheck, commentCheck };
