import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, setCategory } from '../../redux/slices/menuSlice';
import './ExploreMenu.css';

const ExploreMenu = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.menu.category || ''); // Tambahkan fallback default
  const categories = useSelector((state) => state.menu.categories || []); // Tambahkan fallback default
  const status = useSelector((state) => state.menu.status || 'idle'); // Tambahkan fallback default
  const error = useSelector((state) => state.menu.error || '');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience, one
        delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {categories.length > 0 ? (
          categories.map((item) => (
            <div
              onClick={() => dispatch(setCategory(item.name))}
              key={item._id}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.name ? 'active' : ''}
                src={item.image}
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
