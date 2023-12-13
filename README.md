# twjw-tmpl-react-spa

> **Author**: [@twjw](https://github.com/twjw)  
> **Repository**: https://github.com/twjw/tmpl-react-spa  
> 
> 第一次建專案時 **[初始化](#初始化)** 文檔必看，其他就是不懂再看

---

# 目錄

- [IDE 插件](#IDE-插件)
- [使用的 package](#使用的-package)
- [最佳實踐](#最佳實踐)
- [初始化](#初始化)
  - [1. 使用 `pnpm`](#1-使用-pnpm)
  - [2. 包路徑替換](#2-包路徑替換)
  - [3. 移除多餘檔案/目錄/內容](#3-移除多餘檔案目錄內容)
  - [4. 全局替換引入路徑](#4-全局替換引入路徑)
- [目錄結構](#目錄結構)
- [環境變數](#環境變數)
  - [定義](#定義)
  - [配置](#配置)
  - [使用](#使用)
- [Alias](#Alias)
- [路由](#路由)
  - [規則](#規則)
  - [配置](#配置)
  - [使用](#使用)
- [樣式](#樣式)
- [國際化](#國際化)
- [Enum](#Enum)
- [Service](#Service)
  - [創建 `fetch2`](#創建-fetch2)
  - [申明方式](#申明方式)
  - [使用](#使用)
- [Store](#Store)
  - [持久化](#持久化)
- [其他用到的 `wtbx/vite` 插件](#其他用到的-wtbxvite-插件)
  - [buildDropLog 構件移除 console](#buildDropLog-構件移除-console)
- [wtbx](#wtbx)

---

# IDE 插件

- 項目必要
  - `Unocss` 樣式插件
- 其他不錯的
  - `Smart Input` 自動切換輸入法
  - `json2ts` 將 `json` 轉換成 `typescript` 類型
  - `AI Assistant` 比 `chat gpt` 還準確的 AI
  - `Translation` 翻譯用
  - `Database Tools...` 數據庫用
  - `.ignore` 創建 ignore file 用
  - `Icon Viewer 2` 圖片預覽
  - `Chinese (Simplified)...` 簡體中文IDE介面(這個看人，至於上面都可裝)

---

# 使用的 package

```javascript
packages = {
  dependencies: {
    antd: '^5.11.2', // UI(前台移除，後台使用)
    clsx: '^2.0.0', // 類名組裝
    'date-fns': '^2.30.0', // 日期
    immer: '^10.0.3', // 方便的處理不可變狀態
    'lodash-es': '^4.17.21', // 工具庫，這我寫底層用的，不過有需要可用(但不要 import _，請按需引入)
    mitt: '^3.0.1', // 發布訂閱
    'query-string': '^8.1.0', // QS 轉換
    "rc-picker": "^3.14.6", // ant 日期組件封裝 date-fns 用(前台移除，後台使用)
    react: '^18.2.0', // 就 react@18
    'react-dom': '^18.2.0', // 就 react-dom@18
    "react-error-boundary": "^4.0.11", // 就如名
    'react-router-dom': '^6.3.0', // 鎖 6.3 版，6.4+ 會有 data api，用不到
    wtbx: '^x.x.x', // 自研的工具集
    zustand: '^4.4.6', // 狀態管理
  },
  devDependencies: {
    '@vitejs/plugin-react-swc': '^4.2.0', // vite react 支持(swc版)
    unocss: '^0.57.4', // 樣式
    "vite": "^4.5.0", // 之後升 5
    'vite-plugin-html': '^3.2.0', // 為入口 html 注入值
    'vite-plugin-svgr': '^4.1.0', // svg component
  },
}
```

---

# 最佳實踐

01. 除了國際化字典檔或不可抗力外，檔案名採 `短橫線連接(kebab-case)` 規則命名
02. 使用 `pnpm` 做包管理
03. 建議使用 `Jetbrains IDE` 開發，僅對該 IDE 做優化
04. 純邏輯使用 `.tx`，含 **jsx** 使用 `.tsx`
05. 時間庫使用 `date-fns`，因為不是 `dayjs` 的關係，所以 `antd` 的日期相關組件請從 `@/components` 導入
06. 除了 `*.page.tsx`，都使用 `export` 導出而不是 `export default`，這樣才可以準確的導入模塊，`export`, `export default` 都建議在最底部一次導出，而不是在變量前申明(除特殊模塊)

---

# 初始化

## 1. 使用 `pnpm`

確認有安裝 `pnpm`，包管理工具採 `pnpm` 處理，`yarn.lock`, `package-lock.json` 都會被 **git ignore** 掉

## 2. 包路徑替換

```text
1. 將 ./package.json 檔的
  "wtbx": "link:..\\toolbox-js",
    替換成相對應的版號，比方說
  "wtbx": "^1.0.0",
```

## 3. 移除多餘檔案/目錄/內容

- `doc/code/example/_admin` 刪除該目錄(該目錄為專案後台示範目錄，可以觀摩該目錄來看項目該如何寫)
- `vite.config.ts` 裡移除有 `doc/code/example/_admin` 巴拉巴拉的 `resolve` 路徑代碼
- `tsconfig.json` 裡將 `@/*` 的指向指到 `src/*`
- `README.md` 將內容更換為以下
  ```markdown
  # 開發文檔  
  
  > 詳細請查閱該文檔 [https://github.com/twjw/tmpl-react-spa](https://github.com/twjw/tmpl-react-spa)
    ```

## 4. 全局替換引入路徑

> 不想 monorepo 暫出此下策

- 全局搜尋 `toolbox-js/packages`，將其取代為 `wtbx`，前面的 `../` 等路徑都要移掉，比如：
  ```text
  import xxx from '../../toolbox-js/packages/vite'
  替換成
  import xxx from 'wtbx/vite'
  ```

---

# 目錄結構

以下列出比較重要的而已

```text
react-spa
  .husky/ - 哈士奇
    pre-commit - git pre-commit hook
  doc/ - 文檔目錄
    code/ - 代碼模板與示範
      example/ - 示範代碼目錄(不知道怎用可以看)
        _admin/ - 該專案的後台示範代碼目錄
        enum/ - enum 示範目錄
        service/ - service 示範目錄
        store/ - store 示範目錄
      template/ - 模板目錄
        api/ - api 模板
          index.ts
          type.ts
        page/ - 頁面模板
          page.meta.ts
          page.tsx
  dist/ - bundle 目錄
  public/ - 靜態資源目錄(簡單理解為如果你的支援需要打包後拷貝一份就放這，否則放 assets)
  src/
    assets/ - 資源目錄
    components/ - 組件目錄
    enums/ - 枚舉目錄
      gen/ - wtbx createEnum 產出的 enum 目錄
      ts/ - ts 自己的 enum 目錄
    hooks/ - 鉤子目錄
    pages/ - 頁面目錄
    service/ - 服務目錄
      ws/ - websocket 相關
      api/ - 與後端 api 溝通的目錄
        [...domain]/
          type.ts - api response type
          index.ts - api 路徑們
      [...domain]/ - 轉換 api/ 下的 api 的服務目錄
      fetch2.ts - 主要的 fetch 方法實例
      index.ts - 統一導出
    store/ - 狀態目錄
    style/ - 樣式目錄
      common.css - 全局樣式
    type/ - 類型目錄
      common.ts - 通用類型
    utils/ - 通用方法目錄
    app.tsx - 主入口組件(App Component)
    main.tsx - 主入口(react-dom render)
    vite-env.d.ts - vite 全局環境(若開啟 wtbx 的相應功能，也會加類型到這)
  .env.?*.ts - 環境變數
  .eslintrc.cjs - eslint 配置，可以不用配，哈士奇會處理
  .prettierrc - prettier 配置，可以不用配，哈士奇會處理
  index.html - 入口 html
  package.json - 如名
  pnpm-lock.yaml - 包 lock，因為使用 pnpm，所以是 pnpm-lock.yaml 檔
  README.md - 就是本篇重要的
  tsconfig.json - vite 用
  tsconfig.node.json - node 用
  uno.config.ts - unocss 配置文件
  vite.config.ts - vite 配置文件
```

---

# 環境變數

> 環境變數配置位置於跟目錄下的 `.env.?*.ts`

## 定義

* `// --- ---` **兩個這著註解不可更動**，這是我讀取環境變數的範圍用
* 可以使用 `ts`, `json` 副檔名定義，僅推薦 ts
* 命名方式為 `通用: .env.(ts|json)`, `mode: .env.*.(ts|json)`

其他的定義看以下描述就好

```typescript
import { WObject } from 'wtbx/type'

const env =
  // --- ---
  {
    // 可以嵌套定義
    project: {
      title: 'twjw-react-spa-tmpl',
    },
    
    // _ 開頭為私有，僅能在 node 環境下調用，不會暴露在 vite/clinet 裡
    // node 處可以 envConfig.port 取，client 的話取不到
    _port: 8080,
    
    // 僅能寫靜態的值，下面這麼寫會是錯的
    errorKey: process.env.NODE_ENV,
  }
// --- ---

// 導出該環境變數類型(.env.ts 導出就好)，之後會用到
export type EnvType = WObject.IgnoreKeyPrefix<typeof env>
```

## 配置

```typescript
// vite.config.ts
import { autoAlias } from 'wtbx/vite'

export default async ({ mode }) => {
  // 讀取環境變數
  const envConfig = await createEnvConfig<
    EnvType, // 上面定義的環境變數類型
    'development' | 'production' // Mode: 支援的環境有哪些(你可以看你檔名來定義就好)
  >({ mode }) // mode 必傳
  
  // 如果有需要動態轉換環境可以使用 transform
  const dyncmicEnvConfig = await createEnvConfig<
    EnvType, 
    'development' | 'production',
    1 // transform 返回的類型，也為最終的環境變數值
  >({ 
    mode,
    transform: (envConfig /* type 為 EnvType & { mode: Mode } */) => 
      1 // transform return 為你修改後的環境變數值
  })
  
  return defineConfig({
    plugins: [
      // hasEnv 預設為 true，所以可以寫 autoAlias() 就好
      // hasEnv 若為 true，會將 ~env-config 注入到 vite-client
      autoAlias({ hasEnv: true }), 
    ]
  })
}
```

## 使用

```typescript
// client.ts 像下面這樣引入就可以拿到了
import { envConfig } from '~env-config'
```

如果需要類型支持請去 `src/vite-env.d.ts` 配置

```typescript
// src/vite-env.d.ts
declare module '~env-config' {
  import type { EnvType } from '../.env'
  export const envConfig: EnvType
}
```

---

# Alias

直接配在 `tsconfig.json` 的 `compilerOptions.paths` 裡就好，會用過 `autoAlias plugin` 自動注入到 client，預設配置了 `@` 也就是 `./src` 目錄

---

# 路由

> 小提示：  
> 不好看頁面路徑的話可以看 IDE 的路徑(下圖)，就可以看出現在是哪個路由了哦 >.0
>
> ![](https://raw.githubusercontent.com/twjw/pic-bed/main/202311192141798.png)

- 採**目錄式路由**，會自動生成 `react-router@6` 的路由系統
  - 順便說，路由會鎖在 `6.3` 版本，因為在上去都是 `ssr api`
    ，完全是用不到，所以看文檔請看 [`6.3`](https://reactrouter.com/en/v6.3.0) 版的路由喔

## 規則

- 檔名為 `page.tsx` 的檔案都會被自動轉成路由頁面(**必須 export default 導出**)
- 檔名為 `page.meta.ts` 的檔案都會被自動轉成路由元數據(**必須 export default 導出**)
- 目錄為 `[xxx]` 的檔案都會被轉成參數路由
  - 如 `[id]` 轉成 `:id`
  - 如 `[my-name]` 轉成 `:myName`，**注意：如果是多個單字的參數明會自動轉成駝峰命名**
- 目錄 `(outlet)` 底下的路由將會變成子路由，有嵌套需求的可以這麼做，**父路由須由使用 react-router-dom 的 <Outlet /> 註冊**，類似 `vue-router` 的 `<router-view>`
  ```typescript jsx
  import { Outlet } from 'react-router-dom'
  
  function Page() {
    return <div>
      <div>父路由標題</div>
      <div>
        子路由 layout ^__^
        <Outlet />      
      </div>
    </div>
  }
  ```

```text
pages/ 假設這是你的路由目錄入口
  home/
    page.tsx - /home
  news/
    (outlet)
      list/
        page.tsx - /news/list (但是為 /news 的子路由)
    detail/
      [id]/
        page.tsx - /news/detail/:id
    page.tsx - /news (outlet) 目錄下路由的父路由
  page.meta.ts - / 的元數據，當 location === / 的時候，usePageRoute() 取回的 meta 就會是該檔定義的值
  page.tsx - /
```

## 配置

```typescript
// vite.config.ts
import { reactPageRoutes } from 'wtbx/vite'

export default defineConfig({
  plugins: [
    reactPageRoutes({
      defaultMeta: {}, // 預設的元數據，若此沒有且也沒有 page.meta.ts 的話，meta 值就為 undefined
      pages: [
        // 目錄路由的目錄絕對路徑
        // 採 merge 的形式後蓋前，有多模板需求的話可以使用
        path.resolve(__dirname, './src/pages'),
      ],
    }),
  ]
})

// src/vite-env.d.ts
// 如果需要類型提醒就配，阿我是想不到什麼理由不配
declare module '~page-routes' {
  import { ReactPageRoutes } from 'wtbx/vite'
  import type { PageMeta } from '@/type/common' // 這是你的元數據類型
  
  export const createPageRoutes: ReactPageRoutes.CreatePageRoutes
  export const usePageRoute: ReactPageRoutes.UsePageRute<PageMeta>
}
```

## 使用

```typescript jsx
// page.meta.ts
// 元數據的定義方式
import { PageMeta } from '@/type/common.ts'

const meta: PageMeta = {
  title: 'home',
}

// 必須使用 export default 導出變量
export default meta


// page.tsx
// 頁面的定義方式
import { Link } from 'react-router-dom'

function Page() {
  return <Link to={'/demo'}>/demo</Link>
}

// 必須使用 export default 導出 jsx
export default Page


// app.tsx
import { useMemo } from 'react'
import { Routes } from 'react-router-dom'
import { createPageRoutes, usePageRoute } from '~page-routes'

type CommonProps = { children: ReactNode }

const RouteWrap: FC<CommonProps> = ({ children }) => {
  // usePageRoute 可以用來拿路由元數據
  // { path: string, meta: PageMeta | undefined }
  const ctx = usePageRoute()
  
  // 如果傳完整的網址，那麼就會取出對應路徑的 meta 訊息
  // { path: string, meta: PageMeta | undefined }
  const ctx2 = usePageRoute('/xxx')
  
  // 必須要有 Suspense(因為只提供 lazy component)，其他按你需要加
  return <Suspense fallback={<></>}>{children}</Suspense>
}

function App() {
  // 生成目錄是路由列表，需放在 react-router-dom Routes 組件內
  const pageRoutes = useMemo(() => createPageRoutes({ Wrap: RouteWrap }), [])
  
  return (
    <Routes>
      {pageRoutes}
    </Routes>
  )
}
```

---

# 樣式

* 使用 `unocss` 寫樣式，配置文件預設為 `/uno.config.ts`
* 若 `unocss` 無法滿足樣式需求時，可以使用 `.css` 來寫
* `src/styles` 為全局的 css 放置目錄
* 預設會引入 `eric-meyer` 的 `reset.css` 來清除預設樣式

`uno.config.ts` 裡的 `unoPresetRem()` 會將類名的數字轉換為對應 `baseFontSize` 的 `rem`，比如說：
```text
baseFontSize = 16

text-4 = 0.25rem
text-16 = 1rem
text-20 = 1.25rem

所以不用在腦裡特別轉換每個 rem 的尺寸，要 16px 的 rem 就輸入 16，要 16px 就輸入 16px
```

---

# 國際化

## 配置

```typescript
// vite.config.ts
import { reactPageRoutes } from 'wtbx/vite'

export default defineConfig({
  plugins: [
    wtbxI18n({
      // 字典檔目錄的絕對路徑，一樣後蓋前
      dirs: [path.resolve(__dirname, './src/assets/locale')],
    }),
  ]
})


// src/vite-env.d.ts
// 如果需要類型提醒就配，阿我是想不到什麼理由不配
declare module '~wtbx-i18n' {
  import type { WtbxI18n } from 'wtbx/vite'
  
  type Dictionary = typeof import('@/assets/locale/zh_TW').default
  type Locale = 'en' | 'zh_TW'
  
  export const dictionary: Dictionary
  export const locale: Locale
  export const t: WtbxI18n.Translate<Dictionary>
  export const setLocale: WtbxI18n.SetLocale<Locale>
  export const App: WtbxI18n.App<Locale>
}


// src/assets/locale/en.ts
// 字典檔像這樣寫就好
export default {
  test: 'test',
  testBlock: {
    name: 'test block name',
  },
}
```

## 使用

```typescript jsx
// main.tsx
import { App as WtbxI18nApp } from '~wtbx-i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // 使用 ~wtbx-i18n 提供的 App 組件包裹來讓以下組件支持 locale 替換
  // defaultLocale 為預設的語系，語系為無附檔名的檔名
  // 有 fallback prop 可傳，預設為 <></>
  <WtbxI18nApp defaultLocale={'zh_TW'}>
    <App />
  </WtbxI18nApp>
)

// 其他 tsx
import {
  dictionary, // 當前字典檔，也就是 en.ts 那些
  locale, // 當前語系(無副檔名的檔名)，也就是 en 那些
  
  // 翻譯語法，支持 {0} {1} 這種索引入值，只要在 registerLocale 後使用都不會有問題
  // { world: '世界', parent: { hello: '你好 {0}' } } 假設字典如此
  // t('world') 世界
  // t('parent.hello', ['frank']) 你好 frank
  t, 
  
  setLocale, // 更換語系
  App, // setLocale 更換語系刷新應用用的組件
} from '~wtbx-i18n'
```

---

# Enum

> 參考代碼路徑為：/doc/code/example/enum/gen/index.ts

因為是 `Typescript` 專案，所以有原生地 `enum` 支持，所以為此使用資料夾來區分：
* `enum/gen/` 目錄為 `createEnum` 創建的；`enum/ts/` 目錄為 `ts 自帶的 enum`

```typescript
// enum/gen/status.ts
import { createEnum } from 'wtbx/common'

const Status = createEnum(
  // 預設為 ['label', 'value'], 若二參的二維數組的長度 <= 2 的話，傳 undefined 即可
  // 現在這裡傳的 ['color'] 為二參的二維數組第 2 筆後的名稱，也就是 'red' | 'green' 的名稱
  // **** 如果不是 undefined 的話，as const 為必須！ ****
  ['color'] as const,
	
  // **** as const 為必須！ ****
  [
    // 對應的 dataKey: label, value, color
    ['ERROR', 1, 'red'],
    ['OK', 2, 'green'],
  ] as const,
)

Status.getByLabel(
  // 二參二維數組的第 0 索引的值(又名 label)
  'ERROR',
  // 預設為 'value'，不傳就是 'value'，如果你想通過 label 取 'color' 的值，那就寫 'color'
  'value',
) // 1
Status.getByLabel('OK') // 2
Status.getByLabel('ERROR', 'color') // red

Status.getByValue(
  // 二參二維數組的第 1 索引的值(又名 value)
  1,
  // 預設為 'label'，不傳就是 'label'，如果你想通過 label 取 'color' 的值，那就寫 'color'
  'label',
) // 'ERROR'
Status.getByValue(2) // 'OK'
Status.getByValue(1, 'color') // 'ERROR'

Status.map<R>((
  // 此為二參對應索引的二維數組，這裡若 i 為 0，那麼 e 為 ['ERROR', 1, 'red']
  e, 
  i,
) => R)



// enum/ts/status.ts
// 這就是 ts 的 enum，就不補充什麼了
enum Status {
  OK,
  ERROR,
}
```

## 擴展 Enum 方法

如果有擴展方法掛載在 `createEnum` 的 `enum` 上可以這麼寫： 

```typescript
import { createEnum } from 'wtbx/common'

// 1. 定義 enum
const _enum = createEnum(
  undefined,
  [
    ['ERROR', 1],
    ['OK', 2],	
  ] as const
)

// 2. 定義擴展的方法類型
type _Actions = {
  hello: () => void
}

// 3. 將方法類型與 enum 綁起來
const Status = _enum as typeof _enum & _Actions

// 4. 擴展 hello 方法到 Status enum 上
Status.hello = () => {
  console.log('hello enum Status')
}

export { Status }
```

---

# Service

> 示範代碼可參考：/doc/code/example/service

* 使用 `wtbx/common` 提供的 `create-fetch2` 來處理 `api` 請求
* 可以使用 `jetbrains` 的 `json2ts` 插件來轉換類型，當然也可以用自己喜歡的

## 創建 `fetch2`

> `fetch2` 為 `fetch API` 的封裝版，在保留原本功能外又提供了以下功能：

首先是 `createFetch2` 的類型，粗布了解 `fetch2` 應當如何使用

```typescript
// 全局統一配置
type Options = {
  // 路由前綴
  prefix?: string
  
  // 就timeout(毫秒)
  timeout?: number
  
  // 重複次數 TODO 暫沒做
  retry?: number
  
  // 競態 TODO 暫沒做
  compete?: Fetch2CompeteEnum
}

// 單獨配置，會蓋掉 Options 的配置
type ApiOptions = Options & {
  // 取消控制器
  controller?: AbortController
  
  // 緩存時間(毫秒)
  cacheTime?: number
  
  // 是否無視緩存強制執行(會清除緩存)
  forceRun?: boolean
  
  // 用於處理重複請求的標記，如果路徑相同且標記一致只會發起一次請求
  // 1. 若為 get 且 mark == null 的話自動使用 url 做標記進行去重處理
  // 2. 若為非 get 請求，當 mark 為非 null | false 的值將進行去重處理(mark=true 的話使用 url 做標記)
  mark?: symbol | string | number | boolean
}

type CreateFetch2 = (options?: Options) => {
  // fetch2() 的類型
  <R = Fetch2.InterceptorResponse>(
    // 路徑格式為 '[METHOD]:[API_URL]'
    // example: get:/api/user/list, post:/api/user/create
    url: string,
    // NodeJS.fetch.RequestInit 為原本的 fetch 二參配置
    init?: Omit<NodeJS.fetch.RequestInit, 'body'> & {
      // 如果 method 不是 get | delete，可以使用 body 傳遞 json 參數，同 axios 的 data
      body?: object
      // 這個就是 query-string，同 axios 的 params
      params?: object
      // 返回的數據格式，也就是 fetch 的 res['json' | 'text' | ...]() 的方法 key
      resType?: 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'
    },
    options?: ApiOptions,
  ): Promise<R>
  
  // fetch2.cancel() 用以取消對應正在請求的 api 請求
  cancel: (controller: AbortController) => void
  
  // fetch2.cancelAll() 用以取消所有正在請求的 api
  cancelAll: () => void
  
  // fetch2.interceptors.(request|response|error).use()
  // 對應的攔截器，詳細看下方備註
  interceptors: {
    // callback 類型不想寫了，自己看
    request: { use: <R = any>(callback: Function) => R }
    response: { use: <R = any>(callback: Function) => R }
    error: { use: <R = any>(callback: Function) => R }
  }
}
```

創建 `fetch2` 方式以及如何對響應內容進行攔截處理

```typescript
// service/fetch2/index.ts
import { createFetch2 } from 'wtbx/common'

// 自定義響應類型
type ApiResponse<D = null> = {
  success: boolean
  status: number | undefined // undefined 為 error
  data: D
}

const fetch2 = createFetch2()

// 以下三個為攔截器，傳參不了解其實可以自己點進去看
// 統一 request 處理
fetch2.interceptors.request.use(config => {
  return config
})

// 統一正確的響應處理，fetch api 是後端不管是 400, 500 還啥只要是返回得了的
// 都是正確響應，可以使用 ok 跟 status 來判斷要響應什麼
fetch2.interceptors.response.use<ApiResponse>(res => {
  return res
})

// 錯誤響應攔截，如果未攔截的話 fetch2 遇到以下錯誤將會 throw error 出去，要主動 catch
// 首參是錯誤實例
//   內外部錯誤: Fetch2UnknownError
//   取消: Fetch2AbortError
//   超時: Fetch2TimeoutError
// 二參是 fetch2 傳入的所有數據 { url: string, init: RequestInit | null, apiOptions: ApiOptions | null }
fetch2.interceptors.error.use<ApiResponse>((error, userConfig) => {
  return error
})

// 導出後可以掛載到 apis/[domain]/type.ts 中，具體查閱下面
export type { ApiResponse }
export {
  fetch2
}
```

## 申明方式

```typescript
// 1. 先申明對應的 api 響應類型
// service/apis/user/type.ts
// 通常一個 api 一個 namespace，namespace 裡的類型可以通過 jetbrains 的 json2ts plugin 來轉換
export namespace UserList {
  // 這個 api 用到的其他 type 就包在裡面不用特別抽出去，儘管是一樣的
  export type User = {
    name: string
    age: number
  }

  // namespace export type Response 為最終的 Response 類型
  export type Response = User[]
}

// 2. 先創建 api 方法並掛上 Response 類型
// service/apis/user/index.ts
import { type ApiResponse, fetch2 } from '@/service'
import { UserList } from '@/service/apis/user/type'

// 將對應的類型掛到對應的 api 上
export const list = () => fetch2<ApiResponse<UserList.Response>>('get:/user/list')


// 3. 最重導出
// service/apis/index.ts
export * from '@/service/fetch2'
import * as user from '@/service/apis/user'

const apis = {
  user,
}

export { apis }
```

## 使用

```typescript
import { apis } from '@/service'

// page.tsx
function Page() {
  useEffect(() => {
    // 調用方式就這麼調用，此函數返回類型就是你的申明類型
    // 也就是 Promise<UserList.Response>
    apis.user.list()
  }, [])
  return null
}

export default Page
```

---

# Store

> 示範代碼可參考：/doc/code/example/store

使用 `Zustand` 來定義 `Store`，下面僅提供最基本的定義方式

```typescript
// 基本定義，基本上與官網寫的一樣

import { create } from 'zustand'

type User = {
  name: string
}

// 1. 定義 State 類型
type UserState = {
  user: User | null
}

// 2. 定義 Store 類型，& 後的類型就是 action 類型
type UserStore = UserState & {
  hello: () => void
}

// 3. 創建 Store，通常會使用 use 為開頭
const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  hello() {
    const user = get().user
    console.log(`hello ${user?.name}`)
  }
}))

// 4. 導出類型與 Store
export type { UserState, UserStore }
export { useUserStore }
```

## 持久化

雖然官方有提供內置的持久化 `middleware`，但我建議是用以下方式，因為規範起來比較清晰：

```typescript
// store/storage/index.ts
// 定義一個全局的 storage，用以集中管理有緩存的數據，以免 key 衝突或難找
import { createValueStorage } from 'wtbx/web'
import { envConfig } from '~env-config'

const name = (name: string) => `${envConfig.project.storagePrefix}-${name}`

const storage = {
  token: createValueStorage<string | null>(name('user'), null),
  // ...
}

export { storage }


// store/user/index.ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { storage } from '@/store/storage'

type UserState = {
  // 類型直接 typeof 就好
  token: typeof storage.token.defaultValue
}

type UserStore = UserState & {}

const useUserStore = create<UserStore>()(
  // 使用 subscribeWithSelector 中間件包裹以讓訂閱可以細粒化 
  subscribeWithSelector(set => ({
    // 使用 .defaultValue 取出初始值
    token: storage.token.defaultValue, 
  })),
)

// 監聽有緩存的 key-value(此為 token) 是否變化，變化就 setItem 更新
useUserStore.subscribe(state => state.token, storage.token.setItem)

export type { UserState, UserStore }
export { useUserStore }
```

`createValueStorage` 方法的類型為以下：

```typescript
type createValueStorage = <T>(
  key: string, 
  defaultValue: T, 
  storage: Storage, // default: localStorage 
  ignoreEmptyText: boolean
) => {
  defaultValue: T
  getItem: () => T
  setItem: (value: T) => void
  removeItem: () => void
}
```

---

# 其他用到的 `wtbx/vite` 插件

## buildDropLog 構件移除 console

```typescript
import { buildDropLog } from 'wtbx/vite'

export default defineConfig({
  plugins: [
    buildDropLog({
      // 如果為 true 且使用 vite build 指令將會移除 console, debugger 語法
      clean: envConfig.mode === 'production', 
    }),
  ]
})
```

---

# wtbx

> 待補不完善

工具集([連結](https://github.com/twjw/toolbox-js))
