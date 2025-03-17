import { TRenderData } from './types'

function renderTable(data: TRenderData[]) {
	const tableBody = document.querySelector('.table__b') as HTMLElement
	tableBody.textContent = ''

	if (!data || !data.length) return

	const tmpRow = document.querySelector('.template-table-b-r') as HTMLTemplateElement

	data.forEach((user) => {
		const row = tmpRow.content.querySelector('.table__r')!.cloneNode(true) as HTMLLIElement

		const link = row.querySelector('.table__link--name') as HTMLLinkElement
		link.textContent = user.name ?? ''
		if (user.link) {
			link.href = user.link
		}

		const age = row.querySelector('.table__content--age') as HTMLParagraphElement
		age.textContent = user.age ? `${user.age}` : 'Не заполнено'

		const createdAt = row.querySelector('.table__content--created-at') as HTMLParagraphElement
		createdAt.textContent = user.createdAt

		tableBody.append(row)
	})
}

export default renderTable
