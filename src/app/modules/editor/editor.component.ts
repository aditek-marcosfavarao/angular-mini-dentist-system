import { Component } from '@angular/core';
import { Treatment } from 'src/app/core/@types/treatment';
import { treatments } from 'src/app/data/treatment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  treatments: Treatment[] = treatments;
}
