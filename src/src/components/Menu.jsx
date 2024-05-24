import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const groupCategoriesByParent = (categories) => {
    const categoryMap = new Map();

    // First pass: Group categories by their parentCategoryId
    categories.forEach(category => {
      const parentId = category.parentCategoryId;
      if (!categoryMap.has(parentId)) {
        categoryMap.set(parentId, []);
      }
      categoryMap.get(parentId).push(category);
    });

    // Second pass: Assign child categories to their respective parent
    categories.forEach(category => {
      if (categoryMap.has(category.id)) {
        category.children = categoryMap.get(category.id);
      }
    });

    // Filter out categories with a parentCategoryId (only top-level categories)
    return categories.filter(category => !category.parentCategoryId);
  };

  const renderCategory = (category) => {
    return (
      <li key={category.id} className="list-group-item">
        <Link to={`/category/${category.id}`}>{category.name}</Link>
        {category.children && category.children.length > 0 && (
          <ul>
            {category.children.map(child => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  };

  const topLevelCategories = groupCategoriesByParent(categories);

  return (
    <div>
      <h1>Category Menu</h1>
      <ul className="list-group">
        {topLevelCategories.map(category => renderCategory(category))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
