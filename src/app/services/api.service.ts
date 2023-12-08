import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  getUserRepositories(username: string, page: number = 1, pageSize: number = 10): Observable<any[]> {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`;
    return this.httpClient.get<any[]>(url);
  }

  getRepositoryLanguages(username: string, repo: string): Observable<any> {
    const url = `https://api.github.com/repos/${username}/${repo}/languages`;
    return this.httpClient.get<any>(url);
  }

}
