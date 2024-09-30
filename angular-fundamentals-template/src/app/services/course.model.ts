// src/app/models/course.model.ts

export interface Course {
    id: string; 
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
  }
  