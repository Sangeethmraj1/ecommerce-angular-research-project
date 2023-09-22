export interface Category{
    active:boolean,
    avatar:string,
    created_at:string,
    created_by:string | null,
    deleted_at:string | null,
    deleted_by:string | null,
    description:string,
    id:number,
    name:string,
    updated_at:string,
    updated_by:string | null
}