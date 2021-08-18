import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({ opacity: 0 }), animate(200)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(1000, style({ opacity: 0 }))),
    ]),
  ],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  fullNotes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.notes = this.notesService
      .getNotes()
      .sort((note1, note2) => note1.id - note2.id);
    this.fullNotes = this.notes;
  }

  removeNote(id: number) {
    this.notesService.removeNote(id);
    this.getNotes();
  }

  filterNotes(text: any) {
    let query = text.value.toLowerCase().trim();

    query !== ''
      ? (this.notes = this.fullNotes.filter((note) =>
          note.title.toLowerCase().includes(query)
        ))
      : (this.notes = this.notesService.getNotes());
  }
}
