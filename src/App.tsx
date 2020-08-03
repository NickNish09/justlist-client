import React, { FC, useEffect, useState } from 'react';
import UrlPlaceholder from './components/UrlPlaceholder';
import Todos from './pages/Todos';
import TodosProvider from './contexts/TodosContext';

const App: FC = () => {
  const [path, setPath] = useState<string>(window.location.pathname);
  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);

  return path === '/' ? (
    <div className="home-container background-light">
      <UrlPlaceholder />
    </div>
  ) : (
    <TodosProvider>
      <Todos path={path} />
    </TodosProvider>
  );
};
export default App;
