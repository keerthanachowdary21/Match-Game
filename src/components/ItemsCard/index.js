import './index.css'

const ItemsCard = props => {
  const {each, selectedTabId, onClickButton} = props
  const {tabId, displayText} = each

  const clickOnButton = () => {
    onClickButton(tabId)
  }

  let buttonClassName = 'buttons'
  if (selectedTabId === tabId) {
    buttonClassName = 'selectedButton'
  }

  return (
    <li className="eachButtonListItem">
      <button type="button" className={buttonClassName} onClick={clickOnButton}>
        {displayText}
      </button>
    </li>
  )
}

export default ItemsCard
