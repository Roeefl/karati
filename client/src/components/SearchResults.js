import './SearchResults.css';

import React from 'react';

import BookCard from './books/BookCard';

class SearchResults extends React.Component {
    renderContent = () => {
        console.log(this.props);

        if (!this.props.ready) {
            return (
                <div className="ui segment retrieving-books">
                    <div className="ui huge indeterminate text active loader">
                        Retrieving Books...
                    </div> 
                </div>
            );
        };

        const results = this.props.results.map( result => {
            return (
                <div className="book-card-container four wide column" key={result.id._}>
                    <BookCard
                        bookId={result.id._}
                        src={result.image_url}
                        desc={null}
                        title={result.title}
                        author={result.author.name}
                        numOfPages={null}
                        linkTo={'/myShelf/search/book/' + result.id._} />
                </div>
            );
        });

        return (
            <div className="ui link cards grid">
                {results}
            </div>
        );
    }

    render() {
        // console.log(this.props.results);
        return (
            <div className="search-results ten wide column">
                {this.renderContent()}
            </div>
        );
    }
}

export default SearchResults;