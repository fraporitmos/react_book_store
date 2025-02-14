import React, { useEffect, useRef, useState } from "react";
import Book from "../../components/Book/Book";
import Loading from "../../components/Loading/Loading";

const ComicsScreen = () => {
 
  const [books, setBooks] = useState([]);
  const effectCalled = useRef(false);

  useEffect(() => {
    if (effectCalled.current) return;

    const fetchBooksApi = async () => {
      try {
        const response = await fetch("http://localhost:3030/book/comic");
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooksApi();

    effectCalled.current = true;
  }, []);

  return (
    <div className="flex w-full  justify-center items-center pt-26 flex-wrap">
      {
      books.length > 0 
      ? 
       books.map( item => (
        <Book
          key={item._id}
          name= {item.name}
          description={item.description}
          price={item.price}
          editorial={item.editorial}
          img={item.img}
          author={item.author}
          book={item}
        />
       ) )
      : <Loading />
      }
    </div>
  );
};

export default ComicsScreen;
