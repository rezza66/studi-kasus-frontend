import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
// import { fetchCategories } from '../../redux/slices/menuSlice';

const Home = () => {
  // const dispatch = useDispatch();
  // const category = useSelector((state) => state.menu.category);

  // // Fetch menu list when component mounts
  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  // console.log("Category in Home:", category);

  return (
    <div>
      <Header />
      <ExploreMenu />
      <FoodDisplay/>
    </div>
  );
};

export default Home;
