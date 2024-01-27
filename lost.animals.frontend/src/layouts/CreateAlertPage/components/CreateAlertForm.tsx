import React from 'react';
import AnimalAlertModel from '../../../models/AnimalAlertModel';

interface CreateAlertFormProps {
  onFormDataChange: (name: string, value: string | File ) => void;
}

export const CreateAlertForm: React.FC<CreateAlertFormProps> = ({
  onFormDataChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      // Handle file input separately
      const file = e.target.files?.[0];
      onFormDataChange(e.target.name, file || '');
    } else {
      onFormDataChange(e.target.name, e.target.value);
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="picture" className="form-label">
          Picture
        </label>
        <input
          type="file"
          className="form-control"
          id="picture"
          name="picture"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      {/* Add other form fields here */}
    </form>
  );
};
