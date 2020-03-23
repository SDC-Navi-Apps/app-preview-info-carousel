import React from 'react';
import ItemsCarousel from 'react-items-carousel';


export default class ImageCarousel extends React.Component {

  UNSAFE_componentWillMount() {
    this.setState({
      items: ['https://picsum.photos/seed/picsum/180/300', 'https://picsum.photos/seed/picsum/180/300', 'https://picsum.photos/seed/picsum/180/300', 'https://picsum.photos/seed/picsum/180/300', 'https://picsum.photos/seed/picsum/180/300', 'https://picsum.photos/seed/picsum/180/300', 'https://picsum.photos/seed/picsum/180/300', 'https://picsum.photos/seed/picsum/180/300'],
      activeItemIndex: 0,
    });


  }

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const {
      activeItemIndex,
      items,
    } = this.state;

    return (
      <div className="contents" style={{
        width: '650px'
      }}>
        <ItemsCarousel
    placeholderItem={<div style={{ height: 300, width: 180, background: 'url(https://picsum.photos/seed/picsum/180/300)' }} />}
    enablePlaceholder={false}
    numberOfPlaceholderItems={3}
    numberOfCars={3}
    infiniteLoop={false}
    gutter={3}
    activePosition={'center'}
    chevronWidth={35}
    disableSwipe={false}
    alwaysShowChevrons={false}
    // numberOfCards={3}
    slidesToScroll={3}
    outsideChevron={true}
    showSlither={true}
    firstAndLastGutter={false}
    activeItemIndex={this.state.activeItemIndex}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    rightChevron={<div className="chevron-arrow-right"></div>}
    leftChevron={<div className="chevron-arrow-left"></div>}
  >
    {Array.from(new Array(15)).map((_, i) =>
      <div className = 'carousel-img'
        key={i}
        style={{
          height: 300,
          width: 180,
          background: `url(https://i.picsum.photos/id/44${Math.floor(Math.random() * 9)}/180/300.jpg)` || `url(https://i.picsum.photos/id/63${Math.floor(Math.random() * 9)}/180/300.jpg)`
        }}
      />
    )}
  </ItemsCarousel>
      </div>
    );
  }
}















// import React from 'react';
// import ImageCarousel from 'react-items-carousel';


// export default class ImageCarousel extends React.Component {

//   UNSAFE_componentWillMount() {
//     this.setState({
//       children: [],
//       activeItemIndex: 0,
//     });

//     setTimeout(() => {
//       this.setState({
//         children: ['https://picsum.photos/seed/picsum/200/300', 'https://i.picsum.photos/id/737/180/300.jpg', 'https://i.picsum.photos/id/737/180/300.jpg', 'https://i.picsum.photos/id/737/180/300.jpg', 'https://i.picsum.photos/id/737/180/300.jpg', 'https://i.picsum.photos/id/737/180/300.jpg', 'https://i.picsum.photos/id/757/180/300.jpg'],
//       })
//     }, 100);
//   }

//   changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

//   render() {
//     const {
//       activeItemIndex,
//       children,
//     } = this.state;

//     return (
//       <div className="contents" style={{
//         width: '650px'
//       }}>
//         <ImageCarousel
//     placeholderItem={<div style={{ height: 200, background: 'url(https://picsum.photos/seed/picsum/200/300)' }} />}
//     enablePlaceholder={true}
//     numberOfPlaceholderItems={3}
//     infiniteLoop={false}
//     gutter={5}
//     activePosition={'center'}
//     chevronWidth={35}
//     disableSwipe={false}
//     alwaysShowChevrons={false}
//     numberOfCards={2}
//     slidesToScroll={2.5}
//     outsideChevron={true}
//     showSlither={true}
//     firstAndLastGutter={true}
//     activeItemIndex={this.state.activeItemIndex}
//     requestToChangeActive={value => this.setState({ activeItemIndex: value })}
//     rightChevron={<div className="chevron-arrow-right"></div>}
//     leftChevron={<div className="chevron-arrow-left"></div>}
//   >
//     {Array.from(new Array(10)).map((_, i) =>
//       <div
//         key={i}
//         style={{
//           height: 300,
//           background: `url(https://i.picsum.photos/id/44${i}/180/300.jpg)` || `url(https://i.picsum.photos/id/63${i}/180/300.jpg)`
//         }}
//       />
//     )}
//   </ImageCarousel>
//       </div>
//     );
//   }
// }