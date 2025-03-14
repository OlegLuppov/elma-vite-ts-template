import './style.css'

import Scripts from './shared/mock/methods'
import renderTable from './components/table/table'

async function renderWidget() {
	const data = await Scripts.getData()

	if (!data || !data.length) return

	console.log('renderData', data)
	renderTable(data)
}

renderWidget()
