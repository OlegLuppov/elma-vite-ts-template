import { defineConfig } from 'vite'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { viteSingleFile } from 'vite-plugin-singlefile'
import image from '@rollup/plugin-image'
import { createHtmlPlugin } from 'vite-plugin-html'
import StringReplace from 'vite-plugin-string-replace'

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
			compress: {
				drop_console: true, // Удаление вывода в консоль
				drop_debugger: true, // Удаление debugger
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
			compress: {
				drop_console: true, // Удаление вывода в консоль
				drop_debugger: true, // Удаление debugger
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
