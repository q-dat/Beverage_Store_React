import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Button, Input } from 'react-daisyui';
import { Catalogs } from '../../types/Products';

// Define a component for rendering input fields
const renderField = ({ input, label, type, meta: { touched, error } }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <Input {...input} type={type} className="mt-1 block w-full" />
    {touched && error && <span className="text-red-600">{error}</span>}
  </div>
);

const CategoryForm: React.FC<InjectedFormProps<Catalogs>> = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field name="name" component={renderField} type="text" label="Tên danh mục" />
    <Field name="description" component={renderField} type="text" label="Mô tả" />
    <div className="flex justify-end mt-4">
      <Button type="submit" color="primary" className="text-white">Lưu</Button>
    </div>
  </form>
);

export default reduxForm<Catalogs>({
  form: 'categoryForm',
  enableReinitialize: true,
})(CategoryForm);
