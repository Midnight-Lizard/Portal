export function buildUrl(...urlParts: string[])
{
    return urlParts.map(p => p.replace(/^\/|\/$/g, '').trim()).join("/");
}