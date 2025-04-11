import React from 'react';
import LeftSide from './../components/LeftSide';
import RightSide from './../components/RightSide';

const HomePage = () => {
  return (
    <div className="flex mx-8 h-screen">
      <div className="w-[20%] bg-green-300">
        <LeftSide />
      </div>
      <div className="w-[80%]">
        <RightSide />
      </div>
    </div>
  );
};

export default HomePage;
