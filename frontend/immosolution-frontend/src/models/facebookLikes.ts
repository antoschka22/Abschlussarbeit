export interface facebookLikes{
    data: {
        id: string,
        name: string
    },
    paging: {
        cursors: {
            before: string,
            after: string
        }
    },
    summary: {
        total_count: number,
        can_like: boolean,
        has_liked: boolean
    }
}