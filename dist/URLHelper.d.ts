declare class URLHashSearchParam extends URLSearchParams {
    constructor(value: string);
    toString(): string;
}
/**
 * 给URL增加解析Hash的能力
 */
export declare class URLHelper extends URL {
    hashPathName: string;
    readonly hashSearchParams: URLHashSearchParam;
    constructor(url: string);
    get hashSearch(): string;
    toString(): string;
    toJSON(): string;
}
export {};
