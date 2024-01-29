# URL HELPER

  拓展URL解析Hash的能力

## 使用

    使用方法和URL原生方法一样

### 实例化

```ts
  const url = new URLHelper("http:www.test.com/path#/home")
```

### 相关属性

- hashSearch
- hashPathName
- hashSearchParams

### example

```ts

  url.hashPathName // #/home
  
  const hashSearchParams = url.hashSearchParams // SearchParams实例

  hashSearchParams.set("type",'test') // hash添加 query
  
  hashSearchParams.hashSearch // ?type=test

  hashSearchParams.get("type")// test

  hashSearchParams.append("name",'name')// hash添加属性

  hashSearchParams.delete("name") // 移除属性

  url.toString()// http:www.test.com/path#/home?type=test
  

  
```
