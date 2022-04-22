export const totalSystems = {
  current: 0,
  increase: function () {
    this.current++;
  },
  reset: function () {
    this.current = 0;
  },
};
