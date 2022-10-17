import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SiloDialogFormComponent } from '../silo-dialog-form/silo-dialog-form.component';
import { SilosService } from 'src/app/services/silos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Silo } from 'src/app/types/Silo';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-silos',
  templateUrl: './silos.component.html',
  styleUrls: ['./silos.component.css'],
})
export class SilosComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'crops',
    'capacity',
    'actions',
  ];
  dataSource!: MatTableDataSource<Silo>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private siloService: SilosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSilos();
  }

  openDialog() {
    this.dialog
      .open(SiloDialogFormComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getSilos();
        }
      });
  }

  getSilos() {
    this.siloService.getSilo().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.snackBar.open('Error while fetching the records', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      },
    });
  }

  editSilo(row: Silo) {
    this.dialog
      .open(SiloDialogFormComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getSilos();
        }
      });
  }

  deleteSilo(siloId: number) {
    this.siloService.deleteSilo(siloId).subscribe({
      next: (res) => {
        this.snackBar.open('Silo deleted successfully.', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getSilos();
      },
      error: (err) => {
        this.snackBar.open('Error while deleting the silo', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
