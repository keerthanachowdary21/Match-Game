import './index.css'

const CardItems = props => {
  const {each, onClickThumbnail} = props
  const {id, thumbnailUrl} = each

  const clickOnThumbnail = () => {
    onClickThumbnail(id)
  }

  return (
    <li className="eachThumbnailListItem">
      <button
        type="button"
        className="thumbnailButton"
        onClick={clickOnThumbnail}
      >
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnailImage" />
      </button>
    </li>
  )
}

export default CardItems
