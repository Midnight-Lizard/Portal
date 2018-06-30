export interface User
{
    access_token: string;
    claims: {
        [claim: string]: string;
        preferred_username: string
    };
    expired: boolean;
}
