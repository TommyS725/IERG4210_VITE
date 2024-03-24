/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from "zod";
import { API_URL } from "../services/core";


type Option<T> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string[];
    schema: ZodSchema<T>;
    body:FormData;
    preprocess?: (formData:FormData) => FormData|false;
    onSuccess?: (data:T) => void|Promise<void>;
    onError?: (response:Response|null,error: any) => T|Promise<T>;
}

export const formRequest = async <T>(config: Option<T>):Promise<T|undefined> => {
    const method = config.method || "GET";
    const path = config.path.join('/')
    const url = `${API_URL}${path}`;
    try {
        let body = config.body;
        if (config.preprocess) {
            const proccessed = config.preprocess(body);
            if(proccessed===false)return
            body = proccessed;
        }


        const response = await fetch(url, {
            method,
            body,
        });
        if(!response.ok){
            if(config.onError){
                return  await config.onError(response, null)
            }
            throw new Error(`Request to ${url} failed with status ${response.status}.`);
        }
        const data = response.headers.get('Content-Type')?.includes('application/json') ? await response.json() : await response.text();
        const parsed = config.schema.parse(data);
        // console.log('parsed',parsed)
        if (config.onSuccess) {
            // console.log('do onscuess')
            await config.onSuccess(parsed);
        }

        return data;
    } catch (error) {
        if (config.onError) {
            // console.log('do onerror',error)
             return await config.onError(null,error);
        }
        console.error("Request failed", error);
        throw error;
    }
    
};