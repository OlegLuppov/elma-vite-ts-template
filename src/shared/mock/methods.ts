import { TCastomCategory } from '../../components/table/types'
import { castomStatusesFilter, data } from './data'

async function getData() {
	return data
}

function setDefaultFilters() {
	return
}

function getCastomStatuses() {
	return castomStatusesFilter
}

function setCastomStatuses(data: TCastomCategory[]) {
	return data
}

export default {
	getData,
	setDefaultFilters,
	getCastomStatuses,
	setCastomStatuses,
}
