import React from "react";
import Header from "./header.jsx";

export default class List extends React.Component {
    render() {
        const {
            photos,
            startIndex,
            endIndex,
            pages,
            currentPage
        } = this.props.pagination;
        return (
            <div className="container__col-1">
                <Header header="Open-E Poland" />
                <div className="container__list">
                    <ul>
                        {photos.slice(startIndex, endIndex).map((photo, index) => (
                            <li key={index}>
                                <a
                                    className="container__link"
                                    href={photo.thumbnailUrl}
                                    onClick={e => this.props.handlePicture(e)}
                                >
                                    {photo.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="container__pagination">
                    {pages.map((page, index) =>
                        currentPage === page ? (
                            <a key={index} href="#" className="container__page--active">
                                {page}
                            </a>
                        ) : (
                            <a
                                key={index}
                                href="#"
                                className="container__page"
                                onClick={e => this.props.handlePagination(e)}
                            >
                                {page}
                            </a>
                        )
                    )}
                </div>
            </div>
        );
    }
}