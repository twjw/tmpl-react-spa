export type Mode = 'development' | 'production'

export type EnvConfig = {
	mode: Mode
} & typeof import('../build-recipe/env/env').default
