import * as React from 'react';
import {FunctionComponent} from 'react';
import {IMyComponentProps} from "./CustomReactComponent";

export interface LayoutProps {
  children: React.ReactNode
}

export const LayoutReactComponent: FunctionComponent<LayoutProps> = ({children}) => {

  return (
    <div style={{border:'1px solid black'}}>
      <div>header</div>
      <div className={'transclude'}>{children}</div>
      <div>footer</div>
    </div>
  )
}

