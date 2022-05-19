import './index.css'

const TabItem = properties => {
  const {tabsListItem, whichTabFun, classHighLight, hilight} = properties
  const {tabId, displayText} = tabsListItem

  const buttonClicked = () => {
    whichTabFun(tabId)
  }
  return (
    <li className="tab-item">
      <button className={hilight && 'selectedtab'} onClick={buttonClicked}>
        <p>{displayText}</p>
      </button>
    </li>
  )
}
export default TabItem
