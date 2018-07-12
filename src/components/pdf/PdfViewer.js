import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import isNumber from 'lodash/isNumber'
import sortBy from 'lodash/sortBy'

import {Document, Page, Outline} from 'react-pdf/dist/entry.webpack'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import {isNonEmptyValue, ensureArray} from "../../util/object-utils"

import './sample.scss'

class Ref {
  constructor({num, gen}) {
    this.num = num;
    this.gen = gen;
  }

  toString() {
    let str = `${this.num}R`;
    if (this.gen !== 0) {
      str += this.gen;
    }
    return str;
  }
}

class OutlineItem {
  getDestination = async (item, pdf) => {
    if (typeof item.dest === 'string') {
      return await pdf.getDestination(item.dest);
    } else {
      return item.dest
    }
  }

  getPageIndex = async (item, pdf) => {
    const destination = await this.getDestination(item, pdf);
    if (destination) {
      const [ref] = destination;
      return await pdf.getPageIndex(new Ref(ref));
    }
  }

  buildOutlineSubItems = async (item, pdf) => {
    if (!item.items || !item.items.length) {
      return null;
    }
    return Promise.all(item.items.map((subItem, subitemIndex) => this.buildOutlineItem(subItem, pdf)))
  }

  buildOutlineItem = async (item, pdf) => {
    let
      {id, depth, parentId, itemIdx, title} = item,
      outlineItem = Object.assign({
        id, depth, parentId, itemIdx, title, pageIndex: await this.getPageIndex(item, pdf)
      }),
      subItems = await this.buildOutlineSubItems(item, pdf)

    if (subItems) {
      outlineItem.items = subItems
    }

    return outlineItem
  }

  indexItems = (items, depth = 0, parentId = null) => {
    return items.map((item, itemIdx) => {
      const
        id = parentId ? [parentId, itemIdx].join('-') : `item-${itemIdx}`,
        subItems = item.items ? this.indexItems(item.items, depth + 1, id) : null

      return Object.assign({}, item, {id, depth, itemIdx, parentId, items: subItems})
    })
  }

  buildOutline = async (pdf) => {
    const
      outline = await pdf.getOutline(),
      items = this.indexItems(outline)

    return Promise.all(items.map((item, itemIndex) => this.buildOutlineItem(item, pdf)))
  }

}


const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
}

class PdfViewer extends React.Component {
  state = {
    file: './sample.pdf',
    numPages: 1,
    totalPages: null,
    pageInput: '1',
    pageLabels: null,
    pageIndex: 0

  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    })
  }

  getPageIndex = (pageLabel) => {
    if (isNonEmptyValue(pageLabel)) {
      if (isNonEmptyValue(this.state.pageLabels)) {
        let index = this.state.pageLabels.indexOf(pageLabel)
        if (isNonEmptyValue(index)) {
          return index
        }
      }
      const pageNum = parseInt(pageLabel)
      if (isNumber(pageNum) && pageNum > 0 && pageNum <= this.state.totalPages) {
        return pageNum - 1
      }
    }
    return null
  }

  onDocumentLoadSuccess = (pdf) => {
    pdf.getPageLabels().then((pageLabels) => {
      this.setState({pageLabels: pageLabels})
    })

    new OutlineItem().buildOutline(pdf).then((outline) => {
      this.setState({outline: outline})
      window.getLabelForPageIndex = this.getLabelForPageIndex
    })

    //
    // pdf.getOutline().then((outline) => {
    //   console.log({outline})
    //   outline.map((item, itemIndex) => {
    //     new OutlineItem().buildOutlineItem(item, pdf).then((r)=>console.log("item: ", r))
    //
    //     // console.log("Trying to print an item")
    //     // this.printOutlineItem(item, pdf)
    //   })
    //   this.setState({outline: outline})
    // })

    this.setState({totalPages: pdf.numPages})
  }

  getLabelForPageIndex = (pageLabel) => {
    const {outline} = this.state,
      items = outline,
      pageIndex = this.getPageIndex('' + pageLabel)

    let
      lastItem = items.find((item, itemIndex) => {
        return isNonEmptyValue(item.pageIndex) &&
          parseInt(item.pageIndex) <= pageIndex &&
          (itemIndex === items.length - 1 || parseInt(items[itemIndex + 1].pageIndex) > pageIndex)
      }),
      item = lastItem,
      hierachy = [lastItem],
      subItems

    while (isNonEmptyValue(item) && isNonEmptyValue(item.items)) {
      lastItem = item
      subItems = item.items//sortBy(item.items, 'pageIndex')
      item = subItems.find((sub, subIdx) => {
        return isNonEmptyValue(sub.pageIndex) &&
          parseInt(sub.pageIndex) <= pageIndex &&
          (sub.depth < 2 || parseInt(sub.pageIndex) === pageIndex) &&
          (subIdx === subItems.length - 1 || parseInt(subItems[subIdx + 1].pageIndex) > pageIndex) //TODO: check if this is right
      })
      if (isNonEmptyValue(item)) {
        hierachy.push(item)
      }
    }

    if(hierachy.length>1 && isNonEmptyValue(item) && item.pageIndex === hierachy.slice(-2)[0].pageIndex){
      hierachy.pop()
    }

    console.log(hierachy)
    return hierachy

    if (isNonEmptyValue(item)) {
      console.log({parent: item.parent, item: item})
      return item
    }


    return lastItem

  }

  changePageInput = (input) => {
    let
      pageIndex = this.getPageIndex(input),
      newState = {
        pageInput: input
      }
    if (isNonEmptyValue(pageIndex)) {
      newState.pageIndex = pageIndex
    }
    this.setState(newState)
  }

  onPageSelect = (e) => {
    this.changePageInput(e.target.value)
    // let
    //   input = e.target.value,
    //   pageIndex = this.getPageIndex(input),
    //   newState = {
    //     pageInput: input
    //   }
    // if (isNonEmptyValue(pageIndex)) {
    //   newState.pageIndex = pageIndex
    // }
    // this.setState(newState)
  }

  renderTextItem = (args) => {
    // console.log(args)
    const
      {str, itemIndex} = args,
      regex = /(p\.\s+\d+)/gm,
      pageNumRegex = /p\.\s+(\d+)/,
      split = str.split(regex)

    if (split.length > 1) {

      let parts = split.map((s, i) => {
        let m = s.match(pageNumRegex)//pageNumRegex.exec(s)
        if (m === null) {
          return <span key={i} className="regular-text">{s}</span>
        }
        return <mark key={i} className={`page-ref page-ref-${m[1]}`}
                     onClick={(e) => this.changePageInput(m[1])}>{s}</mark>
      })
      return (
        <div className={'custom-text-render'}>{str}
          <div className='wrapped'>{parts}</div>
        </div>
      )
    }
    return str
  }

  renderBreadcrumb = ()=>{
    const {outline, pageLabels, pageIndex} = this.state

    if (isNonEmptyValue(pageIndex) && isNonEmptyValue(outline)) {
      const
        labelHierarchy = this.getLabelForPageIndex(pageLabels[pageIndex]) || [],
        labelItems = ensureArray(labelHierarchy).map((item,idx)=>{
          console.log(item)
          let
            pageIndex = item.pageIndex,
            pageLabel = pageLabels[pageIndex]
          //onClick={(e) => this.changePageInput(m[1])}

          return (<li key={item.id} onClick={(e) => this.changePageInput(pageLabel)}>{item.title}</li>)
        })


      return (
        <ul className="breadcrumb">
          {labelItems}
        </ul>
      )


    }
    return null
  }

  render() {
    const {file, numPages, pageIndex, pageInput, outline} = this.state

    return (
      <div className="Example">
        <header>
          <h1>We got it boys</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>&nbsp;<input
            type="file"
            onChange={this.onFileChange}
          />
          </div>
          <p>Total Pages: {this.state.totalPages}</p>
          <input
            type="text"
            placeholder="View page..."
            value={pageInput}
            onChange={this.onPageSelect}
          />
          {this.renderBreadcrumb()}

          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              options={options}
            >
              {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      className={`pageIndex-${index + pageIndex}`}
                      key={`page_${pageIndex}`}
                      pageIndex={pageIndex}
                      customTextRenderer={this.renderTextItem}/> // renderMode="svg"/>
                  )
                )
              }
              {/*<Outline onItemClick={(props) => console.log('Clicked an item:', props)}/> */}
            </Document>
          </div>
        </div>
      </div>
    );
  }
}

export default PdfViewer