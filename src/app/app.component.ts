import { delay, of, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataService, AsyncPipe],
})
export class AppComponent {
  public data$ = this.dataService.getData$();
  public dataAPI$ = this.dataService.getResponseData();

  constructor(private dataService: DataService, private pipeAsync: AsyncPipe) {
    this.pipeAsync.transform(this.dataAPI$);
  }

  update(): void {
    this.pipeAsync.transform(
      of('').pipe(
        delay(700),
        switchMap(() => this.dataAPI$)
      )
    );
  }
}
