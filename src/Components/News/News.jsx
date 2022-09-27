import "./News.scss";
import { useState, useEffect } from "react";

const News = () => {
  const [news, setNews] = useState();
  const key = process.env.REACT_APP_NEWS_API_KEY;

  const fetchNews = async (key) => {
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${key}&country=gb&language=en&domain=bbc`
      );

      if (!response.ok) {
        throw new Error(response.status + " error with request");
      } else {
        const data = await response.json();
        setNews(data.results);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // const reduceNews = (news) => {
  //   const newsArr = [];
  //   for (let i = 0; i < 5; i++) {
  //     newsArr.push(news[i]);
  //   }

  //   setNews(newsArr);
  // };

  const newsJSX = news?.map((item) => {
    return <div key={item.title}>{item.title}</div>;
  });

  useEffect(() => {
    fetchNews(key);
  }, [key]);

  // useEffect(() => {
  //   if (news.length > 0) {
  //     reduceNews(news);
  //   }
  // }, [news]);

  return <div className="news">{newsJSX}</div>;
};

export default News;
