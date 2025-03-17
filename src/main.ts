import './style.css'

import Scripts from './shared/mock/methods'
import renderTable from './components/table/table'
import tableState from './components/table/state/tableState'
import { tableClickHandler } from './components/table/handlers/tableHandler'

async function setState() {
	const data = await Scripts.getData()

	if (!data || !data.length) return

	tableState._data = data
	tableState.renderData = data
}

async function renderWidget() {
	await setState()
	if (
		!tableState._data ||
		!tableState._data.length ||
		!tableState.renderData ||
		!tableState.renderData.length
	)
		return

	console.log('renderData', tableState.renderData)

	renderTable(tableState.renderData)
	tableClickHandler()
}

renderWidget()
