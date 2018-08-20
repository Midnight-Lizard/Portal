export interface User
{
    access_token: string;
    claims: {
        [claim: string]: string;
        /** User Id */
        sub: string;
        /** Display Name */
        name: string;
        preferred_username: string;
        /** Profile URL */
        profile: string;
    };
    expired: boolean;
}
