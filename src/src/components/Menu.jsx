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

  const groupCategoriesByParent = (categories) => {
    // Create a map to store categories grouped by parent ID
    const categoryMap = new Map();

    // Iterate over each category
    categories.forEach(category => {
      const parentId = category.parentCategoryId || null;
      
      // If the map doesn't have an entry for the parent ID, create one
      if (!categoryMap.has(parentId)) {
        categoryMap.set(parentId, []);
      }

      // Add the current category to the list of children for its parent
      categoryMap.get(parentId).push(category);
    });

    // Retrieve the top-level categories (those with a parent ID of null)
    const topLevelCategories = categoryMap.get(null) || [];

    // Attach children to their respective parents
    topLevelCategories.forEach(category => {
      category.children = categoryMap.get(category.id) || [];
    });

    return topLevelCategories;
  };

  const renderCategory = (category) => {
    return (
      <li key={category.id} className="list-group-item">
        {category.name}
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
