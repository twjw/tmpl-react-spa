# twjw-tmpl-react-spa

> Author: @twjw  
> Repository: https://github.com/twjw/tmpl-react-spa
>
> **[初始化](#初始化)** <- 該章節必看

---

# 目錄

- [TODO](#TODO)
- [偉大的IDE](#偉大的IDE)
- [package 介紹](#package-介紹)
- [最佳實踐](#最佳實踐)
- [初始化](#初始化)
  - [1. 使用 `pnpm`](#1-使用-pnpm)
  - [2. 配置 `prettier`](#2-配置-prettier)
  - [3. 包路徑替換](#3-包路徑替換)
- [目錄結構](#目錄結構)
- [env 環境變數](#env-環境變數)
  - [動態環境](#動態環境)
- [alias 路徑別名](#alias-路徑別名)
- [src/pages 頁面(路由)](#srcpages-頁面路由)
  - [註冊路由](#註冊路由)
  - [路由規則](#路由規則)
    - [基本](#基本)
    - [嵌套](#嵌套)
  - [其他](#其他)
- [wtbx](#wtbx)
  - [wbtx/common](#wbtxcommon)
  - [wbtx/web](#wbtxweb)

---

# 紀錄

* 要補樣式尺寸用法
* 確認文檔通不通，因為轉TS了
* 國際化文檔

---

# 偉大的IDE

教你打造最好的 `Jetbrains` 開發環境(待補)

smart-input

---

# package 介紹

```javascript
packages = {
  dependencies: {
    antd: '^5.11.2', // 組件
    clsx: '^2.0.0', // 類名組裝
    'date-fns': '^2.30.0', // 日期
    immer: '^10.0.3', // 方便的處理不可變狀態
    'lodash-es': '^4.17.21', // 就 lodash，這是我用來寫底層用的，不過有需要就用
    mitt: '^3.0.1', // 發布訂閱
    'query-string': '^8.1.0', // QS 轉換
    react: '^18.2.0', // 就 react@18
    'react-dom': '^18.2.0', // 就 react-dom@18
    'react-router-dom': '^6.3.0', // 鎖 6.3 版，6.4+ 會有 data api，用不到
    wtbx: '^x.x.x', // 自研的工具集
    zustand: '^4.4.6', // 狀態管理
  },
  devDependencies: {
    '@vitejs/plugin-react': '^4.2.0', // babel 版，也有 swc 版，看情況再決定要不要換過去
    unocss: '^0.57.4', // 樣式
    'vite-plugin-html': '^3.2.0', // 為入口 html 注入值
    'vite-plugin-svgr': '^4.1.0', // svg component
  },
}
```

---

# 最佳實踐

01. 環境變數配置路徑為 `core/build-recipe/env`，建議使用 `ts` 檔配置
02. 除了國際化字典檔外，檔案名採 `短橫線連接(kebab-case)` 規則命名
03. 使用 `pnpm` 做包管理
04. 配置 `prettier`
05. 建議使用 `Jetbrains IDE` 開發，僅對該 IDE 做優化
06. **[初始化](#初始化)** 標題裡的內容**必看**！
07. 純邏輯使用 `.tx`，含 **UI** 使用 `.tsx`
08. 時間庫使用 `date-fns`，因為不是 `dayjs` 的關係，所以 `antd` 的日期相關組件請從 `@/components/index.tsx` 導入
09. 除了 `*.page.tsx` 外，都使用 `export` 導出而不是 `export default`
10. `export`, `export default` 建議在最底部一次導出，而不是在變量前申明

```tsx
const outlet = true

function Page() {
  return <></>
}

export { outlet }

export default Page
```

12. 除了國際化字典檔外，通用方法或組件(如: `componets` 目錄)，建議在目錄下創建 `index.ts` 檔一次導出

---

# 初始化

## 1. 使用 `pnpm`

確認有安裝 `pnpm`，包管理工具採 `pnpm` 處理，`yarn.lock`, `package-lock.json` 都會被 git ignore 掉

## 2. 配置 `prettier`

> 這個是可配可不配，沒配也不會影響，因為有自動化 prettier

如果使用`噴腦(Jetbrains IDE)`，可以照以下步驟設置：

```text
1.   shift 2 下
2.   在 All 或 Actions Tab 裡輸入 prettier
3.   點擊左邊為 Prettier 右邊為 Settings 的那個選項
4.   選擇第二個 Radio 選項(Automatic Prettier configuration)
4.5. Run for files 裡至少得有 js,jsx,ts,tsx，我的配置是 **/*.{js,ts,jsx,tsx,vue,astro}
5.   將下方的 Run on save 打勾

以上完成將啟動儲存時自動 prettier
```

## 3. 包路徑替換

```text
1. 將 ./package.json 檔的
  "wtbx": "link:..\\toolbox-js",
    替換成相對應的版號，比方說
  "wtbx": "^1.0.0",
```

## 4. 移除多餘檔案/目錄

- `src/pages/example` 刪除該目錄
- `src/mock-server` 刪除該目錄

---

# 目錄結構

以下列出比較重要的而已

```text
react-spa
  .husky // husky 主目錄
    pre-commit // git pre-commit hook
	.wtbx-build/ // 腳本生成的檔案，會被 .gitignore 掉(所以項目開發不要引用這裡黑= =)
    env-config.js // 開發用的環境變數
  core/
    app/ // 開發通用模塊(不常改的核心模塊，類似 soul 那樣的東西)
      index.tsx // ~app 指向的檔案
    build-recipe/
      env/
        env.json // 通用環境變數
        env.[mode].json mode // 環境變數，可以通過 vite --mode 指定
      vite/
        config/ // vite 相關配置，有需要就改
        utils/ // vite 通用方法
        bootstrap.ts // vite 相關配置，有需要就改
    type/ // core 用的 type
  dist/ // bundle 目錄
  mock-server/ // 開發中不介紹
  public/ // 靜態資源目錄
  src/
    assets/ // 引用資源目錄(最後打包都會被我送到 public 裡，一來目錄乾淨；一來 cdn 優化方便)
    enums/ // 枚舉目錄
    hooks/ // 鉤子目錄
    pages/ // 頁面目錄
    store/ // 狀態目錄
    type/ // 類型目錄(有需要在用)
      global.d.ts // 通用類型
    utils/ // 通用方法目錄
    app.tsx // 入口 App Component
    main.tsx // 入口 (react-dom render)
  index.html // 入口 html
  pnpm-lock.yaml // 包 lock，因為使用 pnpm，所以是 pnpm-lock.yaml 檔
  vite.config.ts // vite 配置，不過寫在 core/build-recipe/vite/bootstrap.ts 裡
```

# env 環境變數

> 環境變數配置位置於 `core/build-recipe/env/` 目錄下，當 vite 啟動後會生成 `src/core/env-config.js`，如果項目需要環境變數可以
> import 該檔案(`@core/env-config`)

- 接著講解 env 的配置方式：

  - 建議使用 `.ts` 來配置
    - 開發 vite 時可以獲取到環境變數類型
    - 可以寫註釋
  - 如果 `key` 以底線(`_`)為開頭的話，將不會傳遞到 `vite` 環境裡
  - 如果環境變數值有 `Array` 的話，採用合併的方式處理

    ```javascript
    // env.ts
    const common = {
      levels: [1, 2, 3],
    }
    // env.development.ts
    const dev = {
      levels: [4, 5],
    }

    // 上面兩個數組合併將為以下，所以使用數組做環境變數要注意這塊
    const result = [4, 5, 3]
    ```

  - 可以使用 `.json` 或者 `.ts` 副檔名進行環境變數配置

    ```javascript
    // 開啟 ts 配置(默認配置)
    createEnvConfig(mode)
    // or
    createEnvConfig(mode, 'ts')

    // 開啟 json 配置
    createEnvConfig(mode, 'json')
    ```

    - .json
      ```json
      {
        "hello": "world!"
      }
      ```
    - `.ts` 配置方式
      - 其中 `// --- ---` **這兩個註解不可動，因為這是我要抓取的環境變數物件範圍**
      - 然後值不可以使用動態的，只能像 `.json` 檔一樣寫死的，如果要動態替換請在 `createEnvConfig()` 的第三個參數處理
      ```typescript
      export default // --- ---
      {
        hello: 'world!',
      }
      // --- ---
      ```

## 動態環境

如果有動態替換環境的需求，可以在 `createEnvConfig()` 的第三個參數處理

```javascript
const envConfig = await createEnvConfig(
  mode,
  'ts',
  // 使用第三個轉換語句將環境變量替換掉
  _envConfig => {
    // 在原有的環境變數物件裡添加 version，值為現在的年與月
    const d = new Date()
    _envConfig.version = `v${d.getFullYear()}.${d.getMonth()}`

    // 返回的將會是你最終的環境變數
    return _envConfig
  },
)
```

# alias 路徑別名

如果要配置 alias 的話請加在 `./idea.paths.json` 裡(**這裡的配置，只能對 vite 運行環境生效，vite 前跟 server 將失效**)

```js
System.config({
  paths: {
    '~common/*': 'core/app/*',
    '@/*': 'src/*',
  },
})
```

- 我的配置規則
  - `~` 特殊路徑，通常是指向 `core` 相關的
  - `@` src 下的

# src/pages 頁面(路由)

> 小提示：  
> 不好看頁面路徑的話可以看 IDE 的路徑(下圖)，就可以看出現在是哪個路由了哦 >.0
>
> ![](https://raw.githubusercontent.com/twjw/pic-bed/main/202311192141798.png)

- 採**目錄式路由**，會自動生成 `react-router@6` 的路由系統
  - 順便說，路由會鎖在 `6.3` 版本，因為在上去都是 `ssr api`
    ，完全是用不到，所以看文檔請看 [`6.3`](https://reactrouter.com/en/v6.3.0) 版的路由喔
- `pages` 可自定義，但我是建議使用 `pages` 啦，比較不會這麼搞怪，以下示範怎麼替換

  ```javascript
  import { registerRouter } from '~app'

  registerRouter({
    // 將 prefix, modules 的 ./pages 替換成你想要的目錄的"相對路徑"
    prefix: './pages',
    modules: import.meta.glob('./pages/**/page.tsx'),
  })
  ```

- 檔名為 `page.tsx` 的檔案都會被自動轉成路由頁面(**必須 export default 導出**)
- 目錄為 `[xxx]` 的檔案都會被轉成參數路由
  - 如 `[id]` 轉成 `:id`
  - 如 `[my-name]` 轉成 `:myName`，**注意：如果是多個單字的參數明會自動轉成駝峰命名**
- 目錄 `(outlet)` 底下的路由將會變成子路由，有嵌套需求的可以這麼做

## 註冊路由

```javascript
// main.tsx
// 從 ~app 引入 registerRouter 來註冊頁面路由
import { registerRouter } from '~app'

// 必須在 ReactDOM.createRoot render 前調用
registerRouter({
  // 略 prefix, modules

  // 自定義路由 Suspense，如果想細分的話用 path 判斷即可
  Suspense: ({ path, children }) => (
    <Suspense fallback={<div>{path} 頁面加載中...</div>}>{children}</Suspense>
  ),
})

// 在你需要渲染 Routes 的地方
import { Routes } from '~app'

function Page() {
  // 使用該組件即可(記得父層要有 react-router-dom 的 Router 組件)
  return <Routes />
}

export default Page
```

## 路由規則

### 基本

```javascript
pages / news / [id] / [start - date]
page.tsx // /news/:id/:startDate
page.tsx // /news/:id
page.tsx // /news
page.tsx // /
```

### 嵌套

因為是轉換成 `react-router@6` 的路由關係，所以子路由的上層路由**必須有 <Outlet /> 組件(類似 Vue 的 router-view 的概念)**
，這樣子路由才會被渲染出來！這種路由在做 tab
切換頁面就很適合使用，這樣外層組件才不用重新渲染，可以更高效的渲染畫面且可以局部 `Suspense` 或 `權限較驗`

```javascript
pages /
  news /
  outlet / // 以下的路由都會變成 /news 的子路由
  tab1 /
  page.tsx // /news/tab1
tab2 / page.tsx // /news/tab2
page.tsx // /news

// news/page.tsx
import { Outlet } from 'react-router-dom'

function Page() {
  return (
    <>
      <h1>/news</h1>
      <Tabs tabs={['/news/tab1', '/news/tab2']} />

      {/* 注意必須有這個！！不然子路由無法渲染 */}
      <Outlet />
    </>
  )
}

export default Page
```

如果你希望 `/` 外路由都有同樣的 `layout`，那麼只要在 `pages/` 目錄下創建 `(outlet)` 目錄就通吃囉

```javascript
pages /
  outlet / // 以下路由都會在 / 的 Outlet 之中
  page.tsx // /
```

## 其他

```javascript
// 略 Router, registerRouter
import {
  // 返回所有頁面的路由路徑，你在 development mode 的 info log 裡看到的路由數組就是這個的值
  routePaths,
} from '~app'
```

---

# wtbx

自研的工具集([連結](https://github.com/twjw/js-kit/tree/main/toolbox))
