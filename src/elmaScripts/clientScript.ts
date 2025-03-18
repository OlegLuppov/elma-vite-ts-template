declare const console: any

type TRenderData = {
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

export type TCastomCategory = {
    name: string
    code: string
    checked?: boolean
}

let castomStatuses: TCastomCategory[] = []

async function onInit(): Promise<void> {
    setDefaultFilters()
}


async function searchData() {
    const usersFiter = Context.fields.user.app.search().where((f, g) => g.and(
        f.__deletedAt.eq(null)
    ))

    if (Context.data.user && Context.data.user.length) {
        usersFiter.where(f => f.__id.in(Context.data.user!.map(item => item.id)))
    }

    if (Context.data.created_at) {
        usersFiter.where(f => f.__createdAt.gte(Context.data.created_at!.asDatetime(new TTime(0, 0, 0, 0,))))
    }

    if (Context.data.date_end) {
        usersFiter.where(f => f.__createdAt.lte(Context.data.date_end!.asDatetime(new TTime(0, 0, 0, 0,))))
    }

    if (Context.data.age) {
        usersFiter.where(f => f.age.eq(Context.data.age!))
    }

    const users = await usersFiter.size(3000).all()

    if (!users || !users.length) return

    const systemUsersIds = users.map(user => user.data.user!.id)

    const systemUsers = await System.users.search().where((f, g) => g.and(
        f.__deletedAt.eq(null),
        f.__id.in(systemUsersIds)
    )).size(3000).all()

    return {
        users,
        systemUsers
    }
}

async function getData() {
    const appsData = await searchData()

    if (!appsData || !appsData.users || !appsData.users.length || !appsData.systemUsers || !appsData.systemUsers.length) return

    return prepareData(appsData.users, appsData.systemUsers)
}

function prepareData(users: BaseApplicationItem<Application$test$users$Data, any>[], systemUsers: UserItem[]) {
    if (!users || !users.length || !systemUsers || !systemUsers.length) return

    const data = users.reduce((acc: TRenderData[], user) => {
        const findSystemUser = systemUsers.find(item => item.id === user.data.user!.id)
        const userItem: TRenderData = {
            id: findSystemUser ? findSystemUser.id : undefined,
            name: findSystemUser ? findSystemUser.data.__name : undefined,
            link: findSystemUser ? `${System.company.url}/profile/${findSystemUser.id}` : undefined,
            age: user.data.age,
            createdAt: user.data.__createdAt.format('DD.MM.YYYY'),
        }

        acc.push(userItem)
        return acc
    }, [])


    return data
}

function setDefaultFilters() {
    Context.data.user = undefined
    Context.data.age = undefined
    Context.data.created_at = undefined
    Context.data.date_end = undefined

    const statuses = Context.fields.user.app.fields.__status.all

    if (statuses && statuses.length) {
        castomStatuses = statuses.map(status => {
            return {
                name: status.name,
                code: status.code,
                checked: true
            }
        })
    }
}

function getCastomStatuses() {
    return castomStatuses
}

function setCastomStatuses(data: TCastomCategory[]) {
    if (!data || !data.length) return

    castomStatuses = data
}




