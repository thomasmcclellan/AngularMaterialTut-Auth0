import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { DataSource } from '@angular/cdk/table'
import { Observable } from 'rxjs';
import { Post } from '../Post';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  displayedColumns = ['date_posted', 'title', 'category', 'delete']
  dataSource = new PostDataSource(this._dataService)

  constructor(
    private _dataService: DataService,
    public auth: AuthService,
    public dialog: MatDialog
  ) { }

  openDialog() : void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    })
    dialogRef.componentInstance.event.subscribe(result => {
      this._dataService.addPost(result.data)
      this.dataSource = new PostDataSource(this._dataService)
    })
  }

  deletePost(id) : void {
    if (this.auth.isAuthenticated()) {
      this._dataService.deletePost(id)
      this.dataSource = new PostDataSource(this._dataService)
    } else {
      alert('Log in before')
    }
  }
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