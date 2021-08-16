import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.css'],
})
export class AddEditNoteComponent implements OnInit {
  note: Partial<Note> = {};
  notes: Note[] = [];
  submitted: boolean = false;
  id: number = 0;
  isAddMode: boolean = false;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'] || 0;
    this.isAddMode = this.id !== 0 ? true : false;

    if (this.isAddMode) {
      let n: Note = this.notesService
        .getNotes()
        .filter((note) => note.id == this.id)[0];
      this.note = n;
    }
  }

  submit() {
    if (this.isAddMode) {
      this.editNote();
      this.router.navigate(['/notes']);
    } else {
      this.addNote();
    }
  }

  addNote(): void {
    this.notesService.addNote(this.note as Note);
    this.note = {};
    this.submittedInfo();
  }

  editNote(): void {
    this.notesService.editNote(this.note as Note);
  }

  private submittedInfo(): void {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }
}
