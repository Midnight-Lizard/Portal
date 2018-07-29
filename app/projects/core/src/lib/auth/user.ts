export interface User
{
    access_token: string;
    claims: {
        [claim: string]: string;
        name: string;
        preferred_username: string;
        profile: string;
    };
    expired: boolean;
}
