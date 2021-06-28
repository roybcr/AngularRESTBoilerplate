import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
})
export class AccessComponent implements OnInit {
  sub: Subscription = new Subscription();
  avSub: Subscription = new Subscription();
  data: any[] = [];
  prevState: any[] = [];
  firstRender: boolean = true;
  query: string = '';
  initialData: any[] = [];
  showResults: boolean = false;

  constructor(private http: HttpClient) {}

  getData(query?: string) {
    this.sub = this.http
      .get<any[]>(
        query && query !== ''
          ? `https://jsonplaceholder.typicode.com/comments/${query}`
          : 'https://jsonplaceholder.typicode.com/comments'
      )
      .subscribe((x: any) => {
        this.firstRender ? (this.initialData = x) : null;
        this.prevState = this.data;

        this.data = Array.isArray(x) ? x : [x];
      });
  }

  onChange(value: string) {
    this.getData(value);
  }

  onSearch() {
    this.getData(this.query);
  }

  remove(id: string) {
    console.log(id);
    let target = this.data.findIndex((x: any) => x.id === id);
    console.log(target);
    if (target !== -1) {
      this.data.splice(target, 1);
    }
  }
  ngOnInit(): void {
    this.getData();
    this.firstRender = false;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
