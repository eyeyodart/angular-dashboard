import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SilosService } from 'src/app/services/silos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Silo } from 'src/app/types/Silo';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-silo-dialog-form',
  templateUrl: './silo-dialog-form.component.html',
  styleUrls: ['./silo-dialog-form.component.css'],
})
export class SiloDialogFormComponent implements OnInit {
  siloForm!: FormGroup;
  crops: string[] = ['Wheat', 'Barley', 'Corn', 'Nuts', 'Tobacco', 'Potato'];
  title: string = 'Add New Silo';
  actionButton: string = 'Save';
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private siloService: SilosService,
    private dialogRef: MatDialogRef<SiloDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Silo,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.siloForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      crops: ['', Validators.required],
      capacity: ['', Validators.required],
    });

    if (this.editData) {
      this.title = 'Edit Silo';
      this.actionButton = 'Update';
      this.siloForm.controls['name'].setValue(this.editData.name);
      this.siloForm.controls['description'].setValue(this.editData.description);
      this.siloForm.controls['crops'].setValue(this.editData.crops);
      this.siloForm.controls['capacity'].setValue(this.editData.capacity);
    }
  }

  addSilo() {
    if (!this.editData) {
      if (this.siloForm.valid) {
        this.siloService.postSilo(this.siloForm.value).subscribe({
          next: (res) => {
            this.snackBar.open('Silo added successfully!', 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.siloForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            this.snackBar.open('Error while adding the silo', 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          },
        });
      }
    } else {
      this.updateSilo();
    }
  }

  updateSilo() {
    this.siloService.putSilo(this.siloForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.snackBar.open('Silo updated successfully!', 'OK');
        this.siloForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this.snackBar.open('Error while updating the silo', 'OK');
      },
    });
  }
}
