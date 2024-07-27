import React, { useEffect, useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Input, Button, Select } from 'react-daisyui';
import { Products, Catalogs } from '../../types/Products';
import { getCatalogs } from '../../services/ProductService'; // Import hàm từ service

// Định nghĩa các trường trong form
const renderField = ({ input, label, type, meta }: any) => (
  <div className="form-group">
    <label>{label}</label>
    <Input {...input} type={type} className="input input-bordered w-full" />
    {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
  </div>
);

const renderSelect = ({ input, label, options }: any) => (
  <div className="form-group">
    <label>{label}</label>
    <Select {...input} className="select select-bordered w-full">
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </div>
);

// Định nghĩa form cho thêm và sửa sản phẩm
const ProductForm: React.FC<InjectedFormProps<Products>> = ({ handleSubmit, pristine, submitting }) => {
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCatalogs();
        const formattedCategories = response.map((catalog: Catalogs) => ({
          value: catalog.id.toString(),
          label: catalog.name,
        }));
        setCategories(formattedCategories);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Error fetching categories: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderField} label="Tên sản phẩm" />
      <Field name="id_catalog" component={renderSelect} label="Danh mục" options={categories} />
      <Field name="price" type="number" component={renderField} label="Giá" />
      <Field name="img" type="text" component={renderField} label="Hình ảnh" />
      <Field name="img_child" type="text" component={renderField} label="Hình ảnh phụ" />
      <Field name="sale" type="number" component={renderField} label="Giảm giá" />
      <Field name="status" type="number" component={renderField} label="Trạng thái" />
      <Field name="description" type="text" component={renderField} label="Mô tả" />
      <Button type="submit" color="primary" disabled={pristine || submitting}>
        Lưu
      </Button>
    </form>
  );
};

export default reduxForm<Products>({
  form: 'productForm',
})(ProductForm);
