import React, { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';
// import fetchJSONP from 'fetch-jsonp'
import MovieItem from './MovieItem'

export default class MovieList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],//电影列表
      nowpage: parseInt(props.match.params.page),//当前展示第几页的数据
      pageSize: 12,//每页显示多少条数据
      total: 0,//当前电影分类项总共有多少条数据
      isloading: true,//数据是否正在加载，如果为ture表示正在加载数据
      movieTypes: props.match.params.type//保存获取电影类型
    }
  }

  componentWillMount() {
    this.loadMovieListByTypeAndPage()
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    //每当地址栏变化的时候，重置state中的参数项，重置完毕后重新发起数据请求
    this.setState({
      isloading: true,
      nowpage: parseInt(nextProps.match.params.page),
      movieTypes: nextProps.match.params.type,
    }, function () {
      this.loadMovieListByTypeAndPage()
    })
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    )
  }

  loadMovieListByTypeAndPage = () => {
    // const start = this.state.pageSize * (this.state.nowpage - 1)
    // const url = `https://douban.uieee.com/v2/movie/${this.state.movieTypes}?start=${start}&count=${this.state.pageSize}`
    // fetchJSONP(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       isloading: false,
    //       movies: data.subjects,
    //       total: data.total
    //     })
    //   })

    const data = require('../test_data/' + this.state.movieTypes + '.json')
    setTimeout(() => {
      this.setState({
        isloading: false,
        movies: data.subjects,
        total: data.total
      })
    }, 1000)
  }


  renderList = () => {
    if (this.state.isloading) {
      return (
        <Spin tip="Loading...">
          <Alert
            message="正在请求电影列表"
            description="精彩内容，马上呈现。。。。。。。。。。"
            type="info"
          />
        </Spin>
      )
    } else {
      return <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.movies.map(item => {
            return (
              <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>)
          })}
        </div>
        {/* 分页 */}
        <Pagination defaultCurrent={this.state.nowpage} pageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChanged} />
      </div>
    }
  }
  // 页面改变加载新一页的数据
  pageChanged = (page) => {
    this.props.history.push('/movie/' + this.state.movieTypes + '/' + page)
  }
}
