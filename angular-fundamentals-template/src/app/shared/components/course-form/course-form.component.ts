import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private library: FaIconLibrary,
    private coursesFacade: CoursesStateFacade // Use facade
  ) {
    this.library.addIconPacks(fas);
    this.initializeForm();
  }

  private initializeForm() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      creationDate: new Date(),
      duration: ['', [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      newAuthor: ['', [Validators.pattern('[A-Za-z0-9 ]*'), Validators.minLength(2)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor() {
    const newAuthorControl = this.courseForm.get('newAuthor');
    const newAuthorValue = newAuthorControl?.value;

    if (newAuthorValue && typeof newAuthorValue === 'string' && newAuthorValue.trim()) {
      const authorControl = this.fb.control(newAuthorValue.trim(), [Validators.required]);
      this.authors.push(authorControl);
      newAuthorControl.reset();
    }
  }

  deleteAuthor(index: number) {
    this.authors.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      console.log('Form Submitted!', this.courseForm.value);
      // Use facade to add the course instead of directly calling the service
      this.coursesFacade.createCourse(this.courseForm.value); // Dispatch action to add the course

      // Reset form and handle UI feedback
      this.courseForm.reset();
      this.submitted = false;
      while (this.authors.length !== 0) {
        this.authors.removeAt(0);
      }
      // alert('Course has been successfully created!');
    } else {
      alert('Please fill in all the required fields!');
    }
  }

  onCancel() {
    this.courseForm.reset();
    this.submitted = false;
  }
}
