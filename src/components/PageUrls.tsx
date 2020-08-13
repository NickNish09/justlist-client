import React, { FC } from 'react';

export interface IPage{
  _id: string
  url: string
}

interface PageUrlsProps {
  pages: Array<IPage>;
}

const PageUrls: FC<PageUrlsProps> = ({ pages }: PageUrlsProps) => (
  <div className="page-url-container">
    {pages.map((page) => (<a href={page.url} className="page-url">{page.url ? page.url.replace(window.location.pathname, '') : ''}</a>))}
  </div>
);

export default PageUrls;
