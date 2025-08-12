'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

import { ICVForm } from '@/lib/common';
import { TRPC } from '@/utils/trpc';
import { TRegisterProfile } from '@/utils/zod';
import { FileToBase64 } from '@/utils/common';

import InputField from './field.input';
import TextareaField from './field.textarea';

const CVForm = () => {
  const registerProfile = TRPC.Public.Register.useMutation();

  const [formData, setFormData] = useState<ICVForm>({
    fullName: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setCvFile(file);
        setSubmitMessage('');
      } else {
        setSubmitMessage('Error: Please upload a PDF file.');
        e.target.value = '';
      }
    }
  };

  const removeFile = () => {
    setCvFile(null);
    const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cvFile) {
      setSubmitMessage('Please upload your CV as a PDF.');
      return;
    }

    setSubmitMessage('Submitting...');

    const cvBase64 = await FileToBase64(cvFile);

    const payload: TRegisterProfile = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills,
      experience: formData.experience,
      cv: cvBase64,
    };

    const res = await registerProfile.mutateAsync(payload);

    if (res.code !== 'Success') {
      setSubmitMessage(`Submission failed: ${res.message || 'Please try again.'}`);
      return;
    }

    setSubmitMessage('Your CV has been submitted successfully!');
    setFormData({ fullName: '', email: '', phone: '', skills: '', experience: '' });
    removeFile();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Submit Your CV</h1>
      <p className="text-gray-600 mb-6">Fill out the form below and upload your CV to apply.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="fullName"
            label="Full Name"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="e.g., Jane Doe"
            required
          />
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g., jane.doe@example.com"
            required
          />
        </div>

        <InputField
          id="phone"
          label="Phone Number (Optional)"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="e.g., (123) 456-7890"
        />

        <TextareaField
          id="skills"
          label="Key Skills"
          value={formData.skills}
          onChange={handleInputChange}
          placeholder="e.g., React, Node.js, Project Management, UI/UX Design"
        />

        <TextareaField
          id="experience"
          label="Summary of Experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Briefly describe your professional background and key achievements."
          rows={6}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload CV (PDF only)
          </label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="cv-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="cv-upload"
                    name="cv-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="application/pdf"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF up to 10MB</p>
            </div>
          </div>
        </div>

        {cvFile && (
          <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <FileIcon className="h-6 w-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{cvFile.name}</span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={registerProfile.isPending || !cvFile}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {registerProfile.isPending ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>

        {submitMessage && (
          <p
            className={`mt-4 text-sm text-center ${
              submitMessage.includes('Error') || submitMessage.includes('failed')
                ? 'text-red-600'
                : 'text-green-600'
            }`}
          >
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default CVForm;
