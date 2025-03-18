import { TCastomCategory, TRenderData } from '../../components/table/types'

export const data: TRenderData[] = [
	{
		'id': '2a9a60fc-57ca-4844-9418-f268a47337aa',
		'name': 'Анна Анна Анна',
		'link': 'https://usaspvarmfx3c.elma365.ru/profile/2a9a60fc-57ca-4844-9418-f268a47337aa',
		'age': 20,
		'createdAt': '11.03.2025',
	},
	{
		'id': '07b22f3c-f9b0-4d08-a61f-a82ac6e8a8a0',
		'name': 'Олег Олег Олег',
		'link': 'https://usaspvarmfx3c.elma365.ru/profile/07b22f3c-f9b0-4d08-a61f-a82ac6e8a8a0',
		'age': 31,
		'createdAt': '12.03.2025',
	},
	{
		'id': 'b66b74e1-f785-40df-a56f-f4262b9243e2',
		'name': 'Дмитрий Дмитрий Дмитрий',
		'link': 'https://usaspvarmfx3c.elma365.ru/profile/b66b74e1-f785-40df-a56f-f4262b9243e2',
		'age': 40,
		'createdAt': '13.03.2025',
	},
	{
		'id': 'f0756581-f8b9-4d62-b942-a1db72adfa4a',
		'name': 'Тест Тест Тест',
		'link': 'https://usaspvarmfx3c.elma365.ru/profile/f0756581-f8b9-4d62-b942-a1db72adfa4a',
		'age': 10,
		'createdAt': '14.03.2025',
	},
	{
		'id': 'f0756581-f8b9-4d62-b942-a1db72adfa4a',
		'name': 'Вася Вася Вася',
		'link': 'https://usaspvarmfx3c.elma365.ru/profile/f0756581-f8b9-4d62-b942-a1db72adfa4a',
		'age': 20,
		'createdAt': '11.05.2025',
	},
]

export let castomStatusesFilter: TCastomCategory[] = [
	{
		'name': 'Новый',
		'code': 'new',
		'checked': true,
	},
	{
		'name': 'Пропал',
		'code': 'disappeared',
		'checked': true,
	},
	{
		'name': 'Отпуск',
		'code': 'vacation',
		'checked': true,
	},
]
