import { EsaClient } from './esa-client';
export interface UploadParam {
    filepath: string;
    client: EsaClient;
    deleteSucceededFiles?: boolean;
    dry?: boolean;
    verbose?: boolean;
}
export declare function upload(param: UploadParam): Promise<void>;
