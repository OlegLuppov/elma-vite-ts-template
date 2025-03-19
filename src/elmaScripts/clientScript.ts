declare const console: any
declare const window: any

/**Базовый URL для ссылок отчета*/
const BASE_PATH_LOCATION = `${System.company.url}${window.location.pathname}`


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

type TUserStatus = 'new' | 'disappeared' | 'vacation'

export type TCastomCategory = {
    name: string
    code: string
    checked?: boolean
}

interface TUserStatusCategory extends TCastomCategory {
    code: TUserStatus
}

let castomStatuses: TUserStatusCategory[] = []

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
        usersFiter.where(f => f.__createdAt.lte(Context.data.date_end!.asDatetime(new TTime(23, 59, 0, 0,))))
    }

    if (Context.data.age) {
        usersFiter.where(f => f.age.eq(Context.data.age!))
    }

    if (castomStatuses && castomStatuses.length) {
        const statuses = castomStatuses.reduce((acc: any, status) => {
            if (status.checked) {
                acc.push(Context.fields.user.app.fields.__status.variants[status.code])
            }
            return acc
        }, [])

        usersFiter.where(f => f.__status.in(statuses ?? []))
    }

    const users = await usersFiter.size(3000).all()

    if (!users || !users.length) return

    return {
        users
    }
}

async function getData() {
    const appsData = await searchData()

    if (!appsData || !appsData.users || !appsData.users.length) return

    return prepareData(appsData.users)
}

function prepareData(users: BaseApplicationItem<Application$test$users$Data, any>[]) {
    if (!users || !users.length) return

    const data = users.reduce((acc: TRenderData[], user) => {
        const userItem: TRenderData = {
            id: user.id,
            name: user.data.__name,
            link: `${BASE_PATH_LOCATION}(p:item/test/users/${user.id})`,
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
                code: status.code as TUserStatus,
                checked: true
            }
        })
    }
}

function getCastomStatuses() {
    return castomStatuses
}

function setCastomStatuses(data: TUserStatusCategory[]) {
    if (!data || !data.length) return

    castomStatuses = data
}




