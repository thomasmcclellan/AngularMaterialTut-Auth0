import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { DataSource } from '@angular/cdk/table'
import { Observable } from 'rxjs';
import { Post } from '../Post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  displayedColumns = ['date_posted', 'title', 'category', 'delete']
  dataSource = new PostDataSource(this._dataService)

  constructor(private _dataService: DataService) { }
}


export class PostDataSource extends DataSource<any> {
  constructor(private _dataService: DataService) { 
    super()
  }

  connect(): Observable<Post[]> {
    return this._dataService.getData()
  }

  disconnect() { }
}