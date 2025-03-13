import { readFileSync } from 'fs'
import { resolve } from 'path'

export default function htmlIncludePlugin() {
	return {
		name: 'vite-plugin-html-include',

		configureServer(server) {
			const reloadPage = () => {
				server.ws.send({
					type: 'full-reload',
					path: '*',
				})
			}

			server.watcher.on('add', reloadPage)
			server.watcher.on('change', reloadPage)
			server.watcher.on('unlink', reloadPage)
		},

		transformIndexHtml(html: any) {
			const includeRegex = /@@include\('([^']+)'\)/g
			return html.replace(includeRegex, (match, includePath) => {
				try {
					const fullPath = resolve(process.cwd(), includePath)
					const buffer = readFileSync(fullPath)
					const content = buffer.toString('utf-8') // Явно указываем кодировку
					return content
				} catch (error) {
					console.log(error)
				}
			})
		},
	}
}
