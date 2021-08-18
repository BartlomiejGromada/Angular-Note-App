import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private localStorageRef: LocalStorageRefService) {}

  public static readonly NOTES_KEY = 'NOTES';

  getNotes(): Note[] {
    return JSON.parse(
      this.localStorageRef.localStorage.getItem(NotesService.NOTES_KEY) || '[]'
    );
  }

  addNote(note: Note): void {
    note.date = Date.now();
    let notes = this.getNotes();
    note.id = notes.length + 1;
    notes.push(note);
    this.setNotesInLocalStorage(notes);
  }

  removeNote(id: number): void {
    let notes = this.getNotes();
    notes = notes.filter((note) => note.id !== id);
    this.setNotesInLocalStorage(notes);
  }

  editNote(editNote: Note): void {
    let notes = this.getNotes();
    notes = notes.filter((note) => note.id !== editNote.id);
    notes.push(editNote);
    this.setNotesInLocalStorage(notes);
  }

  private setNotesInLocalStorage(notes: Note[]): void {
    this.localStorageRef.localStorage.setItem(
      NotesService.NOTES_KEY,
      JSON.stringify(notes)
    );
  }
}
