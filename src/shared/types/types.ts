export type TCastomCategory = {
	name: string
	code: string
	checked?: boolean
}

export interface ICastomStatusFilter extends TCastomCategory {
	id: string
	checked: boolean
}

export type TRenderData = {
	/**id */
	id?: string
	/**Имя */
	name?: string
	/**Ссылка*/
	link?: string
	/**Возраст */
	age?: number
	/**Статус */
	status?: string
	/**Дата создания */
	createdAt: string
}
