const fs = require('fs')
const path = require('path')

const {
	REG_EXP_WINDOW_SCRIPTS,
	ELMA_SCRIPTS,
	REG_EXP_ELMA_FILTER_START,
	BRACKET_FILTER_START,
	REG_EXP_ELMA_FILTER_END,
	BRACKET_FILTER_END,
} = require('./compilation-constants')

const bundlePath = path.resolve(__dirname, 'dist', 'index.html')

let bundleContent = fs.readFileSync(bundlePath, 'utf8')
// Заменяем все вхождения window.Scripts. на <%= Scripts %>.
bundleContent = bundleContent.replace(REG_EXP_WINDOW_SCRIPTS, ELMA_SCRIPTS)

// Заменяем все вхождения %elmaFilter на <%
bundleContent = bundleContent.replace(REG_EXP_ELMA_FILTER_START, BRACKET_FILTER_START)

// Заменяем все вхождения elmaFilter% на %>
bundleContent = bundleContent.replace(REG_EXP_ELMA_FILTER_END, BRACKET_FILTER_END)

fs.writeFileSync(bundlePath, bundleContent)
