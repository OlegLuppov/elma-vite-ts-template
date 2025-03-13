import { ICastomStatusFilter, TRenderData } from '../types/types'

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
		'createdAt': '11.03.2025',
	},
	{
		'id': 'b66b74e1-f785-40df-a56f-f4262b9243e2',
		'name': 'Дмитрий Дмитрий Дмитрий',
		'link': 'https://usaspvarmfx3c.elma365.ru/profile/b66b74e1-f785-40df-a56f-f4262b9243e2',
		'age': 40,
		'createdAt': '11.03.2025',
	},
	{
		'id': 'f0756581-f8b9-4d62-b942-a1db72adfa4a',
		'name': 'Тест Тест Тест',
		'link': 'https://usaspvarmfx3c.elma365.ru/profile/f0756581-f8b9-4d62-b942-a1db72adfa4a',
		'age': 10,
		'createdAt': '11.03.2025',
	},
	{
		'id': 'f0756581-f8b9-4d62-b942-a1db72adfa4a',
		'name': 'Вася Вася Вася',
		'link': 'https://usaspvarmfx3c.elma365.ru/profile/f0756581-f8b9-4d62-b942-a1db72adfa4a',
		'age': 20,
		'createdAt': '11.03.2025',
	},
]

export let castomStatusesFilter: ICastomStatusFilter[] = [
	{
		'id': '206a8900-a73d-4885-b680-3874d26297bf',
		'name': 'Согласование',
		'code': 'agreement',
		'checked': false,
	},
	{
		'id': '33346b47-222c-4f44-9914-d78befc7553a',
		'name': 'Новая',
		'code': 'new',
		'checked': false,
	},
	{
		'id': '9684e545-f876-49d6-adb7-46bcc49a4ccf',
		'name': 'В работе',
		'code': 'inProgress',
		'checked': true,
	},
	{
		'id': '1600cc62-fad8-4388-a01f-a861bc63e5b5',
		'name': 'Пауза',
		'code': 'pause',
		'checked': false,
	},
	{
		'id': 'addae284-6df2-4377-89ab-e1f1216f406a',
		'name': 'Закрыта (успешно)',
		'code': 'closed',
		'checked': false,
	},
	{
		'id': '53d2edef-4225-4f32-906f-6ae0531cc9c2',
		'name': 'Закрыта (неуспех)',
		'code': 'rejected',
		'checked': false,
	},
	{
		'id': 'f70406ef-e166-4a93-bbce-c234682809ff',
		'name': 'Отменена',
		'code': 'closedInterrupted',
		'checked': false,
	},
	{
		'id': '3912375d-b65d-4fa7-9937-242baed48ba3',
		'name': 'В архиве',
		'code': 'inArchive',
		'checked': false,
	},
]
