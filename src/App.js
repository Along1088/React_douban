import React, { Component } from 'react';
import { HashRouter, Link, Route } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import './css/App.css'
import HomeContainer from './components/home/HomeContainer';
import MovieContainer from './components/movie/MovieContainer';
import AboutContainer from './components/about/AboutContainer';
const { Header, Content, Footer } = Layout;


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Layout className="layout" style={{ height: '100%' }}>
          {/* 头部 */}
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={window.location.hash.split('/')[1]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="home">
                <Link to='/home'>首页</Link>
              </Menu.Item>
              <Menu.Item key="movie">
                <Link to='/movie/in_theaters/1'>电影</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to='/about'>关于</Link>
              </Menu.Item>
            </Menu>
          </Header>
          {/* 中间的内容区域 */}
          <Content style={{ backgroundColor: '#fff', flex: 1 }}>
            <Route path='/home' component={HomeContainer}></Route>
            <Route path='/movie' component={MovieContainer}></Route>
            <Route path='/about' component={AboutContainer}></Route>

          </Content>
          {/* 底部区域 */}
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;