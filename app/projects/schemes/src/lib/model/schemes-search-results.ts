import { PublicScheme } from './public-scheme';

export interface SchemesSearchResults
{
    search: {
        cursor: string;
        done: boolean;
        results: PublicScheme[];
    };
}
