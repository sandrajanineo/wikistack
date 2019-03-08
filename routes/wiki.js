const express = require('express');
const router = express.Router();
const client = require('../models');
const { Page } = require("../models");
const { addPage } = require("../views");
const wikiPage = require('../views/wikipage');

router.get('/', (req, res) => {
  res.send();
})

router.get('/add', (req, res) => {
  res.send(addPage());
})

const slugSetter = (title) => {
  // Make whitespace underscore
  // Removes all non-alphanumeric characters from title
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: slugSetter(req.body.title)
  });



  try {
    await page.save();
    console.log(`post is ${page.title}`);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
  const foundPage = await Page.findOne({
    where: {slug: `${req.params.slug}`}
  })

  res.json(foundPage);
  res.send(wikiPage(foundPage));

  } catch (error) {
    next(error);
  }
});

module.exports = router;
