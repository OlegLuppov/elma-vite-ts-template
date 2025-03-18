import './style.css'
import Scripts from './shared/mock/methods'
import renderTable from './components/table/table'
import tableState from './components/table/state/tableState'
import { tableClickHandler } from './components/table/handlers/tableHandler'
import { Preloader } from '../node_modules/ccl-elma/components/preloaders/preloader_variant_1/preloader'
import ButtonSearch from '../node_modules/ccl-elma/components/buttons/button_search/index'
import ButtonReset from '../node_modules/ccl-elma/components/buttons/button_reset/index'
import ButtonExport from '../node_modules/ccl-elma/components/buttons/button_export/index'
import { DropdownList } from '../node_modules/ccl-elma/components/dropdown_lists/dropdownList_variant_1/dropdownList'

let preloader: Preloader

async function setState() {
	const data = await Scripts.getData()

	if (!data || !data.length) return

	tableState._data = data
	tableState.renderData = data
}

function initCcl() {
	const preloaderWrp = document.querySelector('.example-widget-container')
	const btnSearchWrp = document.querySelector('.filters-panel__btn-wrp--search')
	const btnExportWrp = document.querySelector('.filters-panel__btn-wrp--export')
	const statusFilterWrp = document.querySelector('.filter-panel__filter--status')

	const preloaderOptions = {
		wrapper: preloaderWrp,
		message: 'Идет загрузка данных',
	}

	preloader = new Preloader(preloaderOptions)
	preloader.init()

	const btnSearchOptions = {
		name: 'Сформировать',
		wrapper: btnSearchWrp,
		callback: searchHandler,
	}

	const btnSearch = new ButtonSearch(btnSearchOptions)
	btnSearch.init()

	const btnResetOptions = {
		name: 'Сбросить фильтры',
		wrapper: btnSearchWrp,
		callback: resetHandler,
	}

	const btnReset = new ButtonReset(btnResetOptions)
	btnReset.init()

	const btnExportOptions = {
		name: 'Выгрузить в excel',
		wrapper: btnExportWrp,
		callback: () => console.log('export to excel'),
	}

	const btnExport = new ButtonExport(btnExportOptions)
	btnExport.init()

	let selectionData = Scripts.getCastomStatuses()

	const propsForDropdown = {
		name: 'Статус',
		items: selectionData,
		wrapper: statusFilterWrp,
		callback: Scripts.setCastomStatuses,
	}

	const dropdown = new DropdownList(propsForDropdown) // Cоздаем экземпляр класса Выпадающего списка
	dropdown.init() //Инициализируем Выпадающий список
}

async function renderWidget() {
	preloader.show()
	await setState()
	if (
		!tableState._data ||
		!tableState._data.length ||
		!tableState.renderData ||
		!tableState.renderData.length
	) {
		preloader.hide()
		return
	}

	console.log('renderData', tableState.renderData)

	renderTable(tableState.renderData)
	tableClickHandler()
	preloader.hide()
}

async function searchHandler() {
	await renderWidget()
}

async function resetHandler() {
	Scripts.setDefaultFilters()
	await renderWidget()
}

initCcl()

renderWidget()
