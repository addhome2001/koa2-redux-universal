import { compareSync } from 'bcryptjs';

export const isValidUser = (source, target) =>
  compareSync(source, target);
