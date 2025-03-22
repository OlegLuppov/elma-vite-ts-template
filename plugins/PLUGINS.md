# PLUGINS


### DESCRIPTIONS
- Описание пользовательских (кастомных) плагинов используемых для сборки в `vite.config.ts`

### htmlIncludePlugin
- Дает возможность подключать HTML файлы в точку входа index.html через инструкцию `@@include('path/your_html.html')`

### EXAMPLE
`Точка входа index.html`
```
!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
	</head>
	<body>
		<div>
			@@include('./src/components/component_1/component_1.html')
			@@include('./src/components/component_2/component_2.html')
		</div>
	</body>
</html>
```
