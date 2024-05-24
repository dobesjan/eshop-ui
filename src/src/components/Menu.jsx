import { useState, useEffect } from 'react';
import categoryService from '../api/categoryService';

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategories = (categories) => {
    return (
      <ul className="list-group">
        {categories.map(category => (
          <li key={category.id} className="list-group-item">
            {category.name}
            {category.children && category.children.length > 0 && (
              <CategoryMenu categories={category.children} />
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Category Menu</h1>
      {renderCategories(categories)}
    </div>
  );
};

export default CategoryMenu;
