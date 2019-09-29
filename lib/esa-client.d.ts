export declare const ESA_API_INTERVAL = 12000;
export declare class EsaClient {
    /**
     * Access token for esa.io
     */
    private readonly token;
    /**
     * Team name (subdomain of your esa.io)
     * example: https://TEAM_NAME.esa.io/
     */
    readonly teamName: string;
    constructor(teamName: string, token: string);
    /**
     * Upload emoji to esa.io
     * @param params
     */
    upload(params: {
        name: string;
        filepath: string;
    }): Promise<any>;
}
