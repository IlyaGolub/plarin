import React, { Component, ReactText } from 'react';
import './Pagination.css';
import { ArrowLeft, ArrowRight } from './Icons';


const LEFT_PAGE = 'LEFT';
const LEFT_DOTS = 'LEFT_DOTS';
const RIGHT_PAGE = 'RIGHT';
const RIGHT_DOTS = 'RIGHT_DOTS';

const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

type Props = {
    totalRecords: number,
    pageLimit: number,
    pageNeighbours: number,
    currentPage?: number,
    onPageChanged?: (page: number) => void

}

type State = {
    currentPage: number;
    totalPages: number;
}

class Pagination extends Component<Props, State> {
    readonly state = { currentPage: this.props.currentPage || 1, totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit) }

    // componentDidMount() {
    //     this.gotoPage(1);
    // }

    componentDidUpdate(prev: Props) {
        if (this.props.totalRecords !== prev.totalRecords || this.props.pageLimit !== prev.pageLimit)
            this.setState({ currentPage: 1, totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit) });
    }

    gotoPage = (page: number) => {
        const { onPageChanged = (f: number) => f } = this.props;

        const currentPage = Math.max(1, Math.min(page, this.state.totalPages));

        // const paginationData = {
        //     currentPage,
        //     totalPages: this.totalPages,
        //     pageLimit: this.pageLimit,
        //     totalRecords: this.totalRecords
        // };

        this.setState({ currentPage }, () => onPageChanged(currentPage));
    }

    handleClick = (page: number, e: React.MouseEvent) => {
        e.preventDefault();
        this.gotoPage(page);
    }

    handleMoveLeft = () => {
        this.gotoPage(this.state.currentPage - (this.props.pageNeighbours * 2) - 1);
    }

    handleMoveRight = () => {
        this.gotoPage(this.state.currentPage + (this.props.pageNeighbours * 2) + 1);
    }

    fetchPageNumbers = () => {

        const { pageNeighbours } = this.props;
        const { currentPage, totalPages } = this.state;

        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {

            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            let pages = range(startPage, endPage) as ReactText[];

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_DOTS, ...extraPages, ...pages];
                    break;
                }

                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_DOTS];
                    break;
                }

                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_DOTS, ...pages, RIGHT_DOTS];
                    break;
                }
            }

            return [LEFT_PAGE, 1, ...pages, totalPages, RIGHT_PAGE];

        }

        return range(1, totalPages);

    }

    render() {

        //if (!this.props.totalRecords || this.state.totalPages === 1) return null;

        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();

        return (
            <ul className="pagination mb-0 mx-auto">
                {pages.map((page, index) => {
                    if (page === LEFT_DOTS) return (
                        <li key={index} className="page-item" style={{ marginTop: '5px' }}>...</li>
                    );
                    if (page === LEFT_PAGE) return (
                        <li key={index} className="page-item-prev">
                            <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                                <ArrowLeft />
                            </a>
                        </li>
                    );
                    if (page === RIGHT_DOTS) return (
                        <li key={index} className="page-item" style={{ marginTop: '5px' }}>...</li>
                    );
                    if (page === RIGHT_PAGE) return (
                        <li key={index} className="page-item-next">
                            <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                                <ArrowRight />
                            </a>
                        </li>
                    );
                    return (
                        <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                            <a className="page-link" href="#" onClick={(e) => this.handleClick(page as number, e)}>{page}</a>
                        </li>
                    );
                })}
            </ul>
        );

    }
}

export default Pagination;