export type TCastomCategory = {
	name: string
	code: string
	checked?: boolean
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

export type TStateOptions = {
	sorting: {
		name: boolean
		age: boolean
		createdAt: boolean
	}
}

export type TState = {
	_data?: TRenderData[]
	renderData?: TRenderData[]
	options: TStateOptions
}
