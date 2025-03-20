import XLSX from 'xlsx-js-style'
import { TRenderData } from '../components/table/types'

function exportToExcel(data: TRenderData[]) {
	if (!data || !data.length) return

	const dataForXlsx = prepareDataForExlsx(data)

	const worksheet = XLSX.utils.aoa_to_sheet(dataForXlsx ?? [], { cellDates: true })

	worksheet['!cols'] = [{ wpx: 250 }, { wpx: 150 }, { wpx: 150 }]

	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, 'page_1')
	XLSX.writeFile(workbook, 'Пользователи.xlsx')
}

function prepareDataForExlsx(data: TRenderData[]) {
	if (!data || !data.length) return
	const styles = getStylesForExcel()
	const dataForXlsx: any[] = [
		[
			{ t: 's', v: 'Имя', s: styles.headerTitle },
			{ t: 's', v: 'Возраст', s: styles.headerTitle },
			{ t: 's', v: 'Дата создания', s: styles.headerTitle },
		],
	]

	data.forEach((user) => {
		dataForXlsx.push([
			{ t: 's', v: user.name ?? '' },
			{ t: 'n', v: user.age ?? 0 },
			{ t: 'd', v: getDateExcel(user.createdAt) },
		])
	})

	return dataForXlsx
}

function getDateExcel(date: string | undefined) {
	// from '01.01.1993' to '1993.01.01'
	if (!date || date === '') return
	const dateSplit = date.split('.')
	const day = dateSplit[0]
	const month = dateSplit[1]
	const year = dateSplit[2]

	return `${year}-${month}-${day}`
}

function getStylesForExcel() {
	const headerTitle = {
		alignment: { vertical: 'center', horizontal: 'left' },
		font: {
			bold: true,
			sz: 10,
			color: { rgb: 'black' },
		},
	}

	return {
		headerTitle,
	}
}

export default exportToExcel
