import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { userData } from './user';
import { getWithExpiry } from '../../shared/localstrorage';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [SharedModule]
})
export class UserComponent implements OnInit {

  displayedPartialColumns: string[] = [ 'NO','email', 'firstName', 'lastName']; 
  displayedWholeColoumns: string[] = ['firstName', 'lastName','email', 'userName', 'dob', 'CREATED_AT'] //ACTION
  dataSource: MatTableDataSource<userData>;

  userArr: userData[] = [];
  token: string = '';
  partialData: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.initForm();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  initForm() {

    this.userService.getUser().subscribe(
      (result: userData[]) => {
        console.log('Userdata', result);

        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.userArr = result;
        this.token = getWithExpiry('AuthToken');
        if (this.token) {
          this.partialData = false;
        } else {
          this.partialData = true;
        }
      }, (error: any) => {
        alert(error.error.Error);
      }
    );
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteUser(row) {
    //console.log(row);
    if (confirm('Are you sure you want to delete this user')) {
      this.userService.deleteUser(row._id).subscribe(
        (result) => {
          // console.log(result);
          this.initForm();
        }
      );
    }
  }
}