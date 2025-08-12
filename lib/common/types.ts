import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

interface ITextareaField extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

interface ICVForm {
  fullName: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
}

export type { ICVForm, IInputField, ITextareaField };
