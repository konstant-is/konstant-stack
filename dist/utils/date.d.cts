import { FormatOptions, format } from 'date-fns';
export { isDate } from 'date-fns';

type DT = Date | number | string;
declare const formatIso: (date: DT) => string;
declare const dateFormat: (date: DT, formatStr?: string, options?: FormatOptions) => string;
declare const timeFormat: (date: Date | number | string, formatStr?: string, options?: FormatOptions) => string;
declare const isBetween: (date: DT, start: DT, end: DT) => boolean;
declare const useDate: () => {
    format: typeof format;
    dateFormat: (date: DT, formatStr?: string, options?: FormatOptions) => string;
    timeFormat: (date: Date | number | string, formatStr?: string, options?: FormatOptions) => string;
    isBetween: (date: DT, start: DT, end: DT) => boolean;
};

export { dateFormat, formatIso, isBetween, timeFormat, useDate };
