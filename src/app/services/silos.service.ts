import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Silo } from '../types/Silo';

@Injectable({
  providedIn: 'root',
})
export class SilosService {
  private url = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  postSilo(silo: Silo) {
    return this.http.post<Silo>(`${this.url}silos`, silo);
  }

  getSilo() {
    return this.http.get<Silo[]>(`${this.url}silos`);
  }

  putSilo(silo: Silo, siloId: number) {
    return this.http.put<Silo>(`${this.url}silos/${siloId}`, silo);
  }

  deleteSilo(siloId: number) {
    return this.http.delete<Silo>(`${this.url}silos/${siloId}`);
  }
}
