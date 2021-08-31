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
			return booksPromise // this is a promise
		}


		fetchBooks().then(booksResults => {
			setBooks(booksResults.results.books);
		});

	}, [])


	return (
		<View style={styles.container}>

			<Text style={styles.pageTitle}>The New York Times Weekly Bestselling Hardcover Fiction:</Text>
			
			{books.map((book) => {
				const {
					author,
					book_image,
					buy_links,
					description,
					primary_isbn10,
					publisher,
					rank,
					title,
					rank_last_week,
					weeks_on_list } = book

				return (

					<View key={rank} style={styles.container}>

						<Text style={styles.bookRanking}>Ranking: #{rank}</Text>
						<Image
							style={styles.bookCover}
							source={{ uri: book_image }}
						/>

						<Text style={styles.bookTitle}>{title}{"\n\n"}</Text>
						<Text style={styles.bookInfo}>{description}{"\n\n"}</Text>

						<Text style={styles.bookInfo}>
							<Text style={styles.boldText}>Author: </Text>
							<Text>{author}{"\n"}</Text>
							<Text style={styles.boldText}>Publisher: </Text>
							<Text>{publisher}{"\n"}</Text>
							<Text style={styles.boldText}>ISBN: </Text>
							<Text>{primary_isbn10}{"\n"}</Text>
							<Text style={styles.boldText}>Weeks on List: </Text>
							<Text>{weeks_on_list}</Text>
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
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		margin: "20px",
	},

	pageTitle: {
		fontFamily: "Lucida Handwriting",
		fontWeight: "bold",
		fontSize: "150%",
		textAlign: "center",
		alignSelf: 'stretch',
		backgroundColor: "#decbc3",
		padding: "10px",
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
		padding: "5px",
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
	},
});
