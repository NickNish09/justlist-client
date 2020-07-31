import React, { FC } from 'react';
import { Row } from 'antd';

type UrlPlaceholderProps = {
  placeholder?: string;
};

const UrlPlaceholder: FC<UrlPlaceholderProps> = ({
  placeholder = 'mytodolist',
}: UrlPlaceholderProps) => {
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      window.location.pathname = 'oi';
    }
  };

  return (
    <Row>
      <p className="p-url">justlist.tk/</p>
      <input
        type="text"
        placeholder={placeholder}
        className="input-url"
        autoFocus
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </Row>
  );
};

export default UrlPlaceholder;
