import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from './dishes.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = 'http://localhost:3000/api/record';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl, dish);
  }

  updateDish(id: string, dish: Dish): Observable<Dish> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Dish>(url, dish);
  }

  deleteDish(dishId: string): Observable<any> {
    const url = `${this.apiUrl}/${dishId}`;
    return this.http.delete(url);
  }
}
