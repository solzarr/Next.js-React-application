import { ITextareaField } from '../common';

const TextareaField = ({ id, label, rows = 4, ...props }: ITextareaField) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows={rows}
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
    />
  </div>
);

export default TextareaField;
