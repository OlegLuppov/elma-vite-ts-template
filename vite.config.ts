import { defineConfig } from 'vite'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { viteSingleFile } from 'vite-plugin-singlefile'
import image from '@rollup/plugin-image'
import { createHtmlPlugin } from 'vite-plugin-html'
import StringReplace from 'vite-plugin-string-replace'
import htmlIncludePlugin from './plugins/vite-plugin-html-include'

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
				search: 'import Scripts',
				replace: '//import Scripts',
			},
			{
				search: /Scripts\./g,
				replace: 'window.Scripts.',
			},
			{
				search: '<%',
				replace: '%elmaFilter',
			},
			{
				search: '%>',
				replace: 'elmaFilter%',
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
