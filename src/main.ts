import './style.css'
import Scripts from './shared/mock/methods'

async function renderWidget() {
	const data = await Scripts.getData()

	if (!data || !data.length) return

	console.log(data)
}

renderWidget()
