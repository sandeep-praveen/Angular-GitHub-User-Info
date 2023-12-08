import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Angular-GitHub-User-Info-App';
  username: string = 'johnpapa';
  userDetails: any;
  repositories: any;
  currentPage: number = 1;
  pageSize: number = 10;
  maxPageSize: number = 10;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.getUser(this.username).subscribe((result: any) => {
      this.isLoading = false;
      this.userDetails = result;
      if (this.userDetails && this.userDetails?.public_repos) {
        this.maxPageSize = Math.ceil(this.userDetails?.public_repos / this.pageSize);
      } else {
        this.maxPageSize = 10;
      }
      this.loadRepositories();
    },
      (error: any) => {
        if (error.status === 404) {
          this.errorMessage = 'User not found';
          console.error('User not found');
          this.isLoading = false;
        } else {
          console.error('Error:', error);
        }
      }
    );
  }

  loadRepositories(page: number = 1) {
    if (this.userDetails && this.userDetails?.login) {
      this.apiService
        .getUserRepositories(this.userDetails?.login, page, this.pageSize)
        .subscribe((repos: any[]) => {
          this.repositories = repos;
          this.fetchLanguagesForRepositories();
        });
    }
  }

  fetchLanguagesForRepositories() {
    for (const repo of this.repositories) {
      this.apiService.getRepositoryLanguages(this.userDetails?.login, repo.name)
        .subscribe((languages: any) => {
          repo.languages = Object.keys(languages);
        });
    }
  }

  get displayedPages(): number[] {
    const start = Math.max(1, this.currentPage - Math.floor(this.pageSize / 2));
    const end = Math.min(start + this.pageSize - 1, this.maxPageSize);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.maxPageSize && page !== this.currentPage) {
      this.currentPage = page;
      this.loadRepositories(this.currentPage);
    }
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

}
