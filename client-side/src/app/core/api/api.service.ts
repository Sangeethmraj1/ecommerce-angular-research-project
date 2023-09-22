import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { taskDetails } from './api.types';


@Injectable()
export class ApiServices {
    constructor(
        private httpClient: HttpClient
    ) { }

    create(
        entity: string,
        body: any
    ): Observable<any> {
        console.log('createaaaa',entity,body);
        
        return this.httpClient.post(entity, body)
    }

    getAll(
        entity: string
        ): Observable<any> {
        return this.httpClient.get(entity)
    }

    findById(
        entity: string,
        id: any
    ): Observable<any> {
        return this.httpClient.get(`${entity}/${id}`)
    }
    
    delete(
        entity:string,
        id:any
    ):Observable<any>{
        return this.httpClient.delete(`${entity}/${id}`)
    }

    update(
        entity:string,
        id:number,
        data:any
    ):Observable<any>{
        return this.httpClient.put(`${entity}/${id}`,data)
    }
    
}