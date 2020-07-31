import React, { FC, useState } from 'react';
import UrlPlaceholder from './components/UrlPlaceholder';

const App: FC = () => {
  const [path, setPath] = useState<string>(window.location.pathname);
  return path === '/' ? (
    <div className="home-container background-light">
      <UrlPlaceholder />
    </div>
  ) : (
    <div>
      <p className="path-title">{window.location.pathname}</p>
    </div>
  );
};
export default App;
