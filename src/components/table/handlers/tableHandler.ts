import tableState from '../state/tableState'
import renderTable from '../table'

export function tableClickHandler() {
	const table = document.querySelector('.table') as HTMLElement

	table.addEventListener('click', (e) => {
		const target = e.target as HTMLElement

		if (target.closest('.table__c--h')) {
			const collHeader = target.closest('.table__c--h') as HTMLElement
			const collName = collHeader.getAttribute('data-sort')

			const i = collHeader.querySelector('.table__i-sort') as HTMLElement
			i.classList.toggle('table__i-sort--active')

			sortRenderData(collName)
		}
	})
}

function sortRenderData(collName: string | null) {
	if (!collName) return

	switch (collName) {
		case 'name':
			tableState.options.sorting[collName] = !tableState.options.sorting[collName]

			tableState.renderData = tableState.renderData?.sort((a, b) => {
				if (tableState.options.sorting[collName]) {
					if (a.name && b.name) return a.name.localeCompare(b.name)
				} else {
					if (a.name && b.name) return b.name.localeCompare(a.name)
				}

				return 0
			})

			break

		case 'age':
			tableState.options.sorting[collName] = !tableState.options.sorting[collName]

			tableState.renderData = tableState.renderData?.sort((a, b) => {
				if (tableState.options.sorting[collName]) {
					if (a.age !== undefined && b.age !== undefined) return a.age - b.age
				} else {
					if (a.age !== undefined && b.age !== undefined) return b.age - a.age
				}

				return 0
			})

			break

		case 'createdAt':
			tableState.options.sorting[collName] = !tableState.options.sorting[collName]

			tableState.renderData = tableState.renderData?.sort((a, b) => {
				if (tableState.options.sorting[collName]) {
					if (
						new Date(a.createdAt.split('.').reverse().join('.')) >
						new Date(b.createdAt.split('.').reverse().join('.'))
					)
						return 1
					if (
						new Date(b.createdAt.split('.').reverse().join('.')) >
						new Date(a.createdAt.split('.').reverse().join('.'))
					)
						return -1
					return 0
				} else {
					if (
						new Date(b.createdAt.split('.').reverse().join('.')) >
						new Date(a.createdAt.split('.').reverse().join('.'))
					)
						return 1
					if (
						new Date(a.createdAt.split('.').reverse().join('.')) >
						new Date(b.createdAt.split('.').reverse().join('.'))
					)
						return -1
					return 0
				}
			})
			break

		default:
			break
	}

	renderTable(tableState.renderData ?? [])
}
