const axios = require('axios');

const getNews = async (req, res, next) => {
  try {
    const preferences = req.user.preferences;
    const category = req.query.category || preferences[0] || 'general';

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category,
        language: req.query.language || 'en',
        pageSize: req.query.pageSize || '10',
        page: req.query.page || 1,
        apiKey: process.env.NEWS_API_KEY
      },
    });

    const { totalResults, articles } = response.data;

    const news = articles.map((article) => ({
      title:       article.title,
      description: article.description,
      url:         article.url,
      source:      article.source.name,
      publishedAt: article.publishedAt,
      urlToImage:  article.urlToImage,
    }));

    res.status(200).json({ totalResults, news });

  } catch (err) { 
    if (err.response) {
      return res.status(err.response.status).json({ 
        error: err.response.data.message || 'NewsAPI error',
      });
    }
    next(err);
  }
};

const searchNews = async (req, res, next) => {
  try {
    const q = req.query.q || '';

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q,
        language: req.query.language || 'en',
        pageSize: req.query.pageSize || '10',
        page: req.query.page || 1,
        apiKey: process.env.NEWS_API_KEY
      },
    });

    const { totalResults, articles } = response.data;

    const news = articles.map((article) => ({
      title:       article.title,
      description: article.description,
      url:         article.url,
      source:      article.source.name,
      publishedAt: article.publishedAt,
      urlToImage:  article.urlToImage,
    }));

    res.status(200).json({ totalResults, news });

  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        error: err.response.data.message || 'NewsAPI error',
      });
    }
    next(err);
  }
};

module.exports = { getNews, searchNews }; 