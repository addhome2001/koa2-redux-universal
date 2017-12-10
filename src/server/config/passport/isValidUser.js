import { compareSync } from 'bcryptjs';

export default (source, target) =>
  compareSync(source, target);
