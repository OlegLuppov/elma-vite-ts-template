const fs = require('fs')
const path = require('path')

const bundlePath = path.resolve(__dirname, 'dist', 'index.html')

let bundleContent = fs.readFileSync(bundlePath, 'utf8')
// Заменяем все вхождения window.Scripts. на <%= Scripts %>.
bundleContent = bundleContent.replace(/window\.Scripts\./g, '<%= Scripts %>.')

// Заменяем все вхождения %elmaFilter на <%
bundleContent = bundleContent.replace(/%elmaFilter/g, '<%')

// Заменяем все вхождения elmaFilter% на %>
bundleContent = bundleContent.replace(/elmaFilter%/g, '%>')

fs.writeFileSync(bundlePath, bundleContent)
