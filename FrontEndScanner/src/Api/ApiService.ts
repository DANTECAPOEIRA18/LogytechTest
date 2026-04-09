/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';


export class ApiService {
    private api: AxiosInstance;

    constructor(baseURL: string){
        this.api = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.api.interceptors.request.use((config : any) => {
            return config;
        })
    }

    setBaseUrl(url: string) {
        this.api.defaults.baseURL = url;
    }

      /** GET */
    async get<T = unknown>(
        endpoint: string,
        params?: Record<string, any>,
        token?: string
    ): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = { params };
        if (token) config.headers = { Authorization: `Bearer ${token}` };
        return this.api.get<T>(endpoint, config);
    }

    /** POST */
    async post<T = unknown, B = unknown>(
        endpoint: string,
        data?: B,
        token?: string
    ): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = {};
        if (token) config.headers = { Authorization: `Bearer ${token}` };
        return this.api.post<T>(endpoint, data, config);
    }
}