import axios, {AxiosRequestConfig} from 'axios';


const API_VERSION = 'v1';
const API_URL = `/api/${API_VERSION}/`;

type RequestConfig = Omit<AxiosRequestConfig, 'url'|"method">
& {
    path: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; 
};


export const request = async (config: RequestConfig) => {
    const method = config.method || 'GET';
    const response = await axios.request({
        ...config,
        method,
        url: `${API_URL}${config.path}`,
    });
    return response.data;
}

