class URLHashSearchParam extends URLSearchParams {
  constructor(value: string) {
    super(value)
  }

  toString() {
    const params = this
    const query: string[] = []
    params.forEach((value, key) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value)
      query.push(`${encodedKey}=${encodedValue}`)
    })
    let temp = query.join("&")
    if (temp.length) return `?${temp}`
    return ""
  }
}

/**
 * 给URL增加解析Hash的能力
 */
export class URLHelper extends URL {
  hashPathName: string
  readonly hashSearchParams: URLHashSearchParam
  constructor(url: string) {
    super(url)
    const hashInfo = formatHash(this.hash)
    this.hashPathName = hashInfo.pathStr
    this.hashSearchParams = new URLHashSearchParam(hashInfo.searchParams)
  }

  get hashSearch() {
    return this.hashSearchParams.toString()
  }
  toString(): string {
    const url = this
    const protocol = url.protocol
    const username = url.username
    const password = url.password ? `:${url.password}` : ""
    const credentials = username || password ? `${username}${password}@` : ""
    const host = url.host
    const pathname = url.pathname
    const search = url.search
    const hashPathName = url.hashPathName
    const hashSearch = url.hashSearch
    return `${protocol}//${credentials}${host}${pathname}${search}${hashPathName}${hashSearch}`
  }

  toJSON() {
    return this.toString()
  }
}

function formatHash(hash: string) {
  let [pathStr, searchParams] = hash.split("?")
  return {
    pathStr,
    searchParams,
  }
}
