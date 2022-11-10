//----------------------------
//Imports
//----------------------------

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DefaultButton } from '@fluentui/react/lib/Button';
import { ISearchBoxStyles, SearchBox } from '@fluentui/react/lib/SearchBox';
import { Icon } from '@fluentui/react/lib/Icon';
import { IContextualMenuListProps, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { IComboBoxOption, IComboBoxStyles, VirtualizedComboBox } from '@fluentui/react';

//----------------------------
//Testing/System/DataSource
//----------------------------
var DATA_SOURCE = "CRM"
let href = window!.top!.location.href;
if(href.indexOf("127.") > -1 || href.indexOf("localhost") > -1) {
    DATA_SOURCE="TEST";
}
var CRM_TEST_MODE = 0;

const filteredItemsStyle: React.CSSProperties = {
  width: '100%',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const searchBoxStyles: ISearchBoxStyles = {
  root: { margin: '8px' },
};

/*
const menuItems: IContextualMenuItem[] = [
  { key: '0', text: 'New', onClick: () => console.log('New clicked') },
  { key: '1', text: 'Rename', onClick: () => console.log('Rename clicked') },
  { key: '2', text: 'Edit', onClick: () => console.log('Edit clicked') },
  { key: '3', text: 'Properties', onClick: () => console.log('Properties clicked') },
  { key: '4', text: 'Link same window', href: 'http://bing.com' },
  { key: '5', text: 'Link new window', href: 'http://bing.com', target: '_blank' },
  {
    key: '6',
    text: 'Link click',
    href: 'http://bing.com',
    onClick: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      alert('Link clicked');
      ev.preventDefault();
    },
    target: '_blank',
  },
  {
    key: '7',
    text: 'Disabled item',
    disabled: true,
    onClick: () => console.error('Disabled item should not be clickable.'),
  },
];
*/



//----------------------------
//SearchSelectControl
//----------------------------
const SearchSelectControl : React.FunctionComponent = (props:any) => {

  const [items, setItems] = React.useState(Array<IContextualMenuItem>);
  const [origItems, setOrigItems] = React.useState(Array<IContextualMenuItem>);

  const [itemsc, setItemsc] = React.useState(Array<IComboBoxOption>);
  const [origItemsc, setOrigItemsc] = React.useState(Array<IComboBoxOption>);

  const onSelectItem = (evt:any, selectedItem:any) => {
    let selectedItemKey = selectedItem.key;
    let selectedItemText = selectedItem.text;
    alert(selectedItemKey + " - " + selectedItemText);
  }
  


  if(origItems==null || origItems.length==0) {
    let dataItems: IContextualMenuItem[] = [
      { key: '0', text: 'Item 1', onClick: onSelectItem },
      { key: '1', text: 'Item 2', onClick: onSelectItem },
      { key: '2', text: 'Item 3', onClick: onSelectItem },
    ];

    for(var i=5;i<100;i++) {
      dataItems.push({ key: i+"", text: 'Item '+i, onClick: onSelectItem });
    }

    setOrigItems(dataItems);
    setItems(dataItems);
  }
  
  if(origItemsc==null || origItemsc.length==0) {
    const dataItems: IComboBoxOption[] = [];
    
    for (let i = 0; i < 100; i++) {
      dataItems.push({
        key: `${i}`,
        text: `Option ${i}`,
      });
    }

    setOrigItemsc(dataItems);
    setItemsc(dataItems);
  }

  const onAbort = React.useCallback(() => {
    setItems(origItems);
  }, []);

  const onAbortComboBoxSearch = React.useCallback(() => {
    setItemsc(origItemsc);
  }, []);
  
  
  const onChangeComboBoxSearch = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {

    const filteredItems = origItemsc.filter(
      item => item.text && item.text.toLowerCase().indexOf(newValue.toLowerCase()) !== -1,
    );

    setItemsc(filteredItems);

  }, [origItemsc]);


  const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {

    const filteredItems = origItems.filter(
      item => item.text && item.text.toLowerCase().indexOf(newValue.toLowerCase()) !== -1,
    );
    
    if (!filteredItems || !filteredItems.length) {
      filteredItems.push({
        key: 'no_results',
        onRender: (item, dismissMenu) => (
          <div key="no_results" style={filteredItemsStyle}>
            <Icon iconName="SearchIssue" title="No items found" />
            <span>No items found</span>
          </div>
        ),
      });
    }

    setItems(filteredItems);

  }, [origItems]);

  const renderMenuList = React.useCallback(
    (menuListProps: IContextualMenuListProps, defaultRender: IRenderFunction<IContextualMenuListProps>) => {
      return (
        <div>
          <div style={{ borderBottom: '1px solid #ccc' }}>
            <SearchBox
              ariaLabel="Filter items by text"
              placeholder="Filter Items"
              onAbort={onAbort}
              onChange={onChange}
              styles={searchBoxStyles}
            />
          </div>
          {defaultRender(menuListProps)}
        </div>
      );
    },
    [onAbort, onChange],
  );
  
  const menuProps = React.useMemo(
    () => ({
      onRenderMenuList: renderMenuList,
      title: 'Items',
      shouldFocusOnMount: true,
      items,
    }),
    [items, renderMenuList],
  );

  //VirtualizedComboBox
  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: '300px' } };

  const onRenderUpperContent = () => {
    return (
      <div>
          <SearchBox
            ariaLabel="Filter items by text"
            placeholder="Filter Items"
            onAbort={onAbortComboBoxSearch}
            onChange={onChangeComboBoxSearch}
            styles={searchBoxStyles}
          />
      </div>
    )
  }

  return (
    <>
    <div>
      <div style={{textAlign:"left"}}>
        <p>Menu Item Selector with Searchbox</p>
        <br/>
        <DefaultButton text="Select Item" menuProps={menuProps} />
        <br/><br/>
        <p>Picklist Option Selector with Searchbox</p>
        <br/>
        <VirtualizedComboBox
          onRenderUpperContent={onRenderUpperContent}
          defaultSelectedKey="547"
          label=""
          allowFreeform
          autoComplete="on"
          options={itemsc}
          dropdownMaxWidth={200}
          useComboBoxAsMenuWidth
          styles={comboBoxStyles}
        /> 
      </div>      
    </div>      
    </>
  )
}

export function Render(context:any, container:any, theobj:object) {
  
  /* ReactDOM.render is deprecated, but FluentUI does not support new React version until now
  const root = createRoot(container);
  root.render(<div><SearchSelectControl context={context} theobj={theobj} /></div>);
  */
 
  ReactDOM.render(
      <div><SearchSelectControl context={context} theobj={theobj} /></div>
    , container
  );

}


