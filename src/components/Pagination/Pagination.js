//Pagination Component for Ski World Rental Management Platform
// 5/7/19

import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currentPage: this.props.currentPage,
      itemsPerPage: this.props.itemsPerPage,
      totItems: this.props.totItems,
      totPages: Math.ceil(this.props.totItems/this.props.itemsPerPage)
    };
  }
  createPaginator = () => {
    let pages = [];
    for (let x=1; x<=this.state.totPages; x++){
      pages.push(
        <PaginationItem active={this.isFirstPage(x)} key={x}>
          <PaginationLink value={x} onClick={(e) => {this.handleClick(e)}}>{x}</PaginationLink>
        </PaginationItem>);
    }
    return pages;
  }
  handleClick = (e) => {
    e.preventDefault();
    let pageNum = e.target.value;
    if ((pageNum !== this.props.currentPage) && (pageNum > 0) && pageNum <= this.state.totPages){
      console.log(pageNum);
      this.props.updatePage(pageNum);
    }
  }
  isFirstPage = (pageNum)=>{
    if(pageNum === this.props.currentPage){
      return true;
    }
    else { return false;
    }
  }
  prevPage = (pageNum) => {
    if(pageNum > 1){
      return pageNum -1;
    }
  }
  nextPage = (pageNum) => {
    if(pageNum < this.state.totPages){
      return pageNum +1;
    }
  }
  render() {
    return (
      <div className="paginator" id="paginator">
        <Pagination aria-label="Page navigation">
          <PaginationItem>
            <PaginationLink first value={1} onClick={(e) => {this.handleClick(e)}}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous value={this.prevPage(this.props.currentPage)} onClick={(e) => {this.handleClick(e)}}/>
          </PaginationItem>
          {this.createPaginator()}
          <PaginationItem>
            <PaginationLink next value={this.nextPage(this.props.currentPage)} onClick={(e) => {this.handleClick(e)}}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last value={parseInt(this.state.totPages)} onClick={(e) => {this.handleClick(e)}}/>
          </PaginationItem>
        </Pagination>
      </div>
    )
  }
}
