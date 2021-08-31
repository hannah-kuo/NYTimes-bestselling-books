import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yourkey`


export default function App() {


	const [books, setBooks] = useState([{}])

	// Source: https://dmitripavlutin.com/javascript-fetch-async-await/

	useEffect(() => {
		async function fetchBooks() {
			const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=BB8BqGACHA9HPxtAblxoX55uesGNfYKj');
			const booksPromise = await response.json();
			// console.log(booksPromise) 
			return booksPromise // books is a promise
		}


		fetchBooks().then(booksResults => {
			console.log(booksResults.results.books); // this is the books object
			setBooks(booksResults.results.books);

			// return books.results;
		});

	}, [])

	console.log(books)


	return (
		<View style={styles.container}>

			<Text>Weekly New York Times Bestselling Books Top 15:</Text>

			{books.map((book) => {
				const {
					author,
					book_image,
					buy_links,
					description,
					price,
					primary_isbn10,
					publisher,
					rank,
					title,
					rank_last_week,
					weeks_on_list } = book
				// const { rank, title } = book

				return (

					<View key={rank} style={styles.container}>

						<Text style={styles.bookRanking}>Ranking: #{book.rank}</Text>
						<Image
							style={styles.bookCover}
							source={{ uri: book.book_image }}
						/>

						<Text style={styles.bookTitle}>{book.title}{"\n\n"}</Text>
						<Text style={styles.bookInfo}>{book.description}{"\n\n"}</Text>

						<Text style={styles.bookInfo}>
							<Text style={styles.boldText}>Author: </Text>
							<Text>{book.author}{"\n"}</Text>
							<Text style={styles.boldText}>Publisher: </Text>
							<Text>{book.publisher}{"\n"}</Text>
							<Text style={styles.boldText}>ISBN: </Text>
							<Text>{book.primary_isbn10}</Text>
						</Text>

					</View>

				)
			})}


			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// fontFamily: "verdana",
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		margin: "20px",
	},
	bookCover: {
		width: 200,
		height: 300,
		margin: "20px",
		
	},
	bookRanking: {
		fontWeight: "bold",
		fontSize: "150%",
		textAlign: "center",
		alignSelf: 'stretch',
		fontFamily: "Lucida Sans",
		backgroundColor: "thistle",
		margin: "5px",
	},
	bookTitle: {
		fontWeight: "bold",
		fontSize: "150%",
		textAlign: "center",
		alignSelf: 'stretch',
		fontFamily: "Lucida Sans",
	},
	bookInfo: {
		textAlign: "center",
		alignSelf: 'stretch',
		fontFamily: "Lucida Sans",
	},
	boldText: {
		fontWeight: "bold",
	}
});
