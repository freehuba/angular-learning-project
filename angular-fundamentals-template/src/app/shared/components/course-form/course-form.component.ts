import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
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
  showDialog: boolean = false; 
  dialogMessage: string = ''; 
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private library: FaIconLibrary,
    private coursesFacade: CoursesStateFacade 
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
      this.coursesFacade.createCourse(this.courseForm.value); 
      this.dialogMessage = 'Course created successfully!'; 
      this.showDialog = true;  
      // Reset form and handle UI feedback
      this.courseForm.reset();
      this.submitted = false;
      while (this.authors.length !== 0) {
        this.authors.removeAt(0);
      }
    } else {
      alert('Please fill in all the required fields!');
    }
  }

  onCancel() {
    this.courseForm.reset();
    this.submitted = false;
  }

  closeDialog(): void {
    this.showDialog = false; 
    this.router.navigate(['/courses']); 
  }
}
