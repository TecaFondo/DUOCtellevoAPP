import { Injectable } from '@angular/core';
//PASO 4
//Agrego la referencia a HttpClient
import { HttpClient } from '@angular/common/http';
//NUEVO Paso 2.1 Uso de observable
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'; 
//NUEVO PASO 3.1 Post
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  //PASO 5 creo variable con la ruta de la API Json
  //Comentar cuando se pase al paso 2.5
  //url = 'http://jsonplaceholder.typicode.com/posts';
  
  //NUEVO PASO 2.5
  //Para montar servidor local
  url = 'http://10.32.33.124:3000/users'; //se tiene que colocar la IP de donde provienen los datos (puede ser una de gihub si fuerna necesario <como el año pasasdo>)
  id= 0;
  //NUEVO PASO 3.2
  httpOptions = {
    headers: new HttpHeaders
    ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }

  //PASO 6 
  //Agrego la variabla http del tipo HttpClient
  constructor(public http: HttpClient) { }

  //PASO 7 
  //Creo el método para obtener los posts (o la información de los usuarios)
  //Se reemplaza con NUEVO 2.2 si se utiliza Observable
  
  getPosts(){
    return new Promise(resolve=>{
      this.http.get(this.url).subscribe(data=>{
        resolve(data);
      },error=>{
        console.log(error);
      });
    });

  }
  getPost(id){
    return new Promise(resolve=>{
      this.http.get(this.url+"/"+id).subscribe(data=>{
        resolve(data);
        console.log(data)
      },error=>{
        console.log(error);
      });
    });
  }
  createPost(post): Observable<any>{
    return this.http.post(this.url ,post ,this.httpOptions).pipe(retry(3));
  }

  updatePost(id,post):Observable<any>{
    console.log(post.puestos);
    return this.http.put(this.url+"/"+id,post,this.httpOptions).pipe(retry(3));
  }

  deletePost(id,post):Observable<any>{
    console.log(post.id);
      return this.http.delete(this.url+"/"+id,post)
      .pipe(
        retry(3)
      );
  }
  //NUEVO PASO 2.2 Uso de Observable
  /*
  getPosts(): Observable<any>{
    return this.http.get(this.url).pipe(retry(3));
  }
  */
  //NUEVO PASO 3.3
  

}
