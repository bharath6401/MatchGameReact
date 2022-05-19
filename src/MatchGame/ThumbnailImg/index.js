import './index.css'

// id: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
//     imageUrl:
//       'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
//     thumbnailUrl:
//       'https://assets.ccbp.in/frontend/react-js/match-game/orange-thumbnail-img.png',
//     category: 'FRUIT',
const ThumbnailImg = properties => {
  const {imageItem, randomImageId} = properties
  const {id, imageUrl, thumbnailUrl, category} = imageItem

  const generateRandomIdFun = () => {
    const randomId = Math.floor(Math.random(1) * 30)
    randomImageId(randomId, id)
  }

  return (
    <li className="col-3 m-1">
      <button onClick={generateRandomIdFun}>
        <img alt="thumbnail" className="col-12" src={thumbnailUrl} />
      </button>
    </li>
  )
}
export default ThumbnailImg
