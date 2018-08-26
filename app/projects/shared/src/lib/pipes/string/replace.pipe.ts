import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replace' })
export class ReplacePipe implements PipeTransform
{
    transform(input: any, pattern: any, replacement: any): any
    {
        if (!pattern || !replacement)
        {
            return input;
        }
        return input.replace(pattern, replacement);
    }
}
