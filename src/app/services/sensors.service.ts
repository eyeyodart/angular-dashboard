import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../types/Sensor';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  private url = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  getSensor() {
    return this.http.get<Sensor[]>(`${this.url}sensors`);
  }
}
