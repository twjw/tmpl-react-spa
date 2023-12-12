# twjw-tmpl-react-spa

> Author: @twjw  
> Repository: https://github.com/twjw/tmpl-react-spa

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
- [alias](#alias)
- [路由](#路由)
  - [規則](#規則)
  - [配置](#配置)
  - [使用](#使用)
- [樣式](#樣式)
- [國際化](#國際化)
- [其他用到的 `wtbx/vite` 插件](#其他用到的-wtbx/vite-插件)
- [wtbx](#wtbx)

---

# IDE 插件

- `項目必要`
  - `Unocss` 樣式插件
- `其他不錯的`
  - `Smart Input` 自動切換輸入法
  - `AI Assistant` 比 chat gpt 還準確的 AI
  - `Translation` 翻譯用
  - `Database Tools...` 數據庫用
  - `.ignore` ignore 創建用
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
06. 除了 `*.page.tsx` 外，都使用 `export` 導出而不是 `export default`，`export`, `export default` 建議在最底部一次導出，而不是在變量前申明

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

- `src/example` 刪除該目錄
- `vite.config.ts` 裡的 `reactPageRoutes` 插件裡的 `pages[]` 移除 `example` 目錄那行(`path.resolve(__dirname, './src/example/pages')`)

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
    template/
      page/ - 可以用作頁面模板，複製貼上改目錄名就建好一個頁面了
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
    store/ - 狀態目錄
    style/ - 樣式目錄
      common.css - 全局樣式
    type/ - 類型目錄
      common.ts - 通用類型
    utils/ - 通用方法目錄
    app.tsx - 入口 App Component
    main.tsx - 入口 (react-dom render)
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

# 環境變數

> 環境變數配置位置於跟目錄下的 `.env.?*.ts`

## 定義

* `// --- ---` **兩個這著註解不可更動**，這是我讀取環境變數的範圍用
* 可以使用 `ts`, `json` 副檔名定義，僅推薦 ts
* 命名方式為 `通用: .env.(ts|json)`, `mode: .env.*.(ts|json)`

其他的定義看以下描述就好

```typescript
import { WObject } from '../toolbox-js/packages/type'

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
import { autoAlias } from '../toolbox-js/packages/vite'

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

# alias

直接配在 `tsconfig.json` 的 `compilerOptions.paths` 裡就好，會用過 `autoAlias plugin` 自動注入到 client，預設配置了 `@` 也就是 `./src` 目錄

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
    page.tsx // /home
  news/
    (outlet)
      list/
        page.tsx // /news/list (但是為 /news 的子路由)
    detail/
      [id]/
        page.tsx // /news/detail/:id
    page.tsx // /news (outlet) 目錄下路由的父路由
  page.meta.ts // / 的元數據
  page.tsx // /
```

## 配置

```typescript
// vite.config.ts
import { reactPageRoutes } from '../toolbox-js/packages/vite'

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
	export const usePageRoute: ReactPageRoutes.UsePageRute<Partial<PageMeta>>
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
	return <Link to={'/example'}>/example</Link>
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
	const ctx = usePageRoute()
  
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

> 使用 `unocss` 寫樣式，配置文件預設為 `/uno.config.ts`

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
import { reactPageRoutes } from '../toolbox-js/packages/vite'

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

	type Dictionary = import('./assets/locale/en').default
	type Locale = 'en' | 'zh_TW'

	export const dictionary: Dictionary
	export const locale: Locale
	export const t: WtbxI18n.Translate<Dictionary>
	export const register: WtbxI18n.Register<Locale>
	export const setLocale: WtbxI18n.SetLocale<Locale>
	export const App: WtbxI18n.App
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
import { register as registerLocale, App as WtbxI18nApp } from '~wtbx-i18n'

// 註冊 i18n，必須在使用 t 前註冊
registerLocale({
	default: 'zh_TW', // 預設的語系
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	// 使用 ~wtbx-i18n 提供的 App 組件包裹來讓以下組件支持 locale 替換
  <WtbxI18nApp>
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
  
	register, // 註冊 i18n
	setLocale, // 更換語系
	App, // setLocale 更換語系刷新應用用的組件
} from '~wtbx-i18n'
```

---

# 其他用到的 `wtbx/vite` 插件

---

# wtbx

工具集([連結](https://github.com/twjw/toolbox-js))
