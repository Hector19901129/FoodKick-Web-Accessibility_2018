const fkMoney = function () {
    return (money) => (+money || 0).toFixed(2);
};

const fkMoneyCvp = function () {
  return (cvp) => cvp === '0' ? '' : cvp;
};

export {
  fkMoneyCvp,
  fkMoney
};
