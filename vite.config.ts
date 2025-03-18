import { defineConfig } from 'vite'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { viteSingleFile } from 'vite-plugin-singlefile'
import image from '@rollup/plugin-image'
import { createHtmlPlugin } from 'vite-plugin-html'
import StringReplace from 'vite-plugin-string-replace'
import htmlIncludePlugin from './plugins/vite-plugin-html-include'

import {
	REG_EXP_SCRIPTS_GLOBAL,
	WINDOW_SCRIPTS,
	BRACKET_FILTER_START,
	BRACKET_FILTER_END,
	ELMA_FILTER_START,
	ELMA_FILTER_END,
	IMPORT_SCRIPTS,
	IMPORT_SCRIPTS_REPLACE,
} from './compilation-constants'

const devConfig: any = {
	plugins: [
		getBabelOutputPlugin({
			compact: false,
			allowAllFormats: true,
			presets: [
				[
					'@babel/preset-env',
					{
						targets: '> 0.25%, not dead, IE 11',
						useBuiltIns: false,
						modules: false,
						exclude: /node_modules/,
					},
				],
			],
		}),
		htmlIncludePlugin(), // Пользовательский плагин для @@include('path) импорта html файлов
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					// Передаем переменные в EJS
					UI: {
						widget: {
							contextRow: (key: string) => `Context Row: ${key}`,
						},
					},
				},
			},
		}),
		image(), // Картинки в base64
		viteSingleFile(), // Сборка в один html файл
	],
	server: {
		hmr: true, // Включить горячую перезагрузку
		watch: {
			usePolling: true, // Использовать polling для отслеживания изменений
			interval: 1000, // Интервал проверки изменений
		},
	},
	build: {
		target: 'ie11',
		assetsInlineLimit: 1000000000,
		// Минификация
		minify: 'terser',
		// Опции минификации
		terserOptions: {
			keep_classnames: true, // Сохранять имена классов
			keep_fnames: true, // Сохранять имена функций
			format: {
				comments: false, // Удаление комментариев
			},
		},
	},
}

const prodConfig: any = {
	plugins: [
		StringReplace([
			{
				search: IMPORT_SCRIPTS,
				replace: IMPORT_SCRIPTS_REPLACE,
			},
			{
				search: REG_EXP_SCRIPTS_GLOBAL,
				replace: WINDOW_SCRIPTS,
			},
			{
				search: BRACKET_FILTER_START,
				replace: ELMA_FILTER_START,
			},
			{
				search: BRACKET_FILTER_END,
				replace: ELMA_FILTER_END,
			},
		]),
		getBabelOutputPlugin({
			allowAllFormats: true,
			compact: false,
			presets: [
				[
					'@babel/preset-env',
					{
						targets: '> 0.25%, not dead, IE 11',
						useBuiltIns: false,
						modules: false,
					},
				],
			],
		}),
		htmlIncludePlugin(), // Пользовательский плагин для @@include('path) импорта html файлов
		createHtmlPlugin({
			minify: true, // Минификация html
		}),
		image(), // Картинки в base64
		viteSingleFile(), // Сборка в один html файл
	],
	build: {
		assetsInlineLimit: 1000000000,
		// Минификация
		minify: 'terser',
		// Опции минификации
		terserOptions: {
			keep_classnames: true, // Сохранять имена классов
			keep_fnames: true, // Сохранять имена функций
			format: {
				comments: false, // Удаление комментариев
			},
		},
	},
}

export default defineConfig(({ command }) => {
	if (command === 'serve') {
		return devConfig
	} else {
		return prodConfig
	}
})
