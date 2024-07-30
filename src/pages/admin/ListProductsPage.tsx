import React, { useEffect, useState, useRef } from 'react';
import { Table, Button } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { RiAddBoxLine } from 'react-icons/ri';
import NavbarMobile from '../../components/Reponsive/Mobile/NavbarMobile';
import { Products, Catalogs } from '../../types/Products';
import { getProducts, createProduct, updateProduct, deleteProduct, getCatalogs } from '../../services/ProductService';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct as updateProductAction, deleteProduct as deleteProductAction } from '../../slices/productsSlice';
import ProductForm from '../../components/Form/ProductForm';
import { reset } from 'redux-form';
import { toast } from 'react-toastify';

const ListProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<{ [key: number]: string }>({});
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);

        const fetchedCategories = await getCatalogs();
        const categoriesMap: { [key: number]: string } = {};
        fetchedCategories.forEach((category: Catalogs) => {
          categoriesMap[category.id] = category.name;
        });
        setCategories(categoriesMap);
      } catch (error) {
        console.error('Error fetching products or categories: ', error);
        toast.error('Failed to fetch products or categories');
      }
    };
    fetchProductsAndCategories();
  }, []);

  const handleOpenForm = (mode: 'add' | 'edit', product?: Products) => {
    setFormMode(mode);
    setSelectedProduct(product || null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
    dispatch(reset('productForm'));
  };

  const handleSubmit = async (values: Products) => {
    try {
      if (formMode === 'add') {
        await createProduct(values);
        dispatch(addProduct(values));
        toast.success('Product added successfully');
      } else if (formMode === 'edit' && selectedProduct) {
        await updateProduct(selectedProduct.id, values);
        dispatch(updateProductAction(values));
        toast.success('Product updated successfully');
      }
      handleCloseForm();
      setProducts(await getProducts());
    } catch (error) {
      console.error('Error saving product: ', error);
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      dispatch(deleteProductAction(productId));
      toast.success('Product deleted successfully');
      setProducts(await getProducts());
    } catch (error) {
      console.error('Error deleting product: ', error);
      toast.error('Failed to delete product');
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
      <NavbarMobile Title_NavbarMobile="Danh sách sản phẩm" />
      <div>
        <NavtitleAdmin
          Title_NavtitleAdmin="Danh sách sản phẩm"
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
          Title_TableListAdmin={`Danh sách sản phẩm (${products.length})`}
          table_head={
            <Table.Head className="bg-primary text-center text-white">
              <span>Số thứ tự</span>
              <span>Hình ảnh</span>
              <span>Tên sản phẩm</span>
              <span>Danh mục</span>
              <span>Giá</span>
              <span>Trạng thái</span>
            </Table.Head>
          }
          table_body={
            <Table.Body className="text-center text-sm">
              {products.map((row, index) => (
                <Table.Row key={row.id}>
                  <span className="line-clamp-1">#{index + 1}</span>
                  <span className="line-clamp-1">
                    <img width={80} height={80} src={`./products/${row.img}`} alt={row.name} />
                  </span>
                  <span className="line-clamp-1">{row.name}</span>
                  <span className="line-clamp-1">{categories[row.id_catalog]}</span>
                  <span className="line-clamp-1">{row.price}.000đ</span>
                  <span>
                    <details>
                      <summary className="inline cursor-pointer text-base text-warning">
                        <div className="flex items-center justify-center px-[55px] py-2">
                          <FaCircleInfo />
                        </div>
                      </summary>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Button color="primary" className="w-full max-w-[140px] text-sm font-light text-white" onClick={() => handleOpenForm('edit', row)}>
                          <FaPenToSquare />
                          Cập nhật
                        </Button>
                        <Button color="secondary" className="w-full max-w-[140px] text-sm font-light text-white" onClick={() => handleDelete(row.id)}>
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
            {formMode === 'add' ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}
          </h2>
          <ProductForm
            initialValues={selectedProduct || {}}
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

export default ListProductsPage;
