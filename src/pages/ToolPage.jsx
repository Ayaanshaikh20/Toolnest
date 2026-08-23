import React from 'react';
import { useParams } from 'react-router-dom';
import { getToolBySlug } from '../data/toolsData';
import { TOOL_COMPONENTS } from '../tools';
import { ToolLayout } from '../components/ToolLayout';
import { NotFoundPage } from './NotFoundPage';

export const ToolPage = () => {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  if (!tool) {
    return <NotFoundPage />;
  }

  const ToolComponent = TOOL_COMPONENTS[slug];

  return (
    <ToolLayout tool={tool}>
      {ToolComponent ? <ToolComponent /> : <div>Tool component under development.</div>}
    </ToolLayout>
  );
};
