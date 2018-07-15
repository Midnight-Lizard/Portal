import { Type } from '@angular/core';

export function nameOfClass<T>(classType: Type<T>): string
{
    return classType.prototype.constructor.name;
}
