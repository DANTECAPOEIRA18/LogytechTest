
import { ApiService } from './ApiService';
import { AxiosResponse } from 'axios';
import { ScannerCreateInput } from './ApiScanner.types';

const api = new ApiService('http://localhost:5067')

export const createCodeRegister = (
    input: ScannerCreateInput
): Promise<AxiosResponse<string>> => api.post<string, ScannerCreateInput>('/scanner/create', input)

export const listCodes = () : Promise<AxiosResponse<string[]>> => api.get<string[]>('/scanner/list',undefined)