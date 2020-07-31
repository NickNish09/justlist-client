import React, { FC, useState } from 'react';
import UrlPlaceholder from './components/UrlPlaceholder';
import Todos from './pages/Todos';

const App: FC = () => {
  const [path, setPath] = useState<string>(window.location.pathname);
  return path === '/' ? (
    <div className="home-container background-light">
      <UrlPlaceholder />
    </div>
  ) : (
    <Todos />
  );
};
export default App;
