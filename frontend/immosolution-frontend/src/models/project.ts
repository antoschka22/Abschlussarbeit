export interface project{
    foldername: number,
    herzeigeprojekte: boolean,
    projektbilder?: projektbild[],
    projektname: string
}

export interface projektbild{
    id: string
    projektbilder: string
}