declare module "Models" {
    export type RequestUser = {
        data: Users[]
        page: number
        per_page: number
    }
    export type Users = {
        avatar: string
        email: string
        first_name: string
        id: number
        last_name: string
    }
}