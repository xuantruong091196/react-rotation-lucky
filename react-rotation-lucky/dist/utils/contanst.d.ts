declare const api: (options: any, arrayFormat?: 'comma' | 'indices' | 'brackets' | 'repeat' | undefined, accessToken?: string | undefined, url?: string | undefined) => Promise<import("axios").AxiosResponse<any, any>> | null;
export default api;
export declare function get(url: string): Promise<any>;
export declare const convertUint8ArrayToBuffer: (array: BlobPart) => string;
export declare function getAndUnZip(url: string): Promise<any>;
