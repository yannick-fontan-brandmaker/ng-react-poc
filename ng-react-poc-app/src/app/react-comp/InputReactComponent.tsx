import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

export interface IMyComponentProps {
  name: string;
  onChange?: (event:string) => void;
}

export const InputReactComponent: FunctionComponent<IMyComponentProps> = (props: IMyComponentProps) => {
  const [stateName, setStateName] = useState(props.name);

  useEffect(() => {
    console.log('useEffect')
    setStateName(props.name);
  }, [props.name]);

  const handleChange = (event:any) => {
    const evt = event.target.value;
    setStateName(evt);
    if (props.onChange) {
      props.onChange(evt);
    }
  };

  return (
    <div>
      <input type="text" value={stateName} onChange={handleChange} />
    </div>
  );
};
