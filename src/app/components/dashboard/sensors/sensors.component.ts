import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { SensorsService } from 'src/app/services/sensors.service';
import { Sensor } from 'src/app/types/Sensor';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css'],
})
export class SensorsComponent implements OnInit {
  chartOptions!: Highcharts.Options | any;
  displayedColumns: string[] = [
    'name',
    'battery',
    'last_communication',
    'active',
    'view',
  ];
  dataSource!: MatTableDataSource<Sensor>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sensorsService: SensorsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSensors();
  }

  getSensors() {
    this.sensorsService.getSensor().subscribe({
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

  viewSensor(sensor: Sensor) {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 700,
      },
      title: {
        text: `"${sensor.name}" last week measurements`,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: 'datetime',
        categories: sensor.timestamps.map((e) => Date.parse(e)),
        labels: {
          enabled: false,
        },
        crosshair: true,
      },
      tooltip: {
        animation: true,
        valueDecimals: 2,
        split: true,
      },
      yAxis: {
        title: 'Measurement',
      },
      series: [
        {
          name: 'Battery (%)',
          data: sensor.data.battery,
        },
        {
          name: 'Temperature (°C)',
          data: sensor.data.temperature,
        },
        {
          name: 'Humidity (%)',
          data: sensor.data.humidity,
        },
        {
          name: 'Pressure (kPa)',
          data: sensor.data.pressure.map((value) => value / 1000),
        },
      ],
    };
    Highcharts.chart('container', this.chartOptions);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
