console.log('Jest Setup');

(global as Record<string, unknown>)['cc'] = {
  clampf(value: number, min: number, max: number) {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  }
};
