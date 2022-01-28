import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render, screen, waitFor } from '@testing-library/react';

const testArticle = {
    id: 'tEsTiD',
    headline: 'Star Wars',
	author: 'George Lucas',
    createdOn: '2021-08-09T18:02:38-04:00',
    summary: 'A long long time ago...',
	body: '...in a galaxy far far away.'
}
const testArticleNoAuthor = {
    id: 'tEsTiD',
    headline: 'Star Wars',
	author: '',
    createdOn: '2021-08-09T18:02:38-04:00',
    summary: 'A long long time ago...',
	body: '...in a galaxy far far away.'
}

test('renders component without errors', ()=> {
	render(<Article article={testArticle} />);
});

test('renders headline, author from the article when passed in through props', ()=> {
	// Arrange
	render(<Article article={testArticle} />);
	// Act
	const headline = screen.queryByText(/star wars/i);
	const author = screen.queryByText(/george lucas/i);
	const summary = screen.queryByText(/a long long time ago.../i);
	const body = screen.queryByText(/...in a galaxy far far away./i);
	// Assert
	expect(headline).toBeInTheDocument();
	expect(author).toBeInTheDocument();
	expect(summary).toBeInTheDocument();
	expect(body).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
	// Arrange
	render(<Article article={testArticleNoAuthor} />);
	//Act
	const defaultAuthor = screen.queryByText(/associated press/i);
	//Assert
	expect(defaultAuthor).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', async ()=> {
	const mockHandleDelete = jest.fn();
	// Arrange
	render(<Article article={testArticle} handleDelete={mockHandleDelete}/>);
	// Act
	const deleteButton = screen.getByTestId('deleteButton');
	userEvent.click(deleteButton);
	// Assert
	await waitFor(() => {
		expect(mockHandleDelete).toHaveBeenCalled();
	});
});

//Task List: 
// ✅ Complete all above tests. Create test article data when needed.

// ✅ Build a test that shows the `Article` component, given the correct props, can render without errors.
// ✅ Build a test that shows that when a correctly formatted article is passed into the `Article` component, the correct headline, author, summary and body are displayed.
// ✅ The `Article` component should display "Associated Press" when an author attribute is not avalible. Build a test that verifies that that is true.
// ✅ Build a test that show that when the deleteButton is pressed on an Article, the handleDelete functional property is executed.