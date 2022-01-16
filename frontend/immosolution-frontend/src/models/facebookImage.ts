import { Comment } from "./facebookComment";
import { facebookLikes } from "./facebookLikes";


export interface facebookImage{
    data: {
        link: string,
        source: string,
        comments: Comment[],
        likes: facebookLikes[],
        id: string
    },
    paging: {
        after: string,
        before: string
    }
}