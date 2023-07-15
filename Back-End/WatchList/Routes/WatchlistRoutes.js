const express = require('express');
const { AddWatchList, GetWatchList, DeleteList } = require('../Controllers/WatchlistController');
const { authorize } = require("../Auth/UserAuth")
const router = express.Router();


router.post('/addlist', authorize, AddWatchList);
router.get('/getlist', authorize, GetWatchList);
router.delete('/removelist/:_id', authorize, DeleteList);


module.exports = router;