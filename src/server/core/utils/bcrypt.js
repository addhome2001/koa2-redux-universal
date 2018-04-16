import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

const SALT = genSaltSync(10);

export const hash = (password) => hashSync(password, SALT);

export const isValidUser = compareSync;
