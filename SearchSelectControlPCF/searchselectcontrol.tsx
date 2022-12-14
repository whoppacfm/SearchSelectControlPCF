//----------------------------
//Imports
//----------------------------

//React
import * as React from 'react';
import * as ReactDOM from 'react-dom';

//FluentUI
import { ISearchBoxStyles, SearchBox } from '@fluentui/react/lib/SearchBox';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';

//FluentUI Menuitems
import { DefaultButton } from '@fluentui/react/lib/Button';
import { IContextualMenuListProps, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';

//FluentUI Picklistitems
import { IComboBoxOption, IComboBoxStyles, VirtualizedComboBox } from '@fluentui/react';

//FluentUI Basic List
import { getRTL } from '@fluentui/react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { TextField } from '@fluentui/react/lib/TextField';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Icon } from '@fluentui/react/lib/Icon';
import { List } from '@fluentui/react/lib/List';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from '@fluentui/react/lib/Styling';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';
import { getPropsWithDefaults } from 'office-ui-fabric-react';

//----------------------------
//Testing/System/DataSource
//----------------------------
var DATA_SOURCE = "CRM"
let href = window!.top!.location.href;
if(href.indexOf("127.") > -1 || href.indexOf("localhost") > -1) {
    DATA_SOURCE="TEST";
}
var CRM_TEST_MODE = 0;


//----------
//Basic List
//----------
const BasicListControl : React.FunctionComponent = (props:any) => {

  let count=20;
  if(props["type-nr"] == "1") {
    count=0;
  }

  const originalItems = useConst(() => createListItems(count));
  const [items, setItems] = React.useState(originalItems);
  
  const resultCountText =
    items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;

  const onFilterChanged = (_: any, text: string): void => {
    setItems(originalItems.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0));
  };  

  const theme: ITheme = getTheme();
  const { palette, semanticColors, fonts } = theme;
  
  const classNames = mergeStyleSets({
    itemCell: [
      getFocusStyle(theme, { inset: -1 }),
      {
        minHeight: 54,
        padding: 10,
        boxSizing: 'border-box',
        borderBottom: `1px solid ${semanticColors.bodyDivider}`,
        display: 'flex',
        selectors: {
          '&:hover': { background: palette.neutralLight },
        },
      },
    ],
    itemImage: {
      flexShrink: 0,
    },
    itemContent: {
      marginLeft: 10,
      overflow: 'hidden',
      flexGrow: 1,
    },
    itemName: [
      fonts.xLarge,
      {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    ],
    itemIndex: {
      fontSize: fonts.small.fontSize,
      color: palette.neutralTertiary,
      marginBottom: 10,
    },
    chevron: {
      alignSelf: 'center',
      marginLeft: 10,
      color: palette.neutralTertiary,
      fontSize: fonts.large.fontSize,
      flexShrink: 0,
    },
  });  

  const onclickcell = () => {
    alert("Add");
  };
  const onRenderCell = (item: IExampleItem, index: number | undefined): JSX.Element => {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <Image className={classNames.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover} />
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item.name}</div>
          <div className={classNames.itemIndex}>{`Item ${index}`}</div>
          <div>{item.description}</div>
        </div>
        <Icon title="Add" style={{cursor:"pointer"}} onClick={onclickcell} className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
      </div>
    );
  };

return (
    <>
      <FocusZone direction={FocusZoneDirection.vertical}>
        <TextField
          label={'Filter by name' + resultCountText}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onFilterChanged}
        />
        <List items={items} onRenderCell={onRenderCell} />
      </FocusZone>
    </>
  )
}

//----------------------------
//SearchSelectControl
//----------------------------
const SearchSelectControl : React.FunctionComponent = (props:any) => {

  //Init State
  const [items, setItems] = React.useState(Array<IContextualMenuItem>);
  const [origItems, setOrigItems] = React.useState(Array<IContextualMenuItem>);
  const [itemsc, setItemsc] = React.useState(Array<IComboBoxOption>);
  const [origItemsc, setOrigItemsc] = React.useState(Array<IComboBoxOption>);
  
  //Init Data
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

  const onSelectItem = (evt:any, selectedItem:any) => {
    let selectedItemKey = selectedItem.key;
    let selectedItemText = selectedItem.text;
    alert(selectedItemKey + " - " + selectedItemText);
  }

  //Init Menuitems
  if(origItems==null || origItems.length==0) {
    let dataItems: IContextualMenuItem[] = [
      { key: '0', text: 'Item 1', onClick: onSelectItem },
      { key: '1', text: 'Item 2', onClick: onSelectItem },
      { key: '2', text: 'Item 3', onClick: onSelectItem },
    ];

    for(var i=5;i<20;i++) {
      dataItems.push({ key: i+"", text: 'Item '+i, onClick: onSelectItem });
    }

    setOrigItems(dataItems);
    setItems(dataItems);
  }
  
  //Init Picklistitems
  if(origItemsc==null || origItemsc.length==0) {
    const dataItems: IComboBoxOption[] = [];
    
    for (let i = 0; i<20; i++) {
      dataItems.push({
        key: `${i}`,
        text: `Option ${i}`,
      });
    }

    setOrigItemsc(dataItems);
    setItemsc(dataItems);
  }

  //Functions
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
    const filteredItemsStyle: React.CSSProperties = {
      width: '100%',
      height: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

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

  const searchBoxStyles: ISearchBoxStyles = {
    root: { margin: '8px' },
  };

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

  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: '300px' } };
  
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
    <>
      <div><SearchSelectControl context={context} theobj={theobj} /></div>
      <br/>
      <br/>
      <div style={{textAlign:"left", width:"50%", float:"left"}}>
        <p>Basic List</p>
        <br/>
        <BasicListControl></BasicListControl>
      </div>
      <div style={{textAlign:"left", width:"50%", float:"right"}}>
        <p>Basic List</p>
        <br/>
        <BasicListControl type-nr="1"></BasicListControl>
      </div>
    </>
    , container
  );

}


