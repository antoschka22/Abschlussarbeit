export interface Comment{
    data: {
        created_time: string,
        from: {
            name:string,
            id: string
        },
        message: string,
        id: string
    },
    paging:{
        cursors: {
            before: string,
            after: string
        }
    },
    summary: {
        order: string,
        total_count: number,
        can_comment: boolean
    }
}