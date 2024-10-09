import express from 'express';
import {
  addItems,
  getItemPlayer,
  listItem,
  listItems,
} from '../controllers/itemsController';

const router = express.Router();

router.post('/add', addItems);
router.get('/get/:player/:itemId', getItemPlayer);
router.get('/', listItems);
router.get('/:itemId', listItem);

export default router;
