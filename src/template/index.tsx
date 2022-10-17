import React from 'react';
import Header from '../components/Header';

const MainTemplate: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default MainTemplate;
