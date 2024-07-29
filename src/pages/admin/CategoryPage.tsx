// src/pages/CategoryPage.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Table, Button } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { RiAddBoxLine } from 'react-icons/ri';
import NavbarMobile from '../../components/Reponsive/Mobile/NavbarMobile';
import { Catalogs } from '../../types/Products';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../services/CategoryService';
import { useDispatch } from 'react-redux';
import { addCategory as addCategoryAction, updateCategory as updateCategoryAction, deleteCategory as deleteCategoryAction } from '../../slices/categoriesSlice';
import CategoryForm from '../../components/Form/CategoryForm';
import { reset } from 'redux-form';
import { toast } from 'react-toastify';

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Catalogs[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Catalogs | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories: ', error);
        toast.error('Failed to fetch categories');
      }
    };
    fetchCategoriesData();
  }, []);

  const handleOpenForm = (mode: 'add' | 'edit', category?: Catalogs) => {
    setFormMode(mode);
    setSelectedCategory(category || null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedCategory(null);
    dispatch(reset('categoryForm'));
  };

  const handleSubmit = async (values: Catalogs) => {
    try {
      if (formMode === 'add') {
        await addCategory(values);
        dispatch(addCategoryAction(values));
        toast.success('Category added successfully');
      } else if (formMode === 'edit' && selectedCategory) {
        await updateCategory(selectedCategory.id, values);
        dispatch(updateCategoryAction(values));
        toast.success('Category updated successfully');
      }
      handleCloseForm();
      setCategories(await fetchCategories());
    } catch (error) {
      console.error('Error saving category: ', error);
      toast.error('Failed to save category');
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId);
      dispatch(deleteCategoryAction(categoryId));
      toast.success('Category deleted successfully');
      setCategories(await fetchCategories());
    } catch (error) {
      console.error('Error deleting category: ', error);
      toast.error('Failed to delete category');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      handleCloseForm();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Danh sách danh mục" />
      <div>
        <NavtitleAdmin
          Title_NavtitleAdmin="Danh sách danh mục"
          Btn_Create={
            <Button color="primary" className="text-sm font-light text-white" onClick={() => handleOpenForm('add')}>
              <div className="flex items-center space-x-1">
                <RiAddBoxLine className="text-xl" />
                <p> Thêm</p>
              </div>
            </Button>
          }
        />
        <TableListAdmin
          Title_TableListAdmin={`Danh sách danh mục (${categories.length})`}
          table_head={
            <Table.Head className="bg-primary text-center text-white">
              <span>Số thứ tự</span>
              <span>Tên danh mục</span>
              <span>Mô tả</span>
              <span>Trạng thái</span>
            </Table.Head>
          }
          table_body={
            <Table.Body className="text-center text-sm">
              {categories.map((category, index) => (
                <Table.Row key={category.id}>
                  <span className="line-clamp-1">#{index + 1}</span>
                  <span className="line-clamp-1">{category.name}</span>
                  <span className="line-clamp-1">{category.description}</span>
                  <span>
                    <details>
                      <summary className="inline cursor-pointer text-base text-warning">
                        <div className="flex items-center justify-center px-[55px] py-2">
                          <FaCircleInfo />
                        </div>
                      </summary>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Button color="primary" className="w-full max-w-[140px] text-sm font-light text-white" onClick={() => handleOpenForm('edit', category)}>
                          <FaPenToSquare />
                          Cập nhật
                        </Button>
                        <Button color="secondary" className="w-full max-w-[140px] text-sm font-light text-white" onClick={() => handleDelete(category.id)}>
                          <MdDelete />
                          Xoá
                        </Button>
                      </div>
                    </details>
                  </span>
                </Table.Row>
              ))}
            </Table.Body>
          }
        />
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
            <div ref={formRef} className="relative bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                {formMode === 'add' ? 'Thêm danh mục' : 'Sửa danh mục'}
              </h2>
              <CategoryForm
                initialValues={selectedCategory || {}}
                onSubmit={handleSubmit}
              />
              <div className="mt-4 flex justify-end">
                <Button color="secondary" className='text-white' onClick={handleCloseForm}>Đóng</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
