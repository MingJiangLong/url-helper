"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLHelper = void 0;
class URLHashSearchParam extends URLSearchParams {
    constructor(value) {
        super(value);
    }
    toString() {
        const params = this;
        const query = [];
        params.forEach((value, key) => {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);
            query.push(`${encodedKey}=${encodedValue}`);
        });
        let temp = query.join("&");
        if (temp.length)
            return `?${temp}`;
        return "";
    }
}
/**
 * 给URL增加解析Hash的能力
 */
class URLHelper extends URL {
    constructor(url) {
        super(url);
        const hashInfo = formatHash(this.hash);
        this.hashPathName = hashInfo.pathStr;
        this.hashSearchParams = new URLHashSearchParam(hashInfo.searchParams);
    }
    get hashSearch() {
        return this.hashSearchParams.toString();
    }
    toString() {
        const url = this;
        const protocol = url.protocol;
        const username = url.username;
        const password = url.password ? `:${url.password}` : "";
        const credentials = username || password ? `${username}${password}@` : "";
        const host = url.host;
        const pathname = url.pathname;
        const search = url.search;
        const hashPathName = url.hashPathName;
        const hashSearch = url.hashSearch;
        return `${protocol}//${credentials}${host}${pathname}${search}${hashPathName}${hashSearch}`;
    }
    toJSON() {
        return this.toString();
    }
}
exports.URLHelper = URLHelper;
function formatHash(hash) {
    let [pathStr, searchParams] = hash.split("?");
    return {
        pathStr,
        searchParams,
    };
}
