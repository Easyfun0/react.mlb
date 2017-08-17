import React, { Component } from 'react';
import {
  Container, Row, Col, Button, Jumbotron, Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Table
} from 'reactstrap';
import MlbJSON from './Mlb.json';

export default class Content extends Component {
  state = {
    modal: false,
    cart: [],
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  addToCart = (product) => {
    const newCart = this.state.cart;
    newCart.push(product);

    this.setState({
      cart: newCart,
    });
  }
  checkout = (totalPrice) => {
    alert(`已扣款${totalPrice}元`);
  }
  render() {
    const TotalPrice =
    this.state.cart.reduce((abc, item) => abc + item.price, 0);

    return (
      <Container>
        <Row>
          <Col md="12">
            <Jumbotron>
              <h1 className="display-3">MLB, Easyfun!</h1>
              <p className="lead">美國職業棒球大聯盟（英語：Major League Baseball，縮寫：MLB），通稱美國職棒大聯盟，簡稱美國職棒或大聯盟，是目前世界上最高水準的職業棒球賽事，也是北美四大職業運動之一。1903年由美國聯盟和國家聯盟共同成立。美國聯盟使用指定打擊的規則，國家聯盟則沒有使用。</p>
              <hr className="my-2" />
              <p>美國職棒大聯盟由1876年成立的國家聯盟與1901年成立的美國聯盟組成。1903年時兩個聯盟達成協議正式承認彼此在美國職業棒球的對等地位，而在2000年時兩者進一步合併並且撤除各自的行政單位，並且由雙方認定的大聯盟執行長負責統一管理。目前整個職業競賽共有30支球隊，分別有29支來自美國各地的球隊以及1支加拿大球隊參與。</p>
              <p className="lead">
                <Button
                  color="primary"
                  onClick={this.toggle}>
                  選擇隊伍({this.state.cart.length})
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {
            MlbJSON.map(product => (
              <Col xs="12" md="4">
                <Card>
                  <CardImg top width="100%" src={product.img} alt="Card image cap" />
                  <CardBlock>
                    <CardTitle>{product.title}</CardTitle>
                    <CardSubtitle>價格：{product.price}</CardSubtitle>
                    <CardText>{product.desc}</CardText>
                    <Button
                      disabled={this.state.cart.find(item => item.id === product.id)}
                      onClick={() => this.addToCart(product)}>購買</Button>
                  </CardBlock>
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>選擇隊伍</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>隊伍</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.cart.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <p>總價：{TotalPrice}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.checkout(TotalPrice)}>確定</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>取消</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
