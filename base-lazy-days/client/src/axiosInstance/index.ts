import axios, { AxiosRequestConfig } from 'axios';

import { User } from '../../../shared/types';
import { baseUrl } from './constants';

interface jwtHeader {
  Authorization?: string;
}

export function getJWTHeader(user: User): Record<string, string> {
  return { Authorization: `Bearer ${user.token}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
