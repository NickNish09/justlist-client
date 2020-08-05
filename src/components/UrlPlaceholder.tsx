import React, { FC, useRef } from 'react';
import { Row } from 'antd';

type UrlPlaceholderProps = {
  placeholder?: string;
};

const UrlPlaceholder: FC<UrlPlaceholderProps> = ({
  placeholder = 'mytodolist',
}: UrlPlaceholderProps) => {
  const urlInput = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: any) => {
    const value = urlInput.current !== null ? urlInput.current.value : '';
    if (e.key === 'Enter') {
      window.location.pathname = value;
    }
  };

  return (
    <div className="container-url">
      <p className="p-url">
        {document.domain}
        /
      </p>

      <input
        ref={urlInput}
        type="text"
        placeholder={placeholder}
        className="input-url"
        autoFocus
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </div>
  );
};

export default UrlPlaceholder;
