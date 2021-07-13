import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yourkey`


export default function App() {

	// const [books, setBooks] = useState([])
	// console.log('test');
	// useEffect(() => {
	// 	// const fetchBooks = async () => {
	// 	// 	const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=BB8BqGACHA9HPxtAblxoX55uesGNfYKj`)
	// 	// 	console.log(response.data);
	// 	// 	setBooks(response.data.results.books);

	// 	// }
	// 	// fetchBooks();

	// 	const fetchBooks = async function fetchBooks() {
	// 		const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=BB8BqGACHA9HPxtAblxoX55uesGNfYKj');
	// 		const books = await response.json();
	// 		console.log(response.data);
	// 		setBooks(books.results);
	// 		return books.results
	// 	}
	// 	fetchBooks();


	// }, [])

	// const [books, setBooks] = useState([{}])

	// Source: https://dmitripavlutin.com/javascript-fetch-async-await/
	async function fetchBooks() {
		const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=BB8BqGACHA9HPxtAblxoX55uesGNfYKj');
		const booksPromise = await response.json();
		// console.log(booksPromise) 
		return booksPromise // books is a promise
	}

	
	fetchBooks().then(booksResults => {
		console.log(booksResults.results.books); // this is the books object
		// setBooks(booksResults.results.books);
		// return books.results;
	});


	// const App = () => {
	// 	const API_KEY = "BB8BqGACHA9HPxtAblxoX55uesGNfYKj"
	// 	const URL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`

	// 	const [books, setBooks] = useState([]);
	// 	useEffect(() => {
	// 		fetch(URL)
	// 		.then((response) => response.json())
	// 		.then((responseJson) => {
	// 			return responseJson.books;
	// 		})
	// 		.then(books => {
	// 			setBooks(books);
	// 			console.log(books);
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		})
	// 	},[])
		
	// }


	// const [books, setBooks] = useState([
	// 	{rank: '1', title: 'book one'},
	// 	{rank: '2', title: 'book two'},
	// ]);


	return (
		<View style={styles.container}>

			<Text>Books</Text>

			{/* {books.map((book) => {
				// const {age_group, author, book_image, buy_links, description, price, primary_isbn10, publisher, rank, title} = book
				const { rank, title } = book

				return (

					<View key={rank}>
						<Text>{book.title}</Text>
					</View>

				)
			})} */}


			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
